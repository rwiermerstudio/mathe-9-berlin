# Implementierungsplan

## Ziel und Gestaltung
Deutschsprachiger, statischer Lernarbeitsplatz für Klasse 9 am Gymnasium Berlin. Primäre Oberfläche: Lernen/Üben, keine Marketingseite. Themenauswahl, ruhiger Aufgabenbereich, gut lesbare Arial-Schrift, dunkles Grün auf warmem Weiß; keine externen Schriften oder Tracker.

## Quellen vor Implementierung
Amtlicher Fachteil C Mathematik, Berlin/Potsdam 2023: https://www.berlin.de/sen/bildung/unterricht/faecher-rahmenlehrplaene/rahmenlehrplaene/rahmenlehrplan-teil-c_mathe-1-10.pdf
Ab Schuljahr 2025/26 in Berlin für 1–10 gültig (Impressum). Gymnasium: 9 = G (S. 15); Verzahnung G/H und schulinterne Festlegung S. 16. Fachseiten 42–43, 48–49, 54–55, 60–61, 64–65. Nicht mit der weiterhin auffindbaren Ausgabe von 2015 verwechseln.

## Schritte / Abnahme
1. Numerischen Antwortparser testgetrieben bauen: Dezimalkomma, Brüche, negatives Vorzeichen, Lösungsmenge, ungültige Eingaben; kein eval.
2. 72 einzeln benannte parametrische Typen in neun Themen; Seeds reproduzierbar, nie ungültige Nenner oder unmögliche Geometrie. Pro Typ Regel, konkrete Rechenschritte, Antwortformat und Curriculum-Status.
3. Filter Thema/Anspruch/Typ; Training, Fehlerkartei, gemischter 10-Aufgaben-Test; Hinweise und Lösung, unmittelbare Rückmeldung, Erstversuch klar getrennt von Üben mit Hilfe.
4. Lokaler Fortschritt, robuste Fehlerbehandlung bei blockiertem/defektem Speicher, JSON-Export und bestätigtes Löschen.
5. Mathematische Graphen und maßstäbliche Dreiecke; SVG mit Textalternative. Desktop/Mobil, Tastatur, Live-Rückmeldung.
6. Deterministische Generatortests einschließlich unabhängiger mathematischer Eigenschaften; Browserdurchläufe über alle Themen/Typen, Testende, Fehlerkartei, Persistenz, Export/Löschen, Konsole, schmale Viewports.
7. Öffentliches Repo rwiermerstudio/mathe-9-berlin, Rechte rwiermer = admin prüfen, Pages Actions mit Test-Gate, Commit/CI/öffentliche Seite nach Veröffentlichung nachlesen und bedienen.

## Erweiterung: eigenständige Lernkapitel (umgesetzt)

1. Bestehenden Katalog tatsächlich inventarisiert: neun unveränderte Themen mit je acht Typen, 72 stabile IDs. Keine Aufgaben-/Parameter- oder Speicherformatänderung.
2. Eigenständige Lehrtexte in `src/chapters.js`: Leitfrage/Motivation, innerhalb des Kapitels erklärtes Vorwissen, Fachbegriffe, begründete Methoden, Fehler und Prüfstrategien, drei Selbstchecks mit getrennt aufklappbaren Antworten, Zusammenfassung.
3. `src/lesson-examples.js`: ein vollständig ausgearbeitetes Beispiel pro echtem Typ, passende Parameter innerhalb der vorhandenen Grenzen, ausdrückliche Rechenschritte und Probe. Der Build übernimmt die Aufgabenstellung aus genau diesem Typ. Unabhängig notierte Sollwerte werden rechnerisch gegen Generator und Prüfinvariante getestet.
4. Zehn interaktive SVG für neun Themen; Wachstum erhält getrennte Bestands- und Sinusbilder. Jede Abbildung hat erklärende Anleitung, Tastaturregler, berechnete Geometrie und vollständige synchrone Textalternative. Keine dekorativen Fremdbilder.
5. Statische Kapitel unter `lernen/<thema>.html` mit Inhaltsnavigation und Vor-/Weiterlinks; vollständig lesbar ohne JavaScript. Die Übungsseite lädt keine Lehrtextmodule. Exakte Hin-/Rücklinks für 72 Typen; Erklärung im neuen Tab zählt als Hilfe und ist im Test verborgen.
6. `coverage.json` und `docs/KAPITELABDECKUNG.md` werden aus dem tatsächlichen Katalog generiert. Tests sichern 72/72 Zuordnung, Inhalte, Beispielrechnung, alle Reglerwerte, Navigation und Projekt-Unterpfade.
7. Browserabnahme: 72 echte Klick-Rundreisen, alle 27 Selbstchecks, zehn Tastaturregler, Desktop/Mobil in vier Breiten und axe auf allen Kapiteln in zwei Breiten; alter/gesperrter Speicher, Lesen ohne JS. Bisherige vollständige Übungssuite bleibt verbindlich.
8. Veröffentlichung auf dem ausdrücklich freigegebenen bestehenden `main`: `npm run verify`, Push, exakten Pages-Workflow-SHA beobachten, `npm run verify:live` für bytegleichen Abruf sämtlicher Assets, danach dieselbe Browsersuite mit `BASE_URL` gegen GitHub Pages.

## Grenzen
Ein Übungstrainer, keine vollständige Unterrichtsreihe oder amtlich zugelassene Lernplattform. Offene Beweise, eigene Erhebungen und Konstruktionen werden nicht automatisch bewertet. Schulinterne Reihenfolge kann abweichen. Tests prüfen Generatoren, ersetzen aber keine Unterrichtserprobung.
