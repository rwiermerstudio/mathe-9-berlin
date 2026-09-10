# Gestaltung: Formen verstehen

## Referenz und Abgrenzung

Ausgangspunkt auf ausdrücklichen Wunsch: [Pentagram – Guggenheim, neue Identität](https://www.pentagram.com/work/guggenheim-3), im Browser am 10. September 2026 gelesen und anhand der tatsächlichen Projektbilder betrachtet. Die erste Text-Extraktion war nicht verfügbar; der Browser lieferte Text und `data-src`-Bildadressen. Die verzögert geladenen Bilder wurden für die Sichtung geladen und in einer lokalen Kontaktübersicht betrachtet. Diese Referenzbilder werden **nicht** im Projekt veröffentlicht.

Konkrete Beobachtungen:

- `HP_02` / `HP_03`: sehr kräftige schwarze geometrische Versalien, enge Abstände und große, ungestörte helle beziehungsweise schwarze Flächen. Nicht die alte, dünne Museums-Typografie.
- `HP_09`: Schriftmuster zeigen die runden, offenen geometrischen Formen einer serifenlosen Schriftfamilie mit deutlich verschiedenen Gewichten.
- `HP_11` / `HP_12`: violette Flächen und Kleidung, kräftige schwarze Schrift, gelbgrüne Akzente in den Anwendungen.
- `HP_13` bis `HP_17`: Plakate und Programmträger kombinieren unter anderem helles Gelbgrün, Orange/Koralle und Lavendel mit Schwarz. Farbe steht als klar begrenzte Fläche, nicht als dekorativer Verlauf.
- `HP_21` / `HP_22`: rasterbasierte Publikations- und Digitalanwendungen, stark unterschiedliche Schriftgrößen, eigenständige Text- und Bildzonen.
- Die Projektbeschreibung erklärt ausdrücklich: Kunstbilder nicht ohne Zustimmung beschneiden; Grafik und Typografie bleiben getrennt von Kunstwerken.

**Eigene Ableitung, keine Kopie:** kräftige Satzüberschriften statt Guggenheim-Versalwortmarke; Kreisbogen, Viertelkreis, Scheibe und Dreieck als eigene mathematische Formenstudie; kleine eigene m⁹-Marke; flächiges Kapitelraster statt Museumspostern. Die Formen sind eine mathematische Interpretation der geometrischen Typografie, keine Behauptung, dass diese vier Formen Originalelemente der Museumsidentität seien. Keine Logos, Kunstwerke, Markenfonts oder Projektbilder übernommen. Keine Verbindung, Kooperation oder Beauftragung durch Guggenheim oder Pentagram.

## Visuelles System

| Token | Wert | Funktion |
|---|---|---|
| Ink | `#20201e` | Texte, starke Gliederungslinien |
| Paper | `#f7f7f2` | ruhiger Seitenhintergrund |
| Violet | `#3930a3` | Links, Hauptaktionen, Kurven, Kapitelmarken |
| Lime | `#e7ee99` | Kapiteltafeln, Beispielaufgaben, Testabschluss |
| Coral | `#ff815f` | ausschließlich dekorative Formenstudie |
| Lavender | `#eae6ff` | Navigation, Erklärung, Antwortbeispiele |
| Muted | `#57574f` | Metadaten und Bildunterschriften |
| Line | `#c6c6bb` | ergänzende Trennlinien |

Die Werte sind eigene UI-Farben nach visueller Betrachtung, keine offiziellen Guggenheim-Farbspezifikationen. `--green` bleibt lediglich als kompatibler CSS-Variablenname ein Alias auf Violett, nicht als alte grüne Gestaltung.

### Typografie und Leseführung

- Arial / Helvetica / sans-serif aus dem System. Kein Fontdownload, kein Layoutsprung, keine Lizenzunklarheit oder externe Laufzeitabhängigkeit. Keine Verwendung der Guggenheim Sans.
- Große, eng gesetzte, kräftige serifenlose Titel; Fließtext 18 px / 1,65, mobil 17 px. Keine enge Laufweite in mathematischen Erklärungen.
- Erklärungstexte maximal 67 Zeichenbreiten, klare vertikale Abstände, großzügige Beispiele. Lange deutsche Überschriften dürfen umbrechen; kein Abschneiden oder horizontales Scrollen.
- Übungsoberfläche: Auswahl als klar abgegrenzte Seitenleiste; Aufgabe als weißes Arbeitsblatt mit violetter Kante; Antwortbereich mit eigenem Hintergrund. Hilfe, Ergebnis und Arbeitsauftrag bleiben unterscheidbar.
- Kapitelindex als durchgehendes, nummeriertes Raster, nicht als Sammlung schwebender runder Karten. Desktop drei, Tablet zwei, Telefon eine Spalte.
- Kapitel: große Einleitung, danach abgesetzte Umfangsnotiz, links Inhaltsnavigation und rechts ruhiger Lesebereich. Mobil fließt die Navigation vor dem Text.
- Farbe ist kein alleiniger Bedeutungsträger: Antworten benennen Richtig/Falsch weiterhin textlich; Konstruktionslinien sind zusätzlich gestrichelt; Diagramme behalten ihre vollständigen Textalternativen.
- Keine Animation; reduzierte Bewegung explizit berücksichtigt. Mindestens 48 px hohe Eingabefelder/Buttons, sichtbare Tastaturkontur. CSS-Formen sind dekorativ und für assistive Technik verborgen.

## Unveränderte Verträge

Keine Änderung an Aufgabenkatalog, mathematischer Validierung, Lehrtextdaten, Lernablauf oder Fortschrittsschema. 72 Typen, neun eigenständige Kapitel, 72 gerechnete Beispiele, zehn interaktive Diagramme und 27 Selbstchecks bleiben erhalten. Übungs-/Kapitel-Deep-Links und Hilfezählung unverändert. Lediglich SVG-Farben und die Position einer langen Dreiecksbeschriftung wurden für die Lesbarkeit angepasst.

## Verifikation

`npm run verify` führt die bestehenden Tests und zusätzlich `tests/design-browser.js` aus:

- 12 Node-Tests; 14.400 generierte Aufgaben, mathematische Gegenproben, Beispiele, Regler und interne Links.
- Browser: alle 72 Typen beantwortet; Fehlerkartei, Test, Persistenz, Export/Löschen und blockierter Speicher; 72 echte Hin-/Rückklicks und alle zehn Diagramme per Tastatur/Regler.
- Alle zwölf Seiten bei 320, 360, 768 und 1440 px; zusätzlich bestehende Kapiteltests bei 390 px. Alle 72 Trainer-Typen bei 320 px auf Seitenüberlauf geprüft.
- 18 Kapitel-axe-Prüfungen plus sechs Design-axe-Prüfungen und der bestehende Trainer-Scan; keine gefundenen WCAG-A/AA-Verstöße in diesen Prüfungen.
- Zehn Farbpaare rechnerisch geprüft. Beispiele: Text/Papier 15,19:1; Weiß/Violett 9,88:1; Hilfstext/Papier 6,78:1; Diagrammachse/Weiß 5,63:1.
- Screenshots: `artifacts/design/`, `artifacts/chapters/`, `artifacts/chapter-reader-desktop.png` und `artifacts/chapter-reader-mobile.png`. Sichtung von Startseite, Trainer, Fokus, Kapitelindex, Kapitelansicht, Ergebnis und Kontaktübersicht sämtlicher Kapitelabbildungen.
- Die neue 320-px-Prüfung fand einen Überlauf bei langen deutschen Aufgabentiteln. Behoben durch Umbruch/automatische Silbentrennung, ohne kleinere Leseschrift und ohne Fehler kaschierendes `overflow-x:hidden`.

Grenzen: Chromium-basierte automatisierte Browserprüfung und Sichtung; keine reale iOS-/Android-Geräteprüfung, keine vollständige Screenreader-Nutzerstudie, keine formale Barrierefreiheitszertifizierung. Bestehende Druckregeln bleiben erhalten; Druck/PDF ist nicht Gegenstand dieser Bildschirm-Neugestaltung. Diagrammtexte werden auf kleinen Geräten vergrößert; vollständige Zahlenbeschreibungen bleiben zusätzlich in normaler Leseschrift verfügbar.
