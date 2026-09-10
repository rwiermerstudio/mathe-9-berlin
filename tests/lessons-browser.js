import assert from 'node:assert/strict';import AxeBuilder from '@axe-core/playwright';import {mkdir,writeFile} from 'node:fs/promises';
import {topics,types,generate} from '../src/catalog.js';import {figureDefinitions,figureModel} from '../src/lesson-figures.js';import {answerText} from '../src/answer.js';import {fresh,key} from '../src/progress.js';
export async function testLessons(browser,base){
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[],requests=[];
 context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 const evidence={base,chapters:[],roundtrips:[],figures:[],axe:[],checks:0};
 try{
  await page.goto(new URL('lernen.html',base).href);assert.equal(await page.locator('.lesson-card').count(),9);
  const coverageResponse=await context.request.get(new URL('coverage.json',base).href);assert.equal(coverageResponse.status(),200);const coverage=await coverageResponse.json();assert.deepEqual(coverage.types.map(t=>t.type),types.map(t=>t.id));assert.deepEqual(coverage.chapters,topics.map(t=>t.id));
  for(const t of coverage.types){assert.equal(t.chapter,`lernen/${types.find(x=>x.id===t.type).topic}.html`);assert.equal(t.fragment,t.type);assert.equal(t.practice,`index.html?type=${t.type}`);}
  const legacy={...fresh(),attempted:7,clean:4,byType:{'bruch-summe':{attempted:3,clean:2}}};
  await page.evaluate(({key,legacy})=>localStorage.setItem(key,JSON.stringify(legacy)),{key,legacy});const stored=await page.evaluate(key=>localStorage.getItem(key),key);
  for(const topic of topics){
   await page.goto(new URL(`lernen/${topic.id}.html`,base).href);assert.equal(await page.locator('h1').textContent(),topic.name);
   const ids=await page.locator('[id]').evaluateAll(ns=>ns.map(n=>n.id));assert.equal(ids.length,new Set(ids).size);
   for(const a of await page.locator('a[href^="#"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href').slice(1))))assert.ok(ids.includes(a),`${topic.id}#${a}`);
   const ts=types.filter(t=>t.topic===topic.id);assert.deepEqual(await page.locator('.worked').evaluateAll(ns=>ns.map(n=>n.dataset.type)),ts.map(t=>t.id));
   assert.equal(await page.locator('#selbstcheck details').count(),3);
   for(const d of await page.locator('#selbstcheck details').all()){await d.locator('summary').click();assert.equal(await d.getAttribute('open'),'');assert.ok((await d.locator('p').textContent()).length>30);await d.locator('summary').click();evidence.checks++;}
   for(const f of figureDefinitions.filter(f=>f.topic===topic.id)){
    const input=page.locator(`#${f.id}-control`),caption=page.locator(`#${f.id}-caption`);assert.equal(await input.isDisabled(),false);
    for(const v of [f.min,f.max,f.value]){await input.fill(String(v));await input.dispatchEvent('input');assert.equal(await caption.textContent(),figureModel(f.id,v).text);assert.equal(await page.locator(`#${f.id}-figure desc`).textContent(),await caption.textContent());}
    await input.focus();await input.press('Home');assert.equal(await input.inputValue(),String(f.min));await input.press('ArrowRight');assert.equal(await input.inputValue(),String(f.min+f.step));assert.equal(await caption.textContent(),figureModel(f.id,f.min+f.step).text);
    await input.fill(String(f.value));await input.dispatchEvent('input');evidence.figures.push(f.id);
   }
   assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),stored,'Lesen verändert keinen Legacy-Speicher');
   for(const width of [1440,768,390,360]){
    await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${topic.id}: Overflow ${width}`);
    if(width===1440||width===360){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${topic.id} axe ${width}`);evidence.axe.push({topic:topic.id,width,violations:0});}
   }
   await mkdir('artifacts/chapters',{recursive:true});await page.locator('#visualisieren').screenshot({path:`artifacts/chapters/${topic.id}-mobile.png`});
   await page.setViewportSize({width:1440,height:1000});await page.locator('#visualisieren').screenshot({path:`artifacts/chapters/${topic.id}-desktop.png`});
   if(topic.id==='gleichungen'){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'artifacts/chapter-reader-desktop.png'});await page.setViewportSize({width:360,height:844});await page.screenshot({path:'artifacts/chapter-reader-mobile.png'});await page.setViewportSize({width:1440,height:1000});}
   evidence.chapters.push(topic.id);
  }
  // Every link is actually clicked in both directions, not merely checked for an href.
  for(const topic of topics){
   await page.goto(new URL(`lernen/${topic.id}.html`,base).href);
   for(const t of types.filter(t=>t.topic===topic.id)){
    await page.locator(`[data-practice="${t.id}"]`).click();await page.locator('#prompt').waitFor();assert.equal(await page.locator('#exercise').getAttribute('data-type'),t.id);assert.equal(await page.locator('#topic').inputValue(),t.topic);assert.equal(await page.locator('#level').inputValue(),'all');
    const popupPromise=page.waitForEvent('popup');await page.locator('#lesson-link').click();const popup=await popupPromise;await popup.waitForLoadState();assert.equal(new URL(popup.url()).hash,`#${t.id}`);assert.equal(await popup.locator(`#${t.id} h2`).textContent(),t.title);
    if(t.id==='bruch-summe'){
     const clean=await page.locator('#clean').textContent(),seed=Number(await page.locator('#exercise').getAttribute('data-seed'));await page.fill('#answer',answerText(generate(t.id,seed)));await page.click('#check');assert.match(await page.locator('#feedback').textContent(),/im Üben/);assert.equal(await page.locator('#clean').textContent(),clean,'Erklärung zählt als Hilfe');
     await page.click('#test');assert.equal(await page.locator('#lesson-link').isVisible(),false);
    }
    await popup.close();await page.goBack();await page.locator(`[data-practice="${t.id}"]`).waitFor();evidence.roundtrips.push(t.id);
   }
  }
  assert.equal(evidence.roundtrips.length,72);assert.equal(evidence.figures.length,10);assert.equal(evidence.checks,27);
  await page.goto(new URL('index.html?type=unbekannt',base).href);await page.locator('#prompt').waitFor();const fallback=await page.locator('#exercise').getAttribute('data-type');assert.ok(types.some(t=>t.id===fallback));
  assert.ok(!requests.some(url=>/\/(chapters|lesson-examples)\.js/.test(url)),'Keine Lehrtextdaten im Laufzeitbundle');
  // Unverändertes Speicherschema: Lesen auch bei vollständig gesperrtem Speicher.
  const blocked=await context.newPage();await blocked.addInitScript(()=>{for(const name of ['getItem','setItem'])Object.defineProperty(Storage.prototype,name,{value(){throw Error('gesperrt');}});});await blocked.goto(new URL('lernen/zahlen.html',base).href);await blocked.locator('#wurzel-control').waitFor();await blocked.locator('#wurzel-control').fill('16');assert.match(await blocked.locator('#wurzel-caption').textContent(),/4² = 16/);await blocked.close();
  const offline=await browser.newContext({javaScriptEnabled:false});const staticPage=await offline.newPage();for(const t of topics){await staticPage.goto(new URL(`lernen/${t.id}.html`,base).href);assert.equal(await staticPage.locator('.worked').count(),8);assert.ok(await staticPage.locator('svg[role="img"]').count());await staticPage.locator('#selbstcheck summary').first().click();assert.equal(await staticPage.locator('#selbstcheck details').first().getAttribute('open'),'');}await offline.close();
  assert.deepEqual(errors,[]);await writeFile('artifacts/lesson-browser-report.json',JSON.stringify(evidence,null,2));console.log(`LESSON BROWSER PASS: 9 Kapitel, 72 geklickte Hin-/Rückwege, 10 interaktive SVG (Tastatur und Zahlen), 27 Selbstchecks, 18 axe-Scans, 4 Breiten, Legacy-/gesperrter Speicher, ohne JavaScript. Ziel: ${base}`);
 }finally{await context.close();}
}
