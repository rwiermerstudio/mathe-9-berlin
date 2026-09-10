# Mathe 9 Berlin

**[Direkt üben](https://rwiermerstudio.github.io/mathe-9-berlin/)** · [Curriculum und Quellen](https://rwiermerstudio.github.io/mathe-9-berlin/curriculum.html)

Ein statischer Übungstrainer für Klasse 9 am Gymnasium Berlin: **72 parametrische Aufgabentypen in neun Themen**, kurze Erklärungen, gestufte Hinweise, konkrete Rechenwege und differenzierte Antwortprüfung. Keine Anmeldung, keine externe Laufzeitbibliothek, kein Backend und keine Tracker.

## Lernen

- Thema, Anspruch und konkreten Aufgabentyp wählen; beliebig viele neue Zahlenvarianten.
- Brüche, Dezimalkomma/Punkt, negative Zahlen und Lösungsmengen werden numerisch äquivalent geprüft; Eingaben werden niemals als Code ausgewertet.
- Freies Üben, lokale Fehlerkartei und gemischte Tests mit zehn Aufgaben, mindestens eine pro Thema.
- Erstversuche ohne Hilfe werden von gestütztem Üben getrennt. Erst nach erneutem eigenständigem Lösen verschwinden Aufgaben aus der Fehlerkartei.
- Mathematisch berechnete SVG-Graphen, maßstäbliche Dreiecke und ein Diagramm zur Achsenmanipulation; jeweils Textalternativen.
- Fortschritt im Browser, JSON-Export und bestätigtes Löschen. Keine Synchronisation, kein Import, kein Fortsetzen laufender Tests nach Neuladen.
- Tastaturbedienung, sichtbarer Fokus, semantische Formulare und Live-Rückmeldung; mobile Darstellung.

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
- `tests/`: 200 feste Seeds je Typ, unabhängige Einsetz-/Umkehr-/Zähleigenschaften und Gegenproben mit verfälschten Antworten; Browserprüfung.
- `scripts/build.js`: kopiert nur die benötigten statischen Dateien in `dist/`. Keine Geheimnisse/Tests/Node-Abhängigkeiten im Pages-Artefakt.

Neue Typen brauchen zuerst eine prüfbare Spezifikation, mathematisch zulässige Parameterbereiche, eindeutiges Antwortformat, Regel, mindestens zwei Rechenschritte und eine unabhängig formulierte Prüfeigenschaft. Die Count- und Themenverträge in Tests und Dokumentation bewusst gemeinsam aktualisieren.

## Grenzen

Kein kompletter digitaler Mathematikunterricht, keine amtliche Freigabe und keine automatische Bewertung freier Beweise, Konstruktionen oder eigener Erhebungen. Die 72 Typen enthalten auch nahe verwandte Teilkompetenzen. Bedingte Wahrscheinlichkeit/Vierfeldertafeln, offene Modellierungsdiskussionen und umfassende Raumdarstellungen bleiben Unterrichtsaufgaben. H-Themen wie Logarithmen, Bogenmaß, allgemeine verschobene Exponentialfunktionen und Änderungsfunktionen werden nicht vorweggenommen.

Automatisierte Checks und Sichtprüfung ersetzen keine unabhängige mathematisch-didaktische Begutachtung oder Unterrichtserprobung. Hosting durch GitHub Pages kann übliche Serverzugriffe protokollieren; die App sendet selbst keinen Lernfortschritt.

## Lizenz

Eigener Code und eigene Aufgaben: MIT, siehe [LICENSE](LICENSE). Der amtliche Rahmenlehrplan wird nur verlinkt, nicht unter die Projektlizenz gestellt.
