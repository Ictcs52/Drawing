# PUN&PIN Creative Playground

เว็บกิจกรรมสร้างสรรค์สำหรับเด็ก พัฒนาเป็น static web application และเผยแพร่ผ่าน GitHub Pages

## กิจกรรมในระบบ

- ระบายสีภาพ
- ฝึกลากเส้นตามรอยประ
- เกมคณิตศาสตร์
- เกมจิ๊กซอว์
- เกมแต่งตัว
- ภาพกิจกรรมหลายหมวด เช่น สัตว์ ยานพาหนะ อวกาศ ดนตรี และรูปทรงพื้นฐาน

## การเผยแพร่

เว็บไซต์ใช้ GitHub Pages จาก branch `main` ที่ root ของ repository โดยมี `index.html` เป็น entry point หลัก

## การตรวจสอบอัตโนมัติ

GitHub Actions จะตรวจทุกครั้งที่ push หรือเปิด Pull Request เข้า `main` โดยตรวจว่า:

1. มี `index.html` และมี DOCTYPE
2. HTML สามารถ parse ได้
3. ไม่มีค่า `id` ซ้ำในหน้าเว็บ
4. JavaScript แบบ embedded ผ่าน `node --check`
5. มีไฟล์ entry point สำหรับ GitHub Pages

ตัวตรวจสอบอยู่ที่ `.github/scripts/validate.py`

## แนวทางพัฒนาต่อ

ตัวเว็บปัจจุบันรวม HTML, CSS, JavaScript และข้อมูล SVG จำนวนมากไว้ใน `index.html` เพื่อให้ deploy ได้ง่าย ระยะถัดไปสามารถทยอยแยก CSS, JavaScript และชุดข้อมูลภาพออกเป็นไฟล์ย่อย โดยควรรักษาหน้าตาและพฤติกรรมเดิมของระบบไว้ระหว่าง refactor
