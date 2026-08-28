(()=>{
  const KEY='punpin_sound_v1';
  let enabled=localStorage.getItem(KEY)!=='off';
  let ctx=null,lastFeedback=0,lastClick=0;
  const AC=window.AudioContext||window.webkitAudioContext;
  function audio(){if(!AC||!enabled)return null;if(!ctx)ctx=new AC();if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
  function beep(freq=440,d=.06,type='sine',gain=.035,delay=0){const a=audio();if(!a)return;const t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02)}
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
  function syncButtons(){document.querySelectorAll('#sndBtn,[data-sound-toggle],.ppSoundToggle').forEach(b=>{b.textContent=enabled?'🔊':'🔇';b.title=enabled?'ปิดเสียง':'เปิดเสียง';b.setAttribute('aria-label',enabled?'ปิดเสียง':'เปิดเสียง')})}
  function isSoundButton(el){return !!el.closest?.('#sndBtn,[data-sound-toggle],.ppSoundToggle')}
  document.addEventListener('pointerdown',e=>{audio();const hit=e.target.closest?.('button,a,[role="button"]');if(!hit||isSoundButton(hit))return;const now=performance.now();if(now-lastClick>55){lastClick=now;SFX.tap()}},{passive:true});
  document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches?.('button,a,[role="button"]')){audio();SFX.tap()}},{passive:true});
  document.addEventListener('click',e=>{const b=e.target.closest?.('#sndBtn,[data-sound-toggle],.ppSoundToggle');if(!b)return;enabled=!enabled;localStorage.setItem(KEY,enabled?'on':'off');setTimeout(syncButtons,0)},true);
  function feedbackFor(el){if(!(el instanceof Element))return null;const c=el.classList;if(c.contains('good')||c.contains('correct'))return'correct';if(c.contains('bad')||c.contains('wrong')||c.contains('try'))return'wrong';if((c.contains('finish')&&c.contains('on'))||(c.contains('celebrate')&&c.contains('on')))return'reward';return null}
  const seen=new WeakMap();
  const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type!=='attributes'||m.attributeName!=='class')continue;const el=m.target,k=feedbackFor(el);if(!k)continue;const signature=el.className;if(seen.get(el)===signature)continue;seen.set(el,signature);const now=performance.now();if(k!=='reward'&&now-lastFeedback<120)continue;lastFeedback=now;SFX[k]()}});
  mo.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('punpin:sfx',e=>{const n=e.detail?.name;if(SFX[n])SFX[n]()});
  document.addEventListener('DOMContentLoaded',syncButtons);syncButtons();
})();
// wired across PUN&PIN pages