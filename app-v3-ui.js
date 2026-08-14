(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const childName='น้องปัน';

/* ---------------- styles ---------------- */
const css=`
.wrap{padding-bottom:96px!important}
.v5-avatar{display:flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:5px 14px 5px 5px;box-shadow:0 5px 14px #254b8c1c}
.v5-avatar .face{width:38px;height:38px;flex:none;border-radius:50%;background:linear-gradient(135deg,#ffd34f,#ff8c4c);display:grid;place-items:center;font-size:19px}
.v5-avatar .meta{display:flex;flex-direction:column;gap:3px;line-height:1}
.v5-avatar .name{font:700 12px 'Noto Sans Thai';white-space:nowrap}
.v5-avatar .lvlrow{display:flex;align-items:center;gap:5px}
.v5-avatar .lvl{background:#e8f4ff;color:#2589ff;border-radius:8px;padding:1px 6px;font-size:10px;font-weight:700}
.v5-avatar .xpwrap{width:64px}
.v5-avatar .xpwrap .bar{margin:0}
.v5-icons{display:flex!important;align-items:center;gap:7px}
.v5-icon-btn{border:0;border-radius:50%;width:42px;height:42px;cursor:pointer;font-size:18px;box-shadow:0 5px 14px #254b8c20;display:grid;place-items:center}
.v5-icon-btn.gift{background:linear-gradient(#ffd8e7,#ffb7d4)}
.v5-icon-btn.trophy{background:linear-gradient(#fff1a9,#ffd76a)}
.v5-icon-btn.parent{background:linear-gradient(#cfe8ff,#a6cfff)}
.v5-icon-btn.gear{background:linear-gradient(#e7e7ef,#cfd0dd)}
.v5-coin{display:inline-flex!important;align-items:center;gap:4px}
.v5-grid{display:grid;grid-template-columns:250px 1fr 250px;gap:16px;margin-top:4px}
.v5-missions,.v5-rewards{background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 30px #3652a122;display:flex;flex-direction:column;gap:12px}
.v5-card-head{font-weight:700;font-size:15px;background:linear-gradient(90deg,#ffe27a,#ffc24f);padding:9px 12px;border-radius:16px;text-align:center}
.v5-mission-list{display:flex;flex-direction:column;gap:9px}
.v5-mission{background:#f7f3ff;border-radius:16px;padding:10px 12px}
.v5-mission.done{background:#e3fbe9}
.v5-mission-top{display:flex;justify-content:space-between;gap:6px;font:700 12px 'Noto Sans Thai';align-items:center}
.v5-mission-top span{line-height:1.3}
.v5-mission small{display:block;margin-top:4px;color:#8b84ab;font-family:'Noto Sans Thai'}
.v5-chest{background:linear-gradient(135deg,#fff4d6,#ffe1b0);border-radius:18px;padding:12px}
.v5-chest-top{display:flex;justify-content:space-between;font:700 12px 'Noto Sans Thai';margin-bottom:2px}
.v5-reward-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.v5-reward{border:0;border-radius:18px;background:#f6f2ff;padding:12px 6px;text-align:center;cursor:pointer;box-shadow:0 6px 0 #d8d0f5;font-family:inherit}
.v5-reward:active{transform:translateY(4px);box-shadow:0 1px 0 #d8d0f5}
.v5-reward-icon{display:block;font-size:32px;margin-bottom:4px}
.v5-reward b{font-size:12px}
.v5-reward.owned{background:#dffbe6;box-shadow:0 6px 0 #b7ecc4;color:#1f8a4c}
.v5-reward.locked{opacity:.5;filter:grayscale(.5)}
.v5-shop-btn{border:0;border-radius:20px;padding:12px;background:linear-gradient(90deg,#ff6eb0,#ff9d5c);color:#fff;font-weight:700;cursor:pointer;box-shadow:0 6px 0 #d1447f}
.v5-shop-btn:active{transform:translateY(4px);box-shadow:0 1px 0 #d1447f}
.v5-world{position:relative;min-height:420px;border-radius:34px;overflow:hidden;background:linear-gradient(#3ebdff 0 44%,#a8ecff 45% 62%,#b8f18f 63%);border:5px solid #fff;box-shadow:0 16px 0 #1376bc45,0 24px 48px #14578c38}
.v5-cloud{position:absolute;font-size:56px;opacity:.9}
.v5-balloon{position:absolute;right:14%;top:6%;font-size:52px;animation:v5float 4s ease-in-out infinite}
.v5-castle{position:absolute;left:50%;top:10%;transform:translateX(-50%);font-size:82px}
.v5-island{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);width:74%;height:170px;border-radius:50%;background:radial-gradient(ellipse at 50% 28%,#83e66d 0 44%,#3db849 45% 54%,#7d5a3e 55% 64%,#5e402e 65%);box-shadow:0 20px 20px #1a60974a}
.v5-kid{position:absolute;bottom:34px;font-size:98px;display:flex;flex-direction:column;align-items:center;gap:6px;filter:drop-shadow(0 12px 8px #1d4c7f45);animation:v5bob 3s ease-in-out infinite}
.v5-boy{left:2%}
.v5-girl{right:0}
.v5-bubble{order:-1;background:#fff;color:#574c8d;font:600 11px/1.4 'Noto Sans Thai';padding:7px 10px;border-radius:14px;max-width:150px;text-align:center;box-shadow:0 6px 14px #1a609722}
.v5-panda{position:absolute;left:16%;bottom:26px;font-size:54px;z-index:3}
.v5-play{position:absolute;left:50%;bottom:98px;transform:translateX(-50%);width:106px;height:106px;border-radius:50%;border:8px solid #fff7a4;background:linear-gradient(#ffc72d,#ff9d17);box-shadow:0 10px 0 #d6780c;color:#fff;font-size:44px;cursor:pointer;display:grid;place-items:center;z-index:4}
.v5-play:active{transform:translateX(-50%) translateY(8px);box-shadow:0 2px 0 #d6780c}
.v5-world-title{position:absolute;left:50%;bottom:52px;transform:translateX(-50%);background:#fff;padding:6px 16px;border-radius:14px;font-weight:700;font-size:13px;box-shadow:0 6px 14px #1a609722;z-index:4}
@keyframes v5bob{50%{transform:translateY(-9px) rotate(2deg)}}
@keyframes v5float{50%{transform:translateY(-14px)}}
.game{position:relative}
.v5-ribbon{position:absolute;top:9px;left:-7px;background:#ff5b7a;color:#fff;font:700 11px 'Noto Sans Thai';padding:4px 10px;border-radius:8px;box-shadow:0 4px 8px #0002;transform:rotate(-8deg);z-index:2}
.v5-gallery{margin-top:20px;background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 30px #3652a122}
.v5-gallery h3{margin:0 0 12px}
.v5-gallery-row{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
.v5-gcard{flex:0 0 140px;border:0;border-radius:20px;background:#f7f8ff;padding:10px;cursor:pointer;text-align:center;box-shadow:0 8px 18px #3652a11c;font-family:inherit}
.v5-gthumb{width:100%;aspect-ratio:1;border-radius:14px;background:#fff;display:grid;place-items:center;font-size:42px;overflow:hidden}
.v5-gthumb img{width:88%;height:88%;object-fit:contain}
.v5-gcard small{display:block;margin-top:7px;font-family:'Noto Sans Thai';color:#7e76a2}
.v5-mascot{position:fixed;bottom:92px;display:flex;align-items:flex-end;gap:8px;z-index:15;max-width:230px}
.v5-mascot.left{left:16px}
.v5-mascot.right{right:16px;flex-direction:row-reverse}
.v5-mascot .who{font-size:54px;filter:drop-shadow(0 8px 6px #0003)}
.v5-mascot .say{background:#fff;color:#4a4470;font:600 12px/1.4 'Noto Sans Thai';padding:9px 12px;border-radius:16px;box-shadow:0 8px 20px #0002}
body:not(.v5-home) .v5-mascot{display:none}
.v5-navbar{position:fixed;left:0;right:0;bottom:0;z-index:30;background:#fff;display:flex;justify-content:space-around;align-items:center;padding:8px 6px calc(6px + env(safe-area-inset-bottom));box-shadow:0 -8px 24px #3652a125}
.v5-nav-btn{border:0;background:none;display:flex;flex-direction:column;align-items:center;gap:2px;font:700 10px 'Noto Sans Thai';color:#8b84ab;cursor:pointer;position:relative;padding:5px 7px;border-radius:12px}
.v5-nav-btn .ic{font-size:20px}
.v5-nav-btn.active{color:#735cff;background:#f1edff}
.v5-nav-dot{position:absolute;top:1px;right:9px;width:8px;height:8px;background:#ff4f6e;border-radius:50%;border:2px solid #fff}
.v5-modal-root{position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;padding:16px}
.v5-modal-root.open{display:flex}
.v5-modal-backdrop{position:absolute;inset:0;background:#2b2350aa;backdrop-filter:blur(2px)}
.v5-modal{position:relative;background:#fff;border-radius:26px;padding:22px;max-width:380px;width:100%;box-shadow:0 30px 60px #00000040;font-family:'Noto Sans Thai'}
.v5-modal-close{position:absolute;top:12px;right:12px;border:0;background:#f1edff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px}
.v5-modal-title{margin:0 26px 12px 0;font-family:Mali}
.v5-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.v5-stat-grid>div{background:#f7f8ff;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:4px;font-size:12px}
.v5-stat-grid>div b{font:700 18px Mali;color:#3b2f80}
.v5-modal .action{display:block;width:100%;margin-top:10px;text-align:center}
.v5-toast{position:fixed;left:50%;bottom:112px;transform:translate(-50%,20px);background:#2b2350;color:#fff;padding:12px 20px;border-radius:16px;font:700 13px/1.4 'Noto Sans Thai';box-shadow:0 14px 30px #00000040;opacity:0;pointer-events:none;transition:.35s;z-index:110;max-width:80vw;text-align:center}
.v5-toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:980px){.v5-grid{grid-template-columns:1fr}.v5-world{order:-1}}
@media(max-width:700px){.v5-avatar .meta{display:none}.v5-avatar{padding:5px}}
@media(max-width:560px){
 .top{flex-wrap:wrap;justify-content:center;row-gap:8px}
 .logo{flex:0 0 100%;text-align:center}
 .v5-avatar{order:1}
 .v5-icons{order:2;margin-left:0!important}
 .v5-world{min-height:320px}.v5-kid{font-size:68px}.v5-play{width:82px;height:82px;font-size:32px;bottom:66px}.v5-panda{font-size:38px;left:12%;bottom:22px}.v5-castle{font-size:60px}.v5-mascot{display:none}.v5-nav-btn{font-size:9px}.v5-nav-btn .ic{font-size:18px}
}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
document.body.classList.add('v5-home');

/* ---------------- data + storage helpers ---------------- */
const todayStr=new Date().toISOString().slice(0,10);
const loadJSON=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch{return d}};
const saveJSON=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

let missionState=loadJSON('pp_missions',null);
if(!missionState||missionState.date!==todayStr){missionState={date:todayStr,color:0,math:0,puzzle:0};saveJSON('pp_missions',missionState)}

const MISSION_DEFS=[
 {key:'color',icon:'🎨',label:'ระบายสีให้เสร็จ 1 รูป',goal:1,star:10},
 {key:'math',icon:'🔢',label:'ตอบโจทย์คณิต 5 ข้อ',goal:5,star:15},
 {key:'puzzle',icon:'🧩',label:'เล่นจิ๊กซอว์ 1 ครั้ง',goal:1,star:10},
];
const REWARDS=[
 {id:'panda',icon:'🐼',name:'เพื่อนแพนด้า',price:50},
 {id:'hero',icon:'🦸',name:'ชุดฮีโร่',price:100},
 {id:'crown',icon:'👑',name:'มงกุฎทอง',price:150},
 {id:'wings',icon:'👼',name:'ปีกนางฟ้า',price:200},
 {id:'shades',icon:'🕶️',name:'แว่นเท่',price:300},
 {id:'rocket',icon:'🚀',name:'จรวดเดินทาง',price:500},
];
const ownedRewards=()=>loadJSON('pp_owned',[]);

let streakVal=1;
function updateStreak(){
 const last=localStorage.getItem('pp_lastVisit');
 streakVal=+(localStorage.getItem('pp_streak')||1);
 if(last!==todayStr){
  const y=new Date(Date.now()-86400000).toISOString().slice(0,10);
  streakVal=(last===y)?streakVal+1:1;
  localStorage.setItem('pp_streak',streakVal);
  localStorage.setItem('pp_lastVisit',todayStr);
 }
 const el=$('#streak');
 if(el)el.textContent=streakVal;
}

/* ---------------- header surgery ---------------- */
const top=$('.top');
const logo=top.querySelector('.logo');
const stats0=top.querySelectorAll('.stat');
const starStat=stats0[0];
const push=top.querySelector('.push');
const soundBtn=$('#sound');

const avatar=document.createElement('div');
avatar.className='v5-avatar';
avatar.innerHTML=`<span class="face">🧒</span><span class="meta"><span class="name">${childName}</span><span class="lvlrow"><span class="lvl" id="v5Level">Lv.1</span><span class="xpwrap"><span class="bar"><i id="v5XpBar" style="width:0%"></i></span></span></span></span>`;
logo.insertAdjacentElement('afterend',avatar);

const coinStat=document.createElement('span');
coinStat.className='stat hide v5-coin';
coinStat.innerHTML=`🪙 <b id="v5Coins">0</b>`;
starStat.insertAdjacentElement('afterend',coinStat);

push.classList.add('v5-icons');
const giftBtn=document.createElement('button');
giftBtn.className='v5-icon-btn gift';giftBtn.title='ห้องรางวัล';giftBtn.textContent='🎁';
giftBtn.onclick=()=>{window.home();setTimeout(()=>scrollToId('v5Rewards'),60)};
const trophyBtn=document.createElement('button');
trophyBtn.className='v5-icon-btn trophy';trophyBtn.title='ภารกิจวันนี้';trophyBtn.textContent='🏆';
trophyBtn.onclick=()=>{window.home();setTimeout(()=>scrollToId('v5Missions'),60)};
const parentBtn=document.createElement('button');
parentBtn.className='v5-icon-btn parent';parentBtn.title='สำหรับผู้ปกครอง';parentBtn.textContent='👪';
parentBtn.onclick=openParentModal;
const gearBtn=document.createElement('button');
gearBtn.className='v5-icon-btn gear';gearBtn.title='ตั้งค่า';gearBtn.textContent='⚙️';
gearBtn.onclick=openSettingsModal;
push.append(giftBtn,trophyBtn,parentBtn,gearBtn,soundBtn);

/* ---------------- home rebuild ---------------- */
const GAMES=[
 {id:'paint',icon:'🎨',name:'ระบายสี',desc:'ปลุกสีสันจินตนาการ',ribbon:'ใหม่!'},
 {id:'trace',icon:'✏️',name:'ลากเส้นตามรอย',desc:'ฝึกกล้ามเนื้อมือ',ribbon:'ใหม่!'},
 {id:'math',icon:'🔢',name:'คณิตศาสตร์',desc:'บวก ลบ สนุก ๆ'},
 {id:'puzzle',icon:'🧩',name:'จิ๊กซอว์',desc:'ต่อภาพฝึกสมอง'},
 {id:'dress',icon:'👗',name:'แต่งตัว',desc:'สร้างลุคสุดน่ารัก'},
 {id:'free',icon:'🖼️',name:'วาดรูปอิสระ',desc:'จินตนาการไร้ขีดจำกัด'},
];
const GALLERY=[
 {id:'paint',label:'ไดโนเสาร์',thumb:`<img src="assets/coloring/dinosaur.svg" alt="ไดโนเสาร์">`},
 {id:'trace',label:'ฝึกลากเส้น A',thumb:`<b style="font-family:Mali;font-size:52px">A</b>`},
 {id:'math',label:'บวกลบสนุก',thumb:`<b style="font-size:19px">3+2=?</b>`},
 {id:'puzzle',label:'จิ๊กซอว์แพนด้า',thumb:`🧩`},
 {id:'dress',label:'แต่งตัวสวย',thumb:`👗`},
 {id:'free',label:'วาดรูปอิสระ',thumb:`<img src="assets/coloring/car.svg" alt="รถยนต์">`},
];

const home=$('#home');
home.innerHTML=`
<div class="v5-grid">
 <aside class="v5-missions" id="v5Missions">
  <div class="v5-card-head">🏆 ภารกิจวันนี้</div>
  <div class="v5-mission-list" id="v5MissionList"></div>
  <div class="v5-chest">
   <div class="v5-chest-top"><span>🎁 กล่องรางวัล</span><b id="v5ChestNum">0 / 500</b></div>
   <div class="bar"><i id="v5ChestBar" style="width:0%"></i></div>
  </div>
 </aside>
 <div class="v5-world">
  <div class="v5-cloud" style="left:5%;top:7%">☁️</div>
  <div class="v5-cloud" style="right:6%;top:15%;transform:scale(.75)">☁️</div>
  <div class="v5-balloon">🎈</div>
  <div class="v5-castle">🏰</div>
  <div class="v5-island"></div>
  <div class="v5-kid v5-boy"><span class="v5-bubble">สวัสดีครับ! มาเล่นด้วยกันเถอะ</span>👦🏻</div>
  <div class="v5-kid v5-girl"><span class="v5-bubble">วันนี้เราจะไปเล่นอะไรกันดีนะ?</span>👧🏻</div>
  <div class="v5-panda">🐼</div>
  <button class="v5-play" id="v5PlayBtn">▶</button>
  <div class="v5-world-title">โลกแห่งการเรียนรู้</div>
 </div>
 <aside class="v5-rewards" id="v5Rewards">
  <div class="v5-card-head">⭐ รางวัลสะสม</div>
  <div class="v5-reward-grid" id="v5RewardGrid"></div>
  <button class="v5-shop-btn" id="v5ShopBtn">ไปที่ห้องรางวัล 🎁</button>
 </aside>
</div>
<h2 class="title" id="gamesTitle">🎮 วันนี้อยากเล่นอะไร?</h2>
<div class="games">${GAMES.map(g=>`<button class="game" onclick="openGame('${g.id}')">${g.ribbon?`<span class="v5-ribbon">${g.ribbon}</span>`:''}<span class="pic">${g.icon}</span><b>${g.name}</b><small>${g.desc}</small></button>`).join('')}</div>
<div class="v5-gallery">
 <h3>🖼️ ผลงานและกิจกรรมของหนู</h3>
 <div class="v5-gallery-row">${GALLERY.map(g=>`<button class="v5-gcard" onclick="openGame('${g.id}')"><span class="v5-gthumb">${g.thumb}</span><small>${g.label}</small></button>`).join('')}</div>
</div>`;

$('#v5PlayBtn').onclick=()=>document.querySelector('.games').scrollIntoView({behavior:'smooth'});
$('#v5ShopBtn').onclick=()=>scrollToId('v5Rewards');

function scrollToId(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}

/* ---------------- render functions ---------------- */
function renderMissions(){
 const list=$('#v5MissionList');if(!list)return;
 list.innerHTML=MISSION_DEFS.map(m=>{
  const val=Math.min(missionState[m.key]||0,m.goal);
  const pct=Math.round(val/m.goal*100);
  const done=val>=m.goal;
  return `<div class="v5-mission ${done?'done':''}">
   <div class="v5-mission-top"><span>${m.icon} ${m.label}</span><b>⭐${m.star}</b></div>
   <div class="bar"><i style="width:${pct}%"></i></div>
   <small>${val}/${m.goal}${done?' ✓ สำเร็จแล้ว':''}</small>
  </div>`;
 }).join('');
}
function renderChest(){
 const goal=500;
 const val=stars>0&&stars%goal===0?goal:stars%goal;
 const pct=Math.round(val/goal*100);
 const bar=$('#v5ChestBar'),num=$('#v5ChestNum');
 if(bar)bar.style.width=pct+'%';
 if(num)num.textContent=val+' / '+goal;
}
function renderRewards(){
 const grid=$('#v5RewardGrid');if(!grid)return;
 const owned=ownedRewards();
 grid.innerHTML=REWARDS.map(r=>{
  const isOwned=owned.includes(r.id);
  const can=stars>=r.price;
  return `<button class="v5-reward ${isOwned?'owned':''} ${!isOwned&&!can?'locked':''}" data-id="${r.id}">
   <span class="v5-reward-icon">${r.icon}</span><b>${isOwned?'✓ ได้แล้ว':'⭐ '+r.price}</b>
  </button>`;
 }).join('');
 grid.querySelectorAll('.v5-reward').forEach(btn=>btn.onclick=()=>buyReward(btn.dataset.id));
}
function buyReward(id){
 const r=REWARDS.find(x=>x.id===id);if(!r)return;
 const owned=ownedRewards();
 if(owned.includes(id)){showToast('มี'+r.icon+r.name+'อยู่แล้วนะ!');return}
 if(stars<r.price){showToast('ดาวไม่พอ ต้องเก็บอีก '+(r.price-stars)+' ดวง ⭐');return}
 stars-=r.price;localStorage.pp_stars=stars;
 owned.push(id);saveJSON('pp_owned',owned);
 stats();
 showToast('ปลดล็อก '+r.icon+' '+r.name+' สำเร็จแล้ว!');
}
function renderHeaderExtras(){
 const lvl=1+Math.floor(stars/20),xp=stars%20,xpMax=20;
 const lvlEl=$('#v5Level'),xpBar=$('#v5XpBar'),coinEl=$('#v5Coins');
 if(lvlEl)lvlEl.textContent='Lv.'+lvl;
 if(xpBar)xpBar.style.width=Math.round(xp/xpMax*100)+'%';
 if(coinEl)coinEl.textContent=(stars*5).toLocaleString('th-TH');
}

/* patch window.stats so header/mission/reward panels stay in sync with star count */
const origStats=window.stats;
window.stats=function(){origStats();renderHeaderExtras();renderChest();renderRewards()};

window.PunPinV2={
 mission(kind){
  if(!(kind in missionState))return;
  const def=MISSION_DEFS.find(d=>d.key===kind);
  if(!def)return;
  if(missionState[kind]<def.goal){
   missionState[kind]++;
   saveJSON('pp_missions',missionState);
   renderMissions();
  }
 },
 award(starAmt,coinAmt,msg){showToast(msg||'เก่งมาก!')}
};

/* ---------------- toast ---------------- */
function showToast(msg){
 let t=$('#v5Toast');
 if(!t){t=document.createElement('div');t.id='v5Toast';t.className='v5-toast';document.body.appendChild(t)}
 t.textContent='🎉 '+msg;
 t.classList.remove('show');void t.offsetWidth;t.classList.add('show');
 clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600);
}

/* ---------------- modal ---------------- */
function ensureModalRoot(){
 let root=$('#v5ModalRoot');
 if(!root){
  root=document.createElement('div');root.id='v5ModalRoot';root.className='v5-modal-root';
  root.innerHTML=`<div class="v5-modal-backdrop"></div><div class="v5-modal"><button class="v5-modal-close">✕</button><h3 class="v5-modal-title"></h3><div class="v5-modal-body"></div></div>`;
  document.body.appendChild(root);
  root.querySelector('.v5-modal-backdrop').onclick=closeModal;
  root.querySelector('.v5-modal-close').onclick=closeModal;
 }
 return root;
}
function showModal(title,html){
 const root=ensureModalRoot();
 root.querySelector('.v5-modal-title').textContent=title;
 root.querySelector('.v5-modal-body').innerHTML=html;
 root.classList.add('open');
}
function closeModal(){const root=$('#v5ModalRoot');if(root)root.classList.remove('open')}

function openParentModal(){
 const done=MISSION_DEFS.filter(m=>missionState[m.key]>=m.goal).length;
 showModal('👪 สำหรับผู้ปกครอง',`
 <p>สรุปความคืบหน้าของ ${childName} วันนี้</p>
 <div class="v5-stat-grid">
  <div>⭐ ดาวสะสมทั้งหมด<b>${stars}</b></div>
  <div>🔥 เล่นต่อเนื่อง<b>${streakVal} วัน</b></div>
  <div>🏆 ภารกิจสำเร็จวันนี้<b>${done}/${MISSION_DEFS.length}</b></div>
  <div>🎁 รางวัลที่ปลดล็อก<b>${ownedRewards().length}/${REWARDS.length}</b></div>
 </div>`);
}
function openSettingsModal(){
 showModal('⚙️ ตั้งค่า',`
 <button class="action" id="v5SoundToggle">${soundOn?'🔊 เสียงเปิดอยู่':'🔇 เสียงปิดอยู่'}</button>
 <button class="action" id="v5ResetBtn" style="background:#ff5b7a">🗑️ ล้างความคืบหน้าทั้งหมด</button>`);
 $('#v5SoundToggle').onclick=()=>{soundOn=!soundOn;localStorage.pp_sound=soundOn?'on':'off';stats();closeModal()};
 $('#v5ResetBtn').onclick=()=>{
  if(confirm('ล้างดาว ความคืบหน้า และรางวัลทั้งหมดใช่หรือไม่?')){
   ['pp_stars','pp_sound','pp_missions','pp_owned','pp_streak','pp_lastVisit'].forEach(k=>localStorage.removeItem(k));
   location.reload();
  }
 };
}
function openCollectionModal(){
 const owned=ownedRewards();
 const html=owned.length
  ?`<div class="v5-stat-grid">${owned.map(id=>{const r=REWARDS.find(x=>x.id===id);return `<div>${r.icon}<b>${r.name}</b></div>`}).join('')}</div>`
  :`<p>ยังไม่มีของสะสมเลย ไปเก็บดาวแล้วแวะที่ห้องรางวัลกันนะ! 🎁</p>`;
 showModal('📚 ของสะสมของหนู',html);
}

/* ---------------- floating mascots ---------------- */
const mascotLeft=document.createElement('div');
mascotLeft.className='v5-mascot left';
mascotLeft.innerHTML=`<span class="who">🐧</span><span class="say">เก่งมาก! ⭐⭐⭐<br>เล่นครบทุกกิจกรรม รับดาวเพิ่มนะ!</span>`;
document.body.appendChild(mascotLeft);
const mascotRight=document.createElement('div');
mascotRight.className='v5-mascot right';
mascotRight.innerHTML=`<span class="who">🐶</span><span class="say">คุณพ่อคุณแม่ดูความก้าวหน้าได้ที่นี่เลย!</span>`;
document.body.appendChild(mascotRight);

/* ---------------- bottom nav ---------------- */
let gamesSeen=loadJSON('pp_gamesSeen',false);
const NAV_ITEMS=[
 {id:'home',icon:'🏠',label:'หน้าหลัก',action:()=>window.home()},
 {id:'games',icon:'🎮',label:'กิจกรรม',action:()=>{window.home();setTimeout(()=>scrollToId('gamesTitle'),60);gamesSeen=true;saveJSON('pp_gamesSeen',true);renderNav()}},
 {id:'missions',icon:'📋',label:'ภารกิจ',action:()=>{window.home();setTimeout(()=>scrollToId('v5Missions'),60)}},
 {id:'rewards',icon:'🎁',label:'ห้องรางวัล',action:()=>{window.home();setTimeout(()=>scrollToId('v5Rewards'),60)}},
 {id:'collection',icon:'📚',label:'ของสะสม',action:openCollectionModal},
 {id:'parents',icon:'👪',label:'สำหรับผู้ปกครอง',action:openParentModal},
];
const navbar=document.createElement('nav');
navbar.className='v5-navbar';
navbar.innerHTML=NAV_ITEMS.map(n=>`<button class="v5-nav-btn" data-id="${n.id}"><span class="ic">${n.icon}</span>${n.label}${n.id==='games'&&!gamesSeen?'<span class="v5-nav-dot"></span>':''}</button>`).join('');
document.body.appendChild(navbar);
navbar.querySelectorAll('.v5-nav-btn').forEach((btn,i)=>btn.onclick=()=>NAV_ITEMS[i].action());
function renderNav(){
 navbar.querySelectorAll('.v5-nav-btn .v5-nav-dot').forEach(d=>d.remove());
 if(!gamesSeen){
  const b=navbar.querySelector('[data-id="games"]');
  if(b&&!b.querySelector('.v5-nav-dot'))b.insertAdjacentHTML('beforeend','<span class="v5-nav-dot"></span>');
 }
}
function setActiveNav(view){
 const active=view==='home'?'home':'games';
 navbar.querySelectorAll('.v5-nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.id===active));
}

/* ---------------- view change tracking ---------------- */
const origOpenGame=window.openGame,origHome=window.home;
window.openGame=function(id){origOpenGame(id);document.body.classList.remove('v5-home');setActiveNav(id)};
window.home=function(){origHome();document.body.classList.add('v5-home');setActiveNav('home')};

/* ---------------- init ---------------- */
updateStreak();
renderMissions();
setActiveNav('home');
window.stats();
})();
