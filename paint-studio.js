/* Keep the existing paint engine; arrange its controls around a fitted canvas. */
(()=>{
  const studio=document.getElementById('studio');
  if(!studio)return;
  const board=studio.querySelector('.board'),rack=studio.querySelector('.rack');
  const palette=document.getElementById('palette');
  const paints=[...palette.querySelectorAll('.crayon')];
  const portrait=matchMedia('(max-width:760px) and (orientation:portrait)');
  const shortLandscape=matchMedia('(max-height:360px) and (orientation:landscape)');
  const panel=document.createElement('div');
  panel.className='paintPalettePanel';panel.id='paintPalettePanel';
  panel.innerHTML='<div class="paintPaletteHeading"><strong>เลือกสีและลวดลาย</strong><button class="paintPaletteClose" type="button">ปิด</button></div>';
  rack.insertBefore(panel,palette);panel.appendChild(palette);
  const controls=document.createElement('div');controls.className='paintPaletteControls';
  controls.innerHTML='<div class="paintPaletteTabs" role="group" aria-label="เลือกชนิดสี"><button type="button" data-kind="colors" aria-pressed="true">สี 34 สี</button><button type="button" data-kind="patterns" aria-pressed="false">ลายพิเศษ 48</button></div><label class="paintPatternFilter" hidden>หมวดลาย <select aria-label="หมวดลายพิเศษ"><option value="all">ทั้งหมด 48 แบบ</option></select></label>';
  panel.insertBefore(controls,palette);
  const tabs=[...controls.querySelectorAll('[data-kind]')];
  const filter=controls.querySelector('.paintPatternFilter');
  const category=filter.querySelector('select');
  tabs[0].textContent=`สี ${paints.filter(p=>p.dataset.paintKind==='colors').length} สี`;
  const patternCount=paints.filter(p=>p.dataset.paintKind==='patterns').length;
  tabs[1].textContent=`ลายพิเศษ ${patternCount}`;
  category.options[0].textContent=`ทั้งหมด ${patternCount} แบบ`;
  window.PunPinPatterns.groups.forEach(group=>{
    const option=document.createElement('option');option.value=group.id;
    option.textContent=`${group.name} · ${paints.filter(p=>p.dataset.paintGroup===group.id).length}`;
    category.appendChild(option);
  });
  let paletteKind='colors';
  function showPaints(kind){
    paletteKind=kind;palette.classList.toggle('showPatterns',kind==='patterns');
    panel.classList.toggle('paintPatternCatalog',kind==='patterns');
    tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.kind===kind)));
    filter.hidden=kind!=='patterns';
    [...palette.children].forEach(p=>{
      p.hidden=p.dataset.paintKind!==kind||(kind==='patterns'&&p.dataset.paintGroup&&category.value!=='all'&&p.dataset.paintGroup!==category.value);
    });
    palette.scrollTop=0;
  }
  tabs.forEach(tab=>tab.addEventListener('click',()=>showPaints(tab.dataset.kind)));
  category.addEventListener('change',()=>showPaints(paletteKind));
  showPaints('colors');
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
  more.innerHTML='<span aria-hidden="true">＋</span>สี / ลาย';
  more.setAttribute('aria-label','เลือกสีและลวดลายเพิ่มเติม');
  more.setAttribute('aria-controls',panel.id);more.setAttribute('aria-expanded','false');
  quick.appendChild(more);rack.appendChild(quick);
  const close=panel.querySelector('.paintPaletteClose');
  function setOpen(open,returnFocus=false){
    document.body.classList.toggle('ppPaletteOpen',open);
    more.setAttribute('aria-expanded',String(open));
    if(open){
      const selected=paints.find(p=>p.classList.contains('on'));
      if(selected?.dataset.paintKind!==paletteKind){category.value='all';showPaints(selected?.dataset.paintKind||'colors');}
      const target=selected&&!selected.hidden?selected:tabs.find(tab=>tab.dataset.kind===paletteKind);
      target.focus({preventScroll:true});
      if(selected&&!selected.hidden)selected.scrollIntoView({block:'nearest',behavior:'auto'});
    }
    else if(returnFocus)more.focus({preventScroll:true});
  }
  more.addEventListener('click',()=>setOpen(!document.body.classList.contains('ppPaletteOpen')));
  close.addEventListener('click',()=>{
    if(shortLandscape.matches){showPaints('colors');tabs[1].focus({preventScroll:true});}
    else setOpen(false,true);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&document.body.classList.contains('ppPaletteOpen')){event.preventDefault();setOpen(false,true);}
    else if(event.key==='Escape'&&shortLandscape.matches&&paletteKind==='patterns'){
      event.preventDefault();showPaints('colors');tabs[1].focus({preventScroll:true});
    }
  });
  function syncColor(){
    paints.forEach(p=>p.setAttribute('aria-pressed',String(p.classList.contains('on'))));
    favoriteButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(paints[favorites[i][0]].classList.contains('on'))));
    const selected=paints.find(p=>p.classList.contains('on'));
    const custom=selected&&!favorites.some(([index])=>paints[index]===selected);
    more.classList.toggle('hasPaintPreview',Boolean(custom));
    const preview=more.querySelector('span');
    preview.textContent=custom?'':'＋';
    preview.style.backgroundImage=custom&&selected.dataset.paintKind==='patterns'?selected.style.getPropertyValue('--preview'):'';
    preview.style.backgroundColor=custom&&selected.dataset.paintKind==='colors'?selected.style.getPropertyValue('--c'):'';
    more.title=selected?`สีที่เลือก: ${selected.title} · เลือกสีและลายเพิ่มเติม`:'เลือกสีและลายเพิ่มเติม';
  }
  paints.forEach(p=>{
    function afterChoose(){
      syncColor();
      if(portrait.matches&&document.body.classList.contains('ppPaletteOpen'))setOpen(false,true);
      if(shortLandscape.matches&&p.dataset.paintKind==='patterns'){showPaints('colors');tabs[1].focus({preventScroll:true});}
    }
    p.addEventListener('click',afterChoose);
    p.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')afterChoose();});
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
