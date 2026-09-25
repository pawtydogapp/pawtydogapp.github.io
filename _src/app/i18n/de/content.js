/* Deutsch: Inhalte außer Skills und Verhaltensratgeber (siehe cmds.js, behav.js).
   Struktur spiegelt i18n-source/en.json, Schlüssel sind die englischen IDs. */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Leicht", 2: "Mittel", 3: "Fortgeschritten" };
const quest = { new: "Neuer Skill", cont: "Weiter so", prac: "Auffrischung" };
const levels = [{ n: "Anfänger" }, { n: "Schüler" }, { n: "Absolvent" }, { n: "Profi" }, { n: "Champion" }, { n: "Meister" }, { n: "Legende" }];
const ranks = [{ n: "Neuling" }, { n: "Lehrling" }, { n: "Hundeführer" }, { n: "Trainer" }, { n: "Experte" }, { n: "Spezialist" }, { n: "Komplett" }];

const stucks = {
  cmd: "Hängt es? Mach es leichter, nicht lauter. Geh einen Schritt zurück, sammle 2 leichte Erfolge, hör dort auf. Zeig es nochmal mit einem Lockmittel, statt das Signal zu wiederholen. Steht der Hund aus einer Position auf, belohne beim nächsten Durchgang schneller.",
  trick: "Hängt es? Zerlege den Trick in kleinere Teile und bezahle den kleinsten. Film eine Einheit, die meisten Trick-Probleme verstecken sich in der Hand des Menschen, nicht im Hund.",
  agi: "Verweigert der Hund das Hindernis? Niedriger, kürzer, oder zurück zum Bezahlen bloßer Versuche. Den Hund niemals aufs Gerät schieben oder heben, ein erschrockener Durchgang kostet Wochen.",
  life: "Eher überfordert als festgefahren? Mehr Abstand, kürzerer Ausflug, mit Ruhe aufhören und an einem anderen Tag nochmal. Reizarbeit scheitert laut, erholt sich aber schnell.",
};

const ladders = {
  cmd: [
    ["Einheit 1 · Zeigen, nicht testen", "Locke jeden Durchgang mit einem Leckerli in der Hand, belohne innerhalb von 1 Sekunde. Erfolg = das Verhalten ist überhaupt passiert, mit deiner vollen Hilfe."],
    ["Einheiten 2 bis 4 · Locken und benennen", "Weiter locken, das Signal einmal direkt vor dem Verhalten sagen. Erfolg = 3 bis 5 unterstützte Durchgänge in Folge."],
    ["Einheiten 5 bis 7 · Lockmittel ausschleichen", "Leere Hand, gleiche Bewegung, Belohnung aus dem Beutel. Positionen verdienen 1 bis 3 Sekunden Warten vor der Bezahlung."],
    ["Ab Einheit 8 · Signal zuerst", "Ein Signal, kein Lockmittel. Steigere eine Schwierigkeit nach der anderen: Dauer über 5 Sekunden, neue Räume, leichte Ablenkung."],
  ],
  trick: [
    ["Einheit 1 · Dem Lockmittel folgen", "Großes, deutliches Lockmittel, sofortige Bezahlung für jede Bewegung in die richtige Richtung. Erfolg = eine grobe Version ist einmal passiert."],
    ["Einheiten 2 bis 4 · Formen", "Bezahle die besten 3 von 5 Versuchen, ignoriere den Rest. Sag das Signal einmal pro Durchgang. Sets bei 3 bis 5 Durchgängen halten, Tricks ermüden das Gehirn."],
    ["Einheiten 5 bis 7 · Hilfe verkleinern", "Das Lockmittel wird zu einem kleinen Handzeichen. Die Präzision steigt: die saubersten Durchgänge verdienen ein doppeltes Leckerli."],
    ["Ab Einheit 8 · Vorhang auf", "Signal zuerst, Handzeichen nur als Backup. Neue Räume, dann vor Leuten. Applaus zählt als Ablenkung."],
  ],
  agi: [
    ["Einheit 1 · Ganz klein anfangen", "Stange am Boden, Tunnel kurz, Tisch niedrig. Erfolg = 1 fröhlicher Versuch, bezahlt wie ein Jackpot."],
    ["Einheiten 2 bis 4 · Liebe aufbauen, nicht Höhe", "Wiederhole die leichte Version, bis der Hund dich zum Hindernis zieht. Erst Selbstvertrauen, dann Kriterien."],
    ["Einheiten 5 bis 7 · Eine Sache erhöhen", "Höhe, Länge oder Winkel, nie zwei in einer Einheit. Sag das Hindernissignal, sobald der Hund sich festlegt."],
    ["Ab Einheit 8 · Tempo und Sequenz", "Schick ihn aus ein paar Schritten Abstand, verkette 2 Hindernisse, halte Einheiten unter 10 Minuten. Freude ist der Motor von Agility."],
  ],
  life: [
    ["Ausflug 1 · Erkunden, nicht drängen", "Kurze und leichte Version, unterhalb der Stressgrenze. Erfolg = ruhige Momente in der Situation, dann mit einem guten Gefühl gehen."],
    ["Ausflüge 2 bis 4 · Abstand ist dein Regler", "Wiederhole in einem Abstand oder einer Dauer, bei der der Hund noch fressen, schnüffeln und dich anschauen kann. Bezahle Ruhe ständig."],
    ["Ausflüge 5 bis 7 · Die Lücke schließen", "Näher, länger oder belebter, ein Regler pro Ausflug. Rückzug ist eine Strategie, kein Scheitern."],
    ["Ab Ausflug 8 · Zur Routine machen", "Variiere Tage, Orte und Zeiten, damit die Ruhe generalisiert. Eine 5 heißt entspannt von der Ankunft bis zum Gehen."],
  ],
};

const badges = {
  b_first: { n: "Erste Einheit", d: "Deine allererste Trainingseinheit gespeichert." },
  b_five: { n: "Erste 5 Pfoten", d: "Ein Kommando zum ersten Mal mit 5 von 5 bewertet." },
  b_master1: { n: "Erste Meisterschaft", d: "Erstes Kommando gemeistert: 3 saubere 5er in Folge." },
  b_master5: { n: "High five, mal fünf", d: "5 Kommandos gemeistert." },
  b_master10: { n: "Zweistellig", d: "10 Kommandos gemeistert." },
  b_streak3: { n: "3-Tage-Streak", d: "3 Tage in Folge trainiert." },
  b_streak7: { n: "7-Tage-Streak", d: "Eine ganze Woche tägliches Training." },
  b_streak14: { n: "14-Tage-Streak", d: "Zwei Wochen am Stück. Die Routine ist echt." },
  b_streak30: { n: "30-Tage-Streak", d: "Ein Monat Beständigkeit. Elite-Territorium." },
  b_streak60: { n: "60-Tage-Streak", d: "Zwei Monate ohne Aussetzer. Bemerkenswertes Team." },
  b_streak100: { n: "100-Tage-Streak", d: "Hundert Tage in Folge. Legendenstatus." },
  b_gear: { n: "Komplett ausgerüstet", d: "Jeder Muss-haben-Artikel abgehakt." },
  b_scholar: { n: "Hundegelehrter", d: "10 Ratgeber in der Lernen-Bibliothek gelesen." },
  b_fixer: { n: "Verhaltensleser", d: "5 Verhaltensratgeber gelesen. Verstehen schlägt Korrigieren." },
  b_life1: { n: "Draußen in der Welt", d: "Deine erste Alltagsskill-Einheit gespeichert." },
  b_travel: { n: "Fahrkarte bitte", d: "Einen Reise-Skill gemeistert: Bus, Boot oder Flugzeug." },
  b_social: { n: "Gesellschaftstier", d: "Eine ruhige Hunde- oder Katzenbegegnung gemeistert." },
  b_spa: { n: "Stammgast im Spa", d: "Pflege, Krallen- oder Ohrenpflege gemeistert." },
  b_vet: { n: "Liebling der Tierärztin", d: "Entspannte Tierarztbesuche gemeistert." },
  b_hotel: { n: "Übernachtungs-Champion", d: "Einen Hundehotel-Aufenthalt gemeistert." },
  b_trick1: { n: "Vorhang auf", d: "Ersten Trick gemeistert." },
  b_agi1: { n: "Agility-Neuling", d: "Erstes Agility-Hindernis gemeistert." },
  b_sess50: { n: "50 Einheiten", d: "50 Trainingseinheiten gespeichert." },
  b_sess100: { n: "Hunderter-Club", d: "100 Trainingseinheiten gespeichert." },
  b_xp500: { n: "500 XP", d: "500 XP erreicht." },
  b_xp1000: { n: "1.000 XP", d: "1.000 XP erreicht." },
  b_read25: { n: "Bibliotheksausweis", d: "25 Ratgeber gelesen." },
  b_school: { n: "Musterschüler", d: "Alle 3 Hundeschul-Meilensteine gemeistert: erste Stunde, Semester, Prüfung." },
  b_quest7: { n: "Wochenwunder", d: "7 tägliche Quests abgeschlossen. Die Gewohnheit entsteht." },
  b_quest21: { n: "Gewohnheitsheld", d: "21 tägliche Quests abgeschlossen. Das ist jetzt ein Lebensstil." },
  b_master25: { n: "Vierteljahrhundert", d: "25 Skills gemeistert." },
  b_master50: { n: "Halbzeit", d: "50 Skills gemeistert. Die halbe Bibliothek." },
  b_master99: { n: "Bis zum letzten Skill", d: "Alle 99 Skills gemeistert. Nichts mehr zu lehren." },
  b_xp3000: { n: "3.000 XP", d: "Champion-Level erreicht." },
  b_xp10000: { n: "10.000 XP", d: "Zehntausend XP fürs Dranbleiben." },
  b_sess250: { n: "250 Einheiten", d: "250 Trainingseinheiten gespeichert." },
};

