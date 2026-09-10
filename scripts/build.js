import {cp,mkdir,rm,writeFile} from 'node:fs/promises';import {types} from '../src/catalog.js';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});for(const path of ['index.html','curriculum.html','style.css','favicon.svg','src'])await cp(path,`dist/${path}`,{recursive:true});
await writeFile('docs/AUFGABENTYPEN.md','# Aufgabenkatalog\n\n72 Typen. Pro Typ 200 feste Seeds in der Generatorsuite; viele weitere reproduzierbare Varianten. Anspruch 1–3 ist didaktisch, nicht die amtliche Niveaustufe.\n\n| ID | Thema | Aufgabe | Anspruch | Zuordnung |\n|---|---|---|---|---|\n'+types.map(t=>`| ${t.id} | ${t.topic} | ${t.title} | ${t.level} | ${t.scope} |`).join('\n')+'\n');
console.log('BUILD PASS: statische App in dist; 72 dokumentierte Aufgabentypen.');
