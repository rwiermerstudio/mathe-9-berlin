// Redaktionell ausgearbeitete Beispiele, jeweils genau einem vorhandenen Typ zugeordnet.
// expected ist ein unabhängig notierter Sollwert, nicht aus catalog.answer kopiert.
const e=(id,why,steps,check,expected,params={})=>({id,why,steps,check,expected,params});
export const exampleParameters={a:3,b:4,c:2,x:-2,k:2,n:3,t:30,u:45};
export const examples=[
e('bruch-summe','Der Nenner benennt die Stückgröße. Da beide Brüche Viertel sind, werden nur die gezählten Stücke zusammengefasst.',[
 'Beide Nenner sind 4; eine Erweiterung ist nicht nötig.', 'Addiere die Zähler: 3+2 = 5. Der Nenner bleibt 4.', 'Damit ist 3/4+2/4 = 5/4 = 1,25. Fünf Viertel sind ein Ganzes und ein Viertel.'
],'Rückwärts: 5/4−2/4 = 3/4. Das Ergebnis muss größer als 1 sein, weil insgesamt mehr als vier Viertel vorliegen.',5/4),
e('bruch-quotient','Dividieren fragt, wie oft der zweite Bruch in den ersten passt. Multiplizieren mit dem Kehrwert macht die Multiplikation mit dem Divisor rückgängig.',[
 'Der Divisor ist 2/3; sein Kehrwert ist 3/2, denn (2/3)·(3/2) = 1.', 'Ersetze die Division: (−3/4):(2/3) = (−3/4)·(3/2).', 'Multipliziere: −(3·3)/(4·2) = −9/8 = −1,125.'
],'Probe: (−9/8)·(2/3) = −18/24 = −3/4. Weil durch einen positiven Anteil kleiner als 1 geteilt wird, wächst der Betrag.',-9/8,{k:3}),
e('negativer-exponent','Der Exponent −3 erweitert das Kürzen von Potenzen über null hinaus. Bei positiver Basis bleibt der Kehrwert positiv.',[
 'Nutze 3⁻³ = 1/3³.', 'Rechne die positive Potenz: 3·3·3 = 27.', 'Das Ergebnis ist 1/27, ungefähr 0,037037…; der exakte Bruch ist im Übungsfeld am sichersten.'
],'Multipliziere mit 27: (1/27)·27 = 1. Ein negatives Ergebnis wäre mit dieser positiven Basis unmöglich.',1/27),
e('potenz-produkt','Beide Potenzen haben dieselbe Basis. Ihre hintereinander geschriebenen Faktoren können gemeinsam gezählt werden.',[
 '3³ enthält drei Faktoren 3, 3² enthält zwei.', 'Das Produkt enthält daher 3+2 = 5 Faktoren 3.', '3³·3² = 3⁵. Gefragt ist nur e = 5, nicht der Potenzwert 243.'
],'Ausrechnen bestätigt: 27·9 = 243 = 3⁵. Die Basis wird nicht ebenfalls addiert.',5),
e('potenz-quotient','Im Quotienten werden gleichartige Faktoren gekürzt. Reichen die Faktoren im Zähler nicht aus, bleiben welche im Nenner.',[
 'Schreibe 3³:3⁵ als 27/243.', 'Kürze drei Faktoren 3; übrig bleibt 1/(3·3) = 1/9.', 'Das ist 3⁻². Also e = 3−5 = −2.'
],'3⁻²·3⁵ = 3³. Gefragt ist −2 als Exponent, nicht 1/9 als Wert der Potenz.',-2),
e('potenz-potenz','Die äußere Potenz wiederholt einen ganzen Block. Jede Wiederholung enthält alle Faktoren der inneren Potenz.',[
 '(3³)² = 3³·3³.', 'Zwei Blöcke mit je drei Faktoren ergeben 3·2 = 6 Faktoren.', 'Damit (3³)² = 3⁶ und e = 6.'
],'27² = 729 und 3⁶ = 729. Addieren der Exponenten würde hier fälschlich 5 liefern.',6),
e('wissenschaftlich','Jede Division durch 10 verschiebt den Stellenwert um eine Position nach rechts, also das geschriebene Komma nach links.',[
 '10⁻³ = 1/1000.', 'Teile 3 schrittweise: 3 → 0,3 → 0,03 → 0,003.', 'Somit 3·10⁻³ = 0,003; die zwei Nullen nach dem Komma vor der 3 sichern den Tausendstelwert.'
],'0,003·1000 = 3. Ein negatives Vorzeichen wäre falsch; nur die Größe wird kleiner.',3/1000),
e('wurzel-einschachteln','Du suchst keine gerundete Wurzel, sondern die größte ganze Zahl unterhalb der Wurzel. Benachbarte Quadrate reichen aus.',[
 'Berechne 3² = 9 und 4² = 16.', 'Es gilt 9 ≤ 11 < 16.', 'Daraus folgt 3 ≤ √11 < 4. Die gesuchte ganze Zahl ist k = 3.'
],'3² liegt unter 11; schon die nächste ganze Zahl 4 scheitert, denn 4² > 11.',3),
e('linear-loesen','Die Addition und anschließend die Multiplikation werden auf beiden Seiten rückgängig gemacht. So bleibt genau dieselbe Lösungsmenge erhalten.',[
 '3x+4 = −2. Subtrahiere beidseits 4: 3x = −6.', 'Teile beidseits durch 3: x = −6/3.', 'Es folgt x = −2.'
],'In die Ausgangsgleichung eingesetzt: 3·(−2)+4 = −6+4 = −2. Beide Seiten stimmen überein.',-2),
e('klammer-loesen','Da der äußere Faktor nicht null ist, kannst du zuerst die ganze Klammer freistellen. Das spart hier das Ausmultiplizieren.',[
 '3(x+4) = 6. Teile beide Seiten durch 3: x+4 = 2.', 'Subtrahiere auf beiden Seiten 4: x = 2−4.', 'Die Lösung ist x = −2. Alternativ würde 3x+12 = 6 zum selben Ergebnis führen.'
],'3·(−2+4) = 3·2 = 6. Erst die Klammer berechnen; die rechte Seite wird genau erreicht.',-2),
e('binom-linear','Der gemischte Term entsteht zweimal: einmal aus x mal 5 und einmal aus 5 mal x. Das erklärt den Faktor 2.',[
 '(x+5)² bedeutet (x+5)(x+5).', 'Multipliziere jedes Glied mit jedem: x²+5x+5x+25.', 'Fasse zusammen: x²+10x+25. Also B = 10; zusätzlich wäre C = 25.'
],'Bei x = 2 liefert die Klammer 7² = 49 und der ausmultiplizierte Term 4+20+25 = 49.',10),
e('differenz-quadrate','Bei den gegensätzlichen Vorzeichen haben die gemischten Produkte entgegengesetzte Werte. Sie verschwinden beim Zusammenfassen.',[
 '(x−5)(x+5) = x²+5x−5x−25.', '+5x−5x = 0, also bleibt x²−25.', 'Verglichen mit x²+C ist C = −25, nicht 25.'
],'Setze x = 0: (−5)·5 = −25; rechts ergibt 0²−25 ebenfalls −25.',-25),
e('quadrat-loesen','Quadrieren beseitigt das Vorzeichen einer Zahl. Deshalb musst du beim Rückweg die positive und die negative Möglichkeit berücksichtigen.',[
 'x² = 25 und √25 = 5.', 'Daraus folgt x = 5 oder x = −5.', 'Die Lösungsmenge lautet {−5; 5}. Im Antwortfeld: −5; 5.'
],'(−5)² = 25 und 5² = 25. Nur 5 zu nennen wäre unvollständig, weil auch die negative Zahl die Gleichung erfüllt.',[-5,5]),
e('produkt-null','Wenn beide Faktoren von null verschieden wären, könnte ihr Produkt nicht null sein. Mindestens einer muss also verschwinden.',[
 '(x−3)(x+4) = 0 führt zu x−3 = 0 oder x+4 = 0.', 'Die erste Gleichung ergibt x = 3, die zweite x = −4.', 'Die Lösungsmenge ist {−4; 3}; beide Werte getrennt eingeben.'
],'Für x = 3 ist der erste Faktor null, für x = −4 der zweite. Es müssen nicht beide gleichzeitig null sein.',[-4,3]),
e('quadratisch-allgemein','Gesucht ist eine Produktdarstellung, deren Ausmultiplizieren wieder den quadratischen Term ergibt. Summe und Produkt der Klammerzahlen liefern die beiden Koeffizienten.',[
 'Für x²+7x+12 suche zwei Zahlen mit Summe 7 und Produkt 12.', '1 und 12 haben Summe 13; 2 und 6 Summe 8; 3 und 4 passen: 3+4 = 7 und 3·4 = 12.', 'Also (x+3)(x+4) = 0. Das Nullprodukt liefert x = −3 oder x = −4.'
],'Einsetzen: 9−21+12 = 0 und 16−28+12 = 0. Bei gleichen Faktoren, etwa (x+3)², gäbe es nur eine verschiedene Lösung.',[-3,-4]),
e('lgs','Beide Gleichungen gelten für dasselbe Zahlenpaar. Beim Addieren der linken und rechten Seiten heben sich +y und −y auf.',[
 'Addiere x+y = 2 und x−y = −6: 2x = −4.', 'Teile durch 2: x = −2. Dies ist die im Übungsfeld gesuchte Zahl.', 'Für die vollständige Lösung: −2+y = 2, also y = 4.'
],'Beide Bedingungen prüfen: −2+4 = 2 und −2−4 = −6. Das Zahlenpaar (−2|4) erfüllt das ganze System.',-2),
e('linear-wert','Ein Funktionswert ist die Ausgabe zum vorgegebenen Eingang. Hier wird keine Gleichung nach x gelöst; x ist bereits bekannt.',[
 'Ersetze x durch −2: f(−2) = 2·(−2)+4.', 'Zuerst multiplizieren: 2·(−2) = −4.', 'Dann addieren: −4+4 = 0. Also f(−2) = 0.'
],'Der Punkt (−2|0) liegt auf der Geraden. In diesem besonderen Fall ist der eingesetzte x-Wert zugleich eine Nullstelle.',0),
e('steigung-punkte','Die Steigung vergleicht Höhenänderung und waagerechten Abstand. Der Quotient beschreibt den Zuwachs pro einer x-Einheit.',[
 'Von A(−2|4) nach B(1|6): Δx = 1−(−2) = 3.', 'In derselben Richtung: Δy = 6−4 = 2.', 'Also m = Δy/Δx = 2/3. Nutze den exakten Bruch statt 0,67.'
],'Drei Schritte nach rechts ergeben (2/3)·3 = 2 nach oben und damit genau den zweiten Punkt.',2/3),
e('achsenabschnitt','Der Punkt muss die Funktionsgleichung erfüllen. Einsetzen macht aus der allgemeinen Form eine Gleichung nur für b.',[
 'Setze m = 2 und P(−2|0) ein: 0 = 2·(−2)+b.', 'Das ergibt 0 = −4+b. Addiere 4 auf beiden Seiten.', 'Es folgt b = 4 und damit f(x) = 2x+4.'
],'f(−2) = 0 stimmt mit P überein; f(0) = 4 bestätigt die Bedeutung als y-Achsenabschnitt.',4),
e('lineare-nullstelle','An der x-Achse ist die Höhe null. Deshalb setzt du die Ausgabe auf null und suchst den passenden Eingang.',[
 'Setze f(x) = 0: 3x+4 = 0.', 'Subtrahiere 4: 3x = −4.', 'Teile durch 3: x = −4/3. Die Nullstelle ist ein x-Wert.'
],'3·(−4/3)+4 = −4+4 = 0. Nicht b = 4 mit der Nullstelle verwechseln.',-4/3),
e('schnittpunkt','Ein gemeinsamer Punkt muss bei demselben x auf beiden Geraden denselben y-Wert besitzen. Gleichsetzen drückt genau das aus.',[
 '3x+4 = x+0. Subtrahiere x: 2x+4 = 0.', 'Subtrahiere 4 und teile durch 2: x = −2.', 'Bestimme ergänzend y = g(−2) = −2. Der Schnittpunkt ist (−2|−2), gefragt ist nur x = −2.'
],'f(−2) = −6+4 = −2 und g(−2) = −2. Beide Ausgaben stimmen überein.',-2),
e('kosten','Der Stundenpreis ist eine Rate, die Grundgebühr ein einmaliger Betrag. Ihre unterschiedlichen Rollen bestimmen die Rechnung.',[
 'Für drei Stunden entstehen 2 €/h · 3 h = 6 € zeitabhängige Kosten.', 'Addiere den einmaligen Grundpreis: 6 €+4 € = 10 €.', 'Das Modell lautet K(t) = 4+2t für t ≥ 0 ohne Rabatte oder Rundung auf angefangene Stunden.'
],'Bei null Stunden liefert das Modell 4 €, bei einer weiteren Stunde genau 2 € mehr. 4·3+2 wäre eine Vertauschung der Rollen.',10),
e('linear-invers','Hier ist die Ausgabe bekannt. Statt einfach einen x-Wert einzusetzen, machst du die Rechenvorschrift rückwärts.',[
 'Aus f(x) = −10 wird 3x−4 = −10.', 'Addiere 4: 3x = −6.', 'Teile durch 3: x = −2.'
],'Vorwärts rechnen: 3·(−2)−4 = −10. Die Eingabe und die Ausgabe sind nicht dieselbe Zahl.',-2),
e('aenderung','Der Achsenabschnitt fällt beim Subtrahieren zweier Funktionswerte weg. Für Änderungen brauchst du daher nur Steigung und Eingabeänderung.',[
 'Lies m = −2 und Δx = 3 ab.', 'Nutze Δy = m·Δx = −2·3 = −6.', 'Der Funktionswert fällt um 6. Mit Vorzeichen wird −6 eingegeben.'
],'Wähle zur Probe x = 0 und x = 3: f(0) = 4, f(3) = −2; −2−4 = −6.',-6),
e('parabel-wert','Die Scheitelform ist eine verschachtelte Rechenvorschrift. Du arbeitest von innen nach außen und quadrierst die gesamte Differenz.',[
 'Einsetzen: f(−2) = 2(−2−3)²+4.', 'Klammer: −2−3 = −5. Quadrat: (−5)² = 25.', 'Multiplizieren und addieren: 2·25+4 = 54.'
],'Der Abstand zum Scheitel x = 3 beträgt 5. Auch x = 8 hat Abstand 5 und liefert 54.',54),
e('scheitel-x','Der Scheitel liegt dort, wo der quadratische Abstand null wird. Das ist zuverlässiger als ein isoliertes Vorzeichen-Merkwort.',[
 'In f(x) = 2(x+5)²−4 muss x+5 = 0 werden.', 'Daraus folgt x = −5.', 'Der ganze Scheitel lautet S(−5|−4). Gefragt ist seine x-Koordinate −5.'
],'f(−5) = 2·0²−4 = −4. Bei x = 5 würde die Klammer 10 und gerade nicht null ergeben.',-5),
e('scheitel-y','Außerhalb der Klammer steht die Höhe des Scheitels. Der negative Vorfaktor ändert die Öffnung, nicht diese Höhe.',[
 'Die Klammer x−3 verschwindet bei x = 3.', 'Einsetzen: f(3) = −2·0²+6 = 6.', 'Die gesuchte y-Koordinate ist 6; S(3|6) ist hier ein Hochpunkt.'
],'Bei x = 2 und x = 4 ergibt sich jeweils −2+6 = 4, also weniger als am Scheitel.',6),
e('parabel-nullstellen','Ein positives Quadrat auf der rechten Seite gibt zwei mögliche Abstände zum Scheitel. Beide führen zu einer Nullstelle.',[
 '0 = (x−3)²−16. Addiere 16: (x−3)² = 16.', 'Daher x−3 = −4 oder x−3 = 4.', 'Addiere jeweils 3: x = −1 oder x = 7. Eingabe: −1; 7.'
],'(−1−3)²−16 = 0 und (7−3)²−16 = 0. Der Mittelpunkt der Nullstellen ist 3, die Symmetrieachse.',[-1,7]),
e('minimum','Ein Quadrat ist nie negativ und der Vorfaktor ist positiv. Der ganze quadratische Anteil kann deshalb nicht unter null fallen.',[
 'Für alle reellen x gilt 2(x−3)² ≥ 0.', 'Also f(x) = 2(x−3)²−6 ≥ −6.', 'Bei x = 3 wird Gleichheit erreicht. Der kleinste Funktionswert ist −6, nicht 3.'
],'f(3) = −6; jeder andere x-Wert fügt einen positiven Anteil hinzu. Das beweist das Minimum ohne Ableitung.',-6),
e('streckfaktor','Ein bekannter Punkt außerhalb des Scheitels misst, wie stark der quadratische Abstand in einen Höhenunterschied umgesetzt wird.',[
 'Setze x = 5 und f(5) = 12 ein: 12 = A(5−3)²+4.', 'Subtrahiere 4 und berechne das Quadrat: 8 = 4A.', 'Teile durch 4: A = 2.'
],'2(5−3)²+4 = 8+4 = 12. Durch null wurde nicht geteilt, da der Punkt nicht auf der Scheitelachse liegt.',2),
e('symmetrie','Gleiche Beträge in der Klammer haben dasselbe Quadrat. Der zweite Punkt liegt im gleichen Abstand auf der anderen Seite der Achse.',[
 'Symmetrieachse ist x = 3. Der gegebene x-Wert 5 liegt 5−3 = 2 rechts davon.', 'Gehe 2 nach links: x₂ = 3−2 = 1.', 'Der andere Eingabewert ist 1; beide Punkte haben y = 8.'
],'f(5) = 2²+4 = 8 und f(1) = (−2)²+4 = 8. Nicht wieder 5 eingeben: Gesucht ist der andere Punkt.',1),
e('loesungsanzahl','Für die Anzahl reicht das Vorzeichen der rechten Seite. Reelle Quadrate können nicht negativ werden.',[
 '(x−3)² = −4 hat keine reelle Lösung: Die linke Seite ist immer ≥ 0.', 'Die gesuchte Anzahl ist deshalb 0.', 'Zum Vergleich: (x−3)² = 0 hätte nur x = 3; (x−3)² = 4 hätte x = 1 und x = 5. Also eine beziehungsweise zwei verschiedene Lösungen.'
],'Die Aufgabe fragt eine Anzahl. Hier wird die Zahl 0 eingegeben, nicht „keine“ wie bei einer leeren Lösungsmenge.',0),
e('pythagoras','Die Hypotenuse liegt gegenüber dem rechten Winkel. Der Satz verknüpft die Quadrate der Seitenlängen, nicht ihre einfache Summe.',[
 'c² = 3²+4² = 9+16 = 25 cm².', 'Die Seitenlänge ist positiv, also c = √25 = 5 cm.', 'Auf zwei Nachkommastellen: 5,00.'
],'5 ist länger als jede Kathete, aber kürzer als 3+4 = 7. Rückprobe: 5² = 3²+4².',5),
e('sin-seite','Gesucht ist die Gegenkathete, bekannt die Hypotenuse. Genau diese beiden Seiten verbindet der Sinus des markierten Winkels.',[
 'sin 30° = g/7. Multipliziere beide Seiten mit 7: g = 7 sin 30°.', 'Im Gradmaß ist sin 30° = 1/2.', 'Damit g = 7/2 = 3,5 cm, Eingabe 3,50.'
],'Die Gegenkathete ist halb so lang wie die Hypotenuse und damit kürzer als 7 cm.',7/2),
e('cos-seite','Die Ankathete liegt am gewählten Winkel, ist aber nicht die Hypotenuse. Ihr Verhältnis zur Hypotenuse ist der Kosinus.',[
 'cos 30° = a/7, also a = 7 cos 30°.', 'cos 30° = √3/2; damit a = 7√3/2 cm.', 'Erst jetzt runden: a ≈ 6,06 cm.'
],'Zusammen mit g = 3,5 gilt a²+g² = 49 = 7². Nutze für die Probe den ungerundeten Wert.',7*Math.sqrt(3)/2),
e('tan-seite','Beide Katheten, aber keine Hypotenuse sind beteiligt. Tangens vermeidet einen unnötigen Zwischenschritt über die dritte Seite.',[
 'tan 30° = g/3, daher g = 3 tan 30°.', 'tan 30° = 1/√3. Also g = 3/√3 = √3 cm.', 'Gerundet g ≈ 1,73 cm.'
],'Bei 30° ist die Gegenkathete kürzer als die Ankathete. Der Quotient g/3 ist ungefähr 0,577.',Math.sqrt(3)),
e('winkel','Der Quotient der Katheten ist bekannt. Die Umkehrfunktion des Tangens liefert dazu den Winkel im Bereich zwischen 0° und 90°.',[
 'tan α = 4/3.', 'Wähle am Rechner arctan beziehungsweise tan⁻¹ im DEG-Modus: α = arctan(4/3).', 'α ≈ 53,13°. Nicht 1/tan(4/3) rechnen.'
],'Weil die Gegenkathete größer als die Ankathete ist, muss α > 45° sein. tan α · 3 ergibt ungerundet wieder 4.',Math.atan2(4,3)*180/Math.PI),
e('sinussatz','Es ist kein rechter Winkel gegeben. Das bekannte Gegenüberpaar a und α stellt den Maßstab her, β liefert die gesuchte Seite b.',[
 'a/sin α = b/sin β, also b = a sin β/sin α.', 'Setze ein: b = 3 sin 45°/sin 30° = 3(√2/2)/(1/2) = 3√2 cm.', 'Gerundet b ≈ 4,24 cm. Der dritte Winkel wäre 180°−30°−45° = 105°.'
],'β ist größer als α; deshalb ist auch b größer als a. Zusätzlich gilt b sin 30° = 3 sin 45°.',3*Math.sqrt(2)),
e('kosinussatz','Die zwei bekannten Seiten schließen den bekannten Winkel ein. Der Kosinussatz korrigiert Pythagoras für diesen nichtrechten Winkel.',[
 'c² = 3²+4²−2·3·4 cos 30°.', 'Mit cos 30° = √3/2 folgt c² = 25−12√3 cm².', 'Ziehe die positive Wurzel: c = √(25−12√3) ≈ 2,05 cm.'
],'Die Dreiecksungleichung verlangt |4−3| < c < 4+3, also 1 < c < 7. Wegen 30° < 90° ist c kürzer als die rechtwinklige Vergleichsseite 5.',Math.sqrt(25-12*Math.sqrt(3))),
e('dreieck-flaeche','Die schräge Seite wird über den Sinus in die senkrechte Höhe übersetzt. Danach genügt die gewöhnliche Dreiecksflächenformel.',[
 'Wähle die Grundseite a = 3 cm. Die Höhe ist h = 4 sin 30° = 2 cm.', 'Fläche: A = a·h/2 = 3·2/2.', 'A = 3 cm², Eingabe 3,00.'
],'Die Fläche ist kleiner als 3·4/2 = 6 cm² beim eingeschlossenen rechten Winkel. Eine Fläche trägt cm², nicht cm.',3),
e('kegel-volumen','Der Kegel hat ein Drittel des Volumens des Zylinders mit gleichem Radius und gleicher senkrechter Höhe.',[
 'Grundfläche: G = π·3² = 9π cm².', 'V = G·h/3 = 9π·4/3 = 12π cm³.', 'Mit der π-Taste: V ≈ 37,70 cm³.'
],'Der Vergleichszylinder hätte 36π cm³. Dreimal das Kegelvolumen ergibt genau diesen Wert.',12*Math.PI),
e('kugel-volumen','Für den Rauminhalt wird der Radius kubiert. Der Dezimalradius muss als ganze Zahl samt Komma in die Potenz eingehen.',[
 'Radius r = 3,2 cm, also r³ = 32,768 cm³.', 'V = (4/3)π·32,768 = (131,072/3)π cm³.', 'Erst das Endergebnis runden: V ≈ 137,26 cm³.'
],'Rückrechnung r = ∛(3V/(4π)) ergibt ungerundet 3,2 cm. Verdoppelter Durchmesser ist nicht als Radius einzusetzen.',4*Math.PI*(16/5)**3/3),
e('kugel-oberflaeche','Eine Oberfläche ist zweidimensional. Die Formel enthält deshalb r² und nicht r³.',[
 'r² = 3,2² = 10,24 cm².', 'O = 4π·10,24 = 40,96π cm².', 'Gerundet O ≈ 128,68 cm².'
],'O/(4π) = 10,24 und dessen positive Wurzel ist 3,2. Die Einheit cm² unterscheidet das Ergebnis vom Volumen.',40.96*Math.PI),
e('pyramide','Bei einer rechteckigen Grundfläche wird zuerst das Rechteck berechnet. Die senkrechte Höhe bestimmt dann das Drittel des zugehörigen Prismas.',[
 'G = 3·4 = 12 cm².', 'V = G·h/3 = 12·2/3.', 'V = 8 cm³. Eine schräge Seitenkante wäre kein Ersatz für h = 2 cm.'
],'Das Prisma mit gleicher Grundfläche und Höhe hätte 24 cm³; die Pyramide ein Drittel davon.',8),
e('kegel-mantel','Der Mantel ist ein Kreissektor mit Radius s. Die Grundfläche ist ausdrücklich nicht Teil der gesuchten Fläche.',[
 'Gegeben sind r = 3 cm und die Mantellinie s = 7 cm, nicht die Höhe.', 'M = πrs = π·3·7 = 21π cm².', 'Gerundet M ≈ 65,97 cm².'
],'Die gesamte geschlossene Oberfläche wäre zusätzlich um 9π cm² größer. Die Aufgabe fragt nur M.',21*Math.PI),
e('kegel-oberflaeche','Zuerst muss aus Radius und Höhe die schräge Mantellinie entstehen. Anschließend werden Mantel und Grundfläche addiert.',[
 'Im rechtwinkligen Schnittdreieck: s = √(3²+4²) = 5 cm.', 'G = 9π cm² und M = π·3·5 = 15π cm².', 'O = G+M = 24π ≈ 75,40 cm².'
],'Die Oberfläche ist größer als der Mantel allein. Würdest du h = 4 statt s = 5 verwenden, fehlte Mantelfläche.',24*Math.PI),
e('zusammengesetzt','Zylinder und aufgesetzte Halbkugel füllen getrennte Raumbereiche. Die Kontaktfläche hat kein Volumen und wird nicht doppelt als Raum gezählt.',[
 'Zylindervolumen: VZ = π·3²·4 = 36π cm³.', 'Halbkugel: VH = (1/2)·(4/3)π·3³ = 18π cm³.', 'Gesamt V = 36π+18π = 54π ≈ 169,65 cm³.'
],'Das Ergebnis liegt über dem Zylindervolumen und unter Zylinder plus ganzer Kugel (72π cm³). Die Aufgabe fragt nicht die äußere Oberfläche.',54*Math.PI),
e('nano-meter','Die Vorsilbe beschreibt einen Faktor der Einheit. Beim Wechsel in Meter wird nicht die physische Länge verändert, nur ihre Zahlendarstellung.',[
 '1 nm = 10⁻⁹ m. Daher 3200 nm = 3200·10⁻⁹ m.', 'Schreibe 3200 = 3,2·10³ und fasse die Zehnerpotenzen zusammen: 3,2·10⁻⁶ m.', 'Das ist 0,0000032 m; als Eingabe geht auch 3.2e-6.'
],'Mit 10⁹ zurückmultipliziert erhältst du 3200 nm. Nicht auf zwei Nachkommastellen runden: Das würde die Länge fälschlich zu null machen.',32/10000000),
e('wachstum-faktor','Nach dem Zuwachs bleiben 100 % des alten Bestands erhalten und 5 % kommen hinzu. Der Faktor beschreibt den gesamten neuen Bestand.',[
 '5 % = 5/100 = 0,05.', 'q = 1+0,05 = 1,05.', 'Ein Beispielbestand 100 würde im nächsten Schritt 105 werden.'
],'(1,05−1)·100 = 5 %. q muss bei einer Zunahme größer als 1 sein.',105/100),
e('zerfall-faktor','Bei Abnahme ist gefragt, welcher Anteil übrig bleibt, nicht welcher Anteil verschwindet.',[
 '5 % Abnahme lässt 100 %−5 % = 95 % übrig.', 'q = 1−5/100 = 0,95.', 'Aus 100 würden im nächsten Schritt 95.'
],'1−q = 0,05 ist der verlorene Anteil. Ein negatives q wäre hier kein sinnvolles Bestandsmodell.',95/100),
e('wachstum-bestand','Jeder Schritt wirkt auf den inzwischen gewachsenen Bestand. Die Potenz zählt die wiederholten Multiplikationen.',[
 'N₀ = 300 und q = 1,04. Nach einem Schritt: N₁ = 300·1,04 = 312.', 'Nach dem zweiten: N₂ = 312·1,04 = 324,48.', 'Gleichwertig: 300·1,04² = 324,48.'
],'Der erste Zuwachs ist 12, der zweite 12,48. Einfach zweimal 12 zu addieren ergäbe fälschlich 324.',32448/100),
e('halbwert','Jede Halbierung bezieht sich auf den Rest. Drei Halbierungen entsprechen drei Faktoren 1/2.',[
 'Start 300, nach einer Stunde 150.', 'Nach zwei Stunden 75, nach drei Stunden 37,5.', 'Zusammengefasst: 300·(1/2)³ = 300/8 = 37,5.'
],'Dreimal rückwärts verdoppeln: 37,5 → 75 → 150 → 300. Der Bestand bleibt positiv.',75/2),
e('anfangsbestand','Die Entwicklung wird rückwärts gelesen. Jede frühere Verdopplung wird durch eine Division durch 2 aufgehoben.',[
 'Nach drei Schritten sind es 24; einen Schritt zurück: 24/2 = 12.', 'Noch zwei Schritte zurück: 12/2 = 6 und 6/2 = 3.', 'Also N₀ = 24/2³ = 3.'
],'Vorwärts: 3 → 6 → 12 → 24. Das gegebene Endergebnis wird wieder erreicht.',3),
e('sinus-amplitude','Die Amplitude misst einen Abstand zur Mittellinie. Ein Abstand ist nichtnegativ, auch wenn die Schwingung gespiegelt ist.',[
 'Bei y = −5 sin(2x) liegt sin(2x) zwischen −1 und 1.', 'Multiplikation mit −5 ergibt Werte von −5 bis 5.', 'Die Amplitude ist |−5| = 5; die gesamte Spitze-zu-Spitze-Höhe wäre 10.'
],'Das Minus vertauscht Hoch- und Tiefpunkte. Es macht die Amplitude nicht zu −5.',5),
e('sinus-periode','Eine volle Wiederholung erfolgt, wenn der innere Winkel eine ganze Umdrehung zusätzlich durchlaufen hat.',[
 'Hier ist der innere Faktor b = 6.', 'Gesucht ist T > 0 mit 6T = 360°.', 'T = 360°/6 = 60°. Der äußere Faktor 3 verändert die Periode nicht.'
],'Beim Erhöhen von x um 60° erhöht sich 6x um 360°. Somit bleibt der Sinuswert gleich.',60),
e('sinus-wert','Der innere Winkel muss zuerst berechnet werden. sin(2x) ist nicht dasselbe wie 2 sin(x).',[
 'Setze x = 30° ein: 2x = 60°.', 'sin 60° = √3/2, also f(30) = 3√3/2.', 'Gerundet ergibt sich f(30) ≈ 2,60.'
],'Der Betrag bleibt unter der Amplitude 3. Die Rechnung 3·2·sin 30° würde fälschlich 3 ergeben.',3*Math.sqrt(3)/2),
e('laplace','Die einzelnen Kugeln sind gleich wahrscheinlich. Die Farben können unterschiedlich viele Kugeln enthalten und sind deshalb nicht automatisch gleich wahrscheinlich.',[
 'Insgesamt liegen 3+4 = 7 Kugeln in der Urne.', 'Drei davon sind günstig für rot.', 'P(rot) = 3/7. Im Übungsfeld ist dieser Anteil gefragt, nicht 42,86.'
],'P(blau) = 4/7; beide Wahrscheinlichkeiten ergeben zusammen 1.',3/7),
e('zuruecklegen','Nach dem Zurücklegen ist die ursprüngliche Zusammensetzung wiederhergestellt. Beide roten Zweige tragen denselben Anteil.',[
 'Erster roter Zug: 3/7.', 'Nach Zurücklegen zweiter roter Zug: wieder 3/7.', 'Pfadregel: P(RR) = (3/7)·(3/7) = 9/49.'
],'Die Chance auf zwei rote Züge muss kleiner als 3/7 für nur einen roten Zug sein.',9/49),
e('ohne-zuruecklegen','Nach dem ersten roten Zug fehlt eine rote Kugel und insgesamt eine Kugel. Der zweite Anteil wird auf diesem Pfad neu berechnet.',[
 'Erster roter Zug: 3/7.', 'Dann bleiben 2 rote unter 6 Kugeln: zweiter Anteil 2/6.', 'P(RR) = (3/7)·(2/6) = 6/42 = 1/7.'
],'1/7 ist kleiner als 9/49 mit Zurücklegen. Der erste Erfolg macht einen zweiten roten Zug weniger wahrscheinlich.',1/7),
e('verschieden','Genau eine rote Kugel kann zuerst oder zuletzt kommen. Die beiden Pfade schließen sich gegenseitig aus und müssen beide gezählt werden.',[
 'P(RB) = (3/7)·(4/7) = 12/49.', 'P(BR) = (4/7)·(3/7) = 12/49.', 'Addiere: P(genau einmal rot) = 24/49.'
],'Mit P(RR) = 9/49 und P(BB) = 16/49 ergeben sich insgesamt (24+9+16)/49 = 1.',24/49),
e('mindestens','Das Ereignis enthält einen oder zwei rote Züge. Nur zweimal blau ist ausgeschlossen, weshalb das Gegenereignis besonders kurz ist.',[
 'P(kein Rot) = P(BB) = (4/7)² = 16/49.', 'Ziehe von 1 ab: 1−16/49 = 33/49.', 'Somit P(mindestens einmal rot) = 33/49.'
],'Direkte Kontrolle: P(RR)+P(RB)+P(BR) = (9+12+12)/49 = 33/49. Die Summe der passenden Pfade stimmt mit dem Gegenereignisweg überein.',33/49),
e('pfad-drei','Die Reihenfolge ist Teil der Bedingung. Es wird ein einzelner vollständiger Pfad durch drei Stufen berechnet.',[
 'Die Zweigwahrscheinlichkeiten sind für R, B, R nacheinander 3/7, 4/7, 3/7.', 'Multipliziere: (3·4·3)/(7·7·7) = 36/343.', 'Nicht mit drei multiplizieren; RRB und BRR sind andere Ereignisse.'
],'Der dreistufige Pfad ist seltener als sein zweistufiger Anfang RB: (12/49)·(3/7) = 36/343.',36/343),
e('kombination','Zu jeder Wahl einer Vorspeise gibt es wieder alle Hauptspeisen und zu jedem Paar wieder alle Desserts. Es werden Anzahlen, keine Anteile multipliziert.',[
 'Eine feste Vorspeise erlaubt 4·2 = 8 Hauptspeisen-Dessert-Paare.', 'Es gibt drei Vorspeisen: 3·8 = 24.', 'Also 24 verschiedene Menüs, sofern jede Kombination erlaubt ist.'
],'Eine vollständige Aufzählung in drei Gruppen zu je acht Menüs hätte 24 Einträge ohne Doppelung.',24),
e('erwartete-haeufigkeit','Die Chance pro Versuch wird auf die Versuchszahl übertragen. Das Ergebnis ist die mittlere Zahl von Treffern über viele solche Serien.',[
 'Versuchszahl n = 14 und Trefferchance p = 3/7.', 'Erwartete Anzahl = np = 14·3/7.', 'Kürze 14/7 = 2: Erwartung = 2·3 = 6.'
],'6/14 = 3/7 entspricht der vorgegebenen Chance. Eine einzelne Reihe kann dennoch mehr oder weniger als 6 Treffer haben.',6),
e('mittelwert','Der Mittelwert verteilt die Summe auf alle vier Beobachtungen. Auch ein negativer Messwert gehört vollständig dazu.',[
 'Summe: 3+4+2+(−2) = 7.', 'Anzahl: 4 Beobachtungen.', 'Mittelwert = 7/4 = 1,75.'
],'Viermal 1,75 ergibt wieder die Summe 7. Das Mittel liegt zwischen Minimum −2 und Maximum 4.',7/4),
e('median','Für die Mitte zählt die Reihenfolge der Werte, nicht die ursprüngliche Reihenfolge der Erfassung.',[
 'Sortiere numerisch: −2; 2; 3; 4.', 'Bei vier Werten stehen 2 und 3 in der Mitte.', 'Median = (2+3)/2 = 2,5.'
],'Zwei Werte liegen unter und zwei über 2,5. Das Mittel aller vier, 1,75, beantwortet eine andere Frage.',5/2),
e('spannweite','Die Spannweite misst den gesamten Abstand vom kleinsten zum größten Messwert. Die Zwischenwerte beeinflussen diesen Kennwert nicht.',[
 'Minimum ist −2, Maximum ist 4.', 'Spannweite = 4−(−2).', 'Minus einer negativen Zahl heißt addieren: 4+2 = 6.'
],'Auf der Zahlengeraden sind es von −2 bis 0 zwei und von 0 bis 4 vier Einheiten, zusammen sechs.',6),
e('gewichtetes-mittel','Eine Häufigkeit ist die Anzahl, mit der ein Wert in der vollständigen Liste steht. Sie muss in Summe und Nenner eingehen.',[
 'Drei Werte 2 tragen 3·2 = 6 zur Summe bei; vier Werte 5 tragen 4·5 = 20 bei.', 'Die Summe ist 26, die Beobachtungszahl 3+4 = 7.', 'Mittelwert = 26/7. Der exakte Bruch vermeidet unnötiges Runden.'
],'Die ausgeschriebene Liste 2; 2; 2; 5; 5; 5; 5 hat Summe 26. Das ungewichtete Mittel 3,5 würde falsche gleiche Häufigkeiten annehmen.',26/7),
e('relative-haeufigkeit','Der Bruch beschreibt zunächst einen Anteil. Die ausdrücklich verlangte Prozentzahl benutzt dieselbe Größe in Hundertsteln.',[
 'Anteil Kategorie A: 3/7.', 'In Prozent: (3/7)·100 = 300/7 %.', 'Gerundet: 42,86 %. In das Feld nur 42,86 schreiben.'
],'Der Anteil liegt unter 1/2, die Prozentzahl deshalb unter 50. Bei Wahrscheinlichkeitsaufgaben ohne Prozentforderung wäre dagegen 3/7 gefragt.',300/7),
e('diagramm-manipulation','Sichtbare Balkenhöhe wird vom Achsenbeginn an gemessen. Datenverhältnis und sichtbares Verhältnis sind bei verkürzter Achse nicht gleich.',[
 'Erster Balken: 23−20 = 3 sichtbare Einheiten.', 'Zweiter Balken: 27−20 = 7 sichtbare Einheiten.', 'Gesuchtes Höhenverhältnis: 7/3. Das wirkliche Werteverhältnis wäre dagegen 27/23.'
],'Mit Nullbeginn wäre das sichtbare Verhältnis 27/23 ≈ 1,17 statt 7/3 ≈ 2,33. Beide Bilder können dieselben Daten verwenden.',7/3),
e('trend','Eine mittlere Rate verteilt die gesamte Änderung auf die verstrichene Zeit. Über einzelne Tagesverläufe sagt sie nichts Sicheres.',[
 'Gesamtänderung: 34−30 = 4.', 'Verstrichene Zeit: 2 Tage.', 'Mittlere tägliche Änderung: 4/2 = 2 pro Tag.'
],'Zwei Tage mal 2 pro Tag ergeben die Gesamtänderung 4. Daraus folgt nicht, dass jeder einzelne Tag genau denselben Zuwachs hatte.',2),
e('stichprobe','Die Frage verlangt die ausgelassene Gruppe als Anteil der ganzen Schule, nicht als Anteil der befragten Sport-AG.',[
 'Gesamtzahl: 30+40 = 70 Lernende.', 'Unbefragt bleiben 40, also Anteil 40/70 = 4/7.', 'Prozentzahl: (4/7)·100 ≈ 57,14 %. Nur die Zahl eingeben.'
],'Befragt sind 3/7, unbefragt 4/7; zusammen die ganze Schule. Die Quote allein misst noch nicht die genaue Verzerrung des Sportinteresses.',400/7)
];
