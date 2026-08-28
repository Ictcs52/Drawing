(()=>{
const GKEY='punpin_grade_v1';
const gradeNames={k:'อนุบาล',p1:'ป.1',p2:'ป.2',p3:'ป.3'};
const gradeTopics={
  k:'A–Z · ก–ฮ · นับ 1–20 · แบบรูป · นิทานสั้น',
  p1:'Phonics/CVC · ผสมคำ · บวก–ลบ · ลำดับ · อ่านเรื่องสั้น',
  p2:'Vocabulary/Sentence · อ่านจับใจความ · คูณเบื้องต้น · เวลา/เงิน · เหตุผล',
  p3:'Reading · ภาษาไทยจับใจความ · คูณ/หาร/เศษส่วน · Logic · นิทานคิดวิเคราะห์'
};
function click(id){document.getElementById(id)?.click()}
function progress(){try{return JSON.parse(localStorage.getItem('punpin_progress_v1')||'{}')}catch(e){return {}}}
function addTodayStyles(){if(document.getElementById('kwTodayStyles'))return;const s=document.createElement('style');s.id='kwTodayStyles';s.textContent=`.kwTodayLaunch{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;margin:15px 0 18px;padding:17px 18px;border:4px solid #fff;border-radius:27px;background:linear-gradient(135deg,#fff9d2,#ffe8ef 50%,#e9f7ff);box-shadow:0 8px 0 #ded8e9,0 17px 30px #4a37721a}.kwTodayCopy{display:flex;align-items:center;gap:12px;min-width:0}.kwTodayMascot{font-size:44px;white-space:nowrap}.kwTodayText{min-width:0}.kwTodayText span{display:block;color:#7158c6;font-size:.72rem;font-weight:700}.kwTodayText h3{margin:2px 0 3px;font-size:1.25rem}.kwTodayText p{margin:0;color:#766e87;font:12px 'Noto Sans Thai',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.kwTodayBtn{border:0;border-radius:19px;padding:13px 18px;color:#fff;background:linear-gradient(135deg,#ff7aaa,#735ce2);font:700 .9rem Mali,sans-serif;box-shadow:0 6px 0 #5742aa;cursor:pointer;white-space:nowrap}.kwTodayBtn:active{transform:translateY(4px);box-shadow:0 2px 0 #5742aa}.kwTodayMeta{grid-column:1/-1;display:flex;gap:7px;flex-wrap:wrap;margin-top:-3px}.kwTodayMeta i{font-style:normal;padding:6px 9px;border-radius:999px;background:#ffffffc9;color:#695f7e;font-size:.66rem;font-weight:700}@media(max-width:640px){.kwTodayLaunch{grid-template-columns:1fr;padding:14px}.kwTodayCopy{align-items:flex-start}.kwTodayMascot{font-size:36px}.kwTodayText h3{font-size:1.08rem}.kwTodayText p{white-space:normal;line-height:1.4}.kwTodayBtn{width:100%;padding:12px}.kwTodayMeta{gap:5px}.kwTodayMeta i{font-size:.6rem;padding:5px 7px}}`;document.head.appendChild(s)}
function build(){
  const home=document.getElementById('home'),hero=home?.querySelector('.hero');
  if(!home||!hero||document.querySelector('.kwGrade'))return;
  addTodayStyles();
  const oldDash=home.querySelector('.ppDash'),oldDaily=home.querySelector('.ppDaily');
  const heroTitle=hero.querySelector('h2'),heroText=hero.querySelector('.heroCopy p'),bubble=hero.querySelector('.artBubble'),eyebrow=hero.querySelector('.eyebrow');
  if(eyebrow)eyebrow.textContent='✨ เรียน • เล่น • สนุก';
  if(heroTitle)heroTitle.innerHTML='วันนี้เล่นอะไรดี?';
  if(heroText)heroText.textContent='เลือกโลกที่ชอบ แล้วเริ่มเล่นได้เลย!';
  if(bubble)bubble.innerHTML='<span class="kwMascot fox">🦊</span><span class="kwMascot bear">🐻</span><b class="kwMascotStar">⭐</b>';

  let grade=localStorage.getItem(GKEY)||'k';
  const gradeBox=document.createElement('section');
  gradeBox.className='kwGrade';
  gradeBox.innerHTML='<div class="kwGradeHead"><div><h3>🎒 หนูเรียนระดับไหน?</h3><small>เลือกครั้งเดียว ระบบจะจำไว้ให้</small></div><div class="kwGradeHint">✨ เลือกแล้วเริ่มเล่นได้เลย</div></div><div class="kwGradeBtns"><button data-g="k">🐣 อนุบาล</button><button data-g="p1">🎒 ป.1</button><button data-g="p2">📗 ป.2</button><button data-g="p3">📘 ป.3</button></div>';
  hero.insertAdjacentElement('afterend',gradeBox);

  const today=document.createElement('section');today.className='kwTodayLaunch';today.innerHTML=`<div class="kwTodayCopy"><div class="kwTodayMascot">🦊📚</div><div class="kwTodayText"><span>แนะนำสำหรับวันนี้ · <b data-kw-today-level></b></span><h3>▶ เรียนวันนี้ 15–20 นาที</h3><p data-kw-today-topics></p></div></div><button class="kwTodayBtn">เริ่มเรียนวันนี้ ›</button><div class="kwTodayMeta"><i>🔤 English</i><i>ก ภาษาไทย</i><i>🔢 Math</i><i>🧠 Brain</i><i>📚 Story</i><i>⭐ จบครบรับ 15 ดาว</i></div>`;
  gradeBox.insertAdjacentElement('afterend',today);today.querySelector('.kwTodayBtn').onclick=()=>location.href='learning-today.html';

  const setGrade=g=>{
    grade=g;localStorage.setItem(GKEY,g);
    gradeBox.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.g===g));
    document.querySelectorAll('[data-kw-grade]').forEach(x=>x.textContent=gradeNames[g]);
    today.querySelector('[data-kw-today-level]').textContent=gradeNames[g];
    today.querySelector('[data-kw-today-topics]').textContent=gradeTopics[g];
    document.dispatchEvent(new CustomEvent('punpin:grade',{detail:{grade:g}}));
  };
  gradeBox.querySelectorAll('button').forEach(b=>b.onclick=()=>setGrade(b.dataset.g));

  const p=progress();
  const overview=document.createElement('section');overview.className='kwOverview';
  overview.innerHTML=`
    <div class="kwProgressCard">
      <div class="kwCardLabel">🌟 ความก้าวหน้าของหนู</div>
      <div class="kwStats">
        <div><span>⭐</span><b data-pp-stars>${p.stars||0}</b><small>ดาวของฉัน</small></div>
        <div><span>🔥</span><b data-pp-streak>${p.streak||0}</b><small>เล่นต่อเนื่อง</small></div>
        <div><span>🏆</span><b data-pp-plays>${p.plays||0}</b><small>กิจกรรมสำเร็จ</small></div>
      </div>
      <div class="kwMiniProgress"><i style="width:${Math.min(100,((p.stars||0)%20)/20*100)}%"></i></div>
      <small class="kwNextReward">สะสมอีก ${20-((p.stars||0)%20)||20} ดาว เพื่อรับเหรียญถัดไป ✨</small>
    </div>
    <div class="kwMissionCard">
      <div class="kwMissionTop"><div><span>📅 ฝึกเพิ่มตามใจชอบ</span><b>เลือกเล่นต่อหลังเรียนวันนี้</b></div><em data-kw-grade>${gradeNames[grade]}</em></div>
      <button data-target="engCard"><i>1</i><span>📖</span><b>ฝึกภาษาอังกฤษเพิ่ม</b><strong>English</strong></button>
      <button data-target="mathCard"><i>2</i><span>✏️</span><b>ฝึกคณิตศาสตร์เพิ่ม</b><strong>Math</strong></button>
      <button data-target="memoryCard"><i>3</i><span>🧩</span><b>เล่นเกมฝึกสมอง</b><strong>Brain</strong></button>
    </div>`;
  today.insertAdjacentElement('afterend',overview);
  overview.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>click(b.dataset.target));

  const zones=document.createElement('section');zones.className='kwZones';
  zones.innerHTML=`<div class="kwTitle"><div><span class="kwRibbon">⭐ โซนการเรียนรู้</span><h2>เลือกโลกที่อยากไป</h2><p>เรียนเสริมตามความสนใจหลังจากเรียนวันนี้</p></div></div>
  <div class="kwMainRow">
    <div class="kwZoneGrid">
      <button class="kwZone english" data-id="engCard"><span>🔤</span><b>English</b><small>คำศัพท์ · ฟัง · พูด</small><i>▶</i></button>
      <button class="kwZone math" data-id="mathCard"><span>🔢</span><b>Math</b><small>จำนวน · คำนวณ · โจทย์</small><i>▶</i></button>
      <button class="kwZone thai" data-id="thaiCard"><span>ก</span><b>ภาษาไทย</b><small>เสียง · ผสมคำ · อ่าน</small><i>▶</i></button>
      <button class="kwZone creative" data-id="coloringCard"><span>🎨</span><b>Creative</b><small>ระบายสี · จิ๊กซอว์</small><i>▶</i></button>
      <button class="kwZone stories" data-url="stories.html"><span>📚</span><b>Stories</b><small>นิทานอ่านออกเสียง</small><i>▶</i></button>
      <button class="kwZone speaking" data-url="speaking.html"><span>🎤</span><b>Speaking</b><small>ฟังแล้วพูดตาม</small><i>▶</i></button>
    </div>
    <button class="kwARSpotlight" data-url="ar-hand.html">
      <span class="kwHot">✨ ไฮไลต์แนะนำ!</span>
      <div class="kwPanda">🐼</div><div class="kwTablet">📱</div>
      <h3>AR Hand Play</h3><p>ใช้มือหยิบ · ลาก · จับคู่<br>เล่นสนุกผ่านกล้องจริง</p><b>👌 เล่น AR เลย <i>›</i></b>
    </button>
  </div>`;
  overview.insertAdjacentElement('afterend',zones);
  zones.querySelectorAll('button').forEach(b=>b.onclick=()=>b.dataset.url?location.href=b.dataset.url:click(b.dataset.id));

  const appbar=document.querySelector('.appbar');
  if(appbar&&!document.querySelector('.kwParentTop')){
    const parent=document.createElement('button');parent.className='kwParentTop';parent.innerHTML='<span>👨‍👩‍👧</span><b>ผู้ปกครอง</b>';
    parent.onclick=()=>document.getElementById('parentModeBtn')?.click();
    appbar.appendChild(parent);
  }
  if(oldDash)oldDash.classList.add('kwLegacyHidden');
  if(oldDaily)oldDaily.classList.add('kwLegacyHidden');
  const more=home.querySelector('.ppMoreLearning');if(more)more.classList.add('kwSecondaryLearning');
  setGrade(grade);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(build,20));
})();