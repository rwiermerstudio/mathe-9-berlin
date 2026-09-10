import {topics,types} from '../src/catalog.js';
import {chapters} from '../src/chapters.js';
import {examples,exampleParameters} from '../src/lesson-examples.js';
import {figureDefinitions,figureMarkup,escapeHTML as esc} from '../src/lesson-figures.js';
import {storyNotice,processFigures} from '../src/lesson-story.js';
import {transfers} from '../src/lesson-transfer.js';
import {answerText} from '../src/answer.js';
const p=s=>`<p>${esc(s)}</p>`;
const check=([question,answer])=>`<details class="comprehension"><summary>${esc(question)}</summary>${p(answer)}</details>`;

export function renderChapter(c){
 const index=chapters.indexOf(c),topic=topics.find(t=>t.id===c.id),ts=types.filter(t=>t.topic===c.id),story=c.story;
 const nav=[['motivation','Die Leitfrage'],['voraussetzungen','Vorwissen auffrischen'],['begriffe','Begriffe'],['verstehen','Zusammenhänge verstehen'],['projektcheck','Planungspause'],['visualisieren','Entdecken am Bild'],...ts.map(t=>[t.id,t.title]),['fehler','Fehler vermeiden'],['selbstcheck','Selbst prüfen'],['zusammenfassung','Das bleibt']];
 const worked=ts.map(t=>{
  const e=examples.find(x=>x.id===t.id),q=t.build({...exampleParameters,...e.params});
  if(!transfers[t.id])throw Error(`Fehlende Einordnung: ${t.id}`);
  return `<section class="worked" id="${esc(t.id)}" tabindex="-1" data-type="${esc(t.id)}">
<p class="eyebrow">${esc(t.scope)} · Anspruch ${t.level}</p><h2>${esc(t.title)}</h2>${p(e.why)}
<h3>Vollständig gerechnetes Beispiel</h3><p class="example-question">${esc(q.prompt)}</p>
<ol>${e.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>
<p class="example-answer"><strong>Antwort im Übungsfeld:</strong> <code>${esc(answerText(q))}</code></p>
<p class="check"><strong>Probe und Einordnung:</strong> ${esc(e.check)}</p>
<div class="story-transfer"><h3>Was bedeutet das für unseren Plan?</h3>${p(transfers[t.id])}</div>
<a class="practice-link" data-practice="${esc(t.id)}" href="../index.html?type=${encodeURIComponent(t.id)}">Jetzt „${esc(t.title)}“ mit neuen Zahlen üben →</a>
<p class="small"><a href="#kapitelnavigation">Zur Kapitelübersicht ↑</a></p></section>`;
 }).join('');
 const figures=figureDefinitions.filter(f=>f.topic===c.id).map(f=>`<section class="interactive" data-figure="${esc(f.id)}"><h3>${esc(f.title)}</h3><p id="${f.id}-instruction">${esc(f.prompt)}</p><label for="${f.id}-control">${esc(f.label)}</label><div class="range-row"><input disabled type="range" id="${f.id}-control" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.value}" aria-describedby="${f.id}-instruction"><output for="${f.id}-control" id="${f.id}-value">${f.value}</output></div><figure class="lesson-figure" id="${f.id}-figure">${figureMarkup(f)}</figure></section>`).join('');
 const process=processFigures[c.id];
 const comparison=process?`<div class="process-study" id="${c.id}-prozess"><h3>${esc(process.title)}</h3>${p(process.guidance)}<figure class="process-figure">${process.tracks.map(([label,...steps])=>`<div class="process-track"><h4>${esc(label)}</h4><ol>${steps.map(text=>`<li>${esc(text)}</li>`).join('')}</ol></div>`).join('')}<figcaption>${esc(process.caption)}</figcaption></figure></div>`:'';
 return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(topic.name)}: eigenständiger Lernweg mit fiktivem Schulprojekt, Herleitungen, acht gerechneten Beispielen und interaktiven Abbildungen.">
