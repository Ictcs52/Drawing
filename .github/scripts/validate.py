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

    text = INDEX.read_text(encoding="utf-8")
    if "<!DOCTYPE html>" not in text[:200].upper():
        fail("index.html is missing a DOCTYPE declaration")

    parser = AuditParser()
    try:
        parser.feed(text)
        parser.close()
    except Exception as exc:
        fail(f"HTML parser failed: {exc}")

    duplicates = sorted(k for k, v in Counter(parser.ids).items() if v > 1)
    if duplicates:
        fail("duplicate HTML id values: " + ", ".join(duplicates[:20]))

    suspicious = re.findall(r"(?:src|href)=[\"'](?:/|\\)", text, flags=re.IGNORECASE)
    if suspicious:
        print("WARNING: root-relative asset paths detected; verify GitHub Pages compatibility")

    scripts = [s for s in parser.scripts if s.strip()]
    if not scripts:
        fail("no embedded JavaScript was found")

    combined = "\n;\n".join(scripts)
    with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8", delete=False) as fh:
        fh.write(combined)
        js_path = fh.name

    result = subprocess.run(["node", "--check", js_path], text=True)
    if result.returncode != 0:
        fail("JavaScript syntax validation failed")

    print(f"OK: HTML parsed, {len(parser.ids)} ids checked, {len(scripts)} embedded script block(s) validated")


if __name__ == "__main__":
    main()
