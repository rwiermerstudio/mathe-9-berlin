# Mathe 9 Berlin

**[Lernkapitel lesen](https://rwiermerstudio.github.io/mathe-9-berlin/lernen.html)** · **[Direkt üben](https://rwiermerstudio.github.io/mathe-9-berlin/)** · [Curriculum und Quellen](https://rwiermerstudio.github.io/mathe-9-berlin/curriculum.html)

Ein statischer Lern- und Übungstrainer für Klasse 9 am Gymnasium Berlin: **neun ausführliche eigenständige Lernkapitel und 72 parametrische Aufgabentypen**, gestufte Hinweise, konkrete Rechenwege und differenzierte Antwortprüfung. Keine Anmeldung, keine externe Laufzeitbibliothek, kein Backend und keine Tracker.

## Gestaltung

Die neue Oberfläche verbindet kräftige serifenlose Überschriften, eine geometrische Formenstudie und flächige Kapiteltafeln mit einem ruhigen Lesebereich. Dunkles Violett, helles Gelbgrün, Koralle und nahezu schwarze Schrift ersetzen das frühere grüne Kartenlayout. Inspiration: [Pentagram – neue Guggenheim-Identität](https://www.pentagram.com/work/guggenheim-3); konkrete Beobachtungen, eigene Ableitungen, Farbwerte und Prüfungen stehen in [DESIGN.md](docs/DESIGN.md). Keine Verbindung zu oder Beauftragung durch Guggenheim/Pentagram; keine übernommenen Logos, Kunstwerke oder Markenfonts. Systemschriften, CSS-Formen und eigene SVG benötigen keinerlei externe Laufzeitabrufe.

## Lernen

- Thema, Anspruch und konkreten Aufgabentyp wählen; beliebig viele neue Zahlenvarianten.
- Brüche, Dezimalkomma/Punkt, negative Zahlen und Lösungsmengen werden numerisch äquivalent geprüft; Eingaben werden niemals als Code ausgewertet.
- Freies Üben, lokale Fehlerkartei und gemischte Tests mit zehn Aufgaben, mindestens eine pro Thema.
- Erstversuche ohne Hilfe werden von gestütztem Üben getrennt. Erst nach erneutem eigenständigem Lösen verschwinden Aufgaben aus der Fehlerkartei.
- Mathematisch berechnete SVG-Graphen, maßstäbliche Dreiecke und ein Diagramm zur Achsenmanipulation; jeweils Textalternativen.
- Fortschritt im Browser, JSON-Export und bestätigtes Löschen. Keine Synchronisation, kein Import, kein Fortsetzen laufender Tests nach Neuladen.
- Tastaturbedienung, sichtbarer Fokus, semantische Formulare und Live-Rückmeldung; mobile Darstellung.

## Ausführlich verstehen

Ein **ausdrücklich erfundener Schulhofprojekttag** verbindet die neun Kapitel: Materialliste, Abrechnung, Transport, Entwurf, Vermessung, Behälter, Veränderungsmodelle, Ziehaktion und Auswertung. Preise, Maße und Daten sind Übungsannahmen. Jedes Kapitel bleibt mit eigener Leitfrage und aufgefrischtem Vorwissen einzeln verständlich. Vier neu geschriebene Erklärabschnitte führen jeweils von einer Vorhersage zum mathematischen Grund und zurück zur Entscheidung. Eine Planungspause, acht vollständig gerechnete Beispiele mit jeweils eigener Sachdeutung, häufige Fehler, drei weitere Selbstchecks sowie Fazit und Übergang machen daraus einen durchgängigen Lernweg. Abstrakte oder negative Übungswerte werden nicht nachträglich als reale Mengen ausgegeben. [Didaktisches Konzept und Prüfgrenzen](docs/NARRATIVER-LERNWEG.md). Die [Abdeckungstabelle](docs/KAPITELABDECKUNG.md) ordnet **alle 72 Typen einzeln** einer Erklärung zu; [coverage.json](https://rwiermerstudio.github.io/mathe-9-berlin/coverage.json) stellt dieselbe Zuordnung maschinenlesbar bereit.

Drei zusätzliche responsive Vergleichsbilder zeigen Umkehroperationen, feste/variable Kosten und lineares/exponentielles Wachstum als beschriftete HTML-Rechenketten mit Anleitung und Bildunterschrift. Zehn weiterhin interaktive, berechnete SVG erklären Wurzelintervalle, binomische Flächen, Geradensteigung, Parabelsymmetrie, Dreiecksverhältnisse, Kegelschnitte, diskretes Wachstum, Sinusperioden, Urnenbäume und Achsenverkürzung. Jede hat eine inhaltliche Anleitung, beschriftete Tastaturregler und eine mit den Zahlen aktualisierte vollständige Textalternative. Eigene SVG, keine extern geladenen Medien.

Die Kapitel sind statisch unter `lernen/<thema>.html`, auch ohne JavaScript lesbar. Inhaltsnavigation und Vor-/Weiterlinks unterstützen schrittweises Lesen. Jede Methode hat einen Link in genau ihren Übungstyp (`index.html?type=<id>`). Die Übungsseite führt im neuen Tab zum zugehörigen Beispiel zurück; Öffnen zählt als Hilfe, im Test ist der Link verborgen. Lesen und die 27 kurzen Denkfragen plus neun Planungspausen erzeugen keine neuen Speicherdaten; der vorhandene Schlüssel und das Fortschrittsformat bleiben unverändert. Die Übungsseite lädt keine Lehrtextmodule.

## Berliner Rahmenlehrplan statt bundesweiter Themenliste

Grundlage ist die **amtliche Ausgabe 2023** des [Fachteils C Mathematik](https://www.berlin.de/sen/bildung/unterricht/faecher-rahmenlehrplaene/rahmenlehrplaene/rahmenlehrplan-teil-c_mathe-1-10.pdf), in Berlin seit 2025/26 für alle Jahrgänge gültig. S. 15 ordnet Gymnasium 9 der Stufe G zu. S. 16 erlaubt Verzahnung G/H und legt die Konkretisierung ins schulinterne Curriculum. Insbesondere diskrete Exponentialfunktionen und Sinusfunktionen gehören bereits zu G. Voraussetzungen E/F sind in jeder Aufgabe markiert.

Die [Quellenseite](curriculum.html) dokumentiert genaue Fachseiten und Grenzen. [Alle Aufgabentypen](docs/AUFGABENTYPEN.md), [Implementierungsplan](docs/IMPLEMENTIERUNGSPLAN.md), [Prüfbericht](docs/PRUEFBERICHT.md).

## Lokal starten und prüfen

Voraussetzung: Node.js 22+ und npm. Nur Entwicklungs- und Testwerkzeuge werden installiert.

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
python3 -m http.server 8080 --directory dist
```

Dann `http://localhost:8080` öffnen. ES-Module benötigen einen HTTP-Server; nicht per Doppelklick auf `file://` starten.

Einzeln:

```sh
npm test                 # Parser, Generator, Fortschritt, Struktur, SVG
npm run build            # dist/ und generierte Aufgabentabelle
npm run test:browser     # Chromium: alle 72 Typen, Lernfunktionen, axe
npm run verify:live      # Alle Dateien in dist/ bytegenau gegen GitHub Pages
BASE_URL=https://rwiermerstudio.github.io/mathe-9-berlin/ npm run test:browser
```

Auf einem noch nicht von Playwright unterstützten Ubuntu 26.04 war lokal der dokumentierte Fallback nötig:

```sh
PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npx playwright install chromium
PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npm run verify
```

In GitHub Actions auf `ubuntu-latest` wird regulär installiert. Der Pages-Deploy ist von erfolgreichen Tests und Build abhängig. Prüfbilder werden als Actions-Artefakt abgelegt.

## Dateien und Erweiterung

- `src/catalog.js`: neun Themen, 72 Definitionen, deterministischer Seed-Generator, Prompt/Regel/Rechenschritte/Antwort plus mathematische Prüfeigenschaft je Typ.
- `src/answer.js`: streng formatierter Zahlen-/Bruchparser und Mengenvergleich. Standardtoleranz `max(1e-12, |Sollwert|·1e-9)`; bei Rundungsaufgaben eine halbe Einheit der letzten Nachkommastelle. Keine symbolische Algebra. Für periodische Ergebnisse exakte Brüche bevorzugen.
- `src/progress.js`: versionierter und validierter lokaler Zustand; höchstens 200 Fehleraufgaben und 20 Testresultate.
- `src/app.js`, `src/visual.js`: Lernablauf, barrierearme Bedienelemente und SVG aus tatsächlichen Parametern.
- `src/chapters.js`, `src/lesson-story.js`, `src/lesson-transfer.js`, `src/lesson-examples.js`: neu formulierte fachliche Erklärungen, Projektfaden und Vergleichsbilder, 72 individuelle Beispiel-Einordnungen und die unveränderten getesteten Rechenbeispiele. Die Story-/Transfermodule fließen beim Build in die statischen Kapitel ein, nicht in einen zusätzlichen Laufzeitdownload.
- `src/lesson-figures.js`, `src/lesson-reader.js`, `lessons.css`: mathematische Abbildungsmodelle, progressive Regler und responsive Leseoberfläche.
- `scripts/render-lessons.js`: escaped statische Kapitel aus Katalog und Lehrdaten; `scripts/build.js` erstellt auch die Abdeckungsdateien. Kein kompletter Lehrtextdownload beim Üben.
- `tests/narrative.test.js`, `tests/lessons*.js`, `tests/lesson-structure.test.js`: Inhalts-/Typverträge, unabhängige Beispiel-Sollwerte, Reglerinvarianten, Links, 72 echte Hin-/Rückklicks, 27 Selbstchecks und neun Projektchecks, drei neue Vergleichsbilder, 18 Kapitel-axe-Prüfungen bei 1440/360 px und Layout bei 1440/768/390/360 px. Ohne-JS- und Legacy-Speicher-Proben ergänzen die bestehende Suite.
- `scripts/verify-live.js`: abweichende oder fehlende Live-Dateien führen zum Fehler; JSON-Nachweis mit SHA-256 unter `artifacts/live-artifacts.json`.
- `tests/`: 200 feste Seeds je Typ, unabhängige Einsetz-/Umkehr-/Zähleigenschaften und Gegenproben mit verfälschten Antworten; Browserprüfung.
- `scripts/build.js`: kopiert nur die benötigten statischen Dateien in `dist/`. Keine Geheimnisse/Tests/Node-Abhängigkeiten im Pages-Artefakt.

Neue Typen brauchen zuerst eine prüfbare Spezifikation, mathematisch zulässige Parameterbereiche, eindeutiges Antwortformat, Regel, mindestens zwei Rechenschritte und eine unabhängig formulierte Prüfeigenschaft. Die Count- und Themenverträge in Tests und Dokumentation bewusst gemeinsam aktualisieren.

## Grenzen

Kein kompletter digitaler Mathematikunterricht, keine amtliche Freigabe und keine automatische Bewertung freier Beweise, Konstruktionen oder eigener Erhebungen. Die 72 Typen enthalten auch nahe verwandte Teilkompetenzen. Bedingte Wahrscheinlichkeit/Vierfeldertafeln, offene Modellierungsdiskussionen und umfassende Raumdarstellungen bleiben Unterrichtsaufgaben. H-Themen wie Logarithmen, Bogenmaß, allgemeine verschobene Exponentialfunktionen und Änderungsfunktionen werden nicht vorweggenommen.

Automatisierte Checks und Sichtprüfung ersetzen keine unabhängige mathematisch-didaktische Begutachtung oder Unterrichtserprobung. Hosting durch GitHub Pages kann übliche Serverzugriffe protokollieren; die App sendet selbst keinen Lernfortschritt.

## Lizenz

Eigener Code und eigene Aufgaben: MIT, siehe [LICENSE](LICENSE). Der amtliche Rahmenlehrplan wird nur verlinkt, nicht unter die Projektlizenz gestellt.
