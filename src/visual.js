import {format as f} from './answer.js';
const wrap=(body,label)=>`<svg viewBox="0 0 520 300" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg><figcaption>${label}</figcaption>`;
export function visual(q){
 if(q.triangle){const {a,b}=q.triangle,s=210/Math.max(a,b),x=75,y=250,w=a*s,h=b*s;return wrap(`<path d="M${x} ${y-h}V${y}H${x+w}Z" fill="#e7f2ee" stroke="#155743" stroke-width="3"/><path d="M${x} ${y-16}h16v16" fill="none" stroke="#155743"/><text x="${x+w/2}" y="277" text-anchor="middle">Ankathete / waagerechte Kathete</text><text x="${x+20}" y="${y-h-12}">A</text><text x="${x+w+12}" y="${y}">α</text>`,`Maßstäbliches rechtwinkliges Dreieck. Waagerechte und senkrechte Kathete im Verhältnis ${f(a,2)} zu ${f(b,2)}. α liegt rechts unten; die Hypotenuse ist die schräge Seite.`);}
 if(q.bars){const {values,base}=q.bars,max=Math.max(...values)-base;let b=`<path d="M70 25V250H470" fill="none" stroke="#334b43"/><text x="12" y="255">${base}</text><text x="12" y="35">${Math.max(...values)}</text>`;values.forEach((v,i)=>{let h=(v-base)/max*215;b+=`<rect x="${140+i*170}" y="${250-h}" width="80" height="${h}" fill="#155743"/><text x="${180+i*170}" y="${240-h}" text-anchor="middle">${v}</text><text x="${180+i*170}" y="275" text-anchor="middle">${i+1}</text>`;});return wrap(b,`Achtung: verkürzte y-Achse ab ${base}. Die beiden Datenwerte sind ${values.join(' und ')}. Balken beginnen hier nicht bei null.`);}
 if(!q.graph)return '';
 const g=q.graph;let xmin=-5,xmax=5,fn,label,pointsOnly=false;
 if(g.kind==='line'){fn=x=>g.m*x+g.b;label=`Gerade y = ${g.m}x + ${g.b}.`;}
 if(g.kind==='parabola'){xmin=g.h-5;xmax=g.h+5;fn=x=>g.a*(x-g.h)**2+g.k;label=`Parabel y = ${g.a}(x − ${g.h})² + (${g.k}).`;}
 if(g.kind==='sine'){xmin=0;xmax=360;fn=x=>g.a*Math.sin(g.b*x*Math.PI/180);label=`Sinus y = ${g.a}·sin(${g.b}x), x im Gradmaß.`;}
 if(g.kind==='growth'){xmin=0;xmax=8;fn=x=>g.initial*g.q**x;label=`Diskrete Folge N(n) = ${g.initial}·${f(g.q)}ⁿ. Nur ganze Schritte n sind dargestellt.`;pointsOnly=true;}
 const samples=Array.from({length:241},(_,i)=>[xmin+(xmax-xmin)*i/240,fn(xmin+(xmax-xmin)*i/240)]);
 let ymin=Math.min(0,...samples.map(p=>p[1])),ymax=Math.max(0,...samples.map(p=>p[1]));const pad=(ymax-ymin)*.08||1;ymin-=pad;ymax+=pad;
 const X=x=>65+(x-xmin)/(xmax-xmin)*420,Y=y=>250-(y-ymin)/(ymax-ymin)*215;
 let body='';for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;body+=`<path d="M${X(x)} 35V250 M65 ${Y(y)}H485" stroke="#ccd8d2" stroke-width="1"/><text x="${X(x)}" y="273" text-anchor="middle">${f(x,1)}</text><text x="57" y="${Y(y)+5}" text-anchor="end">${f(y,1)}</text>`;}
 body+=`<path d="M65 ${Y(0)}H485" stroke="#334b43"/>`;
 if(xmin<=0&&xmax>=0)body+=`<path d="M${X(0)} 35V250" stroke="#334b43"/>`;
 if(pointsOnly){for(let x=0;x<=8;x++)body+=`<circle cx="${X(x)}" cy="${Y(fn(x))}" r="4" fill="#155743"/>`;}
 else body+=`<polyline points="${samples.map(([x,y])=>`${X(x)},${Y(y)}`).join(' ')}" fill="none" stroke="#155743" stroke-width="3"/>`;
 body+=`<text x="490" y="290">${pointsOnly?'n':'x'}</text><text x="18" y="18">y</text>`;
 return wrap(body,label+' Achsenskalierung beachten; die Zahlen an den Achsen sind gerundet.');
}
