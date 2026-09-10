import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {topics,types} from '../src/catalog.js';

// Visual release contract complements, rather than replaces, the learning-flow suite.
export async function testDesign(browser,base){
 const context=await browser.newContext({reducedMotion:'reduce'});
 const page=await context.newPage(),evidence={pages:[],axe:[],contrast:[]};
 await mkdir('artifacts/design',{recursive:true});
 try{
  for(const path of ['index.html','lernen.html','curriculum.html',...topics.map(t=>`lernen/${t.id}.html`)]){
   await page.goto(new URL(path,base).href);
   for(const width of [320,360,768,1440]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${path} overflow ${width}`);
   }
   assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
   const styles=await page.locator('body').evaluate(el=>({ink:getComputedStyle(el).color,paper:getComputedStyle(el).backgroundColor}));
   assert.equal(styles.ink,'rgb(32, 32, 30)');
   if(!path.startsWith('lernen/')){
    for(const width of [1440,360]){
     await page.setViewportSize({width,height:900});
     const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
     assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${path} axe ${width}`);
     await page.screenshot({path:`artifacts/design/${path.replace('.html','')}-${width}.png`});
     evidence.axe.push({path,width,violations:0});
    }
   }
   evidence.pages.push(path);
  }
  await page.goto(new URL('index.html',base).href);
  await page.setViewportSize({width:320,height:900});
  for(const t of types){
   await page.selectOption('#topic',t.topic);await page.selectOption('#type',t.id);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${t.id}: 320px overflow`);
  }
  evidence.mobileTypes=types.length;
  await page.goto(new URL('index.html?type=pythagoras',base).href);
  for(const width of [1440,360]){
   await page.setViewportSize({width,height:900});
   await page.locator('#exercise').scrollIntoViewIfNeeded();
   await page.locator('#answer').focus();
   assert.equal(await page.locator('#answer').evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
   await page.screenshot({path:`artifacts/design/exercise-focus-${width}.png`});
  }
  // Every functional palette pairing, including diagram strokes, meets its threshold.
  const luminance=hex=>{const c=hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
  const pairs=[['ink/paper','#20201e','#f7f7f2',4.5],['muted/paper','#57574f','#f7f7f2',4.5],['muted/lime','#57574f','#e7ee99',4.5],['button','#ffffff','#3930a3',4.5],['link/lavender','#3930a3','#eae6ff',4.5],['curve/white','#3930a3','#ffffff',3],['axis/white','#68685d','#ffffff',3],['construction/white','#9a3d20','#ffffff',3],['wrong','#9a281d','#fff0eb',4.5],['correct','#28513a','#edf6eb',4.5]];
  for(const [name,a,b,min] of pairs){const x=luminance(a),y=luminance(b),ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);assert.ok(ratio>=min,`${name}: ${ratio}`);evidence.contrast.push({name,ratio:Number(ratio.toFixed(2)),minimum:min});}
  assert.equal(evidence.pages.length,12);
  await writeFile('artifacts/design/report.json',JSON.stringify(evidence,null,2));
  console.log('DESIGN PASS: 12 pages × 4 widths (320–1440), 6 extra axe scans, reduced motion, visible focus, 10 contrast pairs.');
 }finally{await context.close();}
}
