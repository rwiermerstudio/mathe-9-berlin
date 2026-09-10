# Prüfbericht

## Abnahme der narrativen Überarbeitung

`PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npm run verify` bestanden: **15 Node-Testgruppen**, **14.400 Generatorfälle**, **446 interne Referenzen**, Build und vollständige Browser-/Designsuite. Die neuen Integrationstests wurden zuerst mit fehlendem Kapitelexport bzw. fehlender narrativer Buildabdeckung scheitern gesehen und nach der Integration erneut bestanden.

- Alle **36 fachlichen Erklärabsätze** neu formuliert und mit je einer kontextbezogenen Denkfrage verbunden. **Neun eigenständige Kapitel** führen den ausdrücklich fiktiven Schulhofprojekttag vom Materialbedarf bis zum Abschlussbericht fort. Voraussetzungen bleiben pro Kapitel vorhanden.
- **72 Beispiel-Einordnungen** werden innerhalb des jeweils richtigen Beispiels gerendert; IDs, Aufgabenparameter, Rechenbeispiele, Generator, Antwortprüfung und Speicherschema sind unverändert. Story und Transfer sind in den statischen Build integriert, keine verwaisten Dateien oder zusätzlichen Laufzeitmodule.
- **Neun Projektchecks** zusätzlich zu den **27 bestehenden Denkfragen** rechnerisch und per Tastatur geprüft. Die Quellenwerte der drei neuen Vergleichsbilder werden unabhängig geprüft. Die Urnenwahrscheinlichkeit wird durch vollständiges Auszählen der Kugelpaare gegengeprüft.
- **Drei neue HTML-Vergleichsbilder** ergänzen die **zehn unveränderten interaktiven SVG**. Jeweils Anleitung, semantische Rechenketten und Bildunterschrift; mobile Stapelung ohne Abhängigkeit von Farbe oder JavaScript.
- Browser: **72 echte Hin-/Rückklicks**, zehn Regler, alle Kapitel bei vier Breiten, **18 Kapitel-axe-Scans**, zusätzlich Designprüfung auf **12 Seiten bei vier Breiten** und sechs weiteren axe-Scans; keine gefundenen Verstöße oder Konsolenfehler. Kein manueller Screenreader- oder Safari-Test.
- Legacy-Speicher, gesperrter Speicher, Lesen ohne JavaScript und der vollständige bisherige Übungsablauf bleiben grün. Kapitelbilder, Vergleichsbilder bei Desktop/Mobil und Screenshots aller Erklärabschnitte liegen unter `artifacts/`. Manuell gesichtet: neue Kosten-/Wachstums-/Umkehrbilder, mobile Leseoberfläche, Zahlen-Erklärabschnitt und mobiles Urnenbild; keine festgestellte Überlagerung oder abgeschnittene Beschriftung in diesen Ansichten.
- Inhaltliche Grenzen: keine unabhängige fachdidaktische Begutachtung oder Unterrichtserprobung, keine Bewertung freier Begründungen. Vergleichsmodelle sind keine echte Schulstatistik oder Bauanleitung. Bestehende Curriculumgrenzen unverändert.

Der endgültige Commit und erfolgreiche CI-/Pages-Lauf werden im Übergabebericht angegeben. Nach Veröffentlichung sind weiterhin bytegenauer Livevergleich und vollständige Browsersuite gegen Pages erforderlich; lokales Grün allein ist kein Veröffentlichungsnachweis.

## Abnahme der Lernkapitel-Erweiterung (historisch)

Die vollständige lokale Abnahme mit `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npm run verify` wurde durchgeführt. Ergebnis: **12 Node-Testgruppen bestanden**, keine Fehler; bisherige 14.400 Generatorfälle unverändert grün.

