import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {renderChapter} from '../scripts/render-lessons.js';import {chapters} from '../src/chapters.js';import {types} from '../src/catalog.js';import {figureModel,escapeHTML} from '../src/lesson-figures.js';
test('Alle Kapitelanker, Navigations- und Assetlinks unter einem Projekt-Unterpfad existieren',async()=>{
 const files=new Map(chapters.map(c=>[`lernen/${c.id}.html`,renderChapter(c)]));for(const name of ['index.html','lernen.html','curriculum.html'])files.set(name,await readFile(name,'utf8'));
 const base='https://example.org/mathe-9-berlin/';let links=0;
 for(const [name,html] of files){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,name);assert.match(html,/<html lang="de">/);assert.match(html,/<main id="main"/);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const url=new URL(match[1],base+name);if(url.origin!==new URL(base).origin)continue;assert.ok(url.pathname.startsWith('/mathe-9-berlin/'));
   const target=url.pathname.slice('/mathe-9-berlin/'.length)||'index.html',content=files.get(target)??await readFile(target,'utf8');
   if(url.hash)assert.ok([...content.matchAll(/\bid="([^"]+)"/g)].some(m=>m[1]===url.hash.slice(1)),`${name} -> ${url}`);
   if(url.searchParams.has('type'))assert.ok(types.some(t=>t.id===url.searchParams.get('type')));links++;
  }
 }
 assert.ok(links>300);console.log(`LESSON LINKS: ${links} interne Referenzen geprüft`);
});
test('SVG-Zahlen unabhängig kontrollieren; fehlerhafte Reglerwerte ablehnen; HTML maskieren',()=>{
 assert.equal(figureModel('wurzel',16).metrics.root,4);assert.equal(figureModel('binom',4).metrics.area,49);
 assert.deepEqual(figureModel('gerade',-3).metrics.points,[[0,2],[2,-4]]);assert.deepEqual(figureModel('parabel',-3).metrics.mirror,[-5,-1]);
 const t=figureModel('dreieck',30).metrics;assert.ok(Math.abs(t.b-3.5)<1e-10);assert.ok(Math.abs(t.a-7*Math.sqrt(3)/2)<1e-10);
 const k=figureModel('kegel',3).metrics;assert.equal(k.s,5);assert.ok(Math.abs(k.V-12*Math.PI)<1e-10);
 assert.ok(Math.abs(figureModel('exponential',110).metrics.values[5]-161.051)<1e-10);assert.equal(figureModel('sinus',4).metrics.T,90);
 assert.ok(Math.abs(figureModel('baum',0).metrics.rr-9/49)<1e-10);assert.ok(Math.abs(figureModel('baum',1).metrics.rr-1/7)<1e-10);
 assert.equal(figureModel('balken',20).metrics.ratio,7/3);assert.equal(figureModel('balken',0).metrics.ratio,27/23);
 for(const value of [NaN,Infinity,-1,99,2.5])assert.throws(()=>figureModel('sinus',value));assert.equal(escapeHTML('<script>"&'), '&lt;script&gt;&quot;&amp;');
});
