(()=>{
  const KEY='punpin_grade_v1';
  const names={k:'อนุบาล',p1:'ป.1',p2:'ป.2',p3:'ป.3'};
  const P={
    k:{
      english:['A–Z · สี · สัตว์ · ฟังคำ','vocabulary.html'],
      math:['นับ 1–20 · บวก–ลบด้วยภาพ','math'],
      thai:['ก–ฮ · สระ 32 เสียง · ผสมเสียง','thai-vowels.html'],
      brain:['จับคู่ · ความจำ · แบบรูป','learning-today.html?subject=brain'],
      world:['สัตว์ · พืช · ร่างกาย · ความปลอดภัย','world-life.html'],
      creative:['ระบายสี · ลากเส้น · จิ๊กซอว์','creative'],
      stories:['นิทานภาพ · ฟังแล้วตอบ','learning-today.html?subject=story'],
      speaking:['คำง่าย · ฟังแล้วพูดตาม','speaking.html'],
      arFeature:['จับคู่ภาพ · คำง่ายด้วยมือ','ar-hand.html']
    },
    p1:{
      english:['Phonics/CVC · คำศัพท์ · ฟัง–พูด','vocabulary.html'],
      math:['บวก–ลบไม่เกิน 100 · หลักสิบ–หน่วย','math'],
      thai:['สระ · ผสมคำ · ตัวสะกด · อ่านวลี','thai-reading.html'],
      brain:['ลำดับ · แบบรูป · เหตุผล','learning-today.html?subject=brain'],
      world:['สิ่งมีชีวิต · อากาศ · ความปลอดภัย','world-life.html'],
      creative:['ศิลปะ · ต่อภาพ · ฝึกกล้ามเนื้อมือ','creative'],
      stories:['อ่านเรื่องสั้น · จับใจความง่าย','learning-today.html?subject=story'],
      speaking:['คำศัพท์ · ประโยคสั้น · พูดตาม','speaking.html'],
      arFeature:['คำศัพท์ · จับคู่ภาพด้วยมือ','ar-hand.html']
    },
    p2:{
      english:['Vocabulary · ประโยคสั้น · อ่านเข้าใจ','learning-today.html?subject=english'],
      math:['บวก–ลบถึง 1,000 · คูณเบื้องต้น','learning-today.html?subject=math'],
      thai:['อ่านประโยค · คำกริยา · จับใจความ','learning-today.html?subject=thai'],
      brain:['แบบรูป · จัดหมวด · Problem Solving','learning-today.html?subject=brain'],
      world:['วัฏจักรชีวิต · แม่เหล็ก · ทักษะชีวิต','world-life.html'],
      creative:['ศิลปะ · ออกแบบ · สร้างสรรค์','creative'],
      stories:['อ่านจับใจความ · เหตุและผล','learning-today.html?subject=story'],
      speaking:['ประโยคสนทนา · ฟังและพูดตาม','speaking.html'],
      arFeature:['คำและประโยค · จับคู่ด้วยมือ','ar-hand.html']
    },
    p3:{
      english:['Reading · Sentence · Grammar เบื้องต้น','learning-today.html?subject=english'],
      math:['คูณ · หาร · เศษส่วน · โจทย์ปัญหา','learning-today.html?subject=math'],
      thai:['อ่านจับใจความ · ประธาน/กริยา · เหตุผล','learning-today.html?subject=thai'],
      brain:['Logic · ลำดับ · การวิเคราะห์','learning-today.html?subject=brain'],
      world:['โลก · วัฏจักรน้ำ · ห่วงโซ่อาหาร','world-life.html'],
      creative:['ออกแบบ · ศิลปะ · ความคิดสร้างสรรค์','creative'],
      stories:['Reading Comprehension · สรุปความ','learning-today.html?subject=story'],
      speaking:['Conversation · ฟัง–พูดเป็นประโยค','speaking.html'],
      arFeature:['คำศัพท์/ประโยค · AR Challenge','ar-hand.html']
    }
  };
  const grade=()=>localStorage.getItem(KEY)||'k';
  const click=id=>document.getElementById(id)?.click();
  function route(zone,type){
    const g=grade(),dest=P[g][type]?.[1];
    if(!dest)return;
    zone.onclick=e=>{
      e.preventDefault();e.stopPropagation();
      if(dest==='math'){click('mathCard');return;}
      if(dest==='creative'){click('coloringCard');return;}
      location.href=dest;
    };
  }
  function badge(zone,g){
    let b=zone.querySelector('.kwGradeOnly');
    if(!b){b=document.createElement('em');b.className='kwGradeOnly';zone.appendChild(b)}
    b.textContent=names[g];
  }
  function style(){
    if(document.getElementById('kw-grade-mode-style'))return;
    const s=document.createElement('style');s.id='kw-grade-mode-style';s.textContent=`
      .kwZone{position:relative}.kwGradeOnly{position:absolute;left:8px;top:8px;padding:3px 6px;border-radius:999px;background:#ffffffd9;color:#615678;font:700 .48rem Mali,sans-serif;font-style:normal;border:1px solid #ffffff}.kwZone.arFeature .kwGradeOnly{background:#ffffff22;color:#fff;border-color:#ffffff33}.kwClassSummary{display:inline-flex;align-items:center;gap:6px;margin-left:7px;padding:5px 8px;border-radius:999px;background:#fff1b4;color:#705b2d;font-size:.62rem;font-weight:700}@media(max-width:520px){.kwGradeOnly{font-size:.45rem;padding:3px 5px}}
    `;document.head.appendChild(s);
  }
  function apply(){
    const g=grade(),cfg=P[g];if(!cfg)return;style();
    const title=document.querySelector('.kwTitle h2'),sub=document.querySelector('.kwTitle p');
    if(title)title.textContent='กิจกรรมสำหรับ '+names[g];
    if(sub)sub.textContent='เลือกแล้วเข้าเรียนระดับ '+names[g]+' ได้ทันที ไม่ต้องเลือกระดับซ้ำ';
    const ribbon=document.querySelector('.kwRibbon');if(ribbon)ribbon.textContent='⭐ เนื้อหา '+names[g];
    Object.keys(cfg).forEach(type=>{
      const z=document.querySelector('.kwZone.'+type);if(!z)return;
      const small=z.querySelector('small');if(small)small.textContent=cfg[type][0];
      badge(z,g);route(z,type);
    });
    const mission=document.querySelector('.kwMissionTop span');if(mission)mission.textContent='📅 ฝึกเพิ่ม · '+names[g];
    const missionSub=document.querySelector('.kwMissionTop b');if(missionSub)missionSub.textContent='ทุกปุ่มใช้ระดับ '+names[g]+' อัตโนมัติ';
    const missionButtons=document.querySelectorAll('.kwMissionCard button');
    if(missionButtons[0])missionButtons[0].onclick=()=>location.href=(g==='p2'||g==='p3')?'learning-today.html?subject=english':'vocabulary.html';
    if(missionButtons[1])missionButtons[1].onclick=()=>{if(g==='p2'||g==='p3')location.href='learning-today.html?subject=math';else click('mathCard')};
    if(missionButtons[2])missionButtons[2].onclick=()=>location.href='learning-today.html?subject=brain';
    const meta=document.querySelector('.kwTodayMeta');if(meta){
      let tag=meta.querySelector('.kwClassSummary');if(!tag){tag=document.createElement('b');tag.className='kwClassSummary';meta.prepend(tag)}tag.textContent='🎒 '+names[g];
    }
  }
  document.addEventListener('punpin:grade',()=>setTimeout(apply,0));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,80));
  setTimeout(apply,180);
})();