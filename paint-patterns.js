/* Vector tiles shared by the palette, SVG bucket fills and canvas brushes. */
(()=>{
  'use strict';
  const node=(tag,attrs,children=[])=>({tag,attrs,children});
  const rect=(x,y,w,h,fill,rx=0)=>node('rect',{x,y,width:w,height:h,rx,fill});
  const circle=(cx,cy,r,fill)=>node('circle',{cx,cy,r,fill});
  const ellipse=(cx,cy,rx,ry,fill,stroke,sw=2)=>node('ellipse',{cx,cy,rx,ry,fill,...(stroke?{stroke,'stroke-width':sw}:{})});
  const path=(d,fill='none',stroke,sw=2)=>node('path',{d,fill,...(stroke?{stroke,'stroke-width':sw,'stroke-linecap':'round','stroke-linejoin':'round'}:{})});
  const at=(x,y,scale,children,angle=0)=>node('g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${scale})`},children);
  const star=(fill='#ffcd53')=>path('M0-17 4-5 17-5 7 3 10 16 0 9-10 16-7 3-17-5-4-5Z',fill);
  const heart=(fill)=>path('M0 14C-24-1-14-21 0-10C14-21 24-1 0 14Z',fill);
  const sparkle=(x,y,color='#fff',scale=.3)=>at(x,y,scale,[path('M0-14 4-4 14 0 4 4 0 14-4 4-14 0-4-4Z',color)]);
  const flower=(petal,center)=>[
    ...Array.from({length:6},(_,i)=>at(0,0,1,[ellipse(0,-10,6,9,petal)],i*60)),circle(0,0,5,center)
  ];
  const leaf=(fill)=>[path('M-12 12Q-18-12 13-15Q18 9-12 12Z',fill),path('M-10 10 10-11','none','#ffffffb3',1.7)];
  const cloud=(fill='#fff')=>[path('M-14 11C-26 10-24-5-13-6C-11-20 10-19 13-6C27-7 26 11 14 11Z',fill)];
  const bow=(fill)=>[path('M-3 0C-25-25-26 23-3 5L-11 18-1 15 0 4 2 15 12 18 4 5C27 24 25-25 3 0Z',fill),ellipse(0,2,4,5,'#fff4f7')];
  const defs=[];
  const add=(id,name,group,bg,shapes,tip,accent)=>{
    defs.push({id,name,group,width:48,height:48,tip:tip||bg,nodes:[rect(0,0,48,48,bg),...shapes,...(accent?[circle(6,7,1.8,accent),circle(42,41,1.8,accent)]:[])]});
  };
  const motif=(id,name,group,bg,shapes,tip,accent)=>add(id,name,group,bg,[at(24,24,1,shapes)],tip,accent);

  // Magic and space.
  add('rainbow','สายรุ้ง','magic','#fff',Array.from({length:6},(_,i)=>rect(i*8,0,8,48,['#ff7a9c','#ffbb73','#ffe57c','#8bddb5','#83cdf0','#b39aef'][i])),'#b39aef');
  motif('stars','ดาววิบวับ','magic','#7048e8',[star(),sparkle(-17,-16,'#fff',.22),sparkle(18,15,'#fff',.2)],'#ffd43b');
  add('stardust','ละอองดาว','magic','#251c62',[sparkle(13,13,'#ffe495',.7),sparkle(36,34,'#dfa9f4',.5),circle(34,10,2,'#bfe9ff'),circle(10,35,1.8,'#fff'),circle(25,25,1,'#fff')],'#a599f5');
  motif('planets','ดาวเสาร์พาสเทล','magic','#ede9ff',[ellipse(0,0,21,7,'none','#c091e8',3),circle(0,0,12,'#f7c4db'),path('M-20 2Q0 14 20-2','none','#a77cdb',3),sparkle(15,-15,'#d1a32e',.2)],'#c091e8');
  motif('moon','พระจันทร์ฝันดี','magic','#dce8fb',[path('M7-16C-17-22-27 12-3 17C11 21 19 7 17 3C2 12-9-5 7-16Z','#ffeaaa'),sparkle(15,-11,'#fff',.35),circle(-18,-15,2,'#a6bee9')],'#ffeaaa');
  motif('shooting-stars','ดาวตก','magic','#ddeefa',[path('M-18 15 8-11M-12 20 13-5','none','#c4abea',4),at(10,-9,.67,[star('#ffd170')]),sparkle(-15,-15,'#fff',.22)],'#ffd170');
  add('aurora','แสงออโรรา','magic','#3f497e',[path('M-10 44Q4-5 17 10T35 6T61-5','none','#9fe1ca',10),path('M-7 52Q12 9 26 20T53 11','none','#bcb1ee',7),sparkle(9,8,'#fff',.19),sparkle(38,35,'#fff',.24)],'#9fe1ca');
  motif('crystals','อัญมณีเจ้าหญิง','magic','#f4e6ff',[path('M-15-8-7-17 8-17 16-8 0 17Z','#bf9de8'),path('M-15-8H16L0 17Z','#d8b6f4'),path('M-7-17 0-8 8-17M0-8V17','none','#ffffffb3',1.5),sparkle(-17,15,'#e993c0',.26)],'#bf9de8');

  // Sweet treats and ribbons.
  motif('hearts','หัวใจชมพู','sweet','#f06595',[at(0,0,.85,[heart('#fff')])],'#f06595','#ffcde0');
  motif('bows','โบว์ริบบิ้น','sweet','#fff0f5',[at(0,0,.85,bow('#ed96b8'))],'#ed96b8','#efbfd1');
  motif('candy','ลูกอมสายหวาน','sweet','#e9f5fb',[path('M-10-6-20-12V11L-10 6M10-6 20-12V11L10 6Z','#c3a4eb'),ellipse(0,0,12,9,'#ffb0c9'),path('M-5-8 2 8M2-8 9 5','none','#fff4f7',3)],'#ffb0c9','#badce7');
  motif('strawberries','สตรอว์เบอร์รี','sweet','#ffedf0',[path('M-13-7Q-19 5 0 19Q19 5 13-7Z','#f57993'),path('M0-16 3-9 12-12 8-5-8-5-12-12-3-9Z','#78bb82'),...[-6,0,6].map((x,i)=>ellipse(x,i%2?8:2,1.2,2,'#fff3c4'))],'#f57993','#f5c5d3');
  motif('cherries','เชอร์รีคู่','sweet','#fff5e6',[path('M-10 6Q-8-7 1-14Q10-5 12 6','none','#75a36d',2.5),at(8,-13,.55,leaf('#8ecb88')),circle(-10,10,8,'#ed8599'),circle(12,10,8,'#f49eb2'),circle(-12,7,2,'#ffe6ec'),circle(10,7,2,'#ffe6ec')],'#ed8599','#f2d4b4');
  motif('lemons','เลมอนสดใส','sweet','#edf7e5',[path('M-17 0Q-9-20 11-10L18 0Q11 18-10 11Z','#ffdb73'),path('M-10-3Q-2-10 7-7','none','#fff0bb',3),at(10,-14,.5,leaf('#94bf76'))],'#ffdb73','#bad49b');
  motif('watermelon','แตงโมหวานฉ่ำ','sweet','#e7f5ef',[path('M-19-10Q0 31 19-10Z','#82cfa0'),path('M-15-9Q0 23 15-9Z','#ffeec5'),path('M-12-8Q0 18 12-8Z','#f492ab'),ellipse(-5,-2,1.2,2,'#73545a'),ellipse(5,-2,1.2,2,'#73545a'),ellipse(0,6,1.2,2,'#73545a')],'#f492ab','#b1dbbe');
  motif('icecream','ไอศกรีมพาสเทล','sweet','#f1eaff',[path('M-10 0H10L0 20Z','#eac393'),path('M-7 5 5 9M-4 10 3 13','none','#cfa77d',1.5),path('M-12 1C-18-6-8-18 0-13C8-18 18-6 12 1Z','#ffb4d0'),circle(-5,-5,1.3,'#fff'),circle(5,-6,1.3,'#f17f96')],'#ffb4d0','#d3bbe9');

  // Garden patterns.
  motif('daisies','เดซีน้อย','garden','#dff1eb',flower('#fffdf4','#ffd176'),'#ffd176','#9ccdb9');
  motif('blossoms','ดอกซากุระ','garden','#fff0f6',flower('#f6b7d2','#d784aa'),'#f6b7d2','#ebc5da');
  motif('tulips','สวนทิวลิป','garden','#f4f3e4',[path('M0 17V-2','none','#84b18b',3),path('M0 12Q-14 10-13 1Q-1 2 0 12Z','#98c397'),path('M0 7Q13 6 13-2Q2-2 0 7Z','#b3d2a1'),path('M-13-17-5-10 0-20 5-10 13-17Q17 3 0 2Q-17 3-13-17Z','#f3a4b3')],'#f3a4b3');
  motif('leaves','ใบไม้ละมุน','garden','#e5f2dc',[at(-5,4,.75,leaf('#88b89c'),-25),at(8,-5,.55,leaf('#b1ce87'),20)],'#88b89c','#c8dba9');
  motif('butterflies','ผีเสื้อพาสเทล','garden','#f3ecff',[path('M0-3C-24-29-23 13-2 3C-22 7-9 25 0 8C9 25 22 7 2 3C23 13 24-29 0-3Z','#c4a6ec'),ellipse(-10,-6,4,5,'#f4bed8'),ellipse(10,-6,4,5,'#f4bed8'),path('M0-4V10M0-4-4-11M0-4 4-11','none','#8970ab',2)],'#c4a6ec','#d3c1eb');
  motif('clover','โคลเวอร์โชคดี','garden','#eef7e6',[at(-6,-7,.48,[heart('#8ac6a0')],-45),at(6,-7,.48,[heart('#8ac6a0')],45),at(-6,5,.48,[heart('#a7d4a5')],-135),at(6,5,.48,[heart('#a7d4a5')],135),path('M0 0Q-1 13 6 18','none','#72aa84',2)],'#8ac6a0','#c8dfb6');
  motif('sunflowers','ทานตะวัน','garden','#fff5d9',[...Array.from({length:10},(_,i)=>at(0,0,1,[ellipse(0,-11,4,8,'#ffd479')],i*36)),circle(0,0,7,'#b79472'),circle(-2,-2,1.5,'#f7dca9'),circle(3,2,1.5,'#f7dca9')],'#ffd479','#efdb9c');
  motif('mushrooms','เห็ดในนิทาน','garden','#f0eedf',[rect(-5,-1,10,18,'#fff7de',4),path('M-18 0Q-15-29 0-19Q15-29 18 0Z','#e79b9d'),circle(-8,-7,3.2,'#fff4e9'),circle(5,-11,3.8,'#fff4e9'),circle(12,-3,2,'#fff4e9')],'#e79b9d','#cecba4');

  // Under the sea.
  add('ocean','คลื่นทะเล','sea','#dff8ff',[path('M0 13Q12 2 24 13T48 13V48H0Z','#80c7ea'),path('M0 23Q12 12 24 23T48 23','none','#fff',3),path('M0 38Q12 27 24 38T48 38','none','#b5e7f1',3)],'#80c7ea');
  add('bubbles','ฟองสบู่','sea','#e0f4f7',[circle(15,15,10,'#b8e5ee'),ellipse(15,15,10,10,'none','#fff',1.5),circle(34,35,7,'#c9d7f4'),ellipse(34,35,7,7,'none','#fff',1.5),path('M10 13Q10 8 16 8M31 34Q31 31 35 31','none','#fff',2)],'#b8e5ee');
  add('scales','เกล็ดนางเงือก','sea','#c1dbe9',[
    ...[0,24,48].flatMap((y,i)=>[-24,0,24,48].map(x=>path(`M${x+(i%2)*12-12} ${y}a12 12 0 0 0 24 0`,['#e3d2f3','#bce6df','#c1dbe9'][i],'#fff5',1.5)))
  ],'#c1b4e7');
  motif('shells','เปลือกหอยมุก','sea','#f6eef8',[path('M-17 7C-24-1-12-24 0-17C12-24 24-1 17 7L5 17H-5Z','#eab6d0'),path('M0-15V13M-10-12-3 13M10-12 3 13M-17-4-6 13M17-4 6 13','none','#fff3fa',1.6)],'#eab6d0','#d9c7e3');
  motif('coral','ปะการังสีหวาน','sea','#e3f4ef',[path('M0 19V-16M0 6Q-14 6-14-8M0-4Q12-4 12-15M-14 0Q-20 0-20-7M12-7Q19-7 19-13','none','#efa1b1',5),circle(16,15,2,'#f6d999')],'#efa1b1','#a6d6c9');
  motif('fish','ปลาน้อย','sea','#e4f5fa',[path('M10 0 21-9V9Z','#9bbdde'),ellipse(-2,0,15,10,'#ffc599'),circle(-9,-2,2,'#5e7393'),path('M0-7 5 0 0 7','none','#fff1d7',2),circle(-18,-14,2,'#badfea')],'#ffc599','#badfea');
  motif('jellyfish','แมงกะพรุนน้อย','sea','#ebeefa',[path('M-9 2Q-17 13-8 18M0 3Q7 12 0 21M9 2Q18 13 9 18','none','#b49cda',2.5),path('M-16 2Q-17-22 0-19Q17-22 16 2Q12 7 8 2Q4 7 0 2Q-4 7-8 2Q-12 7-16 2Z','#d6bced'),ellipse(-5,-7,3,6,'#ede0fa')],'#d6bced','#d4d9ed');
  add('pearls','ไข่มุกประกาย','sea','#f9eef4',[circle(13,13,8,'#e6d6e8'),circle(11,11,6,'#fff8ef'),circle(33,35,6,'#ecdace'),circle(31,33,4,'#fff8ef'),sparkle(36,9,'#c1a3c7',.26),sparkle(11,36,'#c1a3c7',.18)],'#e6d6e8');

  // Fabric and repeating shapes.
  add('dots','ลายจุดลูกกวาด','fabric','#ff9fc5',[circle(12,12,6,'#fff'),circle(36,36,5,'#ffd43b')],'#ff9fc5');
  add('stripes','ลายทางสดใส','fabric','#fff',[-48,-24,0,24,48,72].map(x=>path(`M${x} 0l48 48h12l-48-48Z`,x%48===0?'#8bcdee':'#f6afcb')),'#8bcdee');
  add('checker','ตารางพาสเทล','fabric','#fff',[rect(0,0,24,24,'#cdbbff'),rect(24,24,24,24,'#a7e9f5')],'#b7a1e4');
  add('confetti','คอนเฟตตี','fabric','#fff9e8',[at(10,13,1,[rect(-3,-7,6,14,'#ff9aab',2)],-25),circle(34,10,4,'#83c8ef'),at(33,34,1,[rect(-7,-3,14,6,'#9fdbbc',2)],20),circle(11,35,3,'#b69bdf')],'#ff9aab');
  add('zigzag','ซิกแซกพาสเทล','fabric','#fff7ee',[path('M-12 4 0 16 12 4 24 16 36 4 48 16 60 4','none','#ddb7e9',7),path('M-12 28 0 40 12 28 24 40 36 28 48 40 60 28','none','#a9ddcc',7)],'#ddb7e9');
  add('gingham','ผ้าปิกนิก','fabric','#fff5f4',[rect(0,0,12,48,'#f5c8d8'),rect(24,0,12,48,'#f5c8d8'),rect(0,0,48,12,'#efafca66'),rect(0,24,48,12,'#efafca66')],'#efafca');
  add('pastel-dots','จุดสีมาร์ชแมลโลว์','fabric','#fff9f2',[circle(12,12,7,'#efbdd6'),circle(36,12,7,'#b8dfd1'),circle(12,36,7,'#e5d59b'),circle(36,36,7,'#b8ccec')],'#efbdd6');
  add('honeycomb','รังผึ้งน้ำผึ้ง','fabric','#fff0cc',[-1,0,1,2].flatMap(row=>[-1,0,1,2].map(col=>at(col*24+(row%2)*12,row*21,1,[path('M-12-7 0-14 12-7V7L0 14-12 7Z','none','#e3bd78',1.7)]))),'#e3bd78');

  // Playful little motifs.
  motif('clouds','เมฆฟูฟ่อง','play','#cfeafa',[...cloud(),ellipse(-6,2,1.4,1.8,'#96b9ca'),ellipse(6,2,1.4,1.8,'#96b9ca'),path('M-3 6Q0 9 3 6','none','#96b9ca',1.5)],'#fff','#a7d1e3');
  motif('sunshine','แดดอุ่นอุ่น','play','#fff3d6',[...Array.from({length:8},(_,i)=>at(0,0,1,[path('M0-14V-18','none','#e8b45e',2.5)],i*45)),circle(0,0,11,'#ffda83'),ellipse(-4,0,1.2,1.7,'#bc9358'),ellipse(4,0,1.2,1.7,'#bc9358'),path('M-3 5Q0 8 3 5','none','#bc9358',1.5)],'#ffda83');
  motif('snowflakes','เกล็ดหิมะ','play','#dbeaf7',Array.from({length:6},(_,i)=>at(0,0,1,[path('M0 0V-18M0-10-5-14M0-10 5-14','none','#fff',2)],i*60)),'#aacfe9','#bed5ea');
  motif('balloons','ลูกโป่งวันเกิด','play','#f6edff',[path('M-4 3Q-12 14-6 21M9-3Q15 8 8 20','none','#c4b6d6',1.4),ellipse(-7,-8,8,11,'#ecabd2'),ellipse(10,-14,7,9,'#b3dcca'),path('M-10-13Q-8-17-5-16','none','#fff1f8',2)],'#ecabd2','#d7c6e9');
  motif('pawprints','อุ้งเท้านุ่มนิ่ม','play','#f8efe9',[path('M-12 11Q-15 3-6-2Q0-9 6-2Q15 3 12 11Q8 17 0 12Q-8 17-12 11Z','#c1a4aa'),ellipse(-14,-4,4,5,'#c1a4aa'),ellipse(-5,-12,4,5,'#c1a4aa'),ellipse(5,-12,4,5,'#c1a4aa'),ellipse(14,-4,4,5,'#c1a4aa')],'#c1a4aa','#e3cfd0');
  motif('music','เพลงของหนู','play','#edeafa',[path('M-4 10V-13L15-18V5M-4-8 15-13','none','#ae98da',3),ellipse(-9,11,6,4,'#ae98da'),ellipse(10,6,6,4,'#ae98da'),sparkle(-16,-14,'#e3b1cf',.25)],'#ae98da','#d2c2e5');
  add('tiny-hearts','หัวใจสีหวาน','play','#fff7f4',[at(13,14,.45,[heart('#f0aac1')]),at(36,35,.4,[heart('#c5b3e6')]),circle(35,11,2,'#e3d29e'),circle(11,36,2,'#a9d6c6')],'#f0aac1');
  add('sprinkles','เกล็ดน้ำตาล','play','#fff0f6',[at(10,12,1,[rect(-2,-5,4,10,'#98cbdf',2)],-30),at(32,10,1,[rect(-2,-5,4,10,'#bda6df',2)],35),at(13,34,1,[rect(-2,-5,4,10,'#f3c775',2)],45),at(36,33,1,[rect(-2,-5,4,10,'#90c5ad',2)],-20),circle(24,24,2,'#eb9fba')],'#eb9fba');

  const groups=[
    {id:'magic',name:'ดาวและเวทมนตร์'}, {id:'sweet',name:'ขนมและของหวาน'},
    {id:'garden',name:'สวนดอกไม้'}, {id:'sea',name:'โลกใต้ทะเล'},
    {id:'fabric',name:'ลายผ้าและสีสัน'}, {id:'play',name:'ลายน่ารัก'}
  ];
  const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  const serialize=n=>`<${n.tag} ${Object.entries(n.attrs).map(([k,v])=>`${k}="${escape(v)}"`).join(' ')}>${n.children.map(serialize).join('')}</${n.tag}>`;
  const markup=def=>def.nodes.map(serialize).join('');
  const svgTile=def=>`<svg xmlns="http://www.w3.org/2000/svg" width="${def.width}" height="${def.height}" viewBox="0 0 ${def.width} ${def.height}">${markup(def)}</svg>`;
  const byId=new Map(defs.map(def=>[def.id,def]));
  const paints=defs.map(def=>({value:`pattern:${def.id}`,name:def.name,group:def.group,tip:def.tip,preview:`url("data:image/svg+xml,${encodeURIComponent(svgTile(def))}")`}));
  function svgPatterns(prefix){
    return defs.map(def=>`<pattern id="${prefix}-${def.id}" width="${def.width}" height="${def.height}" patternUnits="userSpaceOnUse">${markup(def)}</pattern>`).join('');
  }
  function drawNode(context,n){
    context.save();
    const a=n.attrs;
    if(n.tag==='g'){
      for(const match of a.transform.matchAll(/(translate|rotate|scale)\(([^)]+)\)/g)){
        const values=match[2].trim().split(/[\s,]+/).map(Number);
        if(match[1]==='translate')context.translate(values[0],values[1]||0);
        if(match[1]==='rotate')context.rotate(values[0]*Math.PI/180);
        if(match[1]==='scale')context.scale(values[0],values[1]??values[0]);
      }
      n.children.forEach(child=>drawNode(context,child));
    }else{
      const shape=new Path2D(n.tag==='path'?a.d:undefined);
      if(n.tag==='rect'){
        const{x,y,width:w,height:h,rx:r}=a;
        if(r){shape.moveTo(x+r,y);shape.lineTo(x+w-r,y);shape.quadraticCurveTo(x+w,y,x+w,y+r);shape.lineTo(x+w,y+h-r);shape.quadraticCurveTo(x+w,y+h,x+w-r,y+h);shape.lineTo(x+r,y+h);shape.quadraticCurveTo(x,y+h,x,y+h-r);shape.lineTo(x,y+r);shape.quadraticCurveTo(x,y,x+r,y);shape.closePath();}
        else shape.rect(x,y,w,h);
      }
      if(n.tag==='circle')shape.arc(a.cx,a.cy,a.r,0,Math.PI*2);
      if(n.tag==='ellipse')shape.ellipse(a.cx,a.cy,a.rx,a.ry,0,0,Math.PI*2);
      if(a.fill&&a.fill!=='none'){context.fillStyle=a.fill;context.fill(shape);}
      if(a.stroke){context.strokeStyle=a.stroke;context.lineWidth=a['stroke-width']||1;context.lineCap=a['stroke-linecap']||'butt';context.lineJoin=a['stroke-linejoin']||'miter';context.stroke(shape);}
    }
    context.restore();
  }
  function canvasTile(id,scale=1){
    const def=byId.get(id);
    if(!def)return null;
    const canvas=document.createElement('canvas');
    canvas.width=Math.round(def.width*scale);canvas.height=Math.round(def.height*scale);
    const context=canvas.getContext('2d');
    context.scale(canvas.width/def.width,canvas.height/def.height);
    def.nodes.forEach(n=>drawNode(context,n));
    return canvas;
  }
  window.PunPinPatterns={paints,groups,svgPatterns,canvasTile};
})();
