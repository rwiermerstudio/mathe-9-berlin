import test from 'node:test';
import assert from 'node:assert/strict';
import {checkAnswer,answerText} from '../src/answer.js';
const m=await import('../src/catalog.js').catch(()=>({types:[],topics:[]}));
test('72 echte Typen in neun Themen, reproduzierbar und mathematisch gültig',()=>{
 assert.equal(m.types.length,72); assert.equal(new Set(m.types.map(t=>t.id)).size,72); assert.equal(m.topics.length,9);
 for(const topic of m.topics)assert.equal(m.types.filter(t=>t.topic===topic.id).length,8);
 for(const t of m.types){
  const prompts=new Set();
  for(let seed=1;seed<=200;seed++){
   const q=m.generate(t.id,seed);prompts.add(q.prompt);
   assert.deepEqual(q,m.generate(t.id,seed));
   assert.ok(t.verify(q),`${t.id} seed ${seed}: unabhängige Eigenschaft`);
   assert.ok(q.steps.length>=2&&q.steps.every(s=>typeof s==='string'&&s.length>5));
   assert.ok(q.prompt.length>15&&q.rule.length>15);
   assert.equal(checkAnswer(answerText(q),q).status,'correct',t.id);
   assert.equal(checkAnswer('kaputt',q).status,'invalid');
   assert.equal(checkAnswer('987654321',q).status,'wrong');
   assert.ok((Array.isArray(q.answer)?q.answer:[q.answer]).every(Number.isFinite));
  }
  assert.ok(prompts.size>=10,`${t.id} hat nur ${prompts.size} Varianten`);
 }
 console.log('GENERATOR: 72 Typen × 200 Seeds = 14400 geprüfte Aufgaben; neun Themen');
});
