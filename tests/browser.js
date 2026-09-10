import AxeBuilder from '@axe-core/playwright';
import {testLessons} from './lessons-browser.js';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';import {createServer} from 'node:http';import {readFile,mkdir} from 'node:fs/promises';import {extname,resolve} from 'node:path';
import {types,topics,generate} from '../src/catalog.js';import {answerText} from '../src/answer.js';
let server;const root=resolve('dist');
if(!process.env.BASE_URL){server=createServer(async(req,res)=>{try{const p=resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!p.startsWith(root+'/'))throw Error();const b=await readFile(p);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml'})[extname(p)]||'text/plain');res.end(b);}catch{res.statusCode=404;res.end('Nicht gefunden');}});await new Promise(r=>server.listen(0,'127.0.0.1',r));}
const base=process.env.BASE_URL||`http://127.0.0.1:${server.address().port}/`;
const browser=await chromium.launch({headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
try{
 await page.goto(base);await page.locator('#prompt').waitFor();assert.match(await page.title(),/Mathe/);
 for(const t of types){
  await page.selectOption('#topic',t.topic);await page.selectOption('#level','all');await page.selectOption('#type',t.id);
  const seed=Number(await page.locator('#exercise').getAttribute('data-seed'));const q=generate(t.id,seed);
  assert.equal(await page.locator('#prompt').textContent(),q.prompt);
  await page.fill('#answer','ungültig');await page.click('#check');assert.match(await page.locator('#feedback').textContent(),/Zahl|Format/);
  await page.fill('#answer',answerText(q));await page.press('#answer','Enter');assert.match(await page.locator('#feedback').textContent(),/Richtig/);
 }
 await page.selectOption('#topic','zahlen');await page.selectOption('#type','bruch-summe');
 await page.fill('#answer','987654321');await page.click('#check');assert.match(await page.locator('#feedback').textContent(),/Noch nicht/);
 await page.click('#hint');assert.ok(await page.locator('#steps li').count());await page.click('#solution');assert.match(await page.locator('#steps').textContent(),/Ergebnis/);
 const attempts=await page.locator('#attempted').textContent();await page.reload();assert.equal(await page.locator('#attempted').textContent(),attempts);
 await page.click('#review');assert.match(await page.locator('#mode-label').textContent(),/Fehler/);
 const reviewId=await page.locator('#exercise').getAttribute('data-type');const reviewSeed=Number(await page.locator('#exercise').getAttribute('data-seed'));
 await page.fill('#answer',answerText(generate(reviewId,reviewSeed)));await page.click('#check');await page.click('#next');assert.match(await page.locator('#feedback').textContent(),/Fehlerkartei ist leer/);
 await page.click('#test');for(let i=0;i<10;i++){
  const id=await page.locator('#exercise').getAttribute('data-type'),seed=Number(await page.locator('#exercise').getAttribute('data-seed'));
  assert.equal(await page.locator('#hint').isDisabled(),true);
  await page.fill('#answer',answerText(generate(id,seed)));await page.click('#check');await page.click('#next');
 }
 assert.match(await page.locator('#summary').textContent(),/10 von 10/);
 await page.click('#review');assert.equal(await page.locator('#feedback').isVisible(),true);assert.match(await page.locator('#feedback').textContent(),/Fehlerkartei ist leer/);
 await page.click('#train');
 for(const topic of topics)for(const level of ['1','2','3']){await page.selectOption('#topic',topic.id);await page.selectOption('#level',level);const id=await page.locator('#exercise').getAttribute('data-type');assert.equal(types.find(t=>t.id===id).level,Number(level));}
 await page.selectOption('#level','all');
 await page.getByText('Dein Fortschritt',{exact:true}).click();
 const downloadPromise=page.waitForEvent('download');await page.click('#export');const download=await downloadPromise;assert.match(download.suggestedFilename(),/\.json$/);
 await page.click('#train');await page.selectOption('#topic','trigonometrie');await page.selectOption('#type','pythagoras');
 await mkdir('artifacts',{recursive:true});await page.screenshot({path:'artifacts/desktop.png',fullPage:true});
 for(const width of [360,390,768]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width}`);}
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'artifacts/mobile.png',fullPage:true});
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
 assert.equal(await page.locator('svg[role="img"]').count(),1);
 await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.activeElement!==document.body));
 page.once('dialog',d=>d.dismiss());await page.click('#reset');assert.notEqual(await page.locator('#attempted').textContent(),'0');
 page.once('dialog',d=>d.accept());await page.click('#reset');assert.equal(await page.locator('#attempted').textContent(),'0');
 await page.reload();assert.equal(await page.locator('#attempted').textContent(),'0');
 const broken=await browser.newPage();await broken.addInitScript(()=>{localStorage.setItem('mathe9berlin.v1','{broken');});await broken.goto(base);await broken.locator('#prompt').waitFor();assert.equal(await broken.locator('#attempted').textContent(),'0');await broken.close();
 const blocked=await browser.newPage();await blocked.addInitScript(()=>{Object.defineProperty(Storage.prototype,'setItem',{value(){throw Error('gesperrt');}});});await blocked.goto(base);await blocked.locator('#prompt').waitFor();await blocked.fill('#answer','123');await blocked.click('#check');assert.match(await blocked.locator('#storage-status').textContent(),/nicht gespeichert/);await blocked.close();
 assert.deepEqual(errors,[]);console.log(`BROWSER PASS: ${types.length} Typen / ${topics.length} Themen; Fehlerkartei, 10er-Test, Persistenz, Export, Löschen, Speicherfehler, 3 Mobilbreiten, Tastatur, keine Konsolenfehler. Ziel: ${base}`);
 await testLessons(browser,base);
}finally{await browser.close();if(server)server.close();}
