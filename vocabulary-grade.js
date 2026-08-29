(()=>{
const KEY='punpin_grade_v1';
const grade=localStorage.getItem(KEY)||'k';
const gradeNames={k:'อนุบาล',p1:'ป.1',p2:'ป.2',p3:'ป.3'};

/* PUN&PIN vocabulary curriculum
   Each grade owns its categories. Words are not inherited from another grade.
   Format: [english, thai reading, thai meaning, emoji]
*/
const CURRICULUM={
k:{
  colors:{icon:'🎨',name:'สี',note:'สีพื้นฐาน 12 สี',words:[
    ['red','เรด','สีแดง','🔴'],['orange','ออ-รินจ์','สีส้ม','🟠'],['yellow','เยล-โล','สีเหลือง','🟡'],['green','กรีน','สีเขียว','🟢'],['blue','บลู','สีน้ำเงิน','🔵'],['purple','เพอร์-เพิล','สีม่วง','🟣'],['pink','พิงก์','สีชมพู','🩷'],['brown','บราวน์','สีน้ำตาล','🟤'],['black','แบล็ก','สีดำ','⚫'],['white','ไวท์','สีขาว','⚪'],['gray','เกรย์','สีเทา','🩶'],['gold','โกลด์','สีทอง','🟨']
  ]},
  numbers:{icon:'🔢',name:'ตัวเลข',note:'นับ 1–20',words:[
    ['one','วัน','หนึ่ง','1️⃣'],['two','ทู','สอง','2️⃣'],['three','ธรี','สาม','3️⃣'],['four','โฟร์','สี่','4️⃣'],['five','ไฟฟ์','ห้า','5️⃣'],['six','ซิกซ์','หก','6️⃣'],['seven','เซฟ-เวิน','เจ็ด','7️⃣'],['eight','เอท','แปด','8️⃣'],['nine','ไนน์','เก้า','9️⃣'],['ten','เท็น','สิบ','🔟'],['eleven','อิ-เลฟ-เวิน','สิบเอ็ด','1️⃣1️⃣'],['twelve','ทเวลฟ์','สิบสอง','1️⃣2️⃣'],['thirteen','เธอร์-ทีน','สิบสาม','1️⃣3️⃣'],['fourteen','โฟร์-ทีน','สิบสี่','1️⃣4️⃣'],['fifteen','ฟิฟ-ทีน','สิบห้า','1️⃣5️⃣'],['sixteen','ซิกซ์-ทีน','สิบหก','1️⃣6️⃣'],['seventeen','เซฟ-เวิน-ทีน','สิบเจ็ด','1️⃣7️⃣'],['eighteen','เอท-ทีน','สิบแปด','1️⃣8️⃣'],['nineteen','ไนน์-ทีน','สิบเก้า','1️⃣9️⃣'],['twenty','ทเวน-ที','ยี่สิบ','2️⃣0️⃣']
  ]},
  shapes:{icon:'🔷',name:'รูปร่าง',note:'รูปร่างพื้นฐาน',words:[
    ['circle','เซอร์-เคิล','วงกลม','⭕'],['square','สแควร์','สี่เหลี่ยมจัตุรัส','🟦'],['triangle','ไทร-แอง-เกิล','สามเหลี่ยม','🔺'],['rectangle','เร็ก-แทง-เกิล','สี่เหลี่ยมผืนผ้า','▭'],['oval','โอ-เวิล','วงรี','🥚'],['heart','ฮาร์ต','หัวใจ','❤️'],['star','สตาร์','ดาว','⭐'],['diamond','ได-อะ-มอนด์','สี่เหลี่ยมข้าวหลามตัด','🔷']
  ]},
  animals:{icon:'🐶',name:'สัตว์',note:'สัตว์ใกล้ตัว',words:[
    ['cat','แคท','แมว','🐱'],['dog','ด็อก','สุนัข','🐶'],['bird','เบิร์ด','นก','🐦'],['fish','ฟิช','ปลา','🐟'],['rabbit','แร็บ-บิท','กระต่าย','🐰'],['duck','ดั๊ก','เป็ด','🦆'],['chicken','ชิค-เคิน','ไก่','🐔'],['cow','คาว','วัว','🐄'],['pig','พิก','หมู','🐷'],['horse','ฮอร์ส','ม้า','🐴'],['frog','ฟร็อก','กบ','🐸'],['butterfly','บัท-เทอร์-ฟลาย','ผีเสื้อ','🦋']
  ]},
  family:{icon:'👨‍👩‍👧',name:'ครอบครัว',note:'คนในครอบครัว',words:[
    ['mom','มอม','แม่','👩'],['dad','แดด','พ่อ','👨'],['mother','มัธ-เธอร์','คุณแม่','👩'],['father','ฟา-เธอร์','คุณพ่อ','👨'],['sister','ซิส-เทอร์','พี่สาว/น้องสาว','👧'],['brother','บรัธ-เธอร์','พี่ชาย/น้องชาย','👦'],['grandma','แกรนด์-มา','คุณย่า/คุณยาย','👵'],['grandpa','แกรนด์-พา','คุณปู่/คุณตา','👴'],['baby','เบ-บี','เด็กทารก','👶'],['family','แฟม-มะ-ลี','ครอบครัว','👨‍👩‍👧‍👦']
  ]},
  body:{icon:'🖐️',name:'ร่างกาย',note:'อวัยวะพื้นฐาน',words:[
    ['head','เฮด','ศีรษะ','🙂'],['hair','แฮร์','ผม','💇'],['eye','อาย','ตา','👁️'],['ear','เอียร์','หู','👂'],['nose','โนซ','จมูก','👃'],['mouth','เมาธ์','ปาก','👄'],['tooth','ทูธ','ฟัน','🦷'],['hand','แฮนด์','มือ','🖐️'],['arm','อาร์ม','แขน','💪'],['leg','เลก','ขา','🦵'],['foot','ฟุต','เท้า','🦶'],['face','เฟซ','ใบหน้า','😊']
  ]},
  food:{icon:'🍎',name:'อาหารและเครื่องดื่ม',note:'อาหารใกล้ตัว',words:[
    ['apple','แอป-เพิล','แอปเปิล','🍎'],['banana','บะ-นา-นะ','กล้วย','🍌'],['orange','ออ-รินจ์','ส้ม','🍊'],['grape','เกรพ','องุ่น','🍇'],['watermelon','วอ-เทอร์-เมล-เลิน','แตงโม','🍉'],['rice','ไรซ์','ข้าว','🍚'],['egg','เอ็ก','ไข่','🥚'],['bread','เบรด','ขนมปัง','🍞'],['milk','มิลก์','นม','🥛'],['water','วอ-เทอร์','น้ำ','💧'],['juice','จูซ','น้ำผลไม้','🧃'],['cake','เค้ก','เค้ก','🍰']
  ]},
  toys:{icon:'🧸',name:'ของเล่น',note:'ของเล่นที่เด็กรู้จัก',words:[
    ['ball','บอล','ลูกบอล','⚽'],['doll','ดอล','ตุ๊กตา','🪆'],['teddy bear','เท็ด-ดี แบร์','ตุ๊กตาหมี','🧸'],['kite','ไคท์','ว่าว','🪁'],['blocks','บล็อกส์','บล็อกตัวต่อ','🧱'],['puzzle','พัซ-เซิล','จิ๊กซอว์','🧩'],['car','คาร์','รถของเล่น','🚗'],['robot','โร-บอท','หุ่นยนต์','🤖']
  ]},
  school:{icon:'🎒',name:'ของใช้ในห้องเรียน',note:'ของใช้ประจำวัน',words:[
    ['book','บุ๊ก','หนังสือ','📘'],['notebook','โน้ต-บุ๊ก','สมุด','📓'],['pencil','เพ็น-ซิล','ดินสอ','✏️'],['pen','เพ็น','ปากกา','🖊️'],['eraser','อิ-เร-เซอร์','ยางลบ','⬜'],['ruler','รู-เลอร์','ไม้บรรทัด','📏'],['crayon','เคร-ออน','สีเทียน','🖍️'],['bag','แบ็ก','กระเป๋า','🎒'],['chair','แชร์','เก้าอี้','🪑'],['table','เท-เบิล','โต๊ะ','🟫']
  ]},
  nature:{icon:'🌤️',name:'ธรรมชาติและอากาศ',note:'สิ่งรอบตัว',words:[
    ['sun','ซัน','ดวงอาทิตย์','☀️'],['moon','มูน','ดวงจันทร์','🌙'],['star','สตาร์','ดาว','⭐'],['sky','สกาย','ท้องฟ้า','🌌'],['cloud','คลาวด์','เมฆ','☁️'],['rain','เรน','ฝน','🌧️'],['rainbow','เรน-โบ','สายรุ้ง','🌈'],['tree','ทรี','ต้นไม้','🌳'],['flower','ฟลาว-เออร์','ดอกไม้','🌸'],['grass','กราส','หญ้า','🌱']
  ]},
  actions:{icon:'🏃',name:'คำกริยา',note:'คำสั่งและการกระทำง่าย ๆ',words:[
    ['sit','ซิท','นั่ง','🪑'],['stand','สแตนด์','ยืน','🧍'],['walk','วอล์ก','เดิน','🚶'],['run','รัน','วิ่ง','🏃'],['jump','จัมพ์','กระโดด','🤸'],['eat','อีต','กิน','😋'],['drink','ดริงก์','ดื่ม','🥤'],['sleep','สลีป','นอน','😴'],['read','รีด','อ่าน','📖'],['write','ไรท์','เขียน','✍️'],['look','ลุก','มอง','👀'],['listen','ลิส-เซิน','ฟัง','👂']
  ]},
  manners:{icon:'🙏',name:'คำใช้ทุกวัน',note:'ทักทายและคำสุภาพ',words:[
    ['hello','เฮล-โล','สวัสดี','👋'],['goodbye','กูด-บาย','ลาก่อน','👋'],['please','พลีซ','กรุณา','🙏'],['thank you','แธงก์ ยู','ขอบคุณ','🙏'],['sorry','ซอ-รี','ขอโทษ','🙇'],['yes','เยส','ใช่','✅'],['no','โน','ไม่','❌'],['good','กูด','ดี','👍'],['happy','แฮป-พี','มีความสุข','😊'],['sad','แซด','เศร้า','😢']
  ]}
},
p1:{
  phonics:{icon:'🔤',name:'คำ CVC และ Phonics',note:'คำสั้นที่อ่านออกเสียงได้',words:[
    ['cat','แคท','แมว','🐱'],['dog','ด็อก','สุนัข','🐶'],['sun','ซัน','ดวงอาทิตย์','☀️'],['hat','แฮท','หมวก','🧢'],['pen','เพ็น','ปากกา','🖊️'],['pig','พิก','หมู','🐷'],['bus','บัส','รถโดยสาร','🚌'],['cup','คัพ','ถ้วย','🥤'],['bed','เบด','เตียง','🛏️'],['box','บ็อกซ์','กล่อง','📦'],['red','เรด','สีแดง','🔴'],['big','บิก','ใหญ่','🐘']
  ]},
  school:{icon:'🏫',name:'โรงเรียน',note:'คำที่ใช้ในห้องเรียน',words:[
    ['school','สคูล','โรงเรียน','🏫'],['teacher','ที-เชอร์','ครู','👩‍🏫'],['student','สตู-เดนท์','นักเรียน','🧒'],['classroom','คลาส-รูม','ห้องเรียน','🏫'],['desk','เดสก์','โต๊ะเรียน','🪑'],['board','บอร์ด','กระดาน','🟩'],['book','บุ๊ก','หนังสือ','📘'],['pencil','เพ็น-ซิล','ดินสอ','✏️'],['eraser','อิ-เร-เซอร์','ยางลบ','⬜'],['ruler','รู-เลอร์','ไม้บรรทัด','📏'],['paper','เพ-เพอร์','กระดาษ','📄'],['bag','แบ็ก','กระเป๋า','🎒']
  ]},
  home:{icon:'🏠',name:'บ้าน',note:'ห้องและของใช้ในบ้าน',words:[
    ['house','เฮาส์','บ้าน','🏠'],['room','รูม','ห้อง','🚪'],['bed','เบด','เตียง','🛏️'],['door','ดอร์','ประตู','🚪'],['window','วิน-โด','หน้าต่าง','🪟'],['table','เท-เบิล','โต๊ะ','🟫'],['chair','แชร์','เก้าอี้','🪑'],['lamp','แลมพ์','โคมไฟ','💡'],['clock','คล็อก','นาฬิกา','🕒'],['cup','คัพ','ถ้วย','🥤'],['plate','เพลท','จาน','🍽️'],['spoon','สพูน','ช้อน','🥄']
  ]},
  animals:{icon:'🦁',name:'สัตว์',note:'สัตว์เลี้ยงและสัตว์ป่า',words:[
    ['cat','แคท','แมว','🐱'],['dog','ด็อก','สุนัข','🐶'],['rabbit','แร็บ-บิท','กระต่าย','🐰'],['horse','ฮอร์ส','ม้า','🐴'],['sheep','ชีพ','แกะ','🐑'],['goat','โกต','แพะ','🐐'],['lion','ไล-อัน','สิงโต','🦁'],['tiger','ไท-เกอร์','เสือ','🐯'],['elephant','เอ-ละ-เฟินท์','ช้าง','🐘'],['monkey','มัง-คี','ลิง','🐵'],['bear','แบร์','หมี','🐻'],['snake','สเนก','งู','🐍']
  ]},
  food:{icon:'🍽️',name:'อาหาร',note:'อาหารและมื้ออาหาร',words:[
    ['rice','ไรซ์','ข้าว','🍚'],['bread','เบรด','ขนมปัง','🍞'],['egg','เอ็ก','ไข่','🥚'],['chicken','ชิค-เคิน','ไก่/เนื้อไก่','🍗'],['fish','ฟิช','ปลา','🐟'],['milk','มิลก์','นม','🥛'],['water','วอ-เทอร์','น้ำ','💧'],['juice','จูซ','น้ำผลไม้','🧃'],['apple','แอป-เพิล','แอปเปิล','🍎'],['banana','บะ-นา-นะ','กล้วย','🍌'],['mango','แมง-โก','มะม่วง','🥭'],['ice cream','ไอซ์ ครีม','ไอศกรีม','🍦']
  ]},
  actions:{icon:'🏃',name:'การกระทำ',note:'กริยาที่ใช้บ่อย',words:[
    ['go','โก','ไป','➡️'],['come','คัม','มา','👋'],['walk','วอล์ก','เดิน','🚶'],['run','รัน','วิ่ง','🏃'],['jump','จัมพ์','กระโดด','🤸'],['sit','ซิท','นั่ง','🪑'],['stand','สแตนด์','ยืน','🧍'],['read','รีด','อ่าน','📖'],['write','ไรท์','เขียน','✍️'],['draw','ดรอ','วาด','🎨'],['play','เพลย์','เล่น','🎮'],['sing','ซิง','ร้องเพลง','🎤']
  ]},
  position:{icon:'📍',name:'ตำแหน่ง',note:'คำบอกตำแหน่ง',words:[
    ['in','อิน','ข้างใน','📥'],['out','เอาต์','ข้างนอก','📤'],['on','ออน','บน','🔝'],['under','อัน-เดอร์','ใต้','⬇️'],['up','อัพ','ขึ้น/ด้านบน','⬆️'],['down','ดาวน์','ลง/ด้านล่าง','⬇️'],['left','เลฟท์','ซ้าย','⬅️'],['right','ไรท์','ขวา','➡️'],['near','เนียร์','ใกล้','📍'],['far','ฟาร์','ไกล','🔭']
  ]},
  describing:{icon:'📏',name:'คำบอกลักษณะ',note:'คำคุณศัพท์พื้นฐาน',words:[
    ['big','บิก','ใหญ่','🐘'],['small','สมอล','เล็ก','🐭'],['long','ลอง','ยาว','📏'],['short','ชอร์ต','สั้น','🤏'],['hot','ฮอท','ร้อน','☀️'],['cold','โคลด์','หนาว/เย็น','🥶'],['good','กูด','ดี','👍'],['bad','แบด','ไม่ดี','👎'],['fast','ฟาสท์','เร็ว','🏎️'],['slow','สโล','ช้า','🐢']
  ]},
  feelings:{icon:'😊',name:'ความรู้สึก',note:'บอกอารมณ์ของตนเอง',words:[
    ['happy','แฮป-พี','มีความสุข','😊'],['sad','แซด','เศร้า','😢'],['angry','แอง-กรี','โกรธ','😠'],['scared','สแคร์ด','กลัว','😨'],['tired','ไทเอิร์ด','เหนื่อย','😴'],['hungry','ฮัง-กรี','หิว','😋'],['thirsty','เธิร์ส-ที','กระหายน้ำ','🥤'],['fine','ไฟน์','สบายดี','🙂']
  ]},
  time:{icon:'📅',name:'วันและเวลา',note:'วันในสัปดาห์และช่วงเวลา',words:[
    ['Monday','มัน-เดย์','วันจันทร์','🌙'],['Tuesday','ทิวซ-เดย์','วันอังคาร','📅'],['Wednesday','เวนซ-เดย์','วันพุธ','📅'],['Thursday','เธิร์ซ-เดย์','วันพฤหัสบดี','📅'],['Friday','ฟราย-เดย์','วันศุกร์','📅'],['Saturday','แซท-เทอร์-เดย์','วันเสาร์','📅'],['Sunday','ซัน-เดย์','วันอาทิตย์','☀️'],['morning','มอร์-นิง','ตอนเช้า','🌅'],['afternoon','อาฟ-เทอร์-นูน','ตอนบ่าย','🌤️'],['night','ไนท์','กลางคืน','🌙']
  ]}
},
p2:{
  people:{icon:'🧑‍⚕️',name:'บุคคลและอาชีพ',note:'คนรอบตัวและอาชีพ',words:[
    ['teacher','ที-เชอร์','ครู','👩‍🏫'],['doctor','ด็อก-เทอร์','แพทย์','🧑‍⚕️'],['nurse','เนิร์ส','พยาบาล','👩‍⚕️'],['police officer','พะ-ลีซ ออฟ-ฟิ-เซอร์','ตำรวจ','👮'],['firefighter','ไฟร์-ไฟ-เทอร์','นักดับเพลิง','🧑‍🚒'],['farmer','ฟาร์ม-เมอร์','ชาวนา/เกษตรกร','🧑‍🌾'],['cook','คุก','พ่อครัว/แม่ครัว','🧑‍🍳'],['driver','ไดร-เวอร์','คนขับรถ','🧑‍✈️'],['dentist','เดน-ทิสท์','ทันตแพทย์','🦷'],['student','สตู-เดนท์','นักเรียน','🧒']
  ]},
  places:{icon:'🏙️',name:'สถานที่',note:'สถานที่ในชุมชน',words:[
    ['school','สคูล','โรงเรียน','🏫'],['hospital','ฮอส-พิ-เทิล','โรงพยาบาล','🏥'],['market','มาร์-เก็ต','ตลาด','🛒'],['park','พาร์ก','สวนสาธารณะ','🏞️'],['library','ไล-แบร-รี','ห้องสมุด','📚'],['restaurant','เรส-เทอ-รองท์','ร้านอาหาร','🍽️'],['bank','แบงก์','ธนาคาร','🏦'],['station','สเต-ชัน','สถานี','🚉'],['shop','ช็อป','ร้านค้า','🏪'],['zoo','ซู','สวนสัตว์','🦁']
  ]},
  transport:{icon:'🚗',name:'การเดินทาง',note:'ยานพาหนะ',words:[
    ['car','คาร์','รถยนต์','🚗'],['bus','บัส','รถโดยสาร','🚌'],['bike','ไบก์','จักรยาน','🚲'],['motorcycle','โม-เทอร์-ไซ-เคิล','รถจักรยานยนต์','🏍️'],['train','เทรน','รถไฟ','🚆'],['boat','โบต','เรือ','⛵'],['plane','เพลน','เครื่องบิน','✈️'],['helicopter','เฮ-ลิ-คอป-เทอร์','เฮลิคอปเตอร์','🚁'],['taxi','แท็ก-ซี','แท็กซี่','🚕'],['truck','ทรัค','รถบรรทุก','🚚']
  ]},
  weather:{icon:'🌦️',name:'อากาศและฤดูกาล',note:'สภาพอากาศ',words:[
    ['sunny','ซัน-นี','แดดออก','🌞'],['cloudy','คลาว-ดี','มีเมฆมาก','☁️'],['rainy','เรน-นี','ฝนตก','🌧️'],['windy','วิน-ดี','มีลม','🌬️'],['hot','ฮอท','ร้อน','☀️'],['cold','โคลด์','หนาว','🥶'],['warm','วอร์ม','อบอุ่น','🌤️'],['storm','สตอร์ม','พายุ','⛈️'],['rain','เรน','ฝน','🌧️'],['rainbow','เรน-โบ','สายรุ้ง','🌈']
  ]},
  calendar:{icon:'🗓️',name:'ปฏิทินและเวลา',note:'เวลาและลำดับวัน',words:[
    ['today','ทู-เดย์','วันนี้','📍'],['tomorrow','ทะ-มอ-โร','พรุ่งนี้','➡️'],['yesterday','เยส-เทอร์-เดย์','เมื่อวาน','⬅️'],['morning','มอร์-นิง','ตอนเช้า','🌅'],['afternoon','อาฟ-เทอร์-นูน','ตอนบ่าย','🌤️'],['evening','อีฟ-นิง','ตอนเย็น','🌆'],['night','ไนท์','กลางคืน','🌙'],['week','วีค','สัปดาห์','🗓️'],['month','มันธ์','เดือน','📆'],['year','เยียร์','ปี','🎆']
  ]},
  actions:{icon:'🏃‍➡️',name:'คำกริยา',note:'การกระทำในชีวิตประจำวัน',words:[
    ['wake up','เวค อัพ','ตื่นนอน','⏰'],['brush','บรัช','แปรง','🪥'],['wash','วอช','ล้าง','🧼'],['eat','อีต','กิน','🍽️'],['drink','ดริงก์','ดื่ม','🥤'],['study','สตัด-ดี','เรียน','📚'],['help','เฮลพ์','ช่วย','🤝'],['carry','แคร์-รี','ถือ/แบก','🎒'],['open','โอ-เพิน','เปิด','📖'],['close','โคลซ','ปิด','📕'],['buy','บาย','ซื้อ','🛒'],['give','กิฟ','ให้','🎁']
  ]},
  adjectives:{icon:'✨',name:'คำบอกลักษณะ',note:'ขยายคน สิ่งของ และสถานที่',words:[
    ['beautiful','บิว-ทิ-ฟูล','สวย','🌸'],['clean','คลีน','สะอาด','✨'],['dirty','เดอร์-ที','สกปรก','🧹'],['heavy','เฮฟ-วี','หนัก','🏋️'],['light','ไลท์','เบา','🪶'],['tall','ทอล','สูง','📏'],['short','ชอร์ต','เตี้ย/สั้น','🤏'],['young','ยัง','อายุน้อย','🧒'],['old','โอลด์','เก่า/แก่','👴'],['quiet','ไคว-เอ็ท','เงียบ','🤫'],['loud','ลาวด์','เสียงดัง','📢'],['kind','ไคนด์','ใจดี','💗']
  ]},
  questions:{icon:'❓',name:'คำถาม',note:'Question words ที่ควรรู้',words:[
    ['what','วอท','อะไร','❓'],['where','แวร์','ที่ไหน','📍'],['who','ฮู','ใคร','🧑'],['when','เวน','เมื่อไร','🕒'],['why','วาย','ทำไม','🤔'],['how','ฮาว','อย่างไร','💡'],['which','วิช','อันไหน','☝️'],['how many','ฮาว เมน-นี','กี่/จำนวนเท่าไร','🔢']
  ]},
  nature:{icon:'🌱',name:'ธรรมชาติ',note:'สิ่งแวดล้อมรอบตัว',words:[
    ['tree','ทรี','ต้นไม้','🌳'],['leaf','ลีฟ','ใบไม้','🍃'],['flower','ฟลาว-เออร์','ดอกไม้','🌸'],['grass','กราส','หญ้า','🌱'],['river','ริฟ-เวอร์','แม่น้ำ','🏞️'],['sea','ซี','ทะเล','🌊'],['mountain','เมาน์-เทิน','ภูเขา','⛰️'],['soil','ซอยล์','ดิน','🪴'],['water','วอ-เทอร์','น้ำ','💧'],['air','แอร์','อากาศ','🌬️']
  ]}
},
p3:{
  reading:{icon:'📖',name:'คำสำหรับการอ่าน',note:'คำที่พบบ่อยในประโยคและเรื่องสั้น',words:[
    ['because','บิ-คอส','เพราะว่า','💭'],['before','บิ-ฟอร์','ก่อน','⬅️'],['after','อาฟ-เทอร์','หลังจาก','➡️'],['first','เฟิร์สท์','อันดับแรก','1️⃣'],['next','เน็กซ์ท์','ถัดไป','➡️'],['then','เด็น','จากนั้น','🔁'],['finally','ไฟ-นะ-ลี','สุดท้าย','🏁'],['always','ออล-เวย์ส','เสมอ','♾️'],['sometimes','ซัม-ไทม์ส','บางครั้ง','🔄'],['never','เนฟ-เวอร์','ไม่เคย','🚫']
  ]},
  verbs:{icon:'🏃',name:'คำกริยา',note:'กริยาสำหรับสร้างประโยค',words:[
    ['learn','เลิร์น','เรียนรู้','📚'],['teach','ทีช','สอน','👩‍🏫'],['think','ธิงก์','คิด','🧠'],['know','โน','รู้','💡'],['understand','อัน-เดอร์-สแตนด์','เข้าใจ','✅'],['choose','ชูซ','เลือก','☝️'],['answer','แอน-เซอร์','ตอบ','💬'],['ask','อาสก์','ถาม','❓'],['build','บิลด์','สร้าง','🧱'],['make','เมค','ทำ/สร้าง','🛠️'],['change','เชนจ์','เปลี่ยน','🔄'],['protect','โพร-เทคท์','ปกป้อง','🛡️']
  ]},
  science:{icon:'🔬',name:'วิทยาศาสตร์',note:'คำพื้นฐานทางวิทยาศาสตร์',words:[
    ['plant','แพลนท์','พืช','🌱'],['animal','แอน-นิ-มัล','สัตว์','🐾'],['water','วอ-เทอร์','น้ำ','💧'],['air','แอร์','อากาศ','🌬️'],['light','ไลท์','แสง','💡'],['heat','ฮีท','ความร้อน','🔥'],['magnet','แมก-เน็ต','แม่เหล็ก','🧲'],['energy','เอน-เนอร์-จี','พลังงาน','⚡'],['Earth','เอิร์ธ','โลก','🌍'],['moon','มูน','ดวงจันทร์','🌙'],['sun','ซัน','ดวงอาทิตย์','☀️'],['environment','เอนไว-รัน-เมินท์','สิ่งแวดล้อม','🌿']
  ]},
  community:{icon:'🏙️',name:'ชุมชน',note:'สถานที่และบริการในชุมชน',words:[
    ['community','คะ-มิว-นิ-ที','ชุมชน','🏘️'],['hospital','ฮอส-พิ-เทิล','โรงพยาบาล','🏥'],['library','ไล-แบร-รี','ห้องสมุด','📚'],['museum','มิว-เซียม','พิพิธภัณฑ์','🏛️'],['station','สเต-ชัน','สถานี','🚉'],['airport','แอร์-พอร์ต','สนามบิน','🛫'],['restaurant','เรส-เทอ-รองท์','ร้านอาหาร','🍽️'],['supermarket','ซู-เพอร์-มาร์-เก็ต','ซูเปอร์มาร์เก็ต','🛒'],['police station','พะ-ลีซ สเต-ชัน','สถานีตำรวจ','👮'],['post office','โพสต์ ออฟ-ฟิศ','ที่ทำการไปรษณีย์','📮']
  ]},
  technology:{icon:'💻',name:'เทคโนโลยี',note:'อุปกรณ์และการใช้เทคโนโลยี',words:[
    ['computer','คอม-พิว-เทอร์','คอมพิวเตอร์','💻'],['tablet','แท็บ-เล็ต','แท็บเล็ต','📱'],['screen','สกรีน','หน้าจอ','🖥️'],['keyboard','คีย์-บอร์ด','แป้นพิมพ์','⌨️'],['mouse','เมาส์','เมาส์','🖱️'],['camera','แคม-เมอ-รา','กล้อง','📷'],['internet','อิน-เทอร์-เน็ต','อินเทอร์เน็ต','🌐'],['message','เมส-เสจ','ข้อความ','💬'],['password','พาส-เวิร์ด','รหัสผ่าน','🔐'],['online','ออน-ไลน์','ออนไลน์','🌐']
  ]},
  health:{icon:'❤️',name:'สุขภาพ',note:'การดูแลร่างกาย',words:[
    ['healthy','เฮล-ธี','สุขภาพดี','💚'],['exercise','เอ็ก-เซอร์-ไซซ','ออกกำลังกาย','🏃'],['sleep','สลีป','นอนหลับ','😴'],['rest','เรสท์','พักผ่อน','🛌'],['medicine','เมด-ดิ-ซิน','ยา','💊'],['doctor','ด็อก-เทอร์','แพทย์','🧑‍⚕️'],['dentist','เดน-ทิสท์','ทันตแพทย์','🦷'],['toothbrush','ทูธ-บรัช','แปรงสีฟัน','🪥'],['soap','โซพ','สบู่','🧼'],['clean','คลีน','สะอาด','✨']
  ]},
  environment:{icon:'♻️',name:'สิ่งแวดล้อม',note:'ดูแลโลกและทรัพยากร',words:[
    ['recycle','รี-ไซ-เคิล','รีไซเคิล','♻️'],['reuse','รี-ยูซ','นำกลับมาใช้ซ้ำ','🔁'],['reduce','รี-ดิวซ','ลดการใช้','⬇️'],['trash','แทรช','ขยะ','🗑️'],['plastic','พลาส-ติก','พลาสติก','🥤'],['paper','เพ-เพอร์','กระดาษ','📄'],['water','วอ-เทอร์','น้ำ','💧'],['forest','ฟอ-ริสท์','ป่า','🌲'],['ocean','โอ-เชิน','มหาสมุทร','🌊'],['protect','โพร-เทคท์','ปกป้อง','🛡️']
  ]},
  directions:{icon:'🧭',name:'ทิศทางและตำแหน่ง',note:'ใช้บอกทางและตำแหน่ง',words:[
    ['left','เลฟท์','ซ้าย','⬅️'],['right','ไรท์','ขวา','➡️'],['straight','สเตรท','ตรงไป','⬆️'],['near','เนียร์','ใกล้','📍'],['far','ฟาร์','ไกล','🔭'],['between','บิ-ทวีน','ระหว่าง','↔️'],['behind','บิ-ไฮนด์','ด้านหลัง','🔙'],['in front of','อิน ฟรอนท์ ออฟ','ด้านหน้า','🔜'],['next to','เน็กซ์ท ทู','ถัดจาก/ข้าง ๆ','↔️'],['across from','อะ-ครอส ฟรอม','ตรงข้าม','↔️']
  ]},
  adjectives:{icon:'🌟',name:'คำบอกลักษณะ',note:'คำคุณศัพท์ที่ใช้ในการอ่าน',words:[
    ['strong','สตรอง','แข็งแรง','💪'],['weak','วีค','อ่อนแอ','🪶'],['easy','อี-ซี','ง่าย','✅'],['difficult','ดิฟ-ฟิ-เคิลท์','ยาก','🧩'],['important','อิม-พอร์-แทนท์','สำคัญ','⭐'],['different','ดิฟ-เฟอ-เรนท์','แตกต่าง','🔀'],['same','เซม','เหมือนกัน','🟰'],['safe','เซฟ','ปลอดภัย','🛡️'],['dangerous','เดน-เจอ-รัส','อันตราย','⚠️'],['careful','แคร์-ฟูล','ระมัดระวัง','👀']
  ]}
}
};

function speakWord(word){
  if(!('speechSynthesis' in window))return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(word);u.lang='en-US';u.rate=.72;u.pitch=1.05;speechSynthesis.speak(u);
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function addStyles(){
  if(document.getElementById('ppVocabGradeStyle'))return;
  const st=document.createElement('style');st.id='ppVocabGradeStyle';st.textContent=`
  .vGradeIntro{display:flex;align-items:center;gap:10px;margin:10px 0 12px;padding:11px 13px;border-radius:17px;background:#fff7d8;color:#625777;font:12px 'Noto Sans Thai';border:1px solid #f0e7bd}.vGradeIntro b{font-family:Mali}.vCategoryGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:8px 0 18px}.vCatCard{border:1px solid #ebe5f3;border-radius:20px;padding:13px 11px;background:#fff;color:#453b61;text-align:left;cursor:pointer;box-shadow:0 7px 20px #493a7010;min-height:112px;transition:.16s}.vCatCard:hover{transform:translateY(-2px);box-shadow:0 10px 25px #493a7018}.vCatCard .ico{font-size:30px;display:block;margin-bottom:6px}.vCatCard b{display:block;font-size:.82rem}.vCatCard small{display:block;margin-top:3px;color:#827990;font:10px 'Noto Sans Thai'}.vCatCard em{display:inline-block;margin-top:7px;padding:4px 7px;border-radius:999px;background:#f4f0fb;color:#695b8e;font:700 9px Mali;font-style:normal}.vBackCats{border:0;border-radius:999px;padding:8px 11px;background:#f1edff;color:#5c4f86;font:700 .7rem Mali;cursor:pointer}.cats{display:none!important}.levels{padding-bottom:4px!important}.vocabCategoryMode .hero{margin-bottom:12px}.vocabCategoryMode .hint{display:none}.vocabCategoryMode .sectionTitle{margin-top:10px}@media(max-width:850px){.vCategoryGrid{grid-template-columns:repeat(3,1fr)}}@media(max-width:600px){.vCategoryGrid{grid-template-columns:repeat(2,1fr);gap:8px}.vCatCard{min-height:104px;padding:11px 9px}.vCatCard .ico{font-size:27px}}
  `;document.head.appendChild(st);
}
function apply(){
  const cfg=CURRICULUM[grade]||CURRICULUM.k;
  addStyles();document.body.classList.add('vocabCategoryMode');
  const levels=document.getElementById('levels');
  if(levels){levels.innerHTML=`<span class="pill on" style="cursor:default">🎒 ${gradeNames[grade]} · เลือกจากหน้าแรกแล้ว</span>`;levels.style.overflow='visible'}
  const cats=document.getElementById('cats');
  if(cats)cats.innerHTML='';
  const top=document.querySelector('.top p');if(top)top.textContent=`คลังคำศัพท์ ${gradeNames[grade]} · แบ่งเป็นหมวดให้เรียนทีละชุด`;
  const hero=document.querySelector('.hero p');if(hero)hero.textContent=`เลือกหมวดคำศัพท์สำหรับ ${gradeNames[grade]} แล้วฝึกฟัง–อ่าน–พูดทีละชุด`;
  const hint=document.querySelector('.hint');
  if(hint){hint.insertAdjacentHTML('afterend',`<div class="vGradeIntro"><span>💡</span><div><b>เรียนเป็นหมวด จำง่ายกว่า</b><br>แต่ละหมวดเป็นชุดคำที่ควรรู้ของ ${gradeNames[grade]} ไม่รวมคำจากชั้นอื่น</div></div>`)}
  const title=document.getElementById('title'),count=document.getElementById('count'),grid=document.getElementById('grid');
  const categoryWrap=document.createElement('section');categoryWrap.className='vCategoryGrid';categoryWrap.id='vCategoryGrid';
  Object.entries(cfg).forEach(([key,c])=>{
    const b=document.createElement('button');b.className='vCatCard';b.dataset.catKey=key;b.innerHTML=`<span class="ico">${c.icon}</span><b>${c.name}</b><small>${c.note}</small><em>${c.words.length} คำ</em>`;categoryWrap.appendChild(b)
  });
  const intro=document.querySelector('.vGradeIntro');if(intro)intro.insertAdjacentElement('afterend',categoryWrap);else document.querySelector('.sectionTitle')?.insertAdjacentElement('beforebegin',categoryWrap);
  function showCategories(){categoryWrap.style.display='grid';grid.innerHTML='';if(title)title.textContent=`หมวดคำศัพท์ ${gradeNames[grade]}`;if(count)count.textContent=Object.keys(cfg).length+' หมวด'}
  function showCategory(key){
    const c=cfg[key];if(!c)return;categoryWrap.style.display='none';
    if(title)title.innerHTML=`<button class="vBackCats" id="vBackCats">← หมวดทั้งหมด</button> &nbsp; ${c.icon} ${c.name}`;
    if(count)count.textContent=c.words.length+' คำ';
    grid.innerHTML=c.words.map(w=>`<button class="word" data-say="${esc(w[0])}"><span class="sound">🔊</span><div class="pic">${w[3]}</div><div class="en">${esc(w[0])}</div><div class="read">คำอ่าน: ${esc(w[1])}</div><div class="th">แปล: ${esc(w[2])}</div></button>`).join('');
    grid.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>speakWord(b.dataset.say));
    document.getElementById('vBackCats').onclick=showCategories;
    window.scrollTo({top:Math.max(0,(document.querySelector('.sectionTitle')?.offsetTop||0)-85),behavior:'smooth'});
  }
  categoryWrap.querySelectorAll('[data-cat-key]').forEach(b=>b.onclick=()=>showCategory(b.dataset.catKey));
  showCategories();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,10));else setTimeout(apply,10);
})();