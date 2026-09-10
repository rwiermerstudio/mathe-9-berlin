import test from 'node:test';
import assert from 'node:assert/strict';
const mod = await import('../src/answer.js').catch(()=>({}));
test('Zahlen sicher und äquivalent lesen',()=>{
 assert.equal(typeof mod.parseNumber,'function');
 for(const [s,n] of [['1,5',1.5],['−3/2',-1.5],[' 2 / -4 ',-.5],['.5',.5],['1e-3',.001],['+4',4]]) assert.equal(mod.parseNumber(s),n,s);
 for(const s of ['', '1/0','1/2/3','1,2,3','2+2','Infinity','NaN','1e999','<script>','0x10','1 2']) assert.equal(mod.parseNumber(s),null,s);
});
test('Mengen, Rundung und Fehlerdiagnose',()=>{
 const q={answer:[-2,2],kind:'set'};
 assert.equal(mod.checkAnswer('2; -2',q).status,'correct');
 assert.equal(mod.checkAnswer('-2;-2;2',q).status,'correct');
 assert.equal(mod.checkAnswer('2',q).status,'missing');
 assert.equal(mod.checkAnswer('keine',{answer:[],kind:'set'}).status,'correct');
 assert.equal(mod.checkAnswer('0',{answer:[],kind:'set'}).status,'wrong');
 assert.equal(mod.checkAnswer('1/2',{answer:.5}).status,'correct');
 assert.equal(mod.checkAnswer('-0,5',{answer:.5}).status,'sign');
 assert.equal(mod.checkAnswer('3,14',{answer:Math.PI,round:2}).status,'correct');
 assert.equal(mod.checkAnswer('3,15',{answer:Math.PI,round:2}).status,'wrong');
 assert.equal(mod.checkAnswer('Hallo',{answer:1}).status,'invalid');
 assert.equal(mod.checkAnswer('0',{answer:1e-9}).status,'wrong');
 assert.equal(mod.checkAnswer('1e-9',{answer:1e-9}).status,'correct');
});
