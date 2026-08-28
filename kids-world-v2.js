(()=>{
const GKEY='punpin_grade_v1';
const gradeNames={k:'อนุบาล',p1:'ป.1',p2:'ป.2',p3:'ป.3'};
function click(id){document.getElementById(id)?.click()}
function progress(){try{return JSON.parse(localStorage.getItem('punpin_progress_v1')||'{}')}catch(e){return {}}}
function build(){
  const home=document.getElementById('home'),hero=home?.querySelector('.hero');
  if(!home||!hero||document.querySelector('.kwGrade'))return;
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
  const setGrade=g=>{
    grade=g;localStorage.setItem(GKEY,g);
    gradeBox.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.g===g));
    document.querySelectorAll('[data-kw-grade]').forEach(x=>x.textContent=gradeNames[g]);
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
      <div class="kwMissionTop"><div><span>📅 ภารกิจประจำวัน</span><b>ทำ 3 อย่าง รับดาวเพิ่ม!</b></div><em data-kw-grade>${gradeNames[grade]}</em></div>
      <button data-target="engCard"><i>1</i><span>📖</span><b>เรียนภาษาอังกฤษ 1 บท</b><strong>+10 ⭐</strong></button>
      <button data-target="mathCard"><i>2</i><span>✏️</span><b>ฝึกคณิตศาสตร์</b><strong>+10 ⭐</strong></button>
      <button data-target="memoryCard"><i>3</i><span>🧩</span><b>เล่นเกมฝึกสมอง</b><strong>+10 ⭐</strong></button>
    </div>`;
  gradeBox.insertAdjacentElement('afterend',overview);
  overview.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>click(b.dataset.target));

  const zones=document.createElement('section');zones.className='kwZones';
  zones.innerHTML=`<div class="kwTitle"><div><span class="kwRibbon">⭐ โซนการเรียนรู้</span><h2>เลือกโลกที่อยากไป</h2><p>ปุ่มใหญ่ กดง่าย เหมาะกับมือของเด็ก</p></div></div>
  <div class="kwMainRow">
    <div class="kwZoneGrid">
      <button class="kwZone english" data-id="engCard"><span>🔤</span><b>English</b><small>คำศัพท์ · ฟัง · พูด</small><i>▶</i></button>
      <button class="kwZone math" data-id="mathCard"><span>🔢</span><b>Math</b><small>บวก · ลบ · คิดสนุก</small><i>▶</i></button>
      <button class="kwZone thai" data-id="thaiCard"><span>ก</span><b>ภาษาไทย</b><small>อ่าน · คำศัพท์</small><i>▶</i></button>
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