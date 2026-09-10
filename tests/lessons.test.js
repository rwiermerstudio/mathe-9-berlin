import test from 'node:test';import assert from 'node:assert/strict';
import {chapters} from '../src/chapters.js';import {examples,exampleParameters} from '../src/lesson-examples.js';import {types,topics} from '../src/catalog.js';
import {figureDefinitions,figureModel,figureMarkup} from '../src/lesson-figures.js';
const close=(a,b)=>Math.abs(a-b)<1e-10*Math.max(1,Math.abs(b));
test('Neun eigenständige Kapitel und exakte 72/72 Typzuordnung',()=>{
 assert.deepEqual(chapters.map(c=>c.id),topics.map(t=>t.id));assert.equal(examples.length,72);assert.equal(new Set(examples.map(e=>e.id)).size,72);
 assert.deepEqual(examples.map(e=>e.id).sort(),types.map(t=>t.id).sort());
 for(const c of chapters){const es=examples.filter(e=>types.find(t=>t.id===e.id).topic===c.id);assert.equal(es.length,8);assert.equal(c.checks.length,3);assert.ok(c.reasoning.length>=4);assert.ok(figureDefinitions.some(f=>f.topic===c.id));
 const words=[c.motivation,c.recall,...c.concepts.flat(),...c.reasoning,c.mistakes,...c.checks.flat(),c.summary,...es.flatMap(e=>[e.why,...e.steps,e.check])].join(' ').split(/\s+/).length;
 assert.ok(words>=900,`${c.id}: ${words} Wörter`);console.log(`KAPITEL ${c.id}: ${words} Wörter, 8 Typen`);}
});
test('Alle 72 ausgerechneten Beispiele stimmen mit den echten Aufgabentypen und Gegenproben überein',()=>{
 for(const e of examples){const t=types.find(t=>t.id===e.id),p={...exampleParameters,...e.params},q={...t.build(p),p};
 assert.ok(e.why.length>60&&e.check.length>60&&e.steps.length>=3,e.id);
 const actual=Array.isArray(q.answer)?[...q.answer].sort((a,b)=>a-b):[q.answer],expected=Array.isArray(e.expected)?[...e.expected].sort((a,b)=>a-b):[e.expected];
 assert.equal(actual.length,expected.length,e.id);actual.forEach((n,i)=>assert.ok(close(n,expected[i]),`${e.id}: ${n} ≠ ${expected[i]}`));
 assert.equal(t.verify(q),true,e.id);assert.equal(t.verify({...q,answer:Array.isArray(q.answer)?[99999]:q.answer+100}),false,e.id);
 }
 // Zusätzlich unabhängig gerechnete Zwischenschritte und Fallbeispiele im Lehrtext.
 for(const [a,b] of [[3+2,5],[-9/8*2/3,-3/4],[27*9,243],[27**2,729],[(-3)**2+7*(-3)+12,0],[(-4)**2+7*(-4)+12,0],[2*25+4,54],[Math.sqrt(9+16),5],[4*Math.sin(Math.PI/6),2],[3.2**3,32.768],[3.2**2,10.24],[300*1.04,312],[312*1.04,324.48],[9+12+12+16,49],[4-(-2),6],[3*2+4*5,26],[360/3,120]])assert.ok(close(a,b));
 for(const [n,count] of [[-4,0],[0,1],[4,2]]){const roots=n<0?[]:n===0?[3]:[3-Math.sqrt(n),3+Math.sqrt(n)];assert.equal(roots.length,count);roots.forEach(x=>assert.equal((x-3)**2,n));}
});
test('Jede Abbildung über den gesamten Reglerbereich: endliche Geometrie, vollständige Alternativen und mathematische Invarianten',()=>{
 for(const f of figureDefinitions){for(let v=f.min;v<=f.max;v+=f.step){const m=figureModel(f.id,v),html=figureMarkup(f,v);assert.ok(m.text.length>70);assert.match(html,/role="img"/);assert.match(html,/<figcaption/);assert.doesNotMatch(html,/NaN|Infinity|undefined/);assert.ok(m.valid,`${f.id} ${v}`);}}
});
