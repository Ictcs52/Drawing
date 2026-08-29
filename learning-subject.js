(()=>{
  const param=new URLSearchParams(location.search).get('subject');
  if(!param)return;
  const map={english:0,thai:1,math:2,brain:3,story:4};
  const idx=map[param];if(idx===undefined)return;
  const subjectKey=param;
  function boot(){
    try{si=idx;qi=0;correct=0;locked=false;render()}catch(e){return}
    const name=subjects[idx][1],gname=gradeNames[grade];
    const topH=document.querySelector('.top h1'),topP=document.querySelector('.top p');
    if(topH)topH.textContent=`${subjects[idx][0]} ${name} · ${gname}`;
    if(topP)topP.textContent=`เปิดเนื้อหา ${gname} อัตโนมัติจากระดับที่เลือกหน้าแรก`;
    const heroH=document.querySelector('.hero h2'),heroP=document.querySelector('.hero p'),track=document.getElementById('track');
    if(heroH)heroH.textContent=`ฝึก ${name} ระดับ ${gname} ✨`;
    if(heroP)heroP.textContent='ทำทีละ 3 ข้อ เสร็จแล้วรับดาวได้เลย';
    if(track)track.style.display='none';
    const next=document.getElementById('nextBtn');
    if(next)next.onclick=()=>{if(qi<2){qi++;render();return}completeOne()};
    const restartBtn=document.querySelector('#finish button:nth-of-type(2)');
    if(restartBtn)restartBtn.onclick=()=>restartOne();
  }
  function rewardOnce(){
    const day=new Date().toISOString().slice(0,10),rk=`punpin_subject_${day}_${grade}_${subjectKey}`;
    if(localStorage.getItem(rk))return;
    try{const k='punpin_progress_v1',p=JSON.parse(localStorage.getItem(k)||'{}');p.stars=(p.stars||0)+3;p.plays=(p.plays||0)+1;localStorage.setItem(k,JSON.stringify(p));localStorage.setItem(rk,'1')}catch(e){}
  }
  function completeOne(){
    rewardOnce();
    lesson.style.display='none';finish.classList.add('on');
    const name=subjects[idx][1],gname=gradeNames[grade];
    const h=finish.querySelector('h2'),p=finish.querySelector('p');
    if(h)h.textContent=`${name} ${gname} สำเร็จแล้ว!`;
    if(p)p.textContent='เก่งมาก ทำแบบฝึกระดับที่เลือกครบแล้ว';
    const stats=finish.querySelectorAll('.finishStats div');
    if(stats[0])stats[0].innerHTML='<b>⭐ +3</b><small>ดาวกิจกรรม</small>';
    if(stats[1])stats[1].innerHTML='<b>1</b><small>กิจกรรม</small>';
    if(stats[2])stats[2].innerHTML=`<b>${gname}</b><small>ระดับของหนู</small>`;
  }
  function restartOne(){
    try{si=idx;qi=0;correct=0;locked=false;finish.classList.remove('on');lesson.style.display='block';render()}catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0));else setTimeout(boot,0);
})();