/* Keep the existing paint engine; arrange its controls around a fitted canvas. */
(()=>{
  const studio=document.getElementById('studio');
  if(!studio)return;
  const board=studio.querySelector('.board'),rack=studio.querySelector('.rack');
  const palette=document.getElementById('palette');
  const paints=[...palette.querySelectorAll('.crayon')];
  const portrait=matchMedia('(max-width:760px) and (orientation:portrait)');
  const panel=document.createElement('div');
  panel.className='paintPalettePanel';panel.id='paintPalettePanel';
  panel.innerHTML='<div class="paintPaletteHeading"><strong>เลือกสีและลวดลาย</strong><button class="paintPaletteClose" type="button">ปิด</button></div>';
  rack.insertBefore(panel,palette);panel.appendChild(palette);
  const quick=document.createElement('div');quick.className='paintQuickColors';
  const favorites=[[0,'สีแดง'],[5,'สีเหลือง'],[9,'สีเขียว'],[17,'สีฟ้า'],[24,'สีชมพู'],[26,'สีเนื้อ']];
  const favoriteButtons=favorites.map(([index,label])=>{
    const button=document.createElement('button');
    button.type='button';button.className='paintColor';button.title=label;
    button.setAttribute('aria-label',`เลือก${label}`);
    button.style.setProperty('--paint-color',paints[index].style.getPropertyValue('--c'));
    if(index===5||index===26)button.style.setProperty('--paint-ink','#425238');
    button.addEventListener('click',()=>paints[index].click());
    quick.appendChild(button);return button;
  });
  const more=document.createElement('button');more.type='button';more.className='paintPaletteMore';
  more.innerHTML='<span aria-hidden="true">＋</span>สีอื่น';
  more.setAttribute('aria-label','เลือกสีและลวดลายเพิ่มเติม');
  more.setAttribute('aria-controls',panel.id);more.setAttribute('aria-expanded','false');
  quick.appendChild(more);rack.appendChild(quick);
  const close=panel.querySelector('.paintPaletteClose');
  function setOpen(open,returnFocus=false){
    document.body.classList.toggle('ppPaletteOpen',open);
    more.setAttribute('aria-expanded',String(open));
    if(open)(paints.find(p=>p.classList.contains('on'))||close).focus({preventScroll:true});
    else if(returnFocus)more.focus({preventScroll:true});
  }
  more.addEventListener('click',()=>setOpen(!document.body.classList.contains('ppPaletteOpen')));
  close.addEventListener('click',()=>setOpen(false,true));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&document.body.classList.contains('ppPaletteOpen')){event.preventDefault();setOpen(false,true);}
  });
  function syncColor(){
    paints.forEach(p=>p.setAttribute('aria-pressed',String(p.classList.contains('on'))));
    favoriteButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(paints[favorites[i][0]].classList.contains('on'))));
  }
  paints.forEach(p=>{
    p.addEventListener('click',()=>{syncColor();if(portrait.matches&&document.body.classList.contains('ppPaletteOpen'))setOpen(false,true);});
    p.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){syncColor();if(portrait.matches&&document.body.classList.contains('ppPaletteOpen'))setOpen(false,true);}});
  });
  syncColor();
  // Change CSS size only: canvas pixels and saved brush strokes stay intact.
  function fitPicture(){
    const wrap=board.querySelector('.paintWrap');
    if(!wrap||!document.body.classList.contains('ppPainting'))return;
    const style=getComputedStyle(board);
    const width=board.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
    const height=board.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
    const side=Math.max(0,Math.floor(Math.min(width,height)));
    wrap.style.width=`${side}px`;wrap.style.height=`${side}px`;
  }
  function syncStudio(){
    const active=studio.style.display==='block';
    const entered=active&&!document.body.classList.contains('ppPainting');
    document.body.classList.toggle('ppPainting',active);
    if(!active)setOpen(false);
    if(entered){window.scrollTo(0,0);requestAnimationFrame(fitPicture);}
  }
  new MutationObserver(syncStudio).observe(studio,{attributes:true,attributeFilter:['style']});
  new MutationObserver(()=>requestAnimationFrame(fitPicture)).observe(board,{childList:true});
  new ResizeObserver(fitPicture).observe(board);
  portrait.addEventListener('change',()=>{setOpen(false);requestAnimationFrame(fitPicture);});
  window.addEventListener('resize',fitPicture);
  studio.querySelectorAll('.tbtn').forEach(button=>button.addEventListener('click',()=>{
    studio.querySelectorAll('.tbtn').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('on'))));
  }));
  studio.querySelectorAll('.tbtn').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('on'))));
  const sizes=[...studio.querySelectorAll('.sizeBtn')];
  sizes.forEach((button,index)=>{
    button.setAttribute('aria-label',`ขนาดพู่กัน${['เล็ก','กลาง','ใหญ่'][index]}`);
    button.setAttribute('aria-pressed',String(button.classList.contains('on')));
    button.addEventListener('click',()=>sizes.forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('on')))));
  });
  syncStudio();
})();
