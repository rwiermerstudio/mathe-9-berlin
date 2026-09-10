import test from 'node:test';
import assert from 'node:assert/strict';
import * as chapterModule from '../src/chapters.js';
import {stories,storyNotice,processFigures} from '../src/lesson-story.js';
import {transfers} from '../src/lesson-transfer.js';
import {topics,types} from '../src/catalog.js';

test('Der Projektfaden erreicht jede Erklärung, jedes Beispiel und jeden Kapitelabschluss',async()=>{
 assert.ok(Array.isArray(chapterModule.chapters),'Teilmodule müssen als Kapitel exportiert und integriert sein');
 const {renderChapter}=await import('../scripts/render-lessons.js');
 assert.deepEqual(Object.keys(stories),topics.map(t=>t.id));
 assert.deepEqual(Object.keys(transfers).sort(),types.map(t=>t.id).sort());
 for(const c of chapterModule.chapters){
  const s=stories[c.id],html=renderChapter(c);
  assert.ok(html.includes(storyNotice));assert.ok(html.includes(s.question));
  for(const paragraph of s.opening)assert.ok(html.includes(paragraph),c.id+' Einstieg');
  assert.equal(s.bridges.length,4);
  for(const [title,paragraph] of s.bridges){assert.ok(html.includes(title));assert.ok(html.includes(paragraph));}
  assert.equal((html.match(/class="reasoning-step"/g)||[]).length,4);
  assert.ok(html.includes(s.checkpoint[0]));assert.ok(html.includes(s.checkpoint[1]));
  assert.ok(html.includes(s.synthesis));assert.ok(html.includes(s.next));
  for(const t of types.filter(t=>t.topic===c.id)){
   const section=html.split(`data-type="${t.id}"`)[1].split('</section>')[0];
   assert.ok(section.includes(transfers[t.id]),t.id+' Einordnung fehlt im eigenen Beispiel');
  }
 }
});

test('Vergleichsbilder sind lesbare Rechenketten mit eigener Anleitung und Bildunterschrift',async()=>{
 assert.ok(Array.isArray(chapterModule.chapters),'Kapitelintegration fehlt');
 const {renderChapter}=await import('../scripts/render-lessons.js');
 assert.deepEqual(Object.keys(processFigures),['gleichungen','linear','wachstum']);
 for(const [id,f] of Object.entries(processFigures)){
  const html=renderChapter(chapterModule.chapters.find(c=>c.id===id));
  assert.ok(html.includes(`id="${id}-prozess"`));assert.ok(html.includes(f.guidance));
  assert.ok(html.includes(`<figcaption>${f.caption}</figcaption>`));
  for(const track of f.tracks)for(const text of track)assert.ok(html.includes(text));
 }
});

test('Die neun Projektchecks und drei Vergleichsbilder rechnen mit überprüften Werten',()=>{
 const de=n=>String(n).replace('.',','),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
 const answer=id=>stories[id].checkpoint[1];
 near(3/4+2/4,5/4);near(5/4-1,1/4);assert.ok(answer('zahlen').includes('5/4'));
 near(((-2)-4)/3,-2);near(3*(-2)+4,-2);assert.ok(answer('gleichungen').includes('x = −2'));
 near(4+2*6,16);assert.ok(answer('linear').includes('16 Euro'));
 near((5-3)**2+4,8);near((1-3)**2+4,8);assert.ok(answer('quadratisch').includes('jeweils 8'));
 near(Math.hypot(3,4),5);assert.ok(answer('trigonometrie').includes('5 cm'));
 near(3*Math.hypot(3,4),15);assert.ok(answer('koerper').includes('15π cm²'));
 near(300*1.04**2,324.48);assert.ok(answer('wachstum').includes(de(324.48)));
 const balls=['R','R','R','B','B','B','B'];
 const pairs=balls.flatMap(a=>balls.map(b=>a+b));
 assert.equal(pairs.filter(x=>x.includes('R')).length,33);assert.equal(pairs.length,49);
 assert.ok(answer('zufall').includes('33/49'));
 const values=[3,4,2,-2].sort((a,b)=>a-b);
 near(values.reduce((a,b)=>a+b)/values.length,1.75);near((values[1]+values[2])/2,2.5);near(values.at(-1)-values[0],6);
 for(const n of [1.75,2.5,6])assert.ok(answer('daten').includes(de(n)));
 // Rendered diagram labels, not an unrelated parallel set of example constants.
 assert.deepEqual(processFigures.linear.tracks.map(row=>row.at(-1)),[3,6].map(h=>`Gesamt: ${4+2*h} €`));
 assert.deepEqual(processFigures.wachstum.tracks.map(row=>row.at(-1)),[`+ 12 → ${300+2*12}`,`· 1,04 → ${de(Number((300*1.04**2).toFixed(2)))}`]);
 assert.deepEqual(processFigures.gleichungen.tracks[0].slice(1),['x = −2','· 3 → −6','+ 4 → −2']);
 near(-2*3,-6);near(-6+4,-2);
});

