/* Nederlands: inhoud behalve vaardigheden en gedragsgidsen (zie cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Makkelijk", 2: "Gemiddeld", 3: "Gevorderd" };
const quest = { new: "Nieuwe vaardigheid", cont: "Ga zo door", prac: "Opfrisser" };
const levels = [{ n: "Beginner" }, { n: "Leerling" }, { n: "Afgestudeerd" }, { n: "Pro" }, { n: "Kampioen" }, { n: "Meester" }, { n: "Legende" }];
const ranks = [{ n: "Nieuwkomer" }, { n: "Leerling" }, { n: "Geleider" }, { n: "Trainer" }, { n: "Expert" }, { n: "Specialist" }, { n: "Compleet" }];

const stucks = {
  cmd: "Vastgelopen? Maak het makkelijker, niet luider. Stap terug, pak 2 makkelijke successen, stop daar. Laat opnieuw zien met een lokkertje in plaats van het commando te herhalen. Als de hond uit een positie opstaat, beloon dan sneller bij de volgende herhaling.",
  trick: "Vastgelopen? Hak de truc in kleinere stukken en betaal het kleinste stuk. Film een sessie, de meeste trucproblemen zitten in de mensenhand, niet in de hond.",
  agi: "Weigert de hindernis? Lager, korter, of ga terug naar het betalen van pogingen alleen. Duw of til de hond nooit op het toestel, één angstige herhaling kost weken.",
  life: "Overweldigd in plaats van vastgelopen? Voeg afstand toe, maak het uitje korter, eindig rustig en probeer het een andere dag. Blootstellingswerk faalt luid maar herstelt snel.",
};

const ladders = {
  cmd: [
    ["Sessie 1 · Laat zien, test niet", "Lok elke herhaling met een snoepje in je hand, beloon binnen 1 seconde. Succes = het gedrag gebeurde überhaupt, met al jouw hulp."],
    ["Sessie 2 tot 4 · Lok en benoem", "Blijf lokken, zeg het commando één keer vlak voor het gedrag. Succes = 3 tot 5 geholpen herhalingen op rij."],
    ["Sessie 5 tot 7 · Verwijder het lokkertje", "Lege hand, dezelfde beweging, beloning uit je tas. Posities verdienen 1 tot 3 seconden wachten voor de uitbetaling."],
    ["Sessie 8 en verder · Commando eerst", "Eén commando, geen lokkertje. Verhoog één moeilijkheid tegelijk: duur boven 5 seconden, nieuwe kamers, lichte afleiding."],
  ],
  trick: [
    ["Sessie 1 · Volg het lokkertje", "Groot, duidelijk lokkertje, directe uitbetaling voor elke beweging in de goede richting. Succes = een ruwe versie gebeurde één keer."],
    ["Sessie 2 tot 4 · Vorm het", "Betaal de beste 3 van 5 pogingen, negeer de rest. Zeg het commando één keer per herhaling. Sets van 3 tot 5 herhalingen, trucs vermoeien het brein."],
    ["Sessie 5 tot 7 · Bouw de hulp af", "Het lokkertje wordt een klein handgebaar. De precisie gaat omhoog: de schoonste herhalingen verdienen een dubbel snoepje."],
    ["Sessie 8 en verder · Showtijd", "Commando eerst, handgebaar alleen als back-up. Nieuwe kamers, dan voor publiek. Applaus telt als afleiding."],
  ],
  agi: [
    ["Sessie 1 · Maak het piepklein", "Balk op de grond, tunnel kort, tafel laag. Succes = 1 vrolijke poging, betaald als een jackpot."],
    ["Sessie 2 tot 4 · Bouw liefde, geen hoogte", "Herhaal de makkelijke versie tot de hond je naar de hindernis trekt. Eerst vertrouwen, dan criteria."],
    ["Sessie 5 tot 7 · Verhoog één ding", "Hoogte, lengte of hoek, nooit twee in één sessie. Zeg het hindernis-commando zodra de hond zich vastlegt."],
    ["Sessie 8 en verder · Snelheid en volgorde", "Stuur vanaf een paar passen afstand, schakel 2 hindernissen aan elkaar, sessies onder 10 minuten. Vreugde is de motor van agility."],
  ],
  life: [
    ["Uitje 1 · Verken, forceer niet", "Korte, makkelijke versie, onder de stressdrempel. Succes = rustige momenten in de situatie, dan blij weggaan."],
    ["Uitje 2 tot 4 · Afstand is je draaiknop", "Herhaal op een afstand of duur waarbij de hond nog kan eten, snuffelen en naar je kijken. Betaal rust voortdurend."],
    ["Uitje 5 tot 7 · Dicht het gat", "Dichterbij, langer of drukker, één draaiknop per uitje. Terugtrekken is strategie, geen falen."],
    ["Uitje 8 en verder · Maak het routine", "Wissel dagen, plekken en tijden af zodat rust generaliseert. Een 5 betekent ontspannen van aankomst tot vertrek."],
  ],
};

const badges = {
  b_first: { n: "Eerste sessie", d: "Je allereerste trainingssessie gelogd." },
  b_five: { n: "Eerste 5 poten", d: "Een commando voor het eerst 5 van 5 gescoord." },
  b_master1: { n: "Eerste beheersing", d: "Eerste commando beheerst: 3 schone vijven op rij." },
  b_master5: { n: "High five, keer vijf", d: "5 commando's beheerst." },
  b_master10: { n: "Dubbele cijfers", d: "10 commando's beheerst." },
  b_streak3: { n: "Reeks van 3 dagen", d: "3 dagen op rij getraind." },
  b_streak7: { n: "Reeks van 7 dagen", d: "Een volle week dagelijkse training." },
  b_streak14: { n: "Reeks van 14 dagen", d: "Twee weken op rij. De routine is echt." },
  b_streak30: { n: "Reeks van 30 dagen", d: "Een maand consistentie. Elitegebied." },
  b_streak60: { n: "Reeks van 60 dagen", d: "Twee maanden zonder een dag te missen. Opmerkelijk team." },
  b_streak100: { n: "Reeks van 100 dagen", d: "Honderd dagen op rij. Legendestatus." },
  b_gear: { n: "Volledig uitgerust", d: "Elk onmisbaar item afgevinkt." },
  b_scholar: { n: "Hondengeleerde", d: "10 gidsen gelezen in de Leren-bibliotheek." },
  b_fixer: { n: "Gedragslezer", d: "5 gedragsgidsen gelezen. Begrijpen wint van corrigeren." },
  b_life1: { n: "De wereld in", d: "Je eerste levensvaardigheidssessie gelogd." },
  b_travel: { n: "Kaartjes, alstublieft", d: "Een reisvaardigheid beheerst: bus, boot of vliegtuig." },
  b_social: { n: "Sociale vlinder", d: "Een rustige ontmoeting met een hond of kat beheerst." },
  b_spa: { n: "Spa-vaste klant", d: "Trimmen, nagels of oren beheerst." },
  b_vet: { n: "Lieveling van de dierenarts", d: "Blije dierenartsbezoeken beheerst." },
  b_hotel: { n: "Logeerkampioen", d: "Een verblijf in een hondenpension beheerst." },
  b_trick1: { n: "Showtijd", d: "Eerste truc beheerst." },
  b_agi1: { n: "Agility-beginner", d: "Eerste agility-hindernis beheerst." },
  b_sess50: { n: "50 sessies", d: "50 trainingssessies gelogd." },
  b_sess100: { n: "Club van honderd", d: "100 trainingssessies gelogd." },
  b_xp500: { n: "500 XP", d: "500 XP bereikt." },
  b_xp1000: { n: "1.000 XP", d: "1.000 XP bereikt." },
  b_read25: { n: "Bibliotheekpas", d: "25 gidsen gelezen." },
  b_school: { n: "Beste van de klas", d: "Alle 3 hondenschoolmijlpalen beheerst: eerste les, semester, examen." },
  b_quest7: { n: "Weekwonder", d: "7 dagelijkse missies voltooid. De gewoonte vormt zich." },
  b_quest21: { n: "Gewoonteheld", d: "21 dagelijkse missies voltooid. Dit is nu een levensstijl." },
  b_master25: { n: "Kwart eeuw", d: "25 vaardigheden beheerst." },
  b_master50: { n: "Halverwege", d: "50 vaardigheden beheerst. De halve bibliotheek." },
  b_master99: { n: "Tot de laatste", d: "Alle 99 vaardigheden beheerst. Niets meer aan te leren." },
  b_xp3000: { n: "3.000 XP", d: "Kampioensniveau bereikt." },
  b_xp10000: { n: "10.000 XP", d: "Tienduizend XP aan consistentie." },
  b_sess250: { n: "250 sessies", d: "250 trainingssessies gelogd." },
};

const equip = {
  must: {
    collar: { n: "Platte halsband met penning", note: "Verplichte gegevens op de penning verschillen, telefoonnummer hoort er altijd op." },
    harness: { n: "Y-tuig", note: "Dagelijkse wandelingen en training, zonder druk op de keel." },
    leash: { n: "Vaste lijn van 1,5 tot 2 m", note: "De standaardlijn voor training en stad." },
    pouch: { n: "Beloningstasje", note: "Snel betalen is goed trainen. Zakken zijn te traag." },
    treats: { n: "Zachte snoepjes ter grootte van een erwt", note: "Klein en zacht, 50 beloningen per sessie moet kunnen." },
    bags: { n: "Poepzakjes met houder", note: "Burgerplicht, niet onderhandelbaar." },
    bowls: { n: "Voer- en waterbakken", note: "Antislip. Keramiek of staal wint van plastic." },
    bed: { n: "Mand of mat", note: "Het doel van Plaats en het hoofdkwartier voor dutjes." },
    crate: { n: "Bench of ren", note: "Hol, hulp bij zindelijkheid, veiligheid op reis." },
    chews: { n: "2 tot 3 kauwspeeltjes", note: "Wissel af om ze nieuw te houden. Verzekering tegen tandenwisselen." },
    brush: { n: "Borstel of kam voor het vachttype", note: "Vachtrassen: dagelijks. Vraag een trimmer welk gereedschap." },
    vetkit: { n: "Basis-verzorgingsset", note: "Tekentang, nagelknipper voor honden, hondenshampoo." },
    dental: { n: "Hondentandenborstel en -pasta", note: "Alleen enzymatische hondentandpasta, nooit die van mensen. Dagelijks is ideaal, 3 keer per week is het echte leven." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Precisiemarker. Zie Puppyhoek." },
    longline: { n: "Lange lijn van 5 tot 10 m", note: "De brug van terugroeptraining naar loslopen." },
    kong: { n: "Vulbaar rubberen speeltje", note: "Gevuld invriezen, koopt 20 minuten rust." },
    snuffle: { n: "Snuffelmat", note: "Het avondeten opsnuffelen vermoeit het brein." },
    lickmat: { n: "Likmat", note: "Afleiding bij trimmen en in bad." },
    carrest: { n: "Gecertificeerde autobench of autotuig", note: "Veiligheid op elke rit." },
    whistle: { n: "Terugroepfluitje", note: "Consistent geluid, draagt verder dan je stem." },
    raincoat: { n: "Regenjas voor dunvachtige honden", note: "Sommige honden hebben het nodig, veel niet." },
    gps: { n: "GPS-tracker", note: "Gemoedsrust in de loslopfase." },
    puzzle: { n: "Voerpuzzels", note: "Hersenwerk voor regendagen." },
    agility: { n: "Mini-agilityset", note: "Tuinplezier zodra de hond volgroeid is." },
    gate: { n: "Traphekje", note: "Goedkoop ruimtebeheer tijdens training." },
    basket: { n: "Fietsmand of fietskar", note: "Kleine en middelgrote honden. Train het eerst als mand, klik het tuig altijd vast." },
  },
};

const leash = {
  gear: {
    collar: { n: "Halsband", pros: ["Licht en simpel, draagt de penning", "Snel om en af", "Prima voor getrainde honden die niet trekken"], cons: ["Alle druk komt op de keel", "Riskant voor trekkers: luchtpijp, schildklier en nek onder belasting", "Sommige honden glippen uit losse halsbanden"], verdict: "Houd hem voor de penning. Wandel er alleen mee als de lijn los blijft." },
    yharness: { n: "Y-tuig", pros: ["Druk op borst en schouders, niet op de keel", "Ontsnappingsbestendig als het goed zit", "Beste standaardkeuze voor pups en training"], cons: ["Pasvorm telt, banden mogen de schouderbeweging niet hinderen", "Iets trager om te doen", "Een slecht ontworpen tuig kan schuren onder de oksels"], verdict: "Mening: de juiste standaardkeuze voor de meeste honden. Y-vorm op de borst, overal 2 vingers speling." },
    frontclip: { n: "Tuig met borstring", pros: ["Draait de hond naar je toe als hij trekt, de mechanica helpt bij heropvoeding", "Geen pijn"], cons: ["Een hulpmiddel, geen genezing, training blijft nodig", "Altijd aan de borstring lopen kan de gang beïnvloeden, gebruik het tijdens heropvoeding"], verdict: "Goede tijdelijke hulp voor sterke trekkers naast losse-lijntraining." },
  },
  leashes: {
    fixed: { n: "Vaste lijn van 1,5 tot 2 m", pros: ["Voorspelbare lengte, duidelijke communicatie", "Standaard voor training en stad"], cons: ["Kleine snuffelradius op landelijke wandelingen"], verdict: "De standaardkeuze. Koop één keer kwaliteit." },
    longline: { n: "Lange lijn van 5 tot 10 m", pros: ["Vrijheid met vangnet", "Het hulpmiddel voor terugroepen en losloopwerk"], cons: ["Kans op touwbrandwonden, handschoenen helpen", "Vereist open ruimte en wat handigheid"], verdict: "Beste trainingsinvestering na snoepjes." },
    flexi: { n: "Oprolbare lijn (flexi)", pros: ["Handige radius voor getrainde, rustige honden in open gebied"], cons: ["Leert trekken, spanning vergroot het bereik", "Koordverwondingen bij mens en hond zijn gedocumenteerd", "Geen controle in plotselinge verkeerssituaties", "Verboden of ongewenst op veel hondenscholen"], verdict: "Mening: helemaal weglaten tijdens training. Als het echt moet, alleen het bandtype, alleen in open gebied." },
    slip: { n: "Sliplijn", pros: ["Snel voor korte overdrachten, gebruikelijk bij dierenartsen en asielen"], cons: ["Trekt zonder begrenzing strak om de nek", "Verkeerd hulpmiddel voor trekkers en dagelijkse wandelingen"], verdict: "Professioneel hulpmiddel voor korte overdrachten, geen dagelijkse lijn." },
  },
};

const planAdult = [
  { n: "Basis-audit", items: ["Test de basis eerlijk: zit, af, blijf, terugroepen, elk in de woonkamer en de tuin", "Train alles wat wankelt opnieuw in sessies van 3 minuten, zonder schaamte, roest is normaal", "Kies je beloningsvaluta: welk snoepje laat de ogen van je hond glimmen"], note: "Neem niets aan als stevig. Eerlijk testen deze week bespaart 6 weken frustratie later." },
  { n: "Losse-lijn-reset", items: ["Losse-lijn-wandeling, 10 minuten per dag op een rustige route", "De regel stop-als-hij-strak-staat, elke keer", "Snuffelpauzes op commando als loon voor de wandeling"], note: "Losse lijn is een gewoonte, geen truc. Consistentie wint van intensiteit, elke keer." },
  { n: "Impulscontrole", items: ["Laat het, van voer op de grond tot voer dat valt", "Wacht bij deuren en voor de voerbak", "Blijf: bouw de duur op tot 30 seconden terwijl jij wegloopt"], note: "Terugroepen is een levensvaardigheid. Roep je hond nooit om iets leuks te beëindigen, anders gaat het commando einde feest betekenen." },
  { n: "Rustig worden op commando", items: ["Rustig liggen op een mat tijdens het avondeten en tv-avonden", "Rustig gedrag krijgt een stille uitbetaling, chaos krijgt niets", "Eerste café-oefening thuis: mat, kauwsnack, 20 minuten"], note: "Rustwerk ziet eruit als niets doen. Het is het nuttigste wat een volwassen hond kan leren." },
  { n: "Terugroepen bewapenen", items: ["Terugroepen aan de lange lijn in het park, betaald als een loterijwinst", "Voeg afleidingen geleidelijk toe: afstand tot andere honden, dan dichterbij", "Noodstopcommando als aparte vaardigheid"], note: "Impulscontrole bouw je in seconden, niet in minuten. Korte herhalingen, hoge waarde, stop als winnaar." },
  { n: "Aanraken en verzorging", items: ["Kinrust voor aanraken: oren, ogen, poten", "Tanden poetsen 3 keer deze week", "Nagelsessie met knipper of vijl, 1 poot per keer"], note: "Afleiding is de echte test. Verlaag je criteria op een nieuwe plek, dat is geen terugval, dat is trainen." },
  { n: "Manieren in het openbaar", items: ["Echt café- of restaurantbezoek, kort en succesvol", "Beleefd begroeten: zit om hallo te zeggen, geen springen", "Rustig wachten terwijl jij met iemand op straat praat"], note: "Volwassen honden leren trucs sneller dan pups. Gebruik ze om vertrouwen te herbouwen na een zware week." },
  { n: "Verrijking en diploma", items: ["Neuswerkspellen: snoepjesjacht door het huis en de tuin", "Leer 1 puur leuke truc als beloning voor jullie allebei", "Herhaalweek: doe de test van week 1 opnieuw, vier het verschil, plan wat volgt"], note: "Onderhoud wint van perfectie. 5 minuten op 5 dagen per week bewaart alles wat je hebt opgebouwd." },
];

const planPup = [
  { n: "Aankomst en band", items: ["Naamherkenning", "Laad je markerwoord of clicker", "Zindelijkheidsritme, naar buiten elke 1 tot 2 uur"], note: "Geen commandodruk deze week. Band, slaap en plastijden zijn het programma." },
  { n: "Eerste vaardigheid: Zit", items: ["Zit, 3 korte sessies per dag", "Blijf naamherkenning betalen", "Benchspellen met open deur"], note: "3 minuten telt als een sessie. Kort en vrolijk wint van lang en gespannen." },
  { n: "Af komt erbij", items: ["Af", "Herhaal Zit in nieuwe kamers", "Aanraken: raak poten en oren aan, betaal elke aanraking"], note: "Als Af tegen zondag niet vloeiend is, is dat prima. Schuif het door naar volgende week." },
  { n: "Hier, de basis", items: ["Hier binnenshuis, pingpong door de gang", "Herhaalweek: Zit en Af voor de maaltijden", "Wacht bij de voerbak, 2 seconden"], note: "Terugroepen is een marathonvaardigheid. Voorlopig alleen binnen." },
  { n: "Impulscontrole", items: ["Laat het, basisspel met de vuist", "Los tijdens het spelen", "Blijf terugroepen binnen betalen"], note: "De helft van hondentraining is de hond leren dat loslaten meer oplevert dan grijpen." },
  { n: "De wereld in", items: ["Losse lijn, de eerste 100 losse meters", "Kijk naar mij op straat", "Zit bij 1 stoeprand per wandeling"], note: "Trekken is normaal op deze leeftijd. Stoppen en gaan, geen rukken, piepkleine afstanden." },
  { n: "Blijf begint", items: ["Blijf, slechts 1 tot 5 seconden duur", "Plaats op de mat", "Herhaal terugroepen, nu met lichte afleidingen"], note: "Seconden, geen minuten. Twee keer op rij een Blijf breken betekent makkelijker maken." },
  { n: "Consolidatieweek", items: ["Geen nieuwe vaardigheden", "Gemengde herhalingen van 5 minuten van alles", "1 leuke truc naar keuze als toetje"], note: "Herhaalweken zijn vooruitgang. Een vaardigheid is pas echt als hij een week gemengde oefening overleeft." },
  { n: "Op pad", items: ["Wacht bij de stoeprand, bij elke oversteek", "Losse lijn in drukkere straten", "Rustige bezoekroutine, eerste opstellingen"], note: "De wereld is nu het klaslokaal. Kortere routes van hogere kwaliteit winnen van lange marsen." },
  { n: "Afstand en duur", items: ["Blijf met 2 tot 5 passen afstand", "Terugroepen buiten aan de lange lijn", "Af op de mat terwijl jij kookt"], note: "Als een vaardigheid wankelt, ga dan een week terug. De kalender dient jou, niet andersom." },
  { n: "Levensvaardigheden", items: ["Rustig onder de tafel, eerste cafébezoek", "Eerste rustige autoritten", "Aanraken zoals bij de dierenarts: poten, oren, gebitscontrole"], note: "Dit zijn de vaardigheden die de komende 10 jaar makkelijk maken. Elke herhaling waard." },
  { n: "Diplomaweek", items: ["Geen nieuwe vaardigheden", "Gemengde herhalingen van 5 minuten van de hele gereedschapskist", "1 favoriete truc, gepolijst om te laten zien"], note: "12 weken later: je hebt een getrainde jonge hond en een dagelijkse gewoonte. De gewoonte is het echte diplomacadeau." },
];

const puppy = {
  treatsguide: { n: "Snoepjes: je trainingsvaluta", body: ["Formaat: een erwt of kleiner. Een sessie van 5 minuten kan 30 snoepjes verbruiken, klein houdt de calorieën redelijk.", "Zacht wint van knapperig, kauwpauzes breken het trainingsritme.", "Bouw een waardeladder: brokjes voor makkelijke taken thuis, kaas, kip of worst voor terugroepen en zwaar werk buiten.", "Trek snoepjes af van de dagelijkse portie, trainingscalorieën tellen mee. Regel: snoepjes binnen ongeveer 10% van de dagelijkse inname.", "Giftig en verboden: chocolade, druiven en rozijnen, ui, knoflook, zoetstof xylitol, alcohol, gekookte botten."] },
  clickerguide: { n: "Clickerbasis", body: ["Een clicker is een precisie-instrument: de klik markeert het exacte moment waarop de hond zijn beloning verdiende.", "Laden: klik, dan snoepje, 10 tot 15 keer, tot de klik de oren omhoog doet gaan. Dat is de hele opzet.", "Het contract: elke klik wordt altijd betaald. Geen uitzonderingen, anders verliest het instrument zijn waarde.", "Kliktiming wint van snoepjestiming, het snoepje mag 2 seconden later komen, de klik niet.", "Geen clicker bij de hand: een kort markerwoord zoals Ja, altijd op dezelfde manier gezegd, doet hetzelfde werk iets minder precies."] },
  teethguide: { n: "Tijdlijn tandenwisselen", body: ["Week 3 tot 6: 28 melktanden komen door.", "Maand 3 tot 7: melktanden vallen uit, 42 blijvende tanden komen door. Piek van kauwdrang, pijnlijk tandvlees, af en toe bloedvlekjes op speeltjes, allemaal normaal.", "Verlichtingsmenu: rubberen kauwspeeltjes, een nat ingevroren washandje, ingevroren stukjes wortel onder toezicht, en koffiehout of olijfhout dat afbrokkelt in plaats van splintert zoals tuinstokken.", "Controleer af en toe op achtergebleven melktanden, een dubbele rij hoektanden verdient een blik van de dierenarts, komt vaak voor bij kleine rassen.", "Rond maand 7 is de storm grotendeels voorbij. Bescherm kabels en schoenen tot dan, niet voor altijd."] },
  sleepguide: { n: "Slaap en dutjes", body: ["Pups hebben 16 tot 20 uur slaap per dag nodig. De meeste bijt-, gek-doe- en jankbuien zijn gewoon een oververmoeide pup die al had moeten slapen.", "Bouw een dutjesritme: bij jonge pups ongeveer 1 uur wakker, dan dutje. Spelen, plassen, dan in de veilige ruimte om te slapen.", "Dwing dutjes af op een rustige, verduisterde plek, een afgedekte bench of ren werkt. Een oververmoeide pup kan vaak niet zelf in slaap vallen midden in de drukte van het huis.", "Bescherm de nachtrust: laatste plas laat in de avond, dan saaie duisternis. Jonge pups hebben misschien 1 nachtelijk uitje nodig, houd het stil en zakelijk.", "Als de pup in een landhaai verandert, train dan niet door. Het is dutjestijd, geen disciplinetijd."] },
  homeguide: { n: "Eerste dagen in het nieuwe huis", body: ["Verklein de wereld: 1 kamer plus de veilige ruimte voor de eerste dagen. Het hele huis wordt geleidelijk verdiend, kamer voor kamer, dat houdt zindelijkheid en kauwen beheersbaar.", "Zet een basis op: mand of bench, water, één kauwspeeltje, in een hoek waar de pup je kan zien maar ongestoord kan rusten. Dit is het toevluchtsoord, nooit de strafplek.", "Eerste nacht: slaapafstand telt. Veel pups komen de eerste nachten sneller tot rust naast het bed, je kunt de mand later verplaatsen.", "Houd de eerste week bewust saai: geen bezoekersparade, geen puppyfeestjes. De pup verwerkt het verlies van het nest, het huishouden is al opwinding genoeg.", "Begin routines vanaf dag 1: dezelfde voertijden, dezelfde deur voor plassen, dezelfde woorden. Voorspelbaarheid is hoe een pup leert dat de wereld veilig is."] },
  socialguide: { n: "Het socialisatievenster", body: ["Ongeveer week 3 tot 14 is de periode waarin pups ervaringen als normaal opslaan. Wat nu rustig wordt ervaren, is levenslang saai, wat gemist wordt kan later echt werk kosten.", "Socialiseren betekent rustige blootstelling, geen maximaal contact. Naar een bus kijken vanaf 30 meter terwijl je snoepjes eet is perfecte socialisatie, omringd worden door 5 honden niet.", "Werk met een lijst: ondergronden (gras, metalen roosters, trappen), geluiden (verkeer, stofzuiger, onweersopnames op laag volume), mensen (hoeden, baarden, rolstoelen, kinderen op afstand), aanraken (poten, oren, bek).", "Voor de volledige inentingen: draag de pup door drukke plekken, bezoek bevriende ingeënte honden bij hen thuis, ga op een bankje zitten bij het leven. Blootstelling vereist geen contact met de stoep.", "Eén regel boven alles: de pup bepaalt het tempo. Gedwongen begroetingen leren angst, vrijwillige toenadering leert vertrouwen."] },
  aloneguide: { n: "Alleen zijn vanaf dag 1", body: ["Alleen zijn is een vaardigheid, geen fabrieksinstelling. Pups die het nooit oefenen worden honden die in paniek raken, begin met seconden, niet met uren.", "Dag 1: stap 10 seconden de kamer uit terwijl de pup uit een voerspeeltje eet, kom terug voor er onrust is. Dat is één herhaling.", "Bouw langzaam op: seconden naar minuten naar een rustige koffie buiten de deur. Laat een gevulde kauwsnack achter, houd vertrek en terugkomst volstrekt saai, geen dramatisch afscheid.", "Streef naar een pup die binnen de eerste weken 30 tot 60 minuten alleen kan dutten, altijd na beweging, een plas en met iets om op te kauwen.", "Als de pup in paniek raakt in plaats van protesteert, duw dan niet door het huilen heen, verklein de stap. Echte verlatingsangst verdient vroeg een professioneel plan, het lost zichzelf niet op."] },
  walksguide: { n: "Puppywandelingen: hoe lang, hoe vaak", body: ["Vuistregel: ongeveer 5 minuten gestructureerd wandelen per levensmaand, 1 tot 2 keer per dag. Een pup van 4 maanden: ongeveer 20 minuten per wandeling.", "Dit beperkt gedwongen marcheren, niet beweging. Vrij spel, snuffelen en tijd op zachte grond reguleren zichzelf.", "Snuffelen IS de wandeling. Een langzame snuffeltocht van 20 minuten vermoeit een pup meer dan 40 minuten stevig doorstappen.", "Groeiende gewrichten houden niet van lange hikes, trapmarathons, hoge sprongen en rennen op asfalt. Bewaar joggen en fietsen voor 12 tot 18 maanden.", "Kijk naar de pup, niet naar de klok: achterblijven, gaan liggen of wild bijten halverwege betekent dat het te veel was. Draag een kleine pup naar huis in plaats van hem te slepen.", "3 tot 4 korte uitjes winnen van 1 lang uitje, en elk uitje is ook zindelijkheidstraining."] },
  heatguide: { n: "Gids voor de eerste loopsheid", body: ["Timing: eerste loopsheid tussen 6 en 15 maanden, kleine rassen eerder, grote rassen later. Herhaalt zich ongeveer elke 6 tot 8 maanden.", "Duur: ongeveer 2 tot 4 weken. Tekenen: gezwollen vulva, bloederige afscheiding, vaker plassen, stemmingswisselingen, magnetische aantrekkingskracht op elke reu in de buurt.", "Beheer: alleen aangelijnd de hele periode, geen hondenlosloopgebieden, geen onbewaakte tuintijd, loopsheidsbroekje binnen indien nodig.", "Ze kan aanhankelijk, moe of kieskeurig met eten zijn. Allemaal normaal, houd routines rustig.", "Bespreek na de eerste loopsheid met je dierenarts de voor- en nadelen en de timing van sterilisatie. Er zijn echte argumenten aan beide kanten en de rasgrootte telt mee, het is een persoonlijke beslissing, geen automatisme.", "Noteer de data in je kalender. Voorspelbaarheid maakt ronde 2 makkelijk."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