<title>${esc(topic.name)} · Lernkapitel · Mathe 9 Berlin</title><link rel="icon" href="../favicon.svg"><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="../lessons.css"><script type="module" src="../src/lesson-reader.js"></script></head>
<body class="lesson-page"><a class="skip" href="#main">Direkt zum Kapitel</a>
<header><a class="brand" href="../index.html"><span class="mark" aria-hidden="true">m⁹</span><span>Mathe 9 <b>Berlin</b></span></a><nav aria-label="Hauptnavigation"><a href="../lernen.html">Alle Lernkapitel</a> <a href="../curriculum.html">Curriculum & Quellen</a></nav></header>
<main id="main" tabindex="-1"><div class="chapter-hero"><p class="eyebrow">LERNKAPITEL ${index+1} VON ${chapters.length}</p><h1>${esc(topic.name)}</h1><p class="chapter-lead">${esc(c.question)}</p></div>
<p class="scope-note">Eigenständige Erklärung zu den acht vorhandenen Aufgabentypen dieses Themas. G-orientiert, mit ausdrücklich markierten E/F-Voraussetzungen. Kein vollständiger Ersatz für Unterricht und kein vollständiger Rahmenlehrplankurs. <a href="../curriculum.html">Berliner Zuordnung und Grenzen</a>.</p>
<div class="reader-layout"><nav id="kapitelnavigation" class="chapter-nav" aria-label="In diesem Kapitel"><h2>Dein Lernweg</h2><ol>${nav.map(([id,label])=>`<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join('')}</ol><p>Erst verstehen, dann ein Beispiel nachvollziehen, danach selbst rechnen. Du kannst jederzeit zu einer bestimmten Methode springen.</p></nav>
<article class="chapter-content" aria-label="${esc(topic.name)} lernen">
<section id="motivation"><h2>Die Leitfrage</h2><p class="story-notice"><strong>Fiktives Schulprojekt.</strong> ${esc(storyNotice)}</p><p class="eyebrow">${esc(story.phase)}</p>${story.opening.map(p).join('')}</section>
<section id="voraussetzungen"><h2>Vorwissen auffrischen</h2>${p(c.recall)}</section>
<section id="begriffe"><h2>Begriffe, die du brauchst</h2><dl>${c.concepts.map(([term,meaning])=>`<dt>${esc(term)}</dt><dd>${esc(meaning)}</dd>`).join('')}</dl></section>
<section id="verstehen"><h2>Zusammenhänge verstehen</h2>${c.reasoningSections.map(r=>`<div class="reasoning-step"><h3>${esc(r.title)}</h3>${r.paragraphs.map(p).join('')}</div>`).join('')}${comparison}</section>
<section id="projektcheck"><h2>Planungspause: Entscheide selbst</h2><p>Halte kurz an. Formuliere erst deine Begründung und öffne danach den Vergleich. Eine begründete Korrektur bringt den Plan weiter als eine geratene Zahl.</p>${check(story.checkpoint)}</section>
<section id="visualisieren"><h2>Entdecken am Bild</h2><p>Prüfe jetzt die Beziehungen aus eurem Plan am Modell. Lies die Bildfrage, sage eine Änderung voraus und bewege erst dann den Regler. Die Bildunterschrift beschreibt auch ohne Grafik, was sich verändert.</p>${figures}<noscript><p>Die Abbildungen zeigen ihre Ausgangswerte. Für die Regler brauchst du JavaScript; alle Erklärungen und Lösungen bleiben lesbar.</p></noscript></section>
${worked}
<section id="fehler"><h2>Fehler vermeiden</h2>${p(c.mistakes)}</section>
<section id="selbstcheck"><h2>Selbst prüfen</h2><p>Erkläre deine Antwort, bevor du die Lösung öffnest. Diese Denkfragen werden nicht gespeichert oder bewertet.</p>${c.checks.map(check).join('')}</section>
<section id="zusammenfassung"><h2>Das bleibt für euren Plan</h2>${p(c.summary)}<h3>Der nächste Schritt</h3>${p(story.next)}</section>
<nav class="chapter-sequence" aria-label="Kapitel wechseln">${index>0?`<a href="${chapters[index-1].id}.html">← ${esc(topics[index-1].name)}</a>`:'<a href="../lernen.html">← Alle Lernkapitel</a>'}${index<chapters.length-1?`<a href="${chapters[index+1].id}.html">${esc(topics[index+1].name)} →</a>`:'<a href="../index.html">Jetzt selbst üben →</a>'}</nav>
</article></div></main><footer><p>Mathe 9 Berlin · Ohne Anmeldung, ohne Lerntracking. <a href="../curriculum.html">Quellen & Grenzen</a></p></footer></body></html>`;
}
