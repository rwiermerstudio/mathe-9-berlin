export const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const n=x=>new Intl.NumberFormat('de-DE',{maximumFractionDigits:3}).format(x);
const text=(x,y,s,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}">${escapeHTML(s)}</text>`;
const line=(x1,y1,x2,y2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
const rect=(x,y,w,h,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
const near=(a,b)=>Math.abs(a-b)<1e-8;
export const figureDefinitions=[
 {id:'wurzel',topic:'zahlen',title:'Eine Wurzel zwischen Quadratzahlen',label:'Zahl unter der Wurzel N',min:2,max:50,step:1,value:11,prompt:'Vermute zuerst: Wann springt die größte ganze Zahl k um eins? Verändere dann N. Der Punkt zeigt √N auf der Zahlengeraden; die Beschriftung nennt die begrenzenden Quadrate.'},
 {id:'binom',topic:'gleichungen',title:'Warum der gemischte Term zweimal vorkommt',label:'Seitenanteil x (Längeneinheiten)',min:1,max:8,step:1,value:4,prompt:'Verändere x; der zweite Seitenanteil bleibt 3. Das große Quadrat besteht aus einem x²-Quadrat, zwei Rechtecken mit Fläche 3x und einem 9-Quadrat. Die Flächen sind maßstäblich; Farben sind zusätzlich durch Texte bezeichnet.'},
 {id:'gerade',topic:'linear',title:'Steigung und Steigungsdreieck',label:'Steigung m bei festem b = 2',min:-3,max:3,step:1,value:2,prompt:'Was geschieht bei negativem m, und was bei m = 0? Der waagerechte Schritt beträgt immer 2. Der senkrechte Schritt ist 2m. Der Punkt (0|2) bleibt fest. Die Achsen sind unterschiedlich skaliert: Rechne mit Koordinaten, nicht mit dem gezeichneten Neigungswinkel.'},
 {id:'parabel',topic:'quadratisch',title:'Scheitel und Spiegelpunkte verschieben',label:'Scheitelkoordinate h bei a = 1 und k = −2',min:-3,max:3,step:1,value:1,prompt:'Verschiebe h und vergleiche die beiden markierten Punkte im Abstand 2 zum Scheitel. Ihre Höhe bleibt gleich. Die gestrichelte senkrechte Linie ist die Symmetrieachse, keine zusätzliche Funktion.'},
 {id:'dreieck',topic:'trigonometrie',title:'Ein Winkel bestimmt die Seitenverhältnisse',label:'Winkel α in Grad, Hypotenuse c = 7 cm',min:20,max:70,step:5,value:30,prompt:'Die Hypotenuse bleibt 7 cm lang. Vergrößere α: Welche Kathete wächst? Das maßstäbliche Dreieck zeigt Gegenkathete senkrecht, Ankathete waagerecht und den rechten Winkel rechts unten. Beide Namen beziehen sich auf α links unten.'},
 {id:'kegel',topic:'koerper',title:'Kegel: Radius, Höhe und Mantellinie',label:'Radius r in cm bei h = 4 cm',min:1,max:5,step:1,value:3,prompt:'Verdopple den Radius von 2 auf 4 bei gleicher Höhe. Was passiert mit dem Volumen? Der maßstäbliche Achsenschnitt ist ein Dreieck; die gestrichelte Höhe steht senkrecht auf der Grundfläche. Das Bild ist ein Schnitt, keine perspektivische Körperansicht und kein Beweis des Volumenfaktors 1/3.'},
 {id:'exponential',topic:'wachstum',title:'Diskrete Bestände: wachsen oder zerfallen',label:'Prozent des Bestands, die je Schritt erhalten bleiben (100q)',min:80,max:120,step:5,value:110,prompt:'100 bedeutet q = 1, 110 bedeutet 10 % Zunahme, 90 bedeutet 10 % Abnahme. Vergleiche die Abstände der Punkte. Es werden nur die ganzen Schritte n = 0 bis 5 modelliert; die Punkte werden bewusst nicht zu einer kontinuierlichen Kurve verbunden.'},
 {id:'sinus',topic:'wachstum',title:'Mehr Schwingungen im selben Winkelbereich',label:'Innerer Faktor b bei Amplitude 3',min:1,max:4,step:1,value:2,prompt:'Verdopple b. Wird die Kurve höher oder wiederholt sie sich öfter? Gezeigt wird y = 3 sin(bx) von 0° bis 360°. Die erste volle Periode ist mit einer Strecke unter der Kurve markiert; Winkel sind durchgehend im Gradmaß.'},
 {id:'baum',topic:'zufall',title:'Zwei Züge mit und ohne Zurücklegen',label:'Ziehmodell: 0 = mit, 1 = ohne Zurücklegen',min:0,max:1,step:1,value:0,prompt:'Ausgangspunkt sind 3 rote und 4 blaue Kugeln. Vermute vor dem Umschalten, ob RR häufiger wird. R bedeutet rot, B blau; die Buchstaben, nicht nur Farben, unterscheiden die Zweige. Alle vier vollständigen Pfade stehen zusätzlich im Text.'},
 {id:'balken',topic:'daten',title:'Gleiche Daten, andere sichtbare Verhältnisse',label:'Beginn der y-Achse',min:0,max:20,step:5,value:20,prompt:'Die Daten bleiben 23 und 27. Setze die Achse erst auf 0, dann auf 20. Lies jeweils das sichtbare Verhältnis und das unveränderte Datenverhältnis. Der untere Achsenwert ist ausdrücklich angeschrieben; ein verkürzter Beginn wird zusätzlich als Warnung benannt.'}
];
function graph({xmin,xmax,ymin,ymax,xticks,yticks}){
 const X=x=>55+(x-xmin)/(xmax-xmin)*490,Y=y=>275-(y-ymin)/(ymax-ymin)*240;
 let svg=line(55,275,545,275)+line(55,35,55,275);
 for(const x of xticks)svg+=line(X(x),275,X(x),281)+text(X(x),301,n(x));
 for(const y of yticks)svg+=line(50,Y(y),545,Y(y),'class="gridline"')+text(43,Y(y)+5,n(y),'end');
 if(xmin<0&&xmax>0)svg+=line(X(0),35,X(0),275,'class="axis"');
 if(ymin<0&&ymax>0)svg+=line(55,Y(0),545,Y(0),'class="axis"');
 return {X,Y,svg};
}
function curve(X,Y,fn,xmin,xmax){return `<path class="curve" d="${Array.from({length:161},(_,i)=>{let x=xmin+(xmax-xmin)*i/160;return `${i?'L':'M'}${X(x).toFixed(3)},${Y(fn(x)).toFixed(3)}`;}).join(' ')}"/>`;}
const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" class="point"/>`;
export function figureModel(id,value){
 const def=figureDefinitions.find(f=>f.id===id);if(!def)throw Error('Unbekannte Abbildung');
 const v=Number(value);if(!Number.isFinite(v)||v<def.min||v>def.max||(v-def.min)%def.step!==0)throw Error('Ungültiger Reglerwert');
 let svg='',description='',valid=false,metrics={};
 if(id==='wurzel'){
  const k=Math.floor(Math.sqrt(v)),r=Math.sqrt(v),X=x=>65+(x-k)*470;
  svg=line(65,180,535,180)+line(65,165,65,195)+line(535,165,535,195)+dot(X(r),180)+text(65,225,`${k} (Quadrat ${k*k})`,'start')+text(535,225,`${k+1} (Quadrat ${(k+1)**2})`,'end')+text(X(r),140,`√${v} ≈ ${n(r)}`)+text(300,65,`${k*k} ≤ ${v} < ${(k+1)**2}`);
  description=`N = ${v}: ${k}² = ${k*k} ≤ ${v} < ${(k+1)**2} = ${k+1}². Somit ${k} ≤ √${v} < ${k+1}; die größte ganze Zahl ist ${k}. Die Wurzel ist ungefähr ${n(r)}. Bei einem vollständigen Quadrat liegt der Punkt genau am linken Intervallrand.`;valid=k*k<=v&&(k+1)**2>v;metrics={root:r,k};
 } else if(id==='binom'){
  const s=240/(v+3),x=v*s,d=3*s,left=175,top=40;
  svg=rect(left,top,x,x,'#cfe3d8')+rect(left+x,top,d,x,'#f0dabd')+rect(left,top+x,x,d,'#f0dabd')+rect(left+x,top+x,d,d,'#dedcf0')+text(left+x/2,top+x/2+5,`${v}²`)+text(left+x+d/2,top+x/2+5,`3·${v}`)+text(left+x/2,top+x+d/2+5,`3·${v}`)+text(left+x+d/2,top+x+d/2+5,'9')+text(left+x/2,27,`x = ${v}`)+text(left+x+d/2,27,'3')+text(295,312,`Gesamtseite: ${v}+3 = ${v+3}`);
  description=`Für x = ${v} hat das große Quadrat Seite ${v+3} und Fläche ${(v+3)**2}. Die vier Teilflächen sind ${v*v}, ${3*v}, nochmals ${3*v} und 9. Ihre Summe ${v*v}+${3*v}+${3*v}+9 = ${(v+3)**2} zeigt (x+3)² = x²+6x+9. Die beiden Rechtecke erklären den gemischten Term 6x.`;valid=(v+3)**2===v*v+6*v+9;metrics={area:(v+3)**2,parts:[v*v,3*v,3*v,9]};
 } else if(id==='gerade'){
  const g=graph({xmin:-5,xmax:5,ymin:-15,ymax:15,xticks:[-4,-2,0,2,4],yticks:[-15,-10,-5,0,5,10,15]});const {X,Y}=g;
  svg=g.svg+`<g clip-path="url(#clip-${id})">`+curve(X,Y,x=>v*x+2,-5,5)+`</g>`+line(X(0),Y(2),X(2),Y(2),'class="construction"')+line(X(2),Y(2),X(2),Y(2+2*v),'class="construction"')+dot(X(0),Y(2))+dot(X(2),Y(2+2*v))+text(300,20,`y = ${v}x + 2`)+text(562,302,'x')+text(24,23,'y');
  description=`Die Gerade y = ${v}x+2 geht durch A(0|2) und B(2|${2+2*v}). Von A nach B ist Δx = 2 und Δy = ${2*v}; daraus m = ${2*v}/2 = ${v}. ${v===0?'Die Gerade ist waagerecht.':v<0?'Mit zunehmendem x fällt y.':'Mit zunehmendem x steigt y.'} Der y-Achsenabschnitt bleibt 2.`;valid=near(((v*2+2)-2)/2,v);metrics={m:v,b:2,points:[[0,2],[2,2+2*v]]};
 } else if(id==='parabel'){
  const g=graph({xmin:-6,xmax:6,ymin:-4,ymax:10,xticks:[-6,-3,0,3,6],yticks:[-4,-2,0,2,4,6,8,10]});const {X,Y}=g;
  svg=g.svg+`<g clip-path="url(#clip-${id})">`+curve(X,Y,x=>(x-v)**2-2,-6,6)+`</g>`+line(X(v),35,X(v),275,'class="construction"')+dot(X(v),Y(-2))+dot(X(v-2),Y(2))+dot(X(v+2),Y(2))+text(300,20,`y = (x − (${v}))² − 2`)+text(562,302,'x')+text(24,23,'y');
  description=`Scheitel S(${v}|−2), Symmetrieachse x = ${v}. Die Punkte (${v-2}|2) und (${v+2}|2) haben beide Abstand 2 zur Achse und dieselbe Höhe 2. Das Minimum bleibt −2. Die Nullstellen liegen bei ${v}−√2 und ${v}+√2; sie verschieben sich mit dem Scheitel.`;valid=near(((v-2)-v)**2-2,((v+2)-v)**2-2);metrics={h:v,k:-2,mirror:[v-2,v+2]};
 } else if(id==='dreieck'){
  const a=7*Math.cos(v*Math.PI/180),b=7*Math.sin(v*Math.PI/180),s=36,x=100+a*s,y=270-b*s;
  svg=`<path class="shape" d="M100,270 L${x},270 L${x},${y} Z"/>`+line(x-12,270,x-12,258)+line(x-12,258,x,258)+text(110,230,`α = ${v}°`,'end')+text((100+x)/2,307,`Ankathete ${n(a)} cm`)+text(x+15,(270+y)/2,`g = ${n(b)}`,'start')+text((100+x)/2-20,(270+y)/2-20,'c = 7 cm');
  description=`Bei α = ${v}° und Hypotenuse 7 cm ist die Ankathete 7 cos(${v}°) ≈ ${n(a)} cm, die Gegenkathete 7 sin(${v}°) ≈ ${n(b)} cm. Die Quadratsumme der Katheten ist 49 cm². Ihr Verhältnis Gegenkathete/Ankathete ≈ ${n(b/a)} entspricht tan(${v}°). Werte im Text sind gerundet.`;valid=near(a*a+b*b,49);metrics={a,b,c:7,angle:v};
 } else if(id==='kegel'){
  const r=v,h=4,s=Math.hypot(r,h),scale=24;
  svg=`<path class="shape" d="M${300-r*scale},255 L300,159 L${300+r*scale},255 Z"/>`+line(300,159,300,255,'class="construction"')+text(282,210,'h = 4','end')+text(300+r*scale/2,283,`r = ${r}`)+text(320+r*scale/2,200,`s ≈ ${n(s)}`)+text(300,75,'Achsenschnitt (Längen in cm)');
  description=`Kegel mit r = ${r} cm und h = 4 cm: Mantellinie s = √(${r*r}+16) ≈ ${n(s)} cm. Volumen V = ${n(Math.PI*r*r*h/3)} cm³; der Zylinder mit gleicher Grundfläche und Höhe hat ${n(Math.PI*r*r*h)} cm³. Mantel M ≈ ${n(Math.PI*r*s)} cm², gesamte Oberfläche O ≈ ${n(Math.PI*r*(r+s))} cm². Nur V wächst bei festem h genau quadratisch mit r.`;valid=near(s*s,r*r+h*h);metrics={r,h,s,V:Math.PI*r*r*h/3,O:Math.PI*r*(r+s)};
 } else if(id==='exponential'){
  const q=v/100,values=Array.from({length:6},(_,i)=>100*q**i),g=graph({xmin:0,xmax:5,ymin:0,ymax:260,xticks:[0,1,2,3,4,5],yticks:[0,50,100,150,200,250]});
  svg=g.svg+values.map((y,x)=>dot(g.X(x),g.Y(y))).join('')+text(300,20,`N(n) = 100 · ${n(q)}ⁿ`)+text(562,302,'n')+text(26,23,'N');
  description=`Faktor q = ${n(q)}: Die Bestände für n = 0, 1, 2, 3, 4, 5 lauten ${values.map(n).join('; ')}. Jeweils neuer Bestand geteilt durch vorherigen Bestand ergibt ${n(q)}. ${q===1?'Der Bestand bleibt konstant.':q>1?'Die absoluten Zuwächse werden größer.':'Die absoluten Verluste werden kleiner.'} Es gelten ganze Schrittzahlen, keine dazwischenliegenden Modellwerte.`;valid=values.slice(1).every((y,i)=>near(y/values[i],q));metrics={q,values};
 } else if(id==='sinus'){
  const b=v,T=360/b,g=graph({xmin:0,xmax:360,ymin:-4,ymax:4,xticks:[0,90,180,270,360],yticks:[-3,0,3]});const{X,Y}=g;
  svg=g.svg+curve(X,Y,x=>3*Math.sin(b*x*Math.PI/180),0,360)+line(X(0),Y(-3.6),X(T),Y(-3.6),'class="construction"')+dot(X(T),Y(0))+text(300,20,`y = 3 sin(${b}x), T = ${n(T)}°`)+text(560,322,'x in °','end')+text(24,23,'y');
  description=`Amplitude 3, innerer Faktor b = ${b}, Periode T = ${n(T)}°. Zwischen 0° und 360° liegen ${b} volle Schwingungen. Nach einem Viertel der Periode, bei x = ${n(T/4)}°, ist y = 3; nach einer halben Periode ist y = 0, nach drei Vierteln −3. Der Vorfaktor steuert die Höhe, nicht die Periode.`;valid=near(b*T,360);metrics={b,T,amplitude:3};
 } else if(id==='baum'){
  const no=v===1,rr=3/7*(no?2/6:3/7),rb=3/7*(no?4/6:4/7),br=4/7*(no?3/6:3/7),bb=4/7*(no?3/6:4/7),den=no?6:7;
  svg=line(65,170,250,95)+line(65,170,250,245)+text(140,105,'R: 3/7')+text(140,254,'B: 4/7');
  const branches=[[95,45,`R: ${no?2:3}/${den}`,'RR'],[95,125,`B: 4/${den}`,'RB'],[245,205,`R: 3/${den}`,'BR'],[245,285,`B: ${no?3:4}/${den}`,'BB']];
  for(const[y1,y2,label,path]of branches)svg+=line(250,y1,440,y2)+text(350,(y1+y2)/2-8,label)+text(470,y2+5,path);
  description=`${no?'Ohne':'Mit'} Zurücklegen: erster Zug R mit 3/7 oder B mit 4/7. Nach R: R mit ${no?2:3}/${den}, B mit 4/${den}. Nach B: R mit 3/${den}, B mit ${no?3:4}/${den}. Pfadprodukte: RR ≈ ${n(rr)}, RB ≈ ${n(rb)}, BR ≈ ${n(br)}, BB ≈ ${n(bb)}. Ungerundet ergibt ihre Summe genau 1. Genau einmal rot umfasst RB und BR.`;valid=near(rr+rb+br+bb,1);metrics={rr,rb,br,bb,no};
 } else if(id==='balken'){
  const base=v,Y=y=>275-(y-base)/(30-base)*230;
  svg=line(90,275,515,275)+line(90,35,90,275)+text(80,280,String(base),'end')+text(80,50,'30','end')+rect(175,Y(23),85,275-Y(23),'#cfe3d8')+rect(350,Y(27),85,275-Y(27),'#f0dabd')+text(217,Y(23)-12,'23')+text(392,Y(27)-12,'27')+text(217,303,'Wert A')+text(392,303,'Wert B')+text(300,20,base?'Achtung: verkürzte Achse':'Achse beginnt bei null');
  description=`Achsenbeginn ${base}: sichtbare Höhen sind 23−${base} = ${23-base} und 27−${base} = ${27-base}. Ihr Verhältnis beträgt ${(27-base)}/${23-base} ≈ ${n((27-base)/(23-base))}. Das Datenverhältnis bleibt 27/23 ≈ ${n(27/23)}. ${base?'Die Verkürzung vergrößert den optischen Unterschied.':'Bei Nullbeginn stimmen beide Verhältnisse überein.'}`;valid=23-base>0&&27-base>0;metrics={base,ratio:(27-base)/(23-base),dataRatio:27/23};
 }
 return {svg,text:description,valid,metrics};
}
export function figureMarkup(def,value=def.value){const m=figureModel(def.id,value);return `<svg viewBox="0 0 600 335" role="img" aria-labelledby="${def.id}-title ${def.id}-desc"><title id="${def.id}-title">${escapeHTML(def.title)}</title><desc id="${def.id}-desc">${escapeHTML(m.text)}</desc><defs><clipPath id="clip-${def.id}"><rect x="55" y="35" width="490" height="240"/></clipPath></defs>${m.svg}</svg><figcaption id="${def.id}-caption">${escapeHTML(m.text)}</figcaption>`;}
