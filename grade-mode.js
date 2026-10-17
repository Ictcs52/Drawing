/* Shared activity home: no grade selection or grade-dependent routing. */
(()=>{
function apply(){
 document.querySelectorAll('.kwGrade,.kwGradeOnly,.kwClassSummary').forEach(el=>el.remove());
 const sub=document.querySelector('.kwTitle p');if(sub)sub.textContent='รวมทุกกิจกรรมไว้ด้วยกัน · เลือกสิ่งที่อยากเล่นได้เลย';
 const descriptions={english:'ตัวอักษร · คำศัพท์ · ฟังและพูด',math:'นับเลข · บวก ลบ คูณ หาร',thai:'ก–ฮ · สระ · ฝึกอ่านคำ',brain:'จับคู่ · ความจำ · แบบรูป',world:'ธรรมชาติ · วิทยาศาสตร์ · ทักษะชีวิต',creative:'ระบายสี · แต่งแต้มจินตนาการ',stories:'นิทานภาพ · ฟังและอ่าน',speaking:'ฟังเสียง · ฝึกพูดตาม'};
 for(const [type,text]of Object.entries(descriptions)){const z=document.querySelector('.kwZone.'+type);if(z?.querySelector('small'))z.querySelector('small').textContent=text;}
 const routes={world:'world-life.html',stories:'stories.html',speaking:'speaking.html'};
 for(const [type,url]of Object.entries(routes)){const z=document.querySelector('.kwZone.'+type);if(z)z.onclick=()=>location.href=url;}
}
document.addEventListener('DOMContentLoaded',apply);
})();
