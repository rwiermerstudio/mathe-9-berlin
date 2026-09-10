import test from 'node:test';import assert from 'node:assert/strict';
const m=await import('../src/progress.js').catch(()=>({}));
test('Fortschritt: erster Versuch, Hilfe, Fehlerkartei und Wiederholung',()=>{
 assert.equal(typeof m.fresh,'function');let s=m.fresh();
 s=m.record(s,{id:'bruch-summe',seed:1},false,false);assert.equal(s.attempted,1);assert.equal(s.clean,0);assert.equal(s.errors.length,1);
 s=m.record(s,{id:'bruch-summe',seed:1},true,true);assert.equal(s.errors.length,1);assert.equal(s.clean,0);
 s=m.record(s,{id:'bruch-summe',seed:1},true,false);assert.equal(s.errors.length,0);assert.equal(s.clean,1);
 assert.deepEqual(m.restore('{oops'),m.fresh());assert.deepEqual(m.restore('{"version":1,"attempted":"kaputt"}'),m.fresh());
 assert.deepEqual(m.restore(JSON.stringify(s)),s);
});
