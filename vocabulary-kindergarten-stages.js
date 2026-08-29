(()=>{
const KEY='punpin_grade_v1';
if((localStorage.getItem(KEY)||'k')!=='k')return;
const K={
 colors:{icon:'🎨',name:'สี',note:'สีพื้นฐานและสีที่พบรอบตัว',stages:[
  [['red','เรด','สีแดง','🔴'],['orange','ออ-รินจ์','สีส้ม','🟠'],['yellow','เยล-โล','สีเหลือง','🟡'],['green','กรีน','สีเขียว','🟢'],['blue','บลู','สีน้ำเงิน','🔵']],
  [['purple','เพอร์-เพิล','สีม่วง','🟣'],['pink','พิงก์','สีชมพู','🩷'],['brown','บราวน์','สีน้ำตาล','🟤'],['black','แบล็ก','สีดำ','⚫'],['white','ไวท์','สีขาว','⚪']],
  [['gray','เกรย์','สีเทา','🩶'],['gold','โกลด์','สีทอง','🟨'],['silver','ซิล-เวอร์','สีเงิน','⬜'],['light blue','ไลท์ บลู','สีฟ้าอ่อน','🩵'],['dark blue','ดาร์ก บลู','สีน้ำเงินเข้ม','🔵']]
 ]},
 numbers:{icon:'🔢',name:'ตัวเลข',note:'นับและรู้จักจำนวน 1–20',stages:[
  [['one','วัน','หนึ่ง','1️⃣'],['two','ทู','สอง','2️⃣'],['three','ธรี','สาม','3️⃣'],['four','โฟร์','สี่','4️⃣'],['five','ไฟฟ์','ห้า','5️⃣'],['six','ซิกซ์','หก','6️⃣'],['seven','เซฟ-เวิน','เจ็ด','7️⃣']],
  [['eight','เอท','แปด','8️⃣'],['nine','ไนน์','เก้า','9️⃣'],['ten','เท็น','สิบ','🔟'],['eleven','อิ-เลฟ-เวิน','สิบเอ็ด','1️⃣1️⃣'],['twelve','ทเวลฟ์','สิบสอง','1️⃣2️⃣'],['thirteen','เธอร์-ทีน','สิบสาม','1️⃣3️⃣'],['fourteen','โฟร์-ทีน','สิบสี่','1️⃣4️⃣']],
  [['fifteen','ฟิฟ-ทีน','สิบห้า','1️⃣5️⃣'],['sixteen','ซิกซ์-ทีน','สิบหก','1️⃣6️⃣'],['seventeen','เซฟ-เวิน-ทีน','สิบเจ็ด','1️⃣7️⃣'],['eighteen','เอท-ทีน','สิบแปด','1️⃣8️⃣'],['nineteen','ไนน์-ทีน','สิบเก้า','1️⃣9️⃣'],['twenty','ทเวน-ที','ยี่สิบ','2️⃣0️⃣']]
 ]},
 shapes:{icon:'🔷',name:'รูปร่าง',note:'รูปร่าง 2 มิติและ 3 มิติพื้นฐาน',stages:[
  [['circle','เซอร์-เคิล','วงกลม','⭕'],['square','สแควร์','สี่เหลี่ยมจัตุรัส','🟦'],['triangle','ไทร-แอง-เกิล','สามเหลี่ยม','🔺'],['rectangle','เร็ก-แทง-เกิล','สี่เหลี่ยมผืนผ้า','▭']],
  [['oval','โอ-เวิล','วงรี','🥚'],['heart','ฮาร์ต','รูปหัวใจ','❤️'],['star','สตาร์','รูปดาว','⭐'],['diamond','ได-อะ-มอนด์','สี่เหลี่ยมข้าวหลามตัด','🔷']],
  [['semicircle','เซม-มิ-เซอร์-เคิล','ครึ่งวงกลม','◐'],['crescent','เครส-เซินท์','รูปพระจันทร์เสี้ยว','🌙'],['cube','คิวบ์','ลูกบาศก์','🧊'],['sphere','สเฟียร์','ทรงกลม','⚽']]
 ]},
 animals:{icon:'🐶',name:'สัตว์',note:'สัตว์เลี้ยง สัตว์ฟาร์ม และสัตว์ป่า',stages:[
  [['cat','แคท','แมว','🐱'],['dog','ด็อก','สุนัข','🐶'],['bird','เบิร์ด','นก','🐦'],['fish','ฟิช','ปลา','🐟'],['rabbit','แร็บ-บิท','กระต่าย','🐰'],['duck','ดั๊ก','เป็ด','🦆'],['chicken','ชิค-เคิน','ไก่','🐔']],
  [['cow','คาว','วัว','🐄'],['pig','พิก','หมู','🐷'],['horse','ฮอร์ส','ม้า','🐴'],['sheep','ชีพ','แกะ','🐑'],['goat','โกต','แพะ','🐐'],['frog','ฟร็อก','กบ','🐸'],['butterfly','บัท-เทอร์-ฟลาย','ผีเสื้อ','🦋']],
  [['lion','ไล-อัน','สิงโต','🦁'],['tiger','ไท-เกอร์','เสือ','🐯'],['elephant','เอ-ละ-เฟินท์','ช้าง','🐘'],['monkey','มัง-คี','ลิง','🐵'],['bear','แบร์','หมี','🐻'],['zebra','ซี-บร่า','ม้าลาย','🦓']]
 ]},
 family:{icon:'👨‍👩‍👧',name:'ครอบครัว',note:'คนในครอบครัวและคนใกล้ตัว',stages:[
  [['mom','มอม','แม่','👩'],['dad','แดด','พ่อ','👨'],['baby','เบ-บี','เด็กทารก','👶'],['family','แฟม-มะ-ลี','ครอบครัว','👨‍👩‍👧‍👦']],
  [['mother','มัธ-เธอร์','คุณแม่','👩'],['father','ฟา-เธอร์','คุณพ่อ','👨'],['sister','ซิส-เทอร์','พี่สาว/น้องสาว','👧'],['brother','บรัธ-เธอร์','พี่ชาย/น้องชาย','👦']],
  [['grandma','แกรนด์-มา','คุณย่า/คุณยาย','👵'],['grandpa','แกรนด์-พา','คุณปู่/คุณตา','👴'],['friend','เฟรนด์','เพื่อน','🧒'],['teacher','ที-เชอร์','ครู','👩‍🏫']]
 ]},
 body:{icon:'🖐️',name:'ร่างกาย',note:'อวัยวะและส่วนต่าง ๆ ของร่างกาย',stages:[
  [['head','เฮด','ศีรษะ','🙂'],['hair','แฮร์','ผม','💇'],['eye','อาย','ตา','👁️'],['ear','เอียร์','หู','👂'],['nose','โนซ','จมูก','👃'],['mouth','เมาธ์','ปาก','👄']],
  [['tooth','ทูธ','ฟัน','🦷'],['tongue','ทัง','ลิ้น','👅'],['face','เฟซ','ใบหน้า','😊'],['neck','เน็ก','คอ','🧣'],['shoulder','โชล-เดอร์','ไหล่','🧍'],['arm','อาร์ม','แขน','💪']],
  [['hand','แฮนด์','มือ','🖐️'],['finger','ฟิง-เกอร์','นิ้วมือ','☝️'],['leg','เลก','ขา','🦵'],['knee','นี','เข่า','🦵'],['foot','ฟุต','เท้า','🦶'],['toe','โท','นิ้วเท้า','🦶']]
 ]},
 food:{icon:'🍎',name:'อาหารและเครื่องดื่ม',note:'อาหาร ผลไม้ และเครื่องดื่มใกล้ตัว',stages:[
  [['apple','แอป-เพิล','แอปเปิล','🍎'],['banana','บะ-นา-นะ','กล้วย','🍌'],['orange','ออ-รินจ์','ส้ม','🍊'],['grape','เกรพ','องุ่น','🍇'],['watermelon','วอ-เทอร์-เมล-เลิน','แตงโม','🍉'],['mango','แมง-โก','มะม่วง','🥭'],['strawberry','สตรอ-เบอ-รี','สตรอว์เบอร์รี','🍓']],
  [['rice','ไรซ์','ข้าว','🍚'],['egg','เอ็ก','ไข่','🥚'],['bread','เบรด','ขนมปัง','🍞'],['chicken','ชิค-เคิน','ไก่/เนื้อไก่','🍗'],['fish','ฟิช','ปลา','🐟'],['cake','เค้ก','เค้ก','🍰'],['ice cream','ไอซ์ ครีม','ไอศกรีม','🍦']],
  [['milk','มิลก์','นม','🥛'],['water','วอ-เทอร์','น้ำ','💧'],['juice','จูซ','น้ำผลไม้','🧃'],['soup','ซูพ','ซุป','🥣'],['noodle','นู-เดิล','ก๋วยเตี๋ยว/เส้น','🍜'],['carrot','แค-รัท','แครอต','🥕']]
 ]},
 toys:{icon:'🧸',name:'ของเล่น',note:'ของเล่นและกิจกรรมที่เด็กคุ้นเคย',stages:[
  [['ball','บอล','ลูกบอล','⚽'],['doll','ดอล','ตุ๊กตา','🪆'],['teddy bear','เท็ด-ดี แบร์','ตุ๊กตาหมี','🧸'],['car','คาร์','รถของเล่น','🚗'],['blocks','บล็อกส์','บล็อกตัวต่อ','🧱']],
  [['kite','ไคท์','ว่าว','🪁'],['puzzle','พัซ-เซิล','จิ๊กซอว์','🧩'],['robot','โร-บอท','หุ่นยนต์','🤖'],['train','เทรน','รถไฟของเล่น','🚂'],['plane','เพลน','เครื่องบินของเล่น','✈️']],
  [['drum','ดรัม','กลอง','🥁'],['balloon','บะ-ลูน','ลูกโป่ง','🎈'],['yo-yo','โย-โย','โยโย่','🪀'],['game','เกม','เกม','🎮'],['bike','ไบก์','จักรยาน','🚲']]
 ]},
 school:{icon:'🎒',name:'ของใช้ในห้องเรียน',note:'สิ่งของและคำที่ใช้ในโรงเรียน',stages:[
  [['book','บุ๊ก','หนังสือ','📘'],['notebook','โน้ต-บุ๊ก','สมุด','📓'],['pencil','เพ็น-ซิล','ดินสอ','✏️'],['pen','เพ็น','ปากกา','🖊️'],['eraser','อิ-เร-เซอร์','ยางลบ','⬜'],['ruler','รู-เลอร์','ไม้บรรทัด','📏']],
  [['crayon','เคร-ออน','สีเทียน','🖍️'],['paper','เพ-เพอร์','กระดาษ','📄'],['glue','กลู','กาว','🧴'],['scissors','ซิส-เซอร์ส','กรรไกร','✂️'],['bag','แบ็ก','กระเป๋า','🎒'],['desk','เดสก์','โต๊ะเรียน','🪑']],
  [['chair','แชร์','เก้าอี้','🪑'],['table','เท-เบิล','โต๊ะ','🟫'],['board','บอร์ด','กระดาน','🟩'],['classroom','คลาส-รูม','ห้องเรียน','🏫'],['school','สคูล','โรงเรียน','🏫'],['teacher','ที-เชอร์','ครู','👩‍🏫']]
 ]},
 nature:{icon:'🌤️',name:'ธรรมชาติและอากาศ',note:'ท้องฟ้า ธรรมชาติ และสภาพอากาศ',stages:[
  [['sun','ซัน','ดวงอาทิตย์','☀️'],['moon','มูน','ดวงจันทร์','🌙'],['star','สตาร์','ดาว','⭐'],['sky','สกาย','ท้องฟ้า','🌌'],['cloud','คลาวด์','เมฆ','☁️'],['rain','เรน','ฝน','🌧️']],
  [['rainbow','เรน-โบ','สายรุ้ง','🌈'],['tree','ทรี','ต้นไม้','🌳'],['flower','ฟลาว-เออร์','ดอกไม้','🌸'],['grass','กราส','หญ้า','🌱'],['leaf','ลีฟ','ใบไม้','🍃'],['river','ริฟ-เวอร์','แม่น้ำ','🏞️']],
  [['sunny','ซัน-นี','แดดออก','🌞'],['rainy','เรน-นี','ฝนตก','🌧️'],['cloudy','คลาว-ดี','มีเมฆ','☁️'],['windy','วิน-ดี','มีลม','🌬️'],['hot','ฮอท','ร้อน','🥵'],['cold','โคลด์','หนาว/เย็น','🥶']]
 ]},
 actions:{icon:'🏃',name:'คำกริยา',note:'คำสั่งและการกระทำในชีวิตประจำวัน',stages:[
  [['sit','ซิท','นั่ง','🪑'],['stand','สแตนด์','ยืน','🧍'],['walk','วอล์ก','เดิน','🚶'],['run','รัน','วิ่ง','🏃'],['jump','จัมพ์','กระโดด','🤸'],['eat','อีต','กิน','😋'],['drink','ดริงก์','ดื่ม','🥤']],
  [['sleep','สลีป','นอน','😴'],['read','รีด','อ่าน','📖'],['write','ไรท์','เขียน','✍️'],['look','ลุก','มอง','👀'],['listen','ลิส-เซิน','ฟัง','👂'],['speak','สพีก','พูด','🗣️'],['sing','ซิง','ร้องเพลง','🎤']],
  [['dance','แดนซ์','เต้น','💃'],['swim','สวิม','ว่ายน้ำ','🏊'],['play','เพลย์','เล่น','🎮'],['draw','ดรอ','วาด','🎨'],['color','คัล-เลอร์','ระบายสี','🖍️'],['wash','วอช','ล้าง','🧼']]
 ]},
 manners:{icon:'🙏',name:'คำใช้ทุกวัน',note:'คำทักทาย ความรู้สึก และมารยาท',stages:[
  [['hello','เฮล-โล','สวัสดี','👋'],['goodbye','กูด-บาย','ลาก่อน','👋'],['yes','เยส','ใช่','✅'],['no','โน','ไม่','❌'],['please','พลีซ','กรุณา','🙏'],['thank you','แธงก์ ยู','ขอบคุณ','🙏']],
  [['sorry','ซอ-รี','ขอโทษ','🙇'],['good','กูด','ดี','👍'],['bad','แบด','ไม่ดี','👎'],['happy','แฮป-พี','มีความสุข','😊'],['sad','แซด','เศร้า','😢'],['angry','แอง-กรี','โกรธ','😠']],
  [['scared','สแคร์ด','กลัว','😨'],['tired','ไทเอิร์ด','เหนื่อย','😴'],['hungry','ฮัง-กรี','หิว','😋'],['help','เฮลพ์','ช่วย','🤝'],['wait','เวท','รอ','⏳'],['share','แชร์','แบ่งปัน','🤲']]
 ]}
};
const total=c=>c.stages.reduce((n,s)=>n+s.length,0);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function speakWord(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.72;u.pitch=1.04;speechSynthesis.speak(u)}catch(e){}}
function addStyle(){if(document.getElementById('vKStagesStyle'))return;const s=document.createElement('style');s.id='vKStagesStyle';s.textContent=`
.vKSummary{margin:10px 0 14px;padding:12px 14px;border:1px solid #ece5f3;border-radius:18px;background:#fff;color:#5f5577;font:12px 'Noto Sans Thai';display:flex;align-items:center;gap:9px}.vKSummary b{font-family:Mali;color:#453b61}.vKCatGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:10px 0 20px}.vKCat{border:1px solid #ebe5f3;border-radius:20px;padding:13px 11px;background:#fff;color:#453b61;text-align:left;cursor:pointer;box-shadow:0 7px 20px #493a7010;min-height:118px}.vKCat:hover{transform:translateY(-2px)}.vKCat .ico{display:block;font-size:31px;margin-bottom:5px}.vKCat b{display:block;font-size:.82rem}.vKCat small{display:block;margin-top:3px;color:#81788f;font:10px 'Noto Sans Thai';line-height:1.35}.vKCat em{display:inline-block;margin-top:7px;padding:4px 7px;border-radius:999px;background:#f4f0fb;color:#695b8e;font:700 9px Mali;font-style:normal}.vStageBar{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0 14px}.vStageBtn{border:1px solid #e8e1f2;border-radius:14px;padding:9px 12px;background:#fff;color:#62547f;font:700 .7rem Mali;cursor:pointer}.vStageBtn.on{background:linear-gradient(135deg,#765de4,#9b6bed);color:#fff;border-color:#765de4}.vStageInfo{margin-left:auto;align-self:center;color:#7c748d;font:11px 'Noto Sans Thai'}.vStageBack{border:0;border-radius:999px;padding:8px 11px;background:#f1edff;color:#5c4f86;font:700 .7rem Mali;cursor:pointer}.vStageNote{margin:0 0 10px;padding:10px 12px;border-radius:15px;background:#fff8d9;color:#706547;font:11px 'Noto Sans Thai'}.vCategoryGrid{display:none!important}@media(max-width:850px){.vKCatGrid{grid-template-columns:repeat(3,1fr)}}@media(max-width:600px){.vKCatGrid{grid-template-columns:repeat(2,1fr);gap:8px}.vKCat{min-height:110px;padding:11px 9px}.vStageInfo{width:100%;margin-left:0}}
`;document.head.appendChild(s)}
function init(){
 if((localStorage.getItem(KEY)||'k')!=='k')return;
 const grid=document.getElementById('grid'),title=document.getElementById('title'),count=document.getElementById('count');if(!grid||!title)return;
 addStyle();document.getElementById('vCategoryGrid')?.remove();document.querySelector('.vGradeIntro')?.remove();
 const sectionTitle=document.querySelector('.sectionTitle');
 const summary=document.createElement('div');summary.className='vKSummary';summary.innerHTML='<span>🌈</span><div><b>คำศัพท์อนุบาล 12 หมวด · 3 ด่านต่อหมวด</b><br>เริ่มจากคำง่ายทีละชุด แล้วค่อยไปด่านถัดไป</div>';
 sectionTitle?.insertAdjacentElement('beforebegin',summary);
 const cats=document.createElement('section');cats.className='vKCatGrid';cats.id='vKCatGrid';sectionTitle?.insertAdjacentElement('afterend',cats);
 Object.entries(K).forEach(([key,c])=>{const b=document.createElement('button');b.className='vKCat';b.dataset.kcat=key;b.innerHTML=`<span class="ico">${c.icon}</span><b>${c.name}</b><small>${c.note}</small><em>${total(c)} คำ · 3 ด่าน</em>`;cats.appendChild(b)});
 function showCats(){cats.style.display='grid';grid.innerHTML='';title.textContent='หมวดคำศัพท์อนุบาล';if(count)count.textContent='12 หมวด · '+Object.values(K).reduce((n,c)=>n+total(c),0)+' คำ';document.getElementById('vStageBar')?.remove();document.querySelector('.vStageNote')?.remove()}
 function showCat(key,stage=0){const c=K[key];if(!c)return;cats.style.display='none';document.getElementById('vStageBar')?.remove();document.querySelector('.vStageNote')?.remove();
   title.innerHTML=`<button class="vStageBack" id="vStageBack">← หมวดทั้งหมด</button> &nbsp; ${c.icon} ${c.name}`;
   const bar=document.createElement('div');bar.className='vStageBar';bar.id='vStageBar';bar.innerHTML=c.stages.map((s,i)=>`<button class="vStageBtn ${i===stage?'on':''}" data-stage="${i}">ด่าน ${i+1} · ${s.length} คำ</button>`).join('')+`<span class="vStageInfo">รวม ${total(c)} คำ</span>`;sectionTitle?.insertAdjacentElement('afterend',bar);
   const note=document.createElement('div');note.className='vStageNote';note.textContent=`ด่าน ${stage+1}: แตะการ์ดเพื่อฟังเสียง แล้วพูดตาม 2 ครั้ง`;bar.insertAdjacentElement('afterend',note);
   const words=c.stages[stage];if(count)count.textContent=`ด่าน ${stage+1} · ${words.length} คำ`;
   grid.innerHTML=words.map(w=>`<button class="word" data-k-say="${esc(w[0])}"><span class="sound">🔊</span><div class="pic">${w[3]}</div><div class="en">${esc(w[0])}</div><div class="read">คำอ่าน: ${esc(w[1])}</div><div class="th">แปล: ${esc(w[2])}</div></button>`).join('');
   grid.querySelectorAll('[data-k-say]').forEach(b=>b.onclick=()=>speakWord(b.dataset.kSay));bar.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>showCat(key,+b.dataset.stage));document.getElementById('vStageBack').onclick=showCats;
   window.scrollTo({top:Math.max(0,(sectionTitle?.offsetTop||0)-85),behavior:'smooth'});
 }
 cats.querySelectorAll('[data-kcat]').forEach(b=>b.onclick=()=>showCat(b.dataset.kcat,0));showCats();
 const top=document.querySelector('.top p');if(top)top.textContent='คลังคำศัพท์อนุบาล · 12 หมวด · เรียนทีละ 3 ด่าน';const hero=document.querySelector('.hero p');if(hero)hero.textContent='เลือกหมวด แล้วค่อย ๆ เรียนด่าน 1 → 2 → 3 ฟังเสียงและพูดตาม';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,80));else setTimeout(init,80);
})();