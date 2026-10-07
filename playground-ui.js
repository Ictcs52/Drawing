/* Shared usability features, independent of lesson/game logic. */
(() => {
 function boot(){
  const isHome=!!document.getElementById('home');document.body.classList.add(isHome?'ppHome':'ppLesson');
  const main=document.querySelector('.vKCatGrid,.vCategoryGrid')||document.querySelector('main')||document.querySelector('.wrap');
  if(main){if(!main.id)main.id='mainContent';const skip=document.createElement('a');skip.className='ppSkip';skip.href='#'+main.id;skip.textContent='ข้ามไปกิจกรรม';document.body.prepend(skip)}
  const bar=document.querySelector('.appbar,.top');
  if(bar){const calm=document.createElement('button');calm.className='ppMotion';calm.type='button';
   let quiet=localStorage.getItem('punpin_calm_v1')==='true'||(!localStorage.getItem('punpin_calm_v1')&&matchMedia('(prefers-reduced-motion: reduce)').matches);
   const apply=()=>{document.body.classList.toggle('ppCalm',quiet);calm.setAttribute('aria-pressed',quiet);calm.setAttribute('aria-label',quiet?'เปิดการเคลื่อนไหว':'ลดการเคลื่อนไหว');calm.title=quiet?'เปิดการเคลื่อนไหว':'ลดการเคลื่อนไหว';calm.textContent=quiet?'☁':'✦'};
   calm.onclick=()=>{quiet=!quiet;localStorage.setItem('punpin_calm_v1',quiet);apply()};apply();bar.appendChild(calm);
  }
  document.querySelectorAll('.top .back').forEach(b=>{b.innerHTML='<span aria-hidden="true">←</span><span class="ppBackText">บ้าน</span>';b.setAttribute('aria-label','กลับหน้าหลัก')});
  document.querySelectorAll('.roundBack,.tool.back').forEach(b=>{if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',b.title||'กลับไปเลือกกิจกรรม')});
  const feedbacks=document.querySelectorAll('.feedback,.mathFeedback,.puzzleFeedback,#status');feedbacks.forEach(x=>{x.setAttribute('role','status');x.setAttribute('aria-live','polite')});
  // Dynamic title text also describes the current sound/fullscreen state to assistive technology.
  for(const id of ['sndBtn','fsBtn','soundBtn']){const b=document.getElementById(id);if(!b)continue;const sync=()=>{b.setAttribute('aria-label',b.title||'เปิดหรือปิดเสียง');if(id==='sndBtn')b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/>'+((b.title||'').startsWith('เปิด')?'<path d="m17 9 5 6m0-6-5 6"/>':'<path d="M16 8q5 4 0 8m3-11q7 7 0 14"/>')+'</svg>';if(id==='fsBtn')b.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5"/></svg>';};sync();new MutationObserver(sync).observe(b,{attributes:true,attributeFilter:['title']})}
  document.querySelectorAll('.wrap>footer').forEach(x=>x.remove());
  const footer=document.createElement('footer');footer.className='ppFooter';footer.innerHTML='<b>PUN&PIN</b> · เล่นทีละนิด เติบโตทีละก้าว 🌱';document.querySelector('.wrap')?.appendChild(footer);
  // Keep keyboard focus inside the existing dialogs without changing their actions.
  let active=null,previous=null;
  const dialogs=[...document.querySelectorAll('.ppParentModal,.successPopup,.askPopup')];
  dialogs.forEach(d=>{const card=d.querySelector('.ppParentCard,.successBox,.askBox')||d;card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label',d.classList.contains('ppParentModal')?'ความก้าวหน้าสำหรับผู้ปกครอง':d.classList.contains('askPopup')?'ยืนยันการเลือก':'ทำสำเร็จแล้ว');const observer=new MutationObserver(()=>{const open=!d.hidden&&getComputedStyle(d).display!=='none';if(open&&active!==d){previous=document.activeElement;active=d;const b=d.querySelector('button');b?.focus()}else if(!open&&active===d){active=null;if(previous?.isConnected)previous.focus()}});observer.observe(d,{attributes:true,attributeFilter:['class','hidden','style']})});
  document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){const close=active.querySelector('.ppClose,#askCancelBtn');if(close&&getComputedStyle(close).display!=='none'){e.preventDefault();close.click()}return}if(e.key!=='Tab')return;const focusable=[...active.querySelectorAll('button,a,input,[tabindex]')].filter(x=>!x.disabled&&x.tabIndex>=0&&x.getClientRects().length);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&(document.activeElement===first||!active.contains(document.activeElement))){e.preventDefault();last.focus()}else if(!e.shiftKey&&(document.activeElement===last||!active.contains(document.activeElement))){e.preventDefault();first.focus()}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
