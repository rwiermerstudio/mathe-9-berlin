export function parseNumber(raw){
 const s=String(raw).trim().replaceAll('−','-').replaceAll(',','.');
 const number='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?';
 const re=new RegExp(`^(${number})(?:\\s*/\\s*(${number}))?$`,'i');
 const m=s.match(re); if(!m)return null;
 const a=Number(m[1]),b=m[2]===undefined?1:Number(m[2]);
 const value=a/b; return Number.isFinite(a)&&Number.isFinite(b)&&b!==0&&Number.isFinite(value)?value:null;
}
export function format(n,d=8){return Number(n.toFixed(d)).toLocaleString('de-DE',{useGrouping:false,maximumFractionDigits:d});}
export function answerText(q){return q.kind==='set'?(q.answer.length?q.answer.map(n=>format(n)).join('; '):'keine'):format(q.answer,q.round??12);}
export function checkAnswer(raw,q){
 const same=(a,b)=>Math.abs(a-b)<=(q.round===undefined?Math.max(1e-12,Math.abs(b)*1e-9):0.5*10**(-q.round)+1e-10);
 if(q.kind==='set'){
  if(/^\s*(keine|∅|\{\})\s*$/i.test(raw))return {status:q.answer.length?'wrong':'correct'};
  const ns=raw.split(';').map(parseNumber);if(ns.some(n=>n===null))return {status:'invalid'};
  const unique=ns.filter((v,i)=>ns.findIndex(w=>same(v,w))===i);
  if(unique.length===q.answer.length&&q.answer.every(a=>unique.some(b=>same(a,b))))return {status:'correct'};
  if(unique.length<q.answer.length&&unique.every(a=>q.answer.some(b=>same(a,b))))return {status:'missing'};
  return {status:'wrong'};
 }
 const n=parseNumber(raw);if(n===null)return {status:'invalid'};
 if(same(n,q.answer))return {status:'correct'};
 if(q.answer!==0&&same(n,-q.answer))return {status:'sign'};
 return {status:'wrong'};
}
