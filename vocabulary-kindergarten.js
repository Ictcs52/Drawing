// Present all vocabulary as one Kindergarten collection; keep category filters.
// Trigger unified kindergarten UI.
document.addEventListener('DOMContentLoaded',()=>{
  const levels=document.getElementById('levels');
  if(levels){levels.innerHTML='<button class="pill on">🌈 อนุบาล</button>';levels.style.marginBottom='4px';}
  document.querySelectorAll('.top p').forEach(p=>p.textContent=p.textContent.replace('สำหรับอนุบาล 1–3','สำหรับเด็กอนุบาล'));
  const heroP=document.querySelector('.hero p');
  if(heroP) heroP.textContent='เลือกหมวดที่หนูชอบ แตะการ์ดเพื่อฟังคำศัพท์ แล้วลองพูดตาม';
  if(window.W && window.C){window.level=0;}
});