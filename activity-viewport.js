/* Fit activities to the available viewport without replacing their game logic. */
(()=>{
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const grids=new Map(),selectors=new Map();
  let queued=false;
  const text=(el,value)=>{if(el.textContent!==value)el.textContent=value;};
  function schedule(){if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;sync();});}}
  function selectFor(source,label){
    if(!source||selectors.has(source)||source.classList.contains('acSource')||source.id==='dressCats')return;
    if(label!=='ระดับจิ๊กซอว์'){source.classList.add('acInlineCards');return;}
    const field=document.createElement('label');field.className='avSelect';
    const caption=document.createElement('span');caption.textContent=label;
    const select=document.createElement('select');select.setAttribute('aria-label',label);
    field.append(caption,select);source.before(field);source.classList.add('avSelectSource');
    const marker=document.createComment('activity filter position');field.before(marker);
    select.addEventListener('change',()=>{
      const button=[...source.children].filter(x=>x.tagName==='BUTTON')[Number(select.value)];
      button?.click();schedule();
    });
    selectors.set(source,{field,select,marker});
  }
  function syncSelects(){
    selectors.forEach(({field,select,marker},source)=>{
      if(!source.isConnected){field.remove();marker.remove();selectors.delete(source);return;}
      const buttons=[...source.children].filter(x=>x.tagName==='BUTTON');
      const labels=buttons.map(b=>b.textContent.trim().replace(/\s+/g,' '));
      const signature=labels.join('|');
      if(select.dataset.signature!==signature){
        select.replaceChildren(...labels.map((label,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=label;return option;}));
        select.dataset.signature=signature;
      }
      const selected=buttons.findIndex(b=>b.classList.contains('on')||b.getAttribute('aria-pressed')==='true');
      if(selected>=0)select.value=String(selected);
      field.hidden=!buttons.length||source.style.display==='none';
    });
  }
  function headerFilters(){
    if(!document.body.classList.contains('ppLessonViewport'))return;
    const bar=$('.top');if(!bar)return;
    let dock=bar.querySelector('.avHeaderFilters');
    if(!dock){dock=document.createElement('div');dock.className='avHeaderFilters';bar.appendChild(dock);}
    const landscape=matchMedia('(max-height:500px) and (orientation:landscape)').matches;
    selectors.forEach(({field,marker})=>{
      if(landscape&&!field.hidden){if(field.parentElement!==dock)dock.appendChild(field);}
      else if(marker.isConnected&&field.previousSibling!==marker)marker.after(field);
    });
    dock.hidden=!landscape||!dock.children.length;
  }
  function paginate(grid,kind){
    if(!grid||grids.has(grid))return;
    grid.classList.add('avPaginated');grid.dataset.avKind=kind;
    const pager=document.createElement('nav');pager.className='avPager';pager.setAttribute('aria-label','เปลี่ยนหน้ารายการ');
    pager.innerHTML='<button type="button" aria-label="หน้าก่อนหน้า">‹ ก่อนหน้า</button><span role="status" aria-live="polite"></span><button type="button" aria-label="หน้าถัดไป">ถัดไป ›</button>';
    grid.after(pager);
    const state={grid,pager,page:0,perPage:1,signature:'',kind};grids.set(grid,state);
    const[previous,next]=pager.querySelectorAll('button');
    previous.addEventListener('click',()=>{state.page--;layoutGrid(state);});
    next.addEventListener('click',()=>{state.page++;layoutGrid(state);});
    new ResizeObserver(schedule).observe(grid);
    new MutationObserver(()=>{state.page=0;schedule();}).observe(grid,{childList:true});
    new MutationObserver(schedule).observe(grid,{attributes:true,attributeFilter:['style']});
    if(kind==='letter')new MutationObserver(records=>{
      const playing=records.map(r=>r.target).find(tile=>tile.classList.contains('playing'));
      if(!playing)return;
      const index=[...grid.children].indexOf(playing),page=Math.floor(index/state.perPage);
      if(index>=0&&page!==state.page){state.page=page;layoutGrid(state);}
    }).observe(grid,{subtree:true,attributes:true,attributeFilter:['class']});
  }
  function layoutGrid(state){
    const{grid,pager,kind}=state;
    if(!grid.isConnected){pager.remove();grids.delete(grid);return;}
    const items=[...grid.children],absent=grid.style.display==='none'||!items.length;
    grid.classList.toggle('avCatalogHidden',absent);
    pager.hidden=true;pager.style.setProperty('display','none','important');
    items.forEach(item=>item.classList.remove('avPageHidden'));
    state.page=0;state.perPage=Math.max(1,items.length);
    if(absent||!grid.getClientRects().length)return;
    const minWidth={picture:130,letter:100,word:140,sentence:260,story:150,swatch:65,category:135,vowel:130}[kind]||130;
    const minHeight={picture:180,letter:115,word:180,sentence:190,story:185,swatch:90,category:185,vowel:145}[kind]||160;
    const cols=Math.max(1,Math.min(kind==='swatch'?6:5,Math.floor((grid.clientWidth+8)/(minWidth+8))));
    const values={'grid-template-columns':`repeat(${cols},minmax(0,1fr))`,'grid-template-rows':'none','grid-auto-rows':`${minHeight}px`,'align-content':'start','overflow-y':'auto','overflow-x':'hidden','overscroll-behavior':'contain'};
    for(const[key,value]of Object.entries(values))if(grid.style.getPropertyValue(key)!==value||grid.style.getPropertyPriority(key)!=='important')grid.style.setProperty(key,value,'important');
  }
  function fitSquare(element,width,height){
    if(!element||!element.getClientRects().length)return;
    const side=Math.max(0,Math.floor(Math.min(width,height)));
    if(element.style.width!==`${side}px`)element.style.width=`${side}px`;
    if(element.style.height!==`${side}px`)element.style.height=`${side}px`;
  }
  function fitBoards(){
    const dots=$('#dotsBoard');
    if(dots?.getClientRects().length)fitSquare(dots.querySelector('.paintWrap'),dots.clientWidth-14,dots.clientHeight-14);
    const puzzle=$('.puzzleArea');
    if(puzzle?.getClientRects().length){
      const portrait=matchMedia('(max-width:760px) and (orientation:portrait)').matches;
      fitSquare($('#puzzleBoard'),portrait?puzzle.clientWidth:puzzle.clientWidth-208,portrait?puzzle.clientHeight-176:puzzle.clientHeight);
    }
    const memory=$('#memGrid');
    if(memory?.getClientRects().length){
      const count=memory.children.length,parent=memory.parentElement;
      const w=parent.clientWidth-20,h=parent.clientHeight-70;
      const landscape=w>h*1.3;
      const cols=count<=12?(landscape?4:3):(landscape?6:4),rows=Math.ceil(count/cols),gap=6;
      const side=Math.floor(Math.min((w-gap*(cols-1))/cols,(h-gap*(rows-1))/rows));
      memory.style.setProperty('--av-mem-cols',String(cols));memory.style.setProperty('--av-mem-rows',String(rows));
      const width=`${side*cols+gap*(cols-1)}px`,height=`${side*rows+gap*(rows-1)}px`;
      if(memory.style.width!==width)memory.style.width=width;
      if(memory.style.height!==height)memory.style.height=height;
    }
  }
  function setupDots(){
    const palette=$('#dotsPalette');if(!palette||palette.dataset.avReady)return;
    if(!palette.children.length)return;
    palette.dataset.avReady='true';
    const paints=[...palette.children],rack=palette.parentElement;
    const quick=document.createElement('div');quick.className='avDotsColors';
    const favorites=[0,5,9,17,24,26];
    favorites.forEach(index=>{
      const button=document.createElement('button');button.type='button';button.className='avDotColor';
      button.style.setProperty('--dot-color',paints[index].style.getPropertyValue('--c'));
      button.setAttribute('aria-label',`เลือกสี ${paints[index].style.getPropertyValue('--c')}`);
      button.addEventListener('click',()=>paints[index].click());quick.appendChild(button);
    });
    const more=document.createElement('button');more.type='button';more.className='avDotMore';more.innerHTML='<span aria-hidden="true">＋</span>สีอื่น';more.setAttribute('aria-label','เลือกสีลากเส้นเพิ่มเติม');quick.appendChild(more);rack.appendChild(quick);
    const dialog=document.createElement('dialog');dialog.className='avHelpDialog avDotsDialog';dialog.setAttribute('aria-label','เลือกสีลากเส้น');dialog.innerHTML='<div class="avHelpHeading"><strong>เลือกสีลากเส้น</strong><button type="button">ปิด</button></div>';
    dialog.appendChild(palette);document.body.appendChild(dialog);
    more.addEventListener('click',()=>dialog.showModal());dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>more.focus({preventScroll:true}));
    paints.forEach(p=>{p.setAttribute('role','button');p.tabIndex=0;p.setAttribute('aria-label',`เลือกสี ${p.style.getPropertyValue('--c')}`);p.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();p.click();}});});
    function selected(){
      paints.forEach(p=>p.setAttribute('aria-pressed',String(p.classList.contains('on'))));
      [...quick.querySelectorAll('.avDotColor')].forEach((button,i)=>button.setAttribute('aria-pressed',String(paints[favorites[i]].classList.contains('on'))));
    }
    selected();
    palette.addEventListener('click',e=>{
      const crayon=e.target.closest('.crayon');if(!crayon)return;
      selected();if(dialog.open)dialog.close();
    });
  }
  function help(){
    const bar=$('.top');if(!bar||$('#avHelp'))return;
    const notes=$$('.hero,.intro,.tips,.note,.privacy,.hint,.vStageNote,.parentNote');
    if(!notes.length)return;
    const button=document.createElement('button');button.id='avHelp';button.type='button';button.className='avHelp';button.textContent='?';button.setAttribute('aria-label','วิธีเล่นและตั้งค่า');bar.appendChild(button);
    const dialog=document.createElement('dialog');dialog.className='avHelpDialog';dialog.setAttribute('aria-label','วิธีเล่นและตั้งค่า');
    const heading=document.createElement('div');heading.className='avHelpHeading';heading.innerHTML='<strong>วิธีเล่น</strong><button type="button" aria-label="ปิดวิธีเล่น">ปิด</button>';
    dialog.appendChild(heading);
    notes.forEach(note=>{const p=document.createElement('p');p.textContent=note.textContent.trim();dialog.appendChild(p);});
    const motion=bar.querySelector('.ppMotion');if(motion)dialog.appendChild(motion);
    document.body.appendChild(dialog);
    button.addEventListener('click',()=>dialog.showModal());
    heading.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>button.focus({preventScroll:true}));
  }
  function sync(){
    if($('#home')){
      const active=$$('main>section').find(el=>el.id!=='home'&&el.id!=='studio'&&el.style.display==='block');
      document.body.classList.toggle('ppActivity',Boolean(active));
      document.body.dataset.avActivity=active?.id||'';
      $$('#jigsawGame,#dotsGame,#memoryGame').forEach(section=>{
        const play=section.querySelector('#jigsawPlay,#dotsPlay,#memPlay');
        section.classList.toggle('avPlaying',play?.style.display==='block');
      });
      const catalogs=[['#gallery','picture'],['#jigsawGallery','picture'],['#dotsGallery','picture'],['#thaiGrid','letter'],['#engGrid','letter'],['#phonicsGrid','letter'],['#dressOptions','swatch']];
      catalogs.forEach(([selector,kind])=>paginate($(selector),kind));
      [['#cats','หมวดภาพ'],['#jigsawCats','หมวดภาพ'],['#dotsCats','หมวดภาพ'],['#memCats','หมวดภาพ'],['#dressCats','หมวดของแต่งตัว'],['#phonicsWeeks','เลือกสัปดาห์'],['#jigsawGame .difficulty','ระดับจิ๊กซอว์']].forEach(([selector,label])=>selectFor($(selector),label));
      setupDots();
    }else{
      document.body.classList.add('ppLessonViewport');
      const name=location.pathname.split('/').pop();document.body.dataset.avPage=name.replace('.html','');
      [['.vKCatGrid','category'],['.vCategoryGrid','category'],['#grid',name==='vocabulary.html'?'word':name==='thai-vowels.html'?'vowel':'sentence'],['#library','story']].forEach(([selector,kind])=>paginate($(selector),kind));
      [['.path','เลือกบท'],['#tabs','เลือกชุดฝึก'],['#filters','เลือกหมวด'],['#cats','เลือกหมวด'],['#levels','เลือกระดับ'],['#vStageBar','เลือกด่าน'],['.tabs','เลือกบท']].forEach(([selector,label])=>selectFor($(selector),label));
      const reading=$('#quizBox');document.body.classList.toggle('avReadingQuiz',Boolean(reading?.classList.contains('on')));
      const reader=$('#reader');document.body.classList.toggle('avStoryReading',Boolean(reader?.classList.contains('on')));
      if(name==='vocabulary.html'){
        document.body.classList.toggle('avVocabularyStage',Boolean($('#vStageBar')));
        const cats=$('.vKCatGrid,.vCategoryGrid');document.body.classList.toggle('avVocabularyCategories',Boolean(cats&&cats.style.display!=='none'));
      }
      help();
    }
    syncSelects();headerFilters();grids.forEach(layoutGrid);fitBoards();
  }
  function boot(){
    const wrap=$('.wrap');if(!wrap)return;
    const actions=$('#dressGame .dressActions');if(actions)$('#dressGame .mathBar').appendChild(actions);
    new MutationObserver(schedule).observe(wrap,{childList:true,subtree:true});
    $$('main>section,#jigsawPlay,#dotsPlay,#memPlay,#reader,#quizBox,#learnArea,#quiz,#lesson,#game,#finish').forEach(el=>new MutationObserver(schedule).observe(el,{attributes:true,attributeFilter:['style','class']}));
    new ResizeObserver(schedule).observe(wrap);window.addEventListener('resize',schedule);
    schedule();setTimeout(schedule,150);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
