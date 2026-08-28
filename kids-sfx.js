(()=>{
  const KEY='punpin_sound_v1';
  let enabled=localStorage.getItem(KEY)!=='off';
  let ctx=null,lastFeedback=0,lastClick=0,popupTimer=null;
  const AC=window.AudioContext||window.webkitAudioContext;

  function audio(){
    if(!AC||!enabled)return null;
    if(!ctx)ctx=new AC();
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    return ctx;
  }
  function beep(freq=440,d=.06,type='sine',gain=.035,delay=0){
    const a=audio();if(!a)return;
    const t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();
    o.type=type;o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(gain,t+.008);
    g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02);
  }

  const SFX={
    tap(){beep(520,.045,'sine',.022);beep(720,.035,'sine',.012,.025)},
    correct(){beep(660,.08,'sine',.035);beep(830,.09,'sine',.04,.075);beep(990,.11,'triangle',.035,.15)},
    wrong(){beep(250,.09,'sine',.025);beep(205,.11,'sine',.02,.08)},
    reward(){[523,659,784,1047].forEach((f,i)=>beep(f,.14,i===3?'triangle':'sine',.034,i*.09));setTimeout(()=>beep(1319,.2,'triangle',.025),350)},
    star(){beep(880,.07,'sine',.03);beep(1175,.1,'triangle',.03,.07)},
    set(on){enabled=!!on;localStorage.setItem(KEY,enabled?'on':'off');syncButtons();if(enabled)SFX.tap()},
    toggle(){SFX.set(!enabled)},
    get enabled(){return enabled}
  };
  window.PunPinSFX=SFX;

  function addPopupUI(){
    if(document.getElementById('ppFeedbackStyle'))return;
    const s=document.createElement('style');s.id='ppFeedbackStyle';s.textContent=`
      #ppFeedback{position:fixed;inset:0;z-index:999999;display:grid;place-items:center;pointer-events:none;opacity:0;visibility:hidden;background:rgba(62,48,101,0);transition:opacity .16s ease,visibility .16s ease}
      #ppFeedback.on{opacity:1;visibility:visible;background:rgba(62,48,101,.08)}
      #ppFeedbackCard{position:relative;width:min(84vw,310px);padding:23px 20px 20px;border:5px solid #fff;border-radius:30px;text-align:center;font-family:Mali,'Noto Sans Thai',sans-serif;color:#40365f;box-shadow:0 22px 55px rgba(60,43,105,.25);transform:scale(.62) translateY(18px);opacity:0;overflow:hidden}
      #ppFeedback.on #ppFeedbackCard{animation:ppPopIn .32s cubic-bezier(.2,1.35,.35,1) forwards}
      #ppFeedback.correct #ppFeedbackCard{background:linear-gradient(145deg,#e5fff0,#fff7c9 58%,#f1e8ff)}
      #ppFeedback.wrong #ppFeedbackCard{background:linear-gradient(145deg,#fff3d9,#fff0f5 62%,#f4efff)}
      #ppFeedback.reward #ppFeedbackCard{background:linear-gradient(145deg,#fff3aa,#ffe2ef 50%,#e7edff)}
      .ppFbSpark{position:absolute;font-size:25px;animation:ppSpark 1s ease-in-out infinite alternate}.ppFbSpark.s1{left:18px;top:18px}.ppFbSpark.s2{right:17px;top:24px;animation-delay:.2s}.ppFbSpark.s3{right:38px;bottom:23px;font-size:18px;animation-delay:.4s}.ppFbSpark.s4{left:35px;bottom:25px;font-size:17px;animation-delay:.1s}
      #ppFeedbackEmoji{font-size:68px;line-height:1;margin:2px 0 8px;filter:drop-shadow(0 7px 8px rgba(77,58,115,.13))}
      #ppFeedbackTitle{margin:0;font-size:1.55rem;line-height:1.2;font-weight:700}
      #ppFeedbackText{margin:6px 0 0;font:600 .82rem 'Noto Sans Thai',sans-serif;color:#736a83;line-height:1.5}
      #ppFeedbackStars{height:24px;margin-top:8px;font-size:19px;letter-spacing:3px}
      .ppFbMini{display:inline-block;animation:ppStarHop .5s ease both}.ppFbMini:nth-child(2){animation-delay:.08s}.ppFbMini:nth-child(3){animation-delay:.16s}
      @keyframes ppPopIn{0%{transform:scale(.62) translateY(18px);opacity:0}70%{transform:scale(1.05) translateY(-3px);opacity:1}100%{transform:scale(1) translateY(0);opacity:1}}
      @keyframes ppSpark{to{transform:translateY(-5px) rotate(12deg) scale(1.13)}}
      @keyframes ppStarHop{0%{transform:scale(0) rotate(-25deg)}75%{transform:scale(1.25) rotate(7deg)}100%{transform:scale(1)}}
      @media(max-width:480px){#ppFeedbackCard{width:min(88vw,285px);padding:20px 16px 17px;border-radius:26px}#ppFeedbackEmoji{font-size:60px}#ppFeedbackTitle{font-size:1.35rem}#ppFeedbackText{font-size:.76rem}}
      @media(prefers-reduced-motion:reduce){#ppFeedback.on #ppFeedbackCard,.ppFbSpark,.ppFbMini{animation:none!important;transform:none!important;opacity:1!important}}
    `;document.head.appendChild(s);
    const p=document.createElement('div');p.id='ppFeedback';p.setAttribute('aria-live','polite');
    p.innerHTML='<div id="ppFeedbackCard"><span class="ppFbSpark s1">✨</span><span class="ppFbSpark s2">⭐</span><span class="ppFbSpark s3">✨</span><span class="ppFbSpark s4">🌟</span><div id="ppFeedbackEmoji">⭐</div><h3 id="ppFeedbackTitle">เก่งมาก!</h3><p id="ppFeedbackText">ตอบถูกแล้ว</p><div id="ppFeedbackStars"><span class="ppFbMini">⭐</span><span class="ppFbMini">⭐</span><span class="ppFbMini">⭐</span></div></div>';
    (document.body||document.documentElement).appendChild(p);
  }

  const correctMsgs=[
    ['🌟','เก่งมาก!','ตอบถูกแล้ว ทำต่อได้เลย'],
    ['🎉','เยี่ยมมาก!','หนูทำได้ถูกต้อง'],
    ['🦊','สุดยอดเลย!','PUN&PIN ปรบมือให้หนู'],
    ['⭐','ถูกต้อง!','รับดาวแห่งความเก่งไปเลย']
  ];
  const wrongMsgs=[
    ['💪','เกือบแล้ว!','ลองดูอีกครั้งนะ หนูทำได้'],
    ['🌈','ลองอีกนิดนะ','ค่อย ๆ คิด แล้วเลือกใหม่ได้เลย'],
    ['🐻','ไม่เป็นไรนะ','ลองอีกครั้ง PUN&PIN เชียร์อยู่'],
    ['🧩','อีกครั้งหนึ่ง!','คิดอีกนิดเดียว ใกล้ถูกแล้ว']
  ];
  const rewardMsgs=[
    ['🏆','เยี่ยมมาก!','เรียนครบแล้ว รับรางวัลไปเลย'],
    ['🎊','ภารกิจสำเร็จ!','วันนี้หนูเก่งขึ้นอีกขั้นแล้ว'],
    ['👑','สุดยอดนักเรียน!','สะสมดาวและกลับมาเรียนอีกนะ']
  ];
  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function showPopup(kind='correct',custom={}){
    addPopupUI();
    const box=document.getElementById('ppFeedback');if(!box)return;
    clearTimeout(popupTimer);
    const m=kind==='wrong'?pick(wrongMsgs):kind==='reward'?pick(rewardMsgs):pick(correctMsgs);
    document.getElementById('ppFeedbackEmoji').textContent=custom.emoji||m[0];
    document.getElementById('ppFeedbackTitle').textContent=custom.title||m[1];
    document.getElementById('ppFeedbackText').textContent=custom.text||m[2];
    document.getElementById('ppFeedbackStars').style.display=kind==='wrong'?'none':'block';
    box.className=kind+' on';
    const duration=custom.duration||(kind==='reward'?1750:kind==='wrong'?850:1100);
    popupTimer=setTimeout(()=>{box.classList.remove('on');setTimeout(()=>{box.className=''},180)},duration);
  }
  window.PunPinFeedback={show:showPopup,correct:(o)=>showPopup('correct',o),wrong:(o)=>showPopup('wrong',o),reward:(o)=>showPopup('reward',o)};

  function syncButtons(){document.querySelectorAll('#sndBtn,[data-sound-toggle],.ppSoundToggle').forEach(b=>{b.textContent=enabled?'🔊':'🔇';b.title=enabled?'ปิดเสียง':'เปิดเสียง';b.setAttribute('aria-label',enabled?'ปิดเสียง':'เปิดเสียง')})}
  function isSoundButton(el){return !!el.closest?.('#sndBtn,[data-sound-toggle],.ppSoundToggle')}

  document.addEventListener('pointerdown',e=>{
    audio();const hit=e.target.closest?.('button,a,[role="button"]');if(!hit||isSoundButton(hit))return;
    const now=performance.now();if(now-lastClick>55){lastClick=now;SFX.tap()}
  },{passive:true});
  document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches?.('button,a,[role="button"]')){audio();SFX.tap()}},{passive:true});
  document.addEventListener('click',e=>{const b=e.target.closest?.('#sndBtn,[data-sound-toggle],.ppSoundToggle');if(!b)return;enabled=!enabled;localStorage.setItem(KEY,enabled?'on':'off');setTimeout(syncButtons,0)},true);

  function feedbackFor(el){
    if(!(el instanceof Element))return null;
    const c=el.classList;
    if(c.contains('good')||c.contains('correct'))return'correct';
    if(c.contains('bad')||c.contains('wrong')||c.contains('try'))return'wrong';
    if((c.contains('finish')&&c.contains('on'))||(c.contains('celebrate')&&c.contains('on')))return'reward';
    return null;
  }
  const seen=new WeakMap();
  const mo=new MutationObserver(ms=>{
    for(const m of ms){
      if(m.type!=='attributes'||m.attributeName!=='class')continue;
      const el=m.target,k=feedbackFor(el);if(!k)continue;
      const signature=el.className;if(seen.get(el)===signature)continue;seen.set(el,signature);
      const now=performance.now();if(k!=='reward'&&now-lastFeedback<120)continue;lastFeedback=now;
      SFX[k]();showPopup(k);
    }
  });
  mo.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});

  document.addEventListener('punpin:sfx',e=>{const n=e.detail?.name;if(SFX[n])SFX[n]()});
  document.addEventListener('punpin:feedback',e=>{const d=e.detail||{};showPopup(d.kind||'correct',d)});
  document.addEventListener('DOMContentLoaded',()=>{syncButtons();addPopupUI()});
  syncButtons();
})();
// wired across PUN&PIN pages