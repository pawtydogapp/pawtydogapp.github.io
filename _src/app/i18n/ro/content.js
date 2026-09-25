/* Română: conținut în afara abilităților și ghidurilor de comportament (vezi cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Ușor", 2: "Mediu", 3: "Avansat" };
const quest = { new: "Abilitate nouă", cont: "Continuă tot așa", prac: "Reîmprospătare" };
const levels = [{ n: "Începător" }, { n: "Elev" }, { n: "Absolvent" }, { n: "Pro" }, { n: "Campion" }, { n: "Maestru" }, { n: "Legendă" }];
const ranks = [{ n: "Nou-venit" }, { n: "Ucenic" }, { n: "Conducător" }, { n: "Dresor" }, { n: "Expert" }, { n: "Specialist" }, { n: "Complet" }];

const stucks = {
  cmd: "Blocați? Fă mai ușor, nu mai tare. Dă un pas înapoi, strânge 2 reușite ușoare, oprește-te acolo. Arată din nou cu o momeală în loc să repeți comanda. Dacă câinele se ridică dintr-o poziție, recompensează mai repede la următoarea repetiție.",
  trick: "Blocați? Împarte trucul în bucăți mai mici și plătește cea mai mică. Filmează o sesiune, majoritatea problemelor cu trucurile se ascund în mâna omului, nu în câine.",
  agi: "Refuză obstacolul? Coboară-l, scurtează-l sau întoarce-te la plata simplelor încercări. Nu împinge și nu ridica niciodată câinele pe echipament, o repetiție înfricoșată costă săptămâni.",
  life: "Copleșit mai mult decât blocat? Adaugă distanță, scurtează ieșirea, încheie calm și încearcă altă zi. Munca de expunere eșuează zgomotos, dar se recuperează rapid.",
};

const ladders = {
  cmd: [
    ["Sesiunea 1 · Arată, nu testa", "Ghidează fiecare repetiție cu o recompensă în mână, răsplătește în 1 secundă. Succes = comportamentul s-a produs deloc, cu tot ajutorul tău."],
    ["Sesiunile 2 până la 4 · Ghidează și numește", "Continuă să ghidezi, spune comanda o dată chiar înainte de comportament. Succes = 3 până la 5 repetiții asistate la rând."],
    ["Sesiunile 5 până la 7 · Elimină momeala", "Mâna goală, aceeași mișcare, recompensa din buzunar. Pozițiile merită 1 până la 3 secunde de așteptare înainte de plată."],
    ["De la sesiunea 8 · Comanda mai întâi", "O comandă, fără momeală. Crește câte o dificultate pe rând: durata peste 5 secunde, camere noi, distragere ușoară."],
  ],
  trick: [
    ["Sesiunea 1 · Urmărește momeala", "Momeală mare, evidentă, plată imediată pentru orice mișcare în direcția bună. Succes = o versiune brută s-a produs o dată."],
    ["Sesiunile 2 până la 4 · Modelează", "Plătește cele mai bune 3 din 5 încercări, ignoră restul. Spune comanda o dată per repetiție. Seturi de 3 până la 5 repetiții, trucurile obosesc creierul."],
    ["Sesiunile 5 până la 7 · Redu ajutorul", "Momeala devine un gest mic al mâinii. Precizia crește: repetițiile cele mai curate câștigă recompensă dublă."],
    ["De la sesiunea 8 · Spectacol", "Comanda mai întâi, gestul doar ca rezervă. Camere noi, apoi în fața oamenilor. Aplauzele contează ca distragere."],
  ],
  agi: [
    ["Sesiunea 1 · Fă-l minuscul", "Bara pe sol, tunel scurt, masă joasă. Succes = 1 încercare veselă, plătită ca un jackpot."],
    ["Sesiunile 2 până la 4 · Construiește iubire, nu înălțime", "Repetă versiunea ușoară până când câinele te trage spre obstacol. Mai întâi încrederea, apoi criteriile."],
    ["Sesiunile 5 până la 7 · Ridică un singur lucru", "Înălțime, lungime sau unghi, niciodată două într-o sesiune. Spune comanda obstacolului când câinele se angajează."],
    ["De la sesiunea 8 · Viteză și secvență", "Trimite de la câțiva pași, înlănțuie 2 obstacole, sesiuni sub 10 minute. Bucuria este motorul agility-ului."],
  ],
  life: [
    ["Ieșirea 1 · Explorează, nu forța", "Versiune scurtă, ușoară, sub pragul de stres. Succes = momente calme în situație, apoi plecarea cu o stare bună."],
    ["Ieșirile 2 până la 4 · Distanța este butonul tău", "Repetă la o distanță sau durată la care câinele încă poate mânca, adulmeca și să te privească. Plătește calmul constant."],
    ["Ieșirile 5 până la 7 · Închide distanța", "Mai aproape, mai lung sau mai aglomerat, un buton per ieșire. Retragerea este strategie, nu eșec."],
    ["De la ieșirea 8 · Fă-l rutină", "Variază zilele, locurile și orele pentru ca liniștea să se generalizeze. Un 5 înseamnă relaxat de la sosire la plecare."],
  ],
};

const badges = {
  b_first: { n: "Prima sesiune", d: "Prima ta sesiune de antrenament înregistrată." },
  b_five: { n: "Primele 5 lăbuțe", d: "O comandă evaluată cu 5 din 5 pentru prima dată." },
  b_master1: { n: "Prima stăpânire", d: "Prima comandă stăpânită: 3 note de 5 curate la rând." },
  b_master5: { n: "Bate palma, de cinci ori", d: "5 comenzi stăpânite." },
  b_master10: { n: "Două cifre", d: "10 comenzi stăpânite." },
  b_streak3: { n: "Serie de 3 zile", d: "Antrenament 3 zile la rând." },
  b_streak7: { n: "Serie de 7 zile", d: "O săptămână întreagă de antrenament zilnic." },
  b_streak14: { n: "Serie de 14 zile", d: "Două săptămâni la rând. Rutina este reală." },
  b_streak30: { n: "Serie de 30 de zile", d: "O lună de consecvență. Teritoriu de elită." },
  b_streak60: { n: "Serie de 60 de zile", d: "Două luni fără nicio zi ratată. Echipă remarcabilă." },
  b_streak100: { n: "Serie de 100 de zile", d: "O sută de zile la rând. Statut de legendă." },
  b_gear: { n: "Complet echipat", d: "Toate articolele esențiale bifate." },
  b_scholar: { n: "Cărturar canin", d: "10 ghiduri citite în biblioteca Învață." },
  b_fixer: { n: "Cititor de comportament", d: "5 ghiduri de comportament citite. Înțelegerea bate corectarea." },
  b_life1: { n: "În lumea largă", d: "Prima ta sesiune de abilitate de viață înregistrată." },
  b_travel: { n: "Biletele, vă rog", d: "O abilitate de călătorie stăpânită: autobuz, barcă sau avion." },
  b_social: { n: "Fluture social", d: "O întâlnire calmă cu un câine sau o pisică stăpânită." },
  b_spa: { n: "Client fidel la spa", d: "Toaletare, gheare sau urechi stăpânite." },
  b_vet: { n: "Preferatul veterinarului", d: "Vizitele fericite la veterinar stăpânite." },
  b_hotel: { n: "Campion la înnoptat", d: "O ședere la hotel canin stăpânită." },
  b_trick1: { n: "Spectacol", d: "Primul truc stăpânit." },
  b_agi1: { n: "Novice în agility", d: "Primul obstacol de agility stăpânit." },
  b_sess50: { n: "50 de sesiuni", d: "50 de sesiuni de antrenament înregistrate." },
  b_sess100: { n: "Clubul celor 100", d: "100 de sesiuni de antrenament înregistrate." },
  b_xp500: { n: "500 XP", d: "500 XP atinși." },
  b_xp1000: { n: "1.000 XP", d: "1.000 XP atinși." },
  b_read25: { n: "Legitimație de bibliotecă", d: "25 de ghiduri citite." },
  b_school: { n: "Premiant", d: "Toate cele 3 etape ale școlii canine stăpânite: prima lecție, semestrul, examenul." },
  b_quest7: { n: "Minune săptămânală", d: "7 misiuni zilnice încheiate. Obiceiul se formează." },
  b_quest21: { n: "Erou al obiceiului", d: "21 de misiuni zilnice încheiate. Acum este un stil de viață." },
  b_master25: { n: "Sfert de sută", d: "25 de abilități stăpânite." },
  b_master50: { n: "La jumătatea drumului", d: "50 de abilități stăpânite. Jumătate din bibliotecă." },
  b_master99: { n: "Până la ultima", d: "Toate cele 99 de abilități stăpânite. Nu mai rămâne nimic de învățat." },
  b_xp3000: { n: "3.000 XP", d: "Nivelul Campion atins." },
  b_xp10000: { n: "10.000 XP", d: "Zece mii de XP de consecvență." },
  b_sess250: { n: "250 de sesiuni", d: "250 de sesiuni de antrenament înregistrate." },
};

const equip = {
  must: {
    collar: { n: "Zgardă plată cu medalion", note: "Datele obligatorii de pe medalion variază, numărul de telefon merge întotdeauna." },
    harness: { n: "Ham în formă de Y", note: "Plimbări zilnice și antrenament, fără presiune pe gât." },
    leash: { n: "Lesă fixă de 1,5 până la 2 m", note: "Lesa standard pentru antrenament și oraș." },
    pouch: { n: "Buzunar pentru recompense", note: "Plata rapidă este antrenament bun. Buzunarele sunt prea lente." },
    treats: { n: "Recompense moi cât un bob de mazăre", note: "Mici și moi, 50 de recompense per sesiune trebuie să fie posibile." },
    bags: { n: "Pungi pentru excremente cu dozator", note: "Datorie civică nenegociabilă." },
    bowls: { n: "Boluri pentru apă și mâncare", note: "Antiderapante. Ceramica sau oțelul bat plasticul." },
    bed: { n: "Culcuș sau saltea", note: "Ținta comenzii La loc și cartierul general al somnului." },
    crate: { n: "Cușcă sau țarc", note: "Vizuină, ajutor la învățarea curățeniei, siguranță în călătorie." },
    chews: { n: "2 până la 3 jucării de ros", note: "Rotește-le ca să rămână noi. Asigurare pentru dentiție." },
    brush: { n: "Perie sau pieptene pentru tipul de blană", note: "Rasele cu blană: zilnic. Întreabă un toaletor ce unealtă." },
    vetkit: { n: "Trusă de bază pentru îngrijire", note: "Pensetă pentru căpușe, cleștișor de gheare pentru câini, șampon pentru câini." },
    dental: { n: "Periuță și pastă de dinți pentru câini", note: "Doar pastă enzimatică pentru câini, niciodată de uz uman. Zilnic este ideal, de 3 ori pe săptămână este viața reală." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Marker de precizie. Vezi Colțul puiului." },
    longline: { n: "Lesă lungă de 5 până la 10 m", note: "Puntea de la antrenamentul de chemare la plimbarea liberă." },
    kong: { n: "Jucărie de cauciuc de umplut", note: "Congeleaz-o umplută, cumpără 20 de minute de liniște." },
    snuffle: { n: "Covoraș de adulmecat", note: "Adulmecarea cinei obosește creierul." },
    lickmat: { n: "Covoraș de lins", note: "Distragere pentru toaletare și baie." },
    carrest: { n: "Cușcă sau ham auto testat", note: "Siguranță la fiecare drum." },
    whistle: { n: "Fluier de chemare", note: "Sunet constant, se aude mai departe decât vocea." },
    raincoat: { n: "Haină de ploaie pentru câini cu blană subțire", note: "Unii câini au nevoie, mulți nu." },
    gps: { n: "Localizator GPS", note: "Liniște sufletească în fazele fără lesă." },
    puzzle: { n: "Jucării puzzle cu mâncare", note: "Muncă pentru creier în zilele ploioase." },
    agility: { n: "Set mini de agility", note: "Distracție în grădină după ce câinele crește." },
    gate: { n: "Poartă de siguranță pentru copii", note: "Gestionare ieftină a spațiului în timpul antrenamentului." },
    basket: { n: "Coș sau remorcă de bicicletă", note: "Câini mici și medii. Antrenează-l mai întâi ca pat, prinde întotdeauna hamul." },
  },
};

const leash = {
  gear: {
    collar: { n: "Zgardă", pros: ["Ușoară și simplă, poartă medalionul", "Rapid de pus și scos", "Bună pentru câini dresați care nu trag"], cons: ["Toată presiunea cade pe gât", "Riscantă pentru cei care trag: trahee, tiroidă și gât sub tensiune", "Unii câini ies din zgărzile lejere"], verdict: "Păstreaz-o pentru medalion. Plimbă-te cu ea doar dacă lesa rămâne lejeră." },
    yharness: { n: "Ham în formă de Y", pros: ["Presiune pe piept și umeri, nu pe gât", "Rezistent la evadare dacă este bine reglat", "Cea mai bună alegere implicită pentru pui și antrenament"], cons: ["Potrivirea contează, curelele nu trebuie să încrucișeze mișcarea umărului", "Puțin mai lent de pus", "Un ham prost proiectat poate freca sub axile"], verdict: "Opinie: alegerea implicită corectă pentru majoritatea câinilor. Formă de Y pe piept, 2 degete spațiu peste tot." },
    frontclip: { n: "Ham cu prindere frontală", pros: ["Întoarce câinele spre tine când trage, mecanica ajută la reeducare", "Fără durere"], cons: ["Un instrument, nu un leac, antrenamentul rămâne necesar", "Mersul permanent cu prindere frontală poate afecta mersul, folosește în timpul reeducării"], verdict: "Ajutor temporar bun pentru cei care trag tare, alături de antrenamentul cu lesa lejeră." },
  },
  leashes: {
    fixed: { n: "Lesă fixă de 1,5 până la 2 m", pros: ["Lungime previzibilă, comunicare clară", "Standard pentru antrenament și oraș"], cons: ["Rază mică de adulmecat la plimbările la țară"], verdict: "Alegerea implicită. Cumpără calitate o singură dată." },
    longline: { n: "Lesă lungă de 5 până la 10 m", pros: ["Libertate cu plasă de siguranță", "Instrumentul pentru chemare și munca fără lesă"], cons: ["Risc de arsuri de la frânghie, mănușile ajută", "Necesită spațiu deschis și puțină îndemânare"], verdict: "Cea mai bună investiție în antrenament după recompense." },
    flexi: { n: "Lesă retractabilă (flexi)", pros: ["Rază convenabilă pentru câini dresați, calmi, în zone deschise"], cons: ["Învață tragerea, tensiunea extinde raza", "Răni de la cablu documentate la oameni și câini", "Fără control în situații de trafic bruște", "Interzisă sau nedorită în multe școli canine"], verdict: "Opinie: elimină complet în timpul antrenamentului. Dacă totuși, doar tip bandă, doar în zone deschise." },
    slip: { n: "Lesă cu laț (slip)", pros: ["Rapidă pentru transferuri scurte, comună la veterinari și adăposturi"], cons: ["Se strânge pe gât fără limită", "Instrument greșit pentru cei care trag și plimbări zilnice"], verdict: "Instrument profesional pentru transferuri scurte, nu o lesă de zi cu zi." },
  },
};

const planAdult = [
  { n: "Audit al bazelor", items: ["Testează sincer bazele: șezi, culcat, stai, chemarea, fiecare în sufragerie și în grădină", "Reantrenează tot ce se clatină cu sesiuni de 3 minute, fără rușine, rugina este normală", "Alege-ți moneda de recompensă: care recompensă face ochii câinelui să strălucească"], note: "Nu presupune că ceva este solid. Testarea sinceră săptămâna aceasta economisește 6 săptămâni de frustrare mai târziu." },
  { n: "Resetarea lesei lejere", items: ["Mers cu lesa lejeră, 10 minute pe zi pe un traseu liniștit", "Regula oprește-te-când-se-întinde, de fiecare dată", "Pauze de adulmecat la comandă ca salariu pentru plimbare"], note: "Lesa lejeră este un obicei, nu un truc. Consecvența bate intensitatea, de fiecare dată." },
  { n: "Controlul impulsurilor", items: ["Lasă, de la mâncare pe podea la mâncare care cade", "Așteaptă la uși și înainte de bol", "Stai: crește durata la 30 de secunde în timp ce te îndepărtezi"], note: "Chemarea este o abilitate de viață. Nu chema niciodată câinele pentru a încheia ceva plăcut, altfel comanda începe să însemne sfârșitul distracției." },
  { n: "Calmare la comandă", items: ["Calmare pe o saltea în timpul cinei și al serilor cu televizor", "Comportamentul calm primește plată discretă, haosul nu primește nimic", "Prima repetiție de cafenea acasă: saltea, jucărie de ros, 20 de minute"], note: "Munca de calmare pare a nu face nimic. Este cel mai util lucru pe care îl poate învăța un câine adult." },
  { n: "Consolidarea chemării", items: ["Chemare cu lesa lungă în parc, plătită ca un câștig la loterie", "Adaugă distrageri treptat: distanță față de alți câini, apoi mai aproape", "Comandă de oprire de urgență ca abilitate separată"], note: "Controlul impulsurilor se construiește în secunde, nu în minute. Repetiții scurte, valoare mare, oprește-te învingător." },
  { n: "Manipulare și îngrijire", items: ["Sprijinul bărbiei pentru manipulare: urechi, ochi, labe", "Periajul dinților de 3 ori săptămâna aceasta", "Sesiune de gheare cu cleștișorul sau pila, 1 labă pe rând"], note: "Distragerea este adevăratul test. Coboară criteriile într-un loc nou, nu este regres, este antrenament." },
  { n: "Bune maniere în public", items: ["Vizită reală la cafenea sau restaurant, scurtă și reușită", "Saluturi politicoase: șezi pentru a saluta, fără sărituri", "Așteptare calmă în timp ce vorbești cu cineva pe stradă"], note: "Câinii adulți învață trucuri mai repede decât puii. Folosește-le pentru a reconstrui încrederea după o săptămână grea." },
  { n: "Îmbogățire și absolvire", items: ["Jocuri de adulmecat: vânătoare de recompense prin casă și grădină", "Învață 1 truc pur distractiv ca recompensă pentru amândoi", "Săptămână de recapitulare: reia testul din săptămâna 1, sărbătorește diferența, planifică următorul pas"], note: "Întreținerea bate perfecțiunea. 5 minute în 5 zile pe săptămână păstrează tot ce ai construit." },
];

const planPup = [
  { n: "Sosire și legătură", items: ["Recunoașterea numelui", "Încarcă-ți cuvântul marker sau clickerul", "Ritmul curățeniei, afară la fiecare 1 până la 2 ore"], note: "Fără presiune de comenzi săptămâna aceasta. Legătura, somnul și orele de pipi sunt programa." },
  { n: "Prima abilitate: Șezi", items: ["Șezi, 3 sesiuni scurte pe zi", "Continuă să plătești recunoașterea numelui", "Jocuri cu cușca cu ușa deschisă"], note: "3 minute contează ca sesiune. Scurt și vesel bate lung și încordat." },
  { n: "Se adaugă Culcat", items: ["Culcat", "Recapitulează Șezi în camere noi", "Manipulare: atinge labele și urechile, plătește fiecare atingere"], note: "Dacă Culcat nu este fluid până duminică, nu-i nimic. Mută-l în săptămâna următoare." },
  { n: "Vino, fundația", items: ["Vino în casă, ping-pong pe hol", "Săptămână de recapitulare: Șezi și Culcat înainte de mese", "Așteaptă la bol, 2 secunde"], note: "Chemarea este o abilitate de maraton. Deocamdată doar în casă." },
  { n: "Controlul impulsurilor", items: ["Lasă, jocul de bază cu pumnul", "Dă drumul în timpul jocului", "Continuă să plătești chemarea în casă"], note: "Jumătate din dresajul canin înseamnă să înveți câinele că a renunța se plătește mai bine decât a apuca." },
  { n: "În lumea largă", items: ["Lesă lejeră, primii 100 de metri lejeri", "Uită-te la mine pe stradă", "Șezi la 1 bordură per plimbare"], note: "Tragerea este normală la această vârstă. Oprește-te și pornește, fără smucituri, distanțe minuscule." },
  { n: "Începe Stai", items: ["Stai, doar 1 până la 5 secunde durată", "La loc pe saltea", "Recapitulează chemarea, acum cu distrageri ușoare"], note: "Secunde, nu minute. Întreruperea unui Stai de două ori la rând înseamnă să faci mai ușor." },
  { n: "Săptămână de consolidare", items: ["Fără abilități noi", "Recapitulări mixte de 5 minute cu tot", "1 truc distractiv la alegerea ta ca desert"], note: "Săptămânile de recapitulare sunt progres. O abilitate este reală doar când supraviețuiește unei săptămâni de practică mixtă." },
  { n: "Pe drum", items: ["Așteaptă la bordură, la fiecare traversare", "Lesă lejeră pe străzi mai aglomerate", "Rutină calmă cu vizitatori, primele pregătiri"], note: "Lumea este acum sala de clasă. Traseele mai scurte și de calitate mai bună bat marșurile lungi." },
  { n: "Distanță și durată", items: ["Stai cu 2 până la 5 pași distanță", "Chemare afară cu lesa lungă", "Culcat pe saltea cât gătești"], note: "Dacă o abilitate se clatină, dă înapoi o săptămână. Calendarul te servește pe tine, nu invers." },
  { n: "Abilități de viață", items: ["Calmare sub masă, prima vizită la cafenea", "Primele drumuri calme cu mașina", "Manipulare ca la veterinar: labe, urechi, verificarea dinților"], note: "Acestea sunt abilitățile care fac următorii 10 ani ușori. Merită fiecare repetiție." },
  { n: "Săptămâna absolvirii", items: ["Fără abilități noi", "Recapitulări mixte de 5 minute cu întreaga trusă", "1 truc preferat, șlefuit pentru spectacol"], note: "12 săptămâni mai târziu: ai un câine tânăr dresat și un obicei zilnic. Obiceiul este adevăratul cadou de absolvire." },
];

const puppy = {
  treatsguide: { n: "Recompensele: moneda ta de antrenament", body: ["Mărime: un bob de mazăre sau mai mic. O sesiune de 5 minute poate consuma 30 de recompense, cele mici țin bilanțul caloric rezonabil.", "Moale bate crocant, pauzele de mestecat rup ritmul antrenamentului.", "Construiește o scară de valoare: granule pentru sarcini ușoare acasă, brânză, pui sau cârnat pentru chemare și muncă grea afară.", "Scade recompensele din porția zilnică, caloriile din antrenament contează. Regulă: recompensele în limita a circa 10% din aportul zilnic.", "Toxice și interzise: ciocolată, struguri și stafide, ceapă, usturoi, îndulcitorul xilitol, alcool, oase gătite."] },
  clickerguide: { n: "Bazele clickerului", body: ["Un clicker este un instrument de precizie: clicul marchează momentul exact în care câinele și-a câștigat recompensa.", "Încărcarea: clic, apoi recompensă, de 10 până la 15 ori, până când clicul ridică urechile. Asta este toată pregătirea.", "Contractul: fiecare clic este întotdeauna plătit. Fără excepții, altfel instrumentul își pierde valoarea.", "Momentul clicului bate momentul recompensei, recompensa poate veni cu 2 secunde mai târziu, clicul nu.", "Fără clicker la îndemână: un cuvânt marker scurt precum Da, spus întotdeauna la fel, face aceeași treabă puțin mai puțin precis."] },
  teethguide: { n: "Calendarul dentiției", body: ["Săptămânile 3 până la 6: apar 28 de dinți de lapte.", "Lunile 3 până la 7: dinții de lapte cad, ies 42 de dinți permanenți. Vârful presiunii de ros, gingii dureroase, pete ocazionale de sânge pe jucării, totul normal.", "Meniu de alinare: jucării de ros din cauciuc, o cârpă umedă congelată pentru gingii, bucăți de morcov congelate sub supraveghere, și lemn de cafea sau măslin care se fărâmițează în loc să se așchieze ca bețele din grădină.", "Verifică ocazional dinții de lapte rămași, un rând dublu de canini merită o privire de la veterinar, frecvent la rasele mici.", "Până în luna 7 furtuna a trecut în mare parte. Protejează cablurile și pantofii până atunci, nu pentru totdeauna."] },
  sleepguide: { n: "Somn și somnuri", body: ["Puii au nevoie de 16 până la 20 de ore de somn pe zi. Majoritatea crizelor de mușcat, nebunie și scâncit sunt pur și simplu un pui epuizat care ar fi trebuit deja să doarmă.", "Construiește un ritm de somnuri: la puii mici, cam 1 oră treaz, apoi somn. Joacă, pipi, apoi în spațiul sigur la somn.", "Impune somnurile într-un loc liniștit, întunecat, o cușcă acoperită sau un țarc funcționează. Un pui epuizat adesea nu poate adormi singur în mijlocul agitației din casă.", "Protejează somnul de noapte: ultimul pipi târziu seara, apoi întuneric plictisitor. Puii mici pot avea nevoie de 1 ieșire nocturnă, păstreaz-o liniștită și fără ceremonii.", "Dacă puiul se transformă într-un rechin de uscat, nu antrena prin asta. Este ora somnului, nu a disciplinei."] },
  homeguide: { n: "Primele zile în noua casă", body: ["Micșorează lumea: 1 cameră plus spațiul sigur pentru primele zile. Întreaga casă se câștigă treptat, cameră cu cameră, ceea ce ține curățenia și rosul sub control.", "Amenajează o bază: culcuș sau cușcă, apă, o jucărie de ros, într-un colț din care puiul te poate vedea, dar se odihnește netulburat. Este refugiul, niciodată colțul de pedeapsă.", "Prima noapte: distanța la culcare contează. Mulți pui se liniștesc mai repede chiar lângă pat în primele nopți, poți muta culcușul mai târziu.", "Păstrează prima săptămână intenționat plictisitoare: fără parade de vizitatori, fără petreceri pentru pui. Puiul procesează pierderea fraților, gospodăria este deja destulă emoție.", "Începe rutinele din ziua 1: aceleași ore de masă, aceeași ușă pentru pipi, aceleași cuvinte. Predictibilitatea este modul în care un pui învață că lumea este sigură."] },
  socialguide: { n: "Fereastra de socializare", body: ["Aproximativ de la 3 până la 14 săptămâni este perioada în care puii înregistrează experiențele ca normale. Ce este trăit calm acum este plictisitor pe viață, ce este ratat poate cere muncă serioasă mai târziu.", "Socializarea înseamnă expunere calmă, nu contact maxim. A privi un autobuz de la 30 de metri mâncând recompense este socializare perfectă, a fi înconjurat de 5 câini nu este.", "Lucrează cu o listă: suprafețe (iarbă, grătare metalice, scări), sunete (trafic, aspirator, înregistrări de tunete încet), oameni (pălării, bărbi, scaune cu rotile, copii la distanță), manipulare (labe, urechi, bot).", "Înainte de vaccinurile complete: poartă puiul în brațe prin locuri aglomerate, vizitează câini prieteni vaccinați acasă la ei, stai pe o bancă lângă viață. Expunerea nu necesită atingerea trotuarului.", "O regulă mai presus de toate: puiul stabilește ritmul. Saluturile forțate învață frica, apropierea voluntară învață încrederea."] },
  aloneguide: { n: "Timp singur din ziua 1", body: ["A fi singur este o abilitate, nu o setare din fabrică. Puii care nu o exersează niciodată devin câini care intră în panică, începe cu secunde, nu ore.", "Ziua 1: ieși din cameră 10 secunde cât puiul mănâncă dintr-o jucărie cu mâncare, revino înainte de orice agitație. Aceasta este o repetiție.", "Prelungește lent: secunde în minute într-o cafea liniștită dincolo de ușă. Lasă o jucărie umplută, păstrează plecările și întoarcerile complet plictisitoare, fără rămas-bunuri dramatice.", "Țintește un pui care poate dormi singur 30 până la 60 de minute în primele săptămâni, întotdeauna după mișcare, pipi și cu ceva de ros.", "Dacă puiul intră în panică în loc să protesteze, nu forța prin plâns, micșorează pasul. Adevăratul stres de separare merită un plan profesional timpuriu, nu se rezolvă singur."] },
  walksguide: { n: "Plimbările puiului: cât de lungi, cât de dese", body: ["Regulă: cam 5 minute de mers structurat per lună de vârstă, de 1 până la 2 ori pe zi. Un pui de 4 luni: cam 20 de minute per plimbare.", "Aceasta limitează marșul forțat, nu mișcarea. Joaca liberă, adulmecatul și timpul pe sol moale se reglează singure.", "Adulmecatul ESTE plimbarea. Un tur lent de adulmecat de 20 de minute obosește un pui mai mult decât 40 de minute de mers alert.", "Articulațiile în creștere nu iubesc drumețiile lungi, maratoanele pe scări, săriturile de la înălțime și alergatul pe asfalt. Păstrează alergatul și bicicleta pentru 12 până la 18 luni.", "Urmărește puiul, nu ceasul: rămânerea în urmă, întinsul sau mușcatul frenetic la mijlocul plimbării înseamnă că a fost prea mult. Poartă un pui mic în brațe acasă în loc să-l târăști.", "3 până la 4 ieșiri scurte bat 1 lungă, și fiecare ieșire este și învățarea curățeniei."] },
  heatguide: { n: "Ghidul primelor călduri", body: ["Când: primele călduri între 6 și 15 luni, rasele mici mai devreme, rasele mari mai târziu. Se repetă cam la fiecare 6 până la 8 luni.", "Durată: aproximativ 2 până la 4 săptămâni. Semne: vulvă umflată, secreție sângeroasă, pipi mai des, schimbări de dispoziție, atracție magnetică pentru fiecare mascul din cartier.", "Gestionare: doar în lesă pe toată durata, fără parcuri pentru câini, fără timp nesupravegheat în grădină, chiloți de protecție în casă dacă este nevoie.", "Poate fi lipicioasă, obosită sau mofturoasă cu mâncarea. Totul normal, păstrează rutinele calme.", "După primele călduri, discută cu veterinarul avantajele, dezavantajele și momentul sterilizării. Există argumente reale de ambele părți, iar mărimea rasei contează, este o decizie personală, nu un automatism.", "Notează datele în calendar. Predictibilitatea face runda a 2-a ușoară."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