- **9 eigenständige Kapitel, 72 einzeln erklärte Methoden und vollständig gerechnete Beispiele**, **10 interaktive SVG**, **27 Selbstchecks**. Die Kapiteltexte einschließlich der ausgearbeiteten Beispiele umfassen **9.502 Wörter** ohne Bildtexte, Aufgabenprompts und Navigation; je Kapitel 1.017–1.105. Der Regressionstest verlangt mindestens 900 Wörter je Kapitel, ersetzt aber nicht die inhaltliche Prüfung.
- Die tatsächlichen bestehenden Themen und Typen wurden vor der Redaktion gelesen. `src/catalog.js`, `src/answer.js` und `src/progress.js` sind gegenüber dem vorherigen Stand unverändert. Kein neues Speicherformat und keine stillschweigende Curriculum-Erweiterung.
- **72 unabhängige Beispiel-Sollwerte** rechnerisch gegen die echten Aufgabentypen und deren Einsetz-/Umkehrinvarianten geprüft; zusätzliche Zwischenschritte, Vorzeichenfälle und falsche Antworten geprüft. Die sichtbaren Rechenwege wurden redaktionell ausgearbeitet, nicht nur aus Kurzregeln wiederholt.
- **429 interne Referenzen** geprüft: exakte Fragmente, Übungs-IDs, Nachbarkapitel und Assets unter einem Projekt-Unterpfad. `coverage.json` wird zusätzlich im realen Browser eingelesen und exakt mit dem Typkatalog verglichen.
- Mathematische SVG-Modelle über alle erlaubten Reglerwerte geprüft, inklusive unabhängiger Zahlenproben und Ablehnung ungültiger Reglerwerte. Die Bildbeschreibung wird aus denselben Größen wie die Geometrie erstellt; zusätzlich ist sie als normal lesbarer Text sichtbar.
- Browser: **72 tatsächlich geklickte Hin-/Rückwege** Kapitel → passender Übungstyp → exakte Erklärungssektion; Erklärung zählt als Hilfe und bleibt im Test verborgen. Alle **10 Regler** per Werteänderung und Tastatur geprüft, alle **27 Selbstchecks** geöffnet und geschlossen.
- Alle neun Kapitel bei **1440, 768, 390 und 360 px** ohne horizontalen Dokumentüberlauf. **18 axe-Scans** (jedes Kapitel Desktop und Mobil) ohne gefundene Verstöße in WCAG 2 A/AA und 2.1 AA. Keine Zertifizierung, kein manueller Screenreader-Test.
- Alle Kapitel ohne JavaScript lesbar, einschließlich Beispiele, Abbildungen und nativer Selbstcheck-Aufklapper. Lesen verändert bestehenden Legacy-Speicher nicht; die Kapitel funktionieren auch mit gesperrtem Storage.
- Desktop-/Mobilbilder sämtlicher Kapitelabbildungen sowie der Leseoberfläche wurden erstellt und visuell geprüft. Mobile SVG-Beschriftung wurde vergrößert; vollständige Textalternativen bleiben auch bei kleinen Bildern lesbar. Die Bilder liegen lokal bzw. als CI-Artefakt unter `artifacts/`.
- Vollständige bisherige Übungsabnahme bleibt grün: 72 Typen, 27 Thema/Anspruch-Kombinationen, Fehlerkartei, Testende, Export, Löschen, Persistenz und Speicherfehler.

**Release-Nachweis:** Der endgültige Commit und der erfolgreiche Pages-Lauf werden im Übergabebericht genannt. `npm run verify:live` vergleicht nach dem Deployment **sämtliche** Dateien des aktuellen `dist/` bytegenau mit den öffentlichen URLs und schreibt `artifacts/live-artifacts.json`. Anschließend wird dieselbe vollständige Browserprüfung mit `BASE_URL=https://rwiermerstudio.github.io/mathe-9-berlin/` ausgeführt; deren maschinenlesbarer Kapitelbericht ist `artifacts/lesson-browser-report.json`. Ein grüner lokaler Lauf allein wird nicht als Deploymentnachweis ausgegeben.

## Stand der lokalen Erstabnahme (historisch)

Recherche und Prüfung: 10. September 2026. Laufzeit: Node.js 22; Chromium über Playwright. Die tatsächliche Veröffentlichung wird zusätzlich durch den grünen Pages-Workflow und einen Browserdurchlauf mit `BASE_URL` überprüft; maßgeblich sind die zugehörigen Actions-Läufe und der im Übergabebericht genannte Commit.

`PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 npm run verify` wurde erfolgreich ausgeführt:

- **7 Node-Testgruppen bestanden**, 0 fehlgeschlagen.
- **72 Typen × 200 Seeds = 14.400 Aufgaben**: deterministische Wiederholbarkeit, endliche Antworten, Regel/Schritte, gültige Parameter, Prüfung der Musterantwort und Ablehnung falscher/ungültiger Antworten. Jeder Typ muss mindestens zehn unterschiedliche Prompts unter diesen Seeds erzeugen.
- Für jeden Typ eine anders formulierte mathematische Eigenschaft: zum Beispiel Einsetzen in die Ausgangsgleichung, Umkehrrechnung, Pythagoras-Identität, vollständiges Auszählen oder Vergleich mit sortierten Daten. Diese Orakel werden zusätzlich mit absichtlich verfälschten Antworten negativ geprüft. Sie sind keine unabhängige menschliche Begutachtung.
- **200 SVG-Varianten** ohne NaN/Infinity, mit Textalternative und Bildunterschrift.
- Parser: Brüche, negative Nenner, Dezimalkomma, Unicode-Minus, wissenschaftliche Notation, Mehrfachlösungen, doppelte Werte, leere Menge, Vorzeichenfehler, fehlende zweite Lösung, Rundung und kleine Zahlen. `0` wird nicht als Ersatz für `1e-9` akzeptiert. Nullnenner, Code, leere und fehlerhafte Eingaben werden abgewiesen.
- Fortschritt: Erstversuch, Hilfe, Wiederholungsabbau, defekter gespeicherter Zustand; keine Gleichsetzung von „Lösung angesehen“ mit eigenständigem Erfolg.
- HTML: keine doppelten IDs, interne Fragmente vorhanden, lokale Assets vorhanden; keine Auswertung von Nutzereingaben als JavaScript.

## Browser-Lerndurchlauf