const equip = {
  must: {
    collar: { n: "Flaches Halsband mit Marke", note: "Welche Angaben Pflicht sind, ist unterschiedlich, die Telefonnummer gehört immer drauf." },
    harness: { n: "Y-Geschirr", note: "Tägliches Gassi und Training, kein Druck auf den Hals." },
    leash: { n: "Feste Leine 1,5 bis 2 m", note: "Die Standardleine für Training und Stadt." },
    pouch: { n: "Leckerlibeutel", note: "Schnelle Bezahlung ist gutes Training. Hosentaschen sind zu langsam." },
    treats: { n: "Weiche, erbsengroße Leckerlis", note: "Klein und weich, 50 Belohnungen pro Einheit müssen drin sein." },
    bags: { n: "Kotbeutel plus Spender", note: "Nicht verhandelbare Bürgerpflicht." },
    bowls: { n: "Futter- und Wassernapf", note: "Rutschfest. Keramik oder Stahl schlägt Plastik." },
    bed: { n: "Bett oder Matte", note: "Das Ziel für Platz und die Schlaf-Zentrale." },
    crate: { n: "Box oder Welpenauslauf", note: "Höhle, Hilfe bei der Stubenreinheit, Reisesicherheit." },
    chews: { n: "2 bis 3 Kauspielzeuge", note: "Rotieren, damit sie neu bleiben. Zahnwechsel-Versicherung." },
    brush: { n: "Bürste oder Kamm für den Felltyp", note: "Fellrassen: täglich. Frag einen Hundefriseur nach dem Werkzeug." },
    vetkit: { n: "Basis-Pflegeset", note: "Zeckenzange, Krallenschere für Hunde, hundeverträgliches Shampoo." },
    dental: { n: "Hundezahnbürste und Zahnpasta", note: "Nur enzymatische Hundezahnpasta, nie Zahnpasta für Menschen. Täglich ist ideal, 3-mal pro Woche ist das echte Leben." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Präzisionsmarker. Siehe Welpenecke." },
    longline: { n: "Schleppleine 5 bis 10 m", note: "Die Brücke vom Rückruftraining zum Freilauf." },
    kong: { n: "Befüllbares Gummispielzeug", note: "Gefüllt einfrieren, bringt 20 ruhige Minuten." },
    snuffle: { n: "Schnüffelteppich", note: "Schnüffelnd fressen ermüdet das Gehirn." },
    lickmat: { n: "Leckmatte", note: "Ablenkung bei Pflege und Baden." },
    carrest: { n: "Crashgetestete Autobox oder Autogeschirr", note: "Sicherheit auf jeder Fahrt." },
    whistle: { n: "Rückrufpfeife", note: "Gleichbleibender Ton, trägt weiter als die Stimme." },
    raincoat: { n: "Regenmantel für dünnfellige Hunde", note: "Manche Hunde brauchen ihn, viele nicht." },
    gps: { n: "GPS-Tracker", note: "Beruhigung für Freilaufphasen." },
    puzzle: { n: "Futter-Puzzle", note: "Kopfarbeit für Regentage." },
    agility: { n: "Mini-Agility-Set", note: "Gartenspaß, sobald der Hund ausgewachsen ist." },
    gate: { n: "Türgitter", note: "Günstiges Raum-Management während des Trainings." },
    basket: { n: "Fahrradkorb oder Anhänger", note: "Kleine und mittlere Hunde. Erst als Bett trainieren, immer das Geschirr einhaken." },
  },
};

const leash = {
  gear: {
    collar: { n: "Halsband", pros: ["Leicht und einfach, trägt die Marke", "Schnell an und aus", "Gut für trainierte Hunde, die nicht ziehen"], cons: ["Der ganze Druck landet auf dem Hals", "Riskant für Zieher: Luftröhre, Schilddrüse und Nacken werden belastet", "Manche Hunde schlüpfen aus lockeren Halsbändern"], verdict: "Wegen der Marke dranlassen. Nur daran spazieren gehen, wenn die Leine locker bleibt." },
    yharness: { n: "Y-Geschirr", pros: ["Druck auf Brust und Schultern, nicht auf den Hals", "Ausbruchsicher, wenn gut angepasst", "Beste Wahl für Welpen und Training"], cons: ["Die Passform zählt, Gurte dürfen die Schulterbewegung nicht einschränken", "Etwas langsamer anzulegen", "Ein schlecht geschnittenes Geschirr kann in den Achseln scheuern"], verdict: "Meinung: der richtige Standard für die meisten Hunde. Y-Form auf der Brust, überall 2 Finger Spiel." },
    frontclip: { n: "Geschirr mit Frontring", pros: ["Dreht den Hund beim Ziehen zu dir, die Mechanik hilft beim Umlernen", "Kein Schmerz beteiligt"], cons: ["Ein Werkzeug, keine Heilung, Training bleibt nötig", "Dauerhaftes Gehen am Frontring kann den Gang beeinflussen, während des Umlernens nutzen"], verdict: "Gute vorübergehende Hilfe für starke Zieher, parallel zum Training an lockerer Leine." },
  },
  leashes: {
    fixed: { n: "Feste Leine 1,5 bis 2 m", pros: ["Vorhersehbare Länge, klare Kommunikation", "Standard für Training und Stadt"], cons: ["Kurzer Radius zum Schnüffeln auf Landspaziergängen"], verdict: "Der Standard. Einmal Qualität kaufen." },
    longline: { n: "Schleppleine 5 bis 10 m", pros: ["Freiheit mit Sicherheitsnetz", "Das Werkzeug für Rückruf und Freilauftraining"], cons: ["Risiko von Seilbrand, Handschuhe helfen", "Braucht freie Fläche und etwas Handling-Geschick"], verdict: "Beste Trainingsinvestition nach Leckerlis." },
    flexi: { n: "Rollleine (Flexi)", pros: ["Bequemer Radius für trainierte, ruhige Hunde in offenem Gelände"], cons: ["Lehrt das Ziehen, Zug verlängert die Reichweite", "Schnittverletzungen bei Mensch und Hund sind dokumentiert", "Keine Kontrolle in plötzlichen Verkehrssituationen", "In vielen Hundeschulen verboten oder verpönt"], verdict: "Meinung: während des Trainings komplett weglassen. Wenn überhaupt, nur Gurtversion, nur in offenem Gelände." },
    slip: { n: "Retrieverleine", pros: ["Schnell für kurze Übergaben, üblich bei Tierärzten und in Tierheimen"], cons: ["Zieht sich am Hals ohne Begrenzung zu", "Falsches Werkzeug für Zieher und für tägliche Spaziergänge"], verdict: "Profi-Werkzeug für kurze Übergaben, keine Leine für den Alltag." },
  },
};

const planAdult = [
  { n: "Bestandsaufnahme", items: ["Teste die Basics ehrlich: Sitz, Platz, Bleib, Rückruf, jeweils im Wohnzimmer und im Garten", "Trainiere alles Wackelige mit 3-Minuten-Einheiten neu, keine Scham, Rost ist normal", "Wähle deine Belohnungswährung: welches Leckerli lässt die Augen deines Hundes leuchten"], note: "Geh nicht davon aus, dass etwas sitzt. Ehrlich testen in dieser Woche spart 6 Wochen Frust später." },
  { n: "Lockere Leine neu aufbauen", items: ["Gehen an lockerer Leine, täglich 10 Minuten auf einer ruhigen Strecke", "Die Stopp-wenn-sie-sich-spannt-Regel, wirklich jedes Mal", "Schnüffelpausen auf Signal als Lohn für den Spaziergang"], note: "Lockere Leine ist eine Gewohnheit, kein Trick. Beständigkeit schlägt Intensität, jedes Mal." },
  { n: "Impulskontrolle", items: ["Lass es, von Futter am Boden bis zu heruntergefallenem Futter", "Warten an Türen und vor dem Futternapf", "Bleib: Dauer auf 30 Sekunden steigern, während du dich entfernst"], note: "Rückruf ist ein Lebensskill. Ruf deinen Hund nie, um etwas Schönes zu beenden, sonst bedeutet das Signal bald: der Spaß ist vorbei." },
  { n: "Entspannen auf Signal", items: ["Auf einer Matte entspannen beim Abendessen und an Fernsehabenden", "Ruhiges Verhalten wird leise bezahlt, Chaos bekommt nichts", "Erste Café-Probe zu Hause: Matte, Kauartikel, 20 Minuten"], note: "Entspannungstraining sieht aus wie Nichtstun. Es ist das Nützlichste, was ein erwachsener Hund lernen kann." },
  { n: "Rückruf absichern", items: ["Rückruf an der Schleppleine im Park, bezahlen wie einen Lottogewinn", "Ablenkungen schrittweise hinzufügen: Abstand zu anderen Hunden, dann näher", "Notfall-Stopp als eigener Skill"], note: "Impulskontrolle wird in Sekunden aufgebaut, nicht in Minuten. Kurze Durchgänge, hoher Wert, als Gewinner aufhören." },
  { n: "Handling und Pflege", items: ["Kinnablage für die Pflege: Ohren, Augen, Pfoten", "Diese Woche 3-mal Zähne putzen", "Krallen schneiden oder schleifen, 1 Pfote pro Sitzung"], note: "Ablenkung ist der echte Test. Senke deine Kriterien an einem neuen Ort, das ist kein Rückschritt, das ist Training." },
  { n: "Manieren in der Öffentlichkeit", items: ["Echter Café- oder Restaurantbesuch, kurz und erfolgreich", "Höfliche Begrüßungen: Sitz zum Hallo sagen, kein Hochspringen", "Ruhig warten, während du auf der Straße mit jemandem redest"], note: "Erwachsene Hunde lernen Tricks schneller als Welpen. Nutze sie, um nach einer harten Woche Selbstvertrauen aufzubauen." },
  { n: "Beschäftigung und Abschluss", items: ["Schnüffelspiele: Leckerli-Suche in der Wohnung und im Garten", "1 reinen Spaß-Trick beibringen, als Belohnung für euch beide", "Wiederholungswoche: Woche 1 nochmal testen, den Unterschied feiern, das Nächste planen"], note: "Pflege schlägt Perfektion. 5 Minuten an 5 Tagen pro Woche erhalten alles, was du aufgebaut hast." },
];

const planPup = [
  { n: "Ankommen und Bindung", items: ["Namenserkennung", "Markerwort oder Clicker aufladen", "Rhythmus für die Stubenreinheit, alle 1 bis 2 Stunden raus"], note: "Diese Woche kein Kommando-Druck. Bindung, Schlaf und Toilettenzeiten sind der Lehrplan." },
  { n: "Erster Skill: Sitz", items: ["Sitz, 3 kurze Einheiten am Tag", "Namenserkennung weiter bezahlen", "Boxenspiele mit offener Tür"], note: "3 Minuten zählen als Einheit. Kurz und fröhlich schlägt lang und angespannt." },
  { n: "Platz kommt dazu", items: ["Platz", "Sitz in neuen Räumen wiederholen", "Handling: Pfoten und Ohren berühren, jede Berührung bezahlen"], note: "Wenn Platz bis Sonntag nicht flüssig ist, ist das in Ordnung. Nimm es mit in die nächste Woche." },
  { n: "Komm, das Fundament", items: ["Komm drinnen, Flur-Pingpong", "Wiederholungswoche: Sitz und Platz vor den Mahlzeiten", "Warten am Futternapf, 2 Sekunden"], note: "Rückruf ist ein Marathon-Skill. Vorerst nur drinnen." },
  { n: "Impulskontrolle", items: ["Lass es, Basis-Faustspiel", "Aus beim Spielen", "Rückruf drinnen weiter bezahlen"], note: "Die Hälfte des Hundetrainings ist, dem Hund beizubringen, dass Aufgeben sich mehr lohnt als Zugreifen." },
  { n: "Raus in die Welt", items: ["Lockere Leine, die ersten 100 lockeren Meter", "Schau mich an auf der Straße", "Sitz an 1 Bordstein pro Spaziergang"], note: "Ziehen ist in diesem Alter normal. Stop-and-go, kein Rucken, winzige Strecken." },
  { n: "Bleib beginnt", items: ["Bleib, nur 1 bis 5 Sekunden Dauer", "Auf die Matte", "Rückruf wiederholen, jetzt mit leichter Ablenkung"], note: "Sekunden, nicht Minuten. Zweimal hintereinander das Bleib brechen heißt: leichter machen." },
  { n: "Festigungswoche", items: ["Keine neuen Skills", "Gemischte 5-Minuten-Wiederholungen von allem", "1 Spaß-Trick deiner Wahl als Nachtisch"], note: "Wiederholungswochen sind Fortschritt. Ein Skill ist erst echt, wenn er eine Woche gemischtes Üben übersteht." },
  { n: "Unterwegs", items: ["Warten am Bordstein, bei jeder Überquerung", "Lockere Leine auf belebteren Straßen", "Ruhige Besucherroutine, erste Aufbauten"], note: "Die Welt ist jetzt das Klassenzimmer. Kürzere Strecken in höherer Qualität schlagen lange Märsche." },
  { n: "Distanz und Dauer", items: ["Bleib mit 2 bis 5 Schritten Abstand", "Rückruf draußen an der Schleppleine", "Platz auf der Matte, während du kochst"], note: "Wenn ein Skill wackelt, geh eine Woche zurück. Der Kalender dient dir, nicht umgekehrt." },
  { n: "Alltagsskills", items: ["Unter dem Tisch entspannen, erster Café-Besuch", "Erste ruhige Autofahrten", "Handling wie beim Tierarzt: Pfoten, Ohren, Zähne prüfen"], note: "Das sind die Skills, die die nächsten 10 Jahre leicht machen. Jeden Durchgang wert." },
  { n: "Abschlusswoche", items: ["Keine neuen Skills", "Gemischte 5-Minuten-Wiederholungen des ganzen Werkzeugkastens", "1 Lieblingstrick, für die Vorführung poliert"], note: "12 Wochen geschafft: Du hast einen trainierten Junghund und eine tägliche Gewohnheit. Die Gewohnheit ist das echte Abschlussgeschenk." },
];

const puppy = {
  treatsguide: { n: "Leckerlis: deine Trainingswährung", body: ["Größe: erbsengroß oder kleiner. Eine 5-Minuten-Einheit kann 30 Leckerlis verbrauchen, klein hält die Kalorienrechnung vernünftig.", "Weich schlägt knusprig, Kaupausen zerstören den Trainingsrhythmus.", "Bau ein Wertemenü: Trockenfutter für leichte Aufgaben zu Hause, Käse, Hähnchen oder Wurst für Rückruf und schwere Arbeit draußen.", "Nimm die Leckerlis aus der Tagesration, Trainingskalorien zählen auch. Faustregel: Leckerlis innerhalb von etwa 10% der Tagesmenge.", "Giftig und tabu: Schokolade, Trauben und Rosinen, Zwiebeln, Knoblauch, Süßstoff Xylit, Alkohol, gekochte Knochen."] },
  clickerguide: { n: "Clicker-Grundlagen", body: ["Ein Clicker ist ein Präzisionsinstrument: Der Klick markiert den exakten Moment, in dem der Hund die Belohnung verdient hat.", "Aufladen: Klick, dann Leckerli, 10- bis 15-mal, bis der Klick die Ohren aufstellen lässt. Das ist das ganze Setup.", "Der Vertrag: Jeder Klick wird immer bezahlt. Keine Ausnahmen, sonst verliert das Instrument seinen Wert.", "Klick-Timing schlägt Leckerli-Timing, das Leckerli darf 2 Sekunden später kommen, der Klick nicht.", "Kein Clicker zur Hand: Ein kurzes Markerwort wie Ja, jedes Mal gleich gesagt, erledigt denselben Job etwas weniger präzise."] },
  teethguide: { n: "Zahnwechsel-Zeitplan", body: ["Woche 3 bis 6: 28 Milchzähne kommen.", "Monat 3 bis 7: Milchzähne fallen aus, 42 bleibende Zähne brechen durch. Höchster Kaudruck, wundes Zahnfleisch, gelegentlich Blutflecken am Spielzeug, alles normal.", "Linderungsmenü: Gummi-Kauartikel, ein nasser gefrorener Waschlappen, gefrorene Karottenstücke unter Aufsicht, und Kaffeeholz- oder Olivenholz-Kauartikel, die zerbröseln statt zu splittern wie Gartenstöcke.", "Gelegentlich auf zurückgebliebene Milchzähne prüfen, eine doppelte Reihe Fangzähne braucht einen Blick vom Tierarzt, häufig bei kleinen Rassen.", "Bis Monat 7 ist der Sturm größtenteils vorbei. Kabel und Schuhe bis dahin schützen, nicht für immer."] },
  sleepguide: { n: "Schlaf und Nickerchen", body: ["Welpen brauchen 16 bis 20 Stunden Schlaf am Tag. Die meisten Beiß-, Zoomie- und Jammer-Ausbrüche sind schlicht ein übermüdeter Welpe nach seiner Schlafenszeit.", "Bau einen Nickerchen-Rhythmus auf: bei jungen Welpen etwa 1 Stunde wach, dann ein Nickerchen. Spielen, Pipi, dann in den sicheren Bereich zum Schlafen.", "Setze Nickerchen an einem ruhigen, gedämpften Ort durch, eine abgedeckte Box oder ein Auslauf funktioniert. Ein übermüdeter Welpe kann mitten im Haushaltstrubel oft nicht allein einschlafen.", "Schütze den Nachtschlaf: letzter Toilettengang spät am Abend, dann langweilige Dunkelheit. Junge Welpen brauchen vielleicht 1 nächtlichen Toilettengang, halte ihn still und sachlich.", "Wenn der Welpe zum Landhai wird, trainiere nicht dagegen an. Es ist Schlafenszeit, nicht Disziplinzeit."] },
  homeguide: { n: "Die ersten Tage im neuen Zuhause", body: ["Verkleinere die Welt: 1 Raum plus der sichere Bereich für die ersten Tage. Die ganze Wohnung wird nach und nach verdient, Raum für Raum, das hält Stubenreinheit und Kauen im Griff.", "Richte eine Basis ein: Bett oder Box, Wasser, ein Kauartikel, in einer Ecke, aus der der Welpe dich sehen kann und trotzdem ungestört ruht. Das ist der Rückzugsort, nie der Strafplatz.", "Erste Nacht: Der Schlafabstand zählt. Viele Welpen kommen in den ersten Nächten schneller zur Ruhe direkt neben dem Bett, das Bett kannst du später umziehen.", "Halte die erste Woche absichtlich langweilig: keine Besucherparaden, keine Welpenpartys. Der Welpe verarbeitet den Verlust seines Wurfs, der Haushalt ist Aufregung genug.", "Beginne Routinen ab Tag 1: gleiche Fütterungszeiten, gleiche Pipi-Tür, gleiche Worte. Vorhersehbarkeit ist die Art, wie ein Welpe lernt, dass die Welt sicher ist."] },
  socialguide: { n: "Das Sozialisierungsfenster", body: ["Etwa die 3. bis 14. Lebenswoche ist die Zeit, in der Welpen Erfahrungen als normal abspeichern. Was jetzt ruhig erlebt wird, ist ein Leben lang langweilig, was verpasst wird, kann später echte Arbeit brauchen.", "Sozialisierung heißt ruhige Konfrontation, nicht maximaler Kontakt. Einen Bus aus 30 Metern beim Leckerlifressen zu beobachten ist perfekte Sozialisierung, von 5 Hunden bedrängt zu werden nicht.", "Arbeite eine Checkliste ab: Untergründe (Gras, Metallgitter, Treppen), Geräusche (Verkehr, Staubsauger, Donneraufnahmen leise), Menschen (Hüte, Bärte, Rollstühle, Kinder auf Abstand), Handling (Pfoten, Ohren, Maul).", "Vor der vollständigen Impfung: Trag den Welpen durch belebte Orte, besuche geimpfte befreundete Hunde zu Hause, setz dich auf eine Bank mitten ins Leben. Konfrontation braucht keinen Bodenkontakt.", "Eine Regel über allem: Der Welpe bestimmt das Tempo. Erzwungene Begrüßungen lehren Angst, freiwillige Annäherung lehrt Selbstvertrauen."] },
  aloneguide: { n: "Alleinsein ab Tag 1", body: ["Alleinsein ist ein Skill, keine Grundeinstellung. Welpen, die es nie üben, werden Hunde, die in Panik geraten, fang mit Sekunden an, nicht mit Stunden.", "Tag 1: Geh für 10 Sekunden aus dem Raum, während der Welpe aus einem Futterspielzeug frisst, komm zurück, bevor es Theater gibt. Das ist ein Durchgang.", "Steigere langsam: Sekunden zu Minuten zu einem ruhigen Kaffee vor der Tür. Lass einen gefüllten Kauartikel da, halte Abschiede und Rückkehr komplett langweilig, keine dramatischen Verabschiedungen.", "Ziel ist ein Welpe, der innerhalb der ersten Wochen 30 bis 60 Minuten allein schlafen kann, immer nach Bewegung, Pipi und mit etwas zum Kauen.", "Wenn der Welpe in Panik gerät statt zu protestieren, zieh das Weinen nicht durch, verkleinere den Schritt. Echter Trennungsstress verdient früh einen professionellen Plan, er löst sich nicht von selbst."] },
  walksguide: { n: "Welpenspaziergänge: wie lang, wie oft", body: ["Faustregel: etwa 5 Minuten strukturiertes Gehen pro Lebensmonat, 1- bis 2-mal am Tag. Ein 4-Monate-Welpe: rund 20 Minuten pro Spaziergang.", "Das begrenzt erzwungenes Marschieren, nicht Bewegung. Freies Spiel, Schnüffeln und Zeit auf weichem Boden regeln sich selbst.", "Schnüffeln IST der Spaziergang. Eine langsame 20-Minuten-Schnüffeltour ermüdet einen Welpen mehr als 40 zügige Minuten.", "Wachsende Gelenke mögen keine langen Wanderungen, Treppen-Marathons, Sprünge aus der Höhe und Laufen auf Asphalt. Hebe Joggen und Fahrradtraining für 12 bis 18 Monate auf.", "Schau auf den Welpen, nicht auf die Uhr: Zurückbleiben, Hinlegen oder wildes Beißen mitten im Spaziergang heißt, es war zu viel. Trag einen kleinen Welpen lieber nach Hause, statt ihn zu ziehen.", "3 bis 4 kurze Ausflüge schlagen 1 langen, und jeder Ausflug ist zugleich Toilettentraining."] },
  heatguide: { n: "Ratgeber erste Läufigkeit", body: ["Zeitpunkt: erste Läufigkeit zwischen 6 und 15 Monaten, kleine Rassen früher, große Rassen später. Sie wiederholt sich etwa alle 6 bis 8 Monate.", "Dauer: rund 2 bis 4 Wochen. Anzeichen: geschwollene Vulva, blutiger Ausfluss, häufigeres Pinkeln, Stimmungsschwankungen, magnetische Anziehung auf jeden Rüden im Postleitzahlgebiet.", "Management: für die gesamte Dauer nur an der Leine, keine Hundewiesen, keine unbeaufsichtigte Gartenzeit, bei Bedarf Hygienehöschen drinnen.", "Sie kann anhänglich, müde oder wählerisch beim Futter sein. Alles normal, Routinen ruhig beibehalten.", "Nach der ersten Läufigkeit mit deiner Tierarztpraxis Vor- und Nachteile und Zeitpunkt einer Kastration besprechen. Es gibt echte Argumente auf beiden Seiten und die Rassengröße zählt, es ist eine persönliche Entscheidung, kein Standard.", "Trag die Daten in deinen Kalender ein. Vorhersehbarkeit macht Runde 2 leicht."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
