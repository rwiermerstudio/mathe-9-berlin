import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';import {join,relative} from 'node:path';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'https://rwiermerstudio.github.io/mathe-9-berlin/';
async function walk(dir){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=join(dir,entry.name);out.push(...(entry.isDirectory()?await walk(p):[p]));}return out;}
const files=await walk('dist'),results=[];
for(const path of files){const name=relative('dist',path),local=await readFile(path),url=new URL(name,base).href;let remote,error;
 for(let attempt=0;attempt<3;attempt++){try{const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(30000)});assert.equal(response.status,200,url);remote=Buffer.from(await response.arrayBuffer());assert.ok(remote.equals(local),`Abweichendes Live-Artefakt: ${url}`);error=null;break;}catch(e){error=e;if(attempt<2)await new Promise(r=>setTimeout(r,3000));}}
 if(error)throw error;results.push({file:name,url,bytes:local.length,sha256:createHash('sha256').update(remote).digest('hex')});
}
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/live-artifacts.json',JSON.stringify({base,files:results},null,2));console.log(`LIVE ARTIFACT PASS: ${results.length} Dateien stimmen bytegenau mit dist überein. ${base}`);
