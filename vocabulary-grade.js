(()=>{
  const KEY='punpin_grade_v1';
  const names={k:'อนุบาล',p1:'ป.1',p2:'ป.2',p3:'ป.3'};
  const maxLevel={k:1,p1:2,p2:3,p3:3};
  const g=localStorage.getItem(KEY)||'k';
  function apply(){
    try{
      level=maxLevel[g];
      cat='all';
      render();
    }catch(e){return;}
    const levels=document.getElementById('levels');
    if(levels){
      levels.innerHTML=`<span class="pill on" style="cursor:default">🎒 ${names[g]} · เลือกจากหน้าแรกแล้ว</span>`;
      levels.style.overflow='visible';
    }
    const top=document.querySelector('.top p');
    if(top)top.textContent=`เนื้อหาภาษาอังกฤษระดับ ${names[g]} · คำศัพท์ + คำอ่าน + คำแปล + เสียง`;
    const hero=document.querySelector('.hero p');
    if(hero)hero.textContent=g==='k'?'A–Z และคำศัพท์พื้นฐาน ฟังแล้วพูดตาม':g==='p1'?'Phonics/CVC และคำศัพท์พื้นฐานสำหรับ ป.1':g==='p2'?'คำศัพท์และประโยคที่ใช้บ่อยสำหรับ ป.2':'คำศัพท์เพื่อการอ่านและสร้างประโยคสำหรับ ป.3';
    const title=document.getElementById('title');
    if(title&&title.textContent==='คำศัพท์ทั้งหมด')title.textContent=`คำศัพท์ ${names[g]}`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));else setTimeout(apply,0);
})();