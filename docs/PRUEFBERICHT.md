# Prüfbericht

## Stand der lokalen Abnahme

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
