document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.querySelector('.activityGrid');
  if(!grid || document.getElementById('vocabCard')) return;
  const card=document.createElement('button');
  card.className='activity';
  card.id='vocabCard';
  card.innerHTML='<div class="activityIcon">📚</div><div><h3>คำศัพท์ภาษาอังกฤษ</h3><p>คำศัพท์สำหรับอนุบาล 1–3 แบ่งหมวด พร้อมคำอ่านและคำแปล</p></div><span class="go">→</span>';
  card.addEventListener('click',()=>{ window.location.href='vocabulary.html'; });
  grid.appendChild(card);
  const pill=document.querySelector('.tinyPill');
  if(pill) pill.textContent='🌟 10 กิจกรรมพร้อมเล่น';
});