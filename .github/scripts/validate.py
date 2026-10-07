from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "index.html"


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.scripts: list[str] = []
        self._in_script = False
        self._script_src: str | None = None
        self._script_buf: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        element_id = attrs_dict.get("id")
        if element_id:
            self.ids.append(element_id)
        if tag == "script":
            self._in_script = True
            self._script_src = attrs_dict.get("src")
            self._script_buf = []

    def handle_data(self, data: str) -> None:
        if self._in_script and not self._script_src:
            self._script_buf.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self._in_script:
            if not self._script_src:
                self.scripts.append("".join(self._script_buf))
            self._in_script = False
            self._script_src = None
            self._script_buf = []


def fail(message: str) -> None:
    print(f"ERROR: {message}")
    raise SystemExit(1)


def main() -> None:
    if not INDEX.exists():
        fail("index.html was not found")
    html_files = sorted(ROOT.glob("*.html"))
    script_count = 0
    for page in html_files:
        source = page.read_text(encoding="utf-8")
        if "<!DOCTYPE HTML>" not in source[:200].upper():
            fail(f"{page.name}: missing DOCTYPE declaration")
        parser = AuditParser()
        parser.feed(source)
        parser.close()
        duplicates = sorted(k for k, v in Counter(parser.ids).items() if v > 1)
        if duplicates:
            fail(f"{page.name}: duplicate ids: " + ", ".join(duplicates[:20]))
        for script in parser.scripts:
            if not script.strip():
                continue
            with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as fh:
                fh.write(script)
                fh.flush()
                result = subprocess.run(["node", "--check", fh.name], capture_output=True, text=True)
            if result.returncode:
                print(result.stderr)
                fail(f"{page.name}: embedded JavaScript syntax check failed")
            script_count += 1
        for link in re.findall(r'(?:src|href)=["\']([^"\']+)', source):
            if re.match(r"(?:https?:|data:|#|javascript:|mailto:)", link) or "${" in link:
                continue
            target = link.split("?", 1)[0].split("#", 1)[0]
            if target and not (ROOT / target).exists():
                fail(f"{page.name}: missing local asset {target}")
    for script in sorted(ROOT.glob("*.js")):
        result = subprocess.run(["node", "--check", str(script)], capture_output=True, text=True)
        if result.returncode:
            print(result.stderr)
            fail(f"{script.name}: JavaScript syntax check failed")
    print(f"OK: {len(html_files)} HTML pages, ids, local assets, {script_count} inline scripts and all JS files validated")


if __name__ == "__main__":
    main()
