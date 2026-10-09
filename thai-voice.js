/* Prefer Microsoft Premwadee for Thai speech across every activity. */
(()=>{'use strict';const synth=window.speechSynthesis;if(!synth||window.PunPinThaiVoice)return;
const originalSpeak=synth.speak.bind(synth),originalCancel=synth.cancel.bind(synth);let generation=0,pending=new Set();
const thai=u=>/^th(?:-|_|$)/i.test(u.lang||'')||(!u.lang&&/[ก-๙]/.test(u.text||''));
function preferred(){const voices=synth.getVoices().filter(v=>/^th(?:-|_|$)/i.test(v.lang));return voices.find(v=>/premwadee|เปรมวดี/i.test(v.name))||null;}
function apply(u){const voice=preferred();if(voice){u.voice=voice;u.lang='th-TH';u.pitch=1;}return voice;}
synth.speak=function(u){if(!thai(u))return originalSpeak(u);if(apply(u)||synth.getVoices().length)return originalSpeak(u);
const token=generation;let timer;const ready=()=>{if(!synth.getVoices().length)return;finish();};const finish=()=>{clearTimeout(timer);synth.removeEventListener('voiceschanged',ready);pending.delete(cleanup);if(token!==generation)return;apply(u);originalSpeak(u);};const cleanup=()=>{clearTimeout(timer);synth.removeEventListener('voiceschanged',ready);};pending.add(cleanup);synth.addEventListener('voiceschanged',ready);timer=setTimeout(finish,600);
};
synth.cancel=function(){generation++;pending.forEach(f=>f());pending.clear();return originalCancel();};
window.PunPinThaiVoice={preferred:()=>preferred()?.name||null};synth.getVoices();
})();
