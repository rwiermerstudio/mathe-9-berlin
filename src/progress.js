import {types} from './catalog.js';
export const key='mathe9berlin.v1';
export function fresh(){return {version:1,attempted:0,clean:0,byType:{},errors:[],tests:[]};}
export function restore(raw){try{const s=JSON.parse(raw);if(s.version!==1||!Number.isSafeInteger(s.attempted)||s.attempted<0||!Number.isSafeInteger(s.clean)||s.clean<0||s.clean>s.attempted||!s.byType||typeof s.byType!=='object'||Array.isArray(s.byType)||!Array.isArray(s.errors)||!Array.isArray(s.tests))return fresh();
 for(const [id,v] of Object.entries(s.byType))if(!types.some(t=>t.id===id)||!Number.isSafeInteger(v.attempted)||!Number.isSafeInteger(v.clean)||v.attempted<0||v.clean<0||v.clean>v.attempted)return fresh();
 s.errors=s.errors.filter(e=>types.some(t=>t.id===e.id)&&Number.isInteger(e.seed)&&e.seed>=0&&e.seed<=4294967295).slice(-200);
 s.tests=s.tests.filter(t=>Number.isInteger(t.score)&&t.score>=0&&t.score<=10&&typeof t.date==='string').slice(-20);return s;}catch{return fresh();}}
export function record(state,q,correct,assisted){const s=structuredClone(state);s.attempted++;const t=s.byType[q.id]??{attempted:0,clean:0};t.attempted++;
 if(correct&&!assisted){s.clean++;t.clean++;s.errors=s.errors.filter(e=>!(e.id===q.id&&e.seed===q.seed));}
 else if(!s.errors.some(e=>e.id===q.id&&e.seed===q.seed))s.errors.push({id:q.id,seed:q.seed});
 s.errors=s.errors.slice(-200);s.byType[q.id]=t;return s;}
