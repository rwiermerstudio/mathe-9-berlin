# Ein Projektfaden, neun eigenständige Lernwege

## Redaktionelles Konzept

Die neunte Klasse plant einen offenen Schulhofnachmittag. Diese Handlung ist ausdrücklich erfunden. Preise, Materialmengen, geometrische Modelle und Daten sind Übungsannahmen, keine erhobenen Schuldaten. Die Sprache richtet sich an 14- bis 15-Jährige: direkte Fragen und nachvollziehbare Erklärungen statt erzwungener Jugendsprache. Der Zusammenhang soll eine mathematische Entscheidung begründen, nicht bloß einen längeren Einstieg liefern.

| Kapitel | Entscheidung | Fachlicher Kern im Verlauf |
|---|---|---|
| Zahlen | Reicht das Material? | Gemeinsame Stückgröße, Faktoren zählen/kürzen, Wurzeln als Längen eingrenzen |
| Gleichungen | Welche Korrektur fehlt? | Umkehrschritte begründen, Flächen zerlegen, Lösungen und Sachbedingungen trennen |
| Linear | Was kostet zusätzliche Zeit? | Grundgebühr und Rate trennen, Eingaben rückwärts bestimmen, Tarifbereich prüfen |
| Quadratisch | Wie bleibt der Entwurf symmetrisch? | Abstand zum Scheitel, Spiegelpunkte, erreichbare Höhen, Öffnung bestimmen |
| Trigonometrie | Wie lang ist die schräge Verbindung? | Skizze und Voraussetzungen, Seitenverhältnisse, Höhen und Projektionen |
| Körper | Geht es um Hülle oder Inhalt? | Einheiten, Schnittdreieck, Mantelsektor, Vergrößerungsfaktoren |
| Wachstum | Entwicklung oder Wiederholung? | Neue Bezugsgröße je Schritt, Rückwärtsrechnung, Amplitude und Winkelperiode |
| Zufall | Welche Chance beschreibt der Regeltext? | Zwischenbestände, vollständige Pfade, genau/mindestens, Erwartung ohne Garantie |
| Daten | Welche Aussage trägt der Bericht? | Kennwert nach Fragestellung, Bezugsgruppe, Achsenmaßstab, Auswahlgrenzen |

## Aufbau und Integration

- `src/lesson-story.js` enthält die neun Einstiege, vier fachbezogenen Denkimpulse je Kapitel, neun Projektchecks, Fazits/Übergänge und drei Vergleichsbilder.
- `src/chapters.js` behält die fachlichen Voraussetzungen und Begriffe, ersetzt aber alle 36 alten Erklärabsätze durch neu formulierte Erläuterungen mit Rechenwegen und Sachbezug. Jeder Denkimpuls wird mit seinem passenden Erklärungskern zusammengeführt. Überholte trockene Motivationen und Kurzfazits wurden entfernt.
- `src/lesson-transfer.js` ordnet jeden der 72 unveränderten Beispieltypen einzeln ein. Die Einordnung folgt direkt auf dessen Probe. Wo die Übung abstrakt ist, wird das benannt; negative Koordinaten werden nicht zu negativen Ausleihzeiten oder Besucherzahlen umgedeutet.
- `scripts/render-lessons.js` erzeugt alle Texte, Vergleichsbilder und Projektchecks statisch. Es gibt keine verwaisten Lehrtextmodule und keinen neuen Download beim Üben. Ohne JavaScript bleiben Texte, Beispiele, Rechenketten und aufklappbare Lösungen verfügbar.
- `coverage.json` weist pro Kapitel vier Erklärabschnitte, acht Beispiel-Einordnungen und einen Projektcheck aus; die drei zusätzlichen Vergleichsbilder besitzen eigene IDs. Die generierte [Abdeckungstabelle](KAPITELABDECKUNG.md) dokumentiert Bilder und exakte Hin-/Rücklinks.

## Darstellungen

Drei neue HTML-Vergleichsbilder ergänzen, nicht ersetzen, die zehn berechneten interaktiven SVG:

1. **Bilanz vorwärts/rückwärts:** Die Reihenfolge der Umkehroperationen wird als zwei beschriftete Ketten lesbar. Die zweimalige −2 wird ausdrücklich nach ihrer Rolle unterschieden.
2. **Grundgebühr/Zeitanteil:** Drei und sechs Stunden werden in dieselben Kostenbausteine zerlegt. Die unveränderte Grundgebühr erklärt die fehlende Proportionalität.
3. **Betrag/Faktor:** Gleicher Anfang und gleicher erster Schritt ergeben verschiedene zweite Schritte. Beschriftete Operationen machen die veränderte Bezugsgröße sichtbar.

Jedes Bild hat eine eigene Vorhersagefrage und Bildunterschrift. Auf schmalen Displays stehen die Schritte untereinander; Information hängt nicht von Farbe ab. Die vorhandenen SVG behalten Tastaturregler, mathematische Modelle und aktualisierte Textalternativen.

## Prüfvertrag

`npm run verify` umfasst Generator-/Antwort-/Speichertests, statischen Build und Chromium:

- 72 Typen mit je 200 Seeds; unabhängige mathematische Eigenschaften und falsche Gegenproben;
- alle 72 unveränderten Musterantworten sowie zusätzliche Zwischenrechnungen;
- vollständige Story-/Transferzuordnung ohne unbekannte oder fehlende IDs;
- neun geprüfte Projektcheck-Rechnungen, darunter explizites Zählen der Urnenpaare;
- Bildbeschriftungen gegen unabhängig berechnete Kosten- und Wachstumswerte;
- tatsächliches Rendern jeder Story, jedes Kernabschnitts, jeder Einordnung und jeder Bildunterschrift;
- 72 echte Hin-/Rückklicks, 27 Selbstchecks und neun per Tastatur geöffnete Projektchecks;
- zehn interaktive SVG einschließlich Tastatur und Zahlenwerten;
- alle Kapitel bei 1440/768/390/360 px, axe bei 1440/360 px, Screenshots der Diagramme, neuen Vergleichsbilder und Erklärabschnitte;
- unveränderter Legacy-Speicher, gesperrter Speicher und Lesen ohne JavaScript;
- nach Veröffentlichung bytegenauer Vergleich aller Builddateien und dieselbe Browsersuite gegen Pages.

Automatisierte Inhaltsverträge belegen Präsenz und Zuordnung, nicht literarische Qualität. Rechenprüfungen und manuelle Text-/Bildsichtung ersetzen keine unabhängige fachdidaktische Begutachtung oder Unterrichtserprobung. Es gibt keine automatische Bewertung freier Begründungen. Die amtliche Einordnung und bestehenden fachlichen Grenzen auf der Curriculumseite bleiben unverändert. Geometrische Modelle sind insbesondere keine Bau-, Statik- oder Sicherheitsanleitungen.