- Alle **72 Typen in neun Themen** über die tatsächlichen Auswahlfelder gestartet, Prompt mit der konkreten Variante abgeglichen, ungültige Eingabe probiert und die Antwort per Enter/Prüfen abgegeben.
- Alle **27 Thema-Anspruch-Kombinationen** geprüft.
- Fehler erzeugt, Hinweise und vollständige Lösung geöffnet, neu geladen, Fehlerkartei eigenständig abgearbeitet; leere Kartei auch nach Testende geprüft.
- Gemischten Test vollständig bearbeitet: **10 von 10**, dann Ergebnisansicht geprüft. Die Generator-/Parserprüfungen decken unabhängig davon falsche Ergebnisse ab.
- JSON-Download ausgelöst; Löschen zunächst abgebrochen, danach bestätigt und Persistenz geprüft.
- Defektes LocalStorage und gesperrtes Schreiben simuliert; App bleibt benutzbar und zeigt Speicherwarnung.
- Desktop **1440 × 1000**, schmale Breiten **360, 390 und 768 px**: kein horizontaler Dokumentüberlauf. Desktop- und Smartphone-Prüfbilder visuell angesehen, Smartphone-Aufgabenbereich zusätzlich vergrößert geprüft.
- `axe-core`: keine gefundenen Verstöße in den geprüften Regeln WCAG 2 A/AA und 2.1 AA auf der Aufgabenansicht. Das ist **keine vollständige Konformitätszertifizierung**. Fokus per Tastatur und Antwortabgabe per Enter separat geprüft.
- Keine Konsolenfehler oder unbehandelten JavaScript-Fehler im Hauptdurchlauf.
- `npm audit --audit-level=high`: **0 bekannte Schwachstellen** zum Prüfzeitpunkt.

## Gestaltungsprüfung

Primär ein Lernarbeitsplatz mit Themenfilter und einer zentralen Aufgabe, keine werbliche Kachelseite. Hoher Textkontrast, Arial bewusst wegen vertrauter Schul-/Formularlesbarkeit und ohne externe Font-Anfragen. Kein Animationszwang. Sichtprüfung: kein abgeschnittener Aufgabentext und bedienbare Buttons auf 390 px. Diagrammtexte sind ergänzend; vollständige lesbare Beschreibungen stehen daneben. Anti-Slop-Selbstprüfung: 0/10 der definierten Gestaltungsmuster (keine Technikverläufe, Glasscheiben, Deko-Statistiken oder Feature-Kachelgrids).

## Entdeckte und behobene Probleme

- Sehr kleine Antworten brauchten eine größenabhängige Toleranz statt pauschal 1e-8; Regressionstest hinzugefügt.
- Wechsel von der Testergebnisansicht in eine leere Fehlerkartei ließ zunächst die alte Ansicht sichtbar; mit Browserregression behoben.
- Der Test musste den eingeklappten Fortschrittsbereich tatsächlich öffnen, bevor er Export/Löschen bedient.
- Lokales Ubuntu 26.04 wurde von der festgelegten Playwright-Version nicht direkt unterstützt; der Ubuntu-24.04-Browserdownload funktioniert, ohne Änderungen an Hermes-Konfiguration.

## Verifizierte Erstveröffentlichung

- Öffentliches Repository: https://github.com/rwiermerstudio/mathe-9-berlin
- Live-App: https://rwiermerstudio.github.io/mathe-9-berlin/
- Erstveröffentlichungs-Commit: `99fe7dcc3b3e82b46178065efbfea2a163175f8e`.
- Erfolgreicher Test- und Pages-Lauf: https://github.com/rwiermerstudio/mathe-9-berlin/actions/runs/34452928510
- Anschließend **derselbe Browser-Lerndurchlauf über alle 72 Typen direkt auf der öffentlichen URL bestanden**. Alle neun ausgelieferten HTML/CSS/JS/SVG-Dateien bytegenau mit dem lokalen Build verglichen.
- `rwiermer` per GitHub-API mit `permission=admin`, `role_name=admin` zurückgelesen. Repository-Sichtbarkeit PUBLIC, Pages-Buildtyp workflow, HTTPS erzwungen.
- Der erste CI-Lauf meldete eine Node-20-Abkündigung für den separaten Screenshot-Artefaktupload. Deshalb auf die anhand der GitHub-Releases ermittelte aktuelle Hauptversion `actions/upload-artifact@v7` angehoben. Der nachfolgende Workflow wird vor Übergabe erneut überwacht; App-Dateien bleiben dabei unverändert.

## Grenzen der Prüfung

Chromium, kein echter Safari-/Firefox-Lauf und kein manueller Screenreader-Test. Die Graphen sind nicht als interaktive Zeichenwerkzeuge gedacht. Keine fachliche Unterrichtserprobung. Kein Anspruch auf vollständige Abdeckung des Rahmenlehrplans oder automatische Bewertung offener Begründungen. `actionlint` war lokal nicht installiert; YAML wurde beim Schreiben geprüft und der reale GitHub-Workflow dient als zusätzliche Integrationsprüfung. Externe amtliche PDF-Quelle wurde erfolgreich heruntergeladen und ihr Text für die Curriculum-Zuordnung ausgelesen.
