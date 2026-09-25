/* Hrvatski: sadržaj osim vještina i vodiča za ponašanje (vidi cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Lako", 2: "Srednje", 3: "Napredno" };
const quest = { new: "Nova vještina", cont: "Samo nastavi", prac: "Osvježenje" };
const levels = [{ n: "Početnik" }, { n: "Učenik" }, { n: "Diplomant" }, { n: "Profesionalac" }, { n: "Prvak" }, { n: "Majstor" }, { n: "Legenda" }];
const ranks = [{ n: "Novak" }, { n: "Pripravnik" }, { n: "Vodič" }, { n: "Trener" }, { n: "Stručnjak" }, { n: "Specijalist" }, { n: "Potpun" }];

const stucks = {
  cmd: "Zapelo? Olakšaj, ne pojačavaj glas. Vrati se korak unatrag, pokupi 2 lake pobjede, završi tu. Ponovno pokaži mamcem umjesto da ponavljaš naredbu. Ako pas ustane iz položaja, nagradi brže u sljedećem ponavljanju.",
  trick: "Zapelo? Razbij trik na manje dijelove i plati najmanji. Snimi vježbu, većina problema s trikovima krije se u ljudskoj ruci, ne u psu.",
  agi: "Odbija prepreku? Snizi je, skrati ili se vrati na plaćanje samih pokušaja. Nikad ne guraj i ne diži psa na opremu, jedno uplašeno ponavljanje košta tjedne.",
  life: "Preopterećen više nego zapeo? Dodaj udaljenost, skrati izlazak, završi mirno i pokušaj drugi dan. Rad na izlaganju glasno propada, ali se brzo oporavlja.",
};

const ladders = {
  cmd: [
    ["1. vježba · Pokaži, ne testiraj", "Svako ponavljanje vodi poslasticom u ruci, nagradi unutar 1 sekunde. Uspjeh = ponašanje se uopće dogodilo, uz tvoju punu pomoć."],
    ["2. do 4. vježba · Mami i imenuj", "Nastavi mamiti, naredbu izgovori jednom neposredno prije ponašanja. Uspjeh = 3 do 5 potpomognutih ponavljanja zaredom."],
    ["5. do 7. vježba · Makni mamac", "Prazna ruka, isti pokret, nagrada iz torbice. Položaji zaslužuju 1 do 3 sekunde čekanja prije isplate."],
    ["Od 8. vježbe · Prvo naredba", "Jedna naredba, bez mamca. Povećavaj jednu težinu odjednom: trajanje iznad 5 sekundi, nove prostorije, blaga distrakcija."],
  ],
  trick: [
    ["1. vježba · Lovi mamac", "Velik očit mamac, trenutna isplata za svaki pokret u pravom smjeru. Uspjeh = gruba verzija dogodila se jednom."],
    ["2. do 4. vježba · Oblikuj", "Plati najbolja 3 od 5 pokušaja, ostale ignoriraj. Naredbu reci jednom po ponavljanju. Serije od 3 do 5 ponavljanja, trikovi umaraju mozak."],
    ["5. do 7. vježba · Smanji pomoć", "Mamac postaje mali znak rukom. Preciznost raste: najčišća ponavljanja zarađuju dvostruku poslasticu."],
    ["Od 8. vježbe · Predstava", "Prvo naredba, znak rukom samo kao rezerva. Nove prostorije, zatim pred ljudima. Pljesak se računa kao distrakcija."],
  ],
  agi: [
    ["1. vježba · Napravi sitno", "Letvica na podu, tunel kratak, stol nizak. Uspjeh = 1 veseo pokušaj, plaćen kao jackpot."],
    ["2. do 4. vježba · Gradi ljubav, ne visinu", "Ponavljaj laku verziju dok te pas ne povuče prema prepreci. Prvo samopouzdanje, kriteriji kasnije."],
    ["5. do 7. vježba · Podigni jednu stvar", "Visinu, duljinu ili kut, nikad dvoje u jednoj vježbi. Naredbu za prepreku reci kad se pas odluči."],
    ["Od 8. vježbe · Brzina i slijed", "Pošalji s nekoliko koraka udaljenosti, poveži 2 prepreke, vježbe kraće od 10 minuta. Radost je motor agilityja."],
  ],
  life: [
    ["1. izlazak · Istražuj, ne guraj", "Kratka i laka verzija, ispod praga stresa. Uspjeh = mirni trenuci u situaciji, zatim odlazak dobrog osjećaja."],
    ["2. do 4. izlazak · Udaljenost je tvoj gumb", "Ponavljaj na udaljenosti ili trajanju gdje pas još može jesti, njuškati i gledati te. Mir plaćaj stalno."],
    ["5. do 7. izlazak · Zatvori jaz", "Bliže, dulje ili življe, jedan gumb po izlasku. Povlačenje je strategija, ne neuspjeh."],
    ["Od 8. izlaska · Napravi rutinu", "Mijenjaj dane, mjesta i sate da se mir generalizira. Ocjena 5 znači opušten od dolaska do odlaska."],
  ],
};

const badges = {
  b_first: { n: "Prva vježba", d: "Zabilježena tvoja prva vježba." },
  b_five: { n: "Prvih 5 šapa", d: "Naredba prvi put ocijenjena s 5 od 5." },
  b_master1: { n: "Prvo svladavanje", d: "Prva svladana naredba: 3 čiste petice zaredom." },
  b_master5: { n: "Daj pet, puta pet", d: "5 svladanih naredbi." },
  b_master10: { n: "Dvoznamenkasto", d: "10 svladanih naredbi." },
  b_streak3: { n: "Niz od 3 dana", d: "Trening 3 dana zaredom." },
  b_streak7: { n: "Niz od 7 dana", d: "Cijeli tjedan dnevnog treninga." },
  b_streak14: { n: "Niz od 14 dana", d: "Dva tjedna zaredom. Rutina je stvarna." },
  b_streak30: { n: "Niz od 30 dana", d: "Mjesec dosljednosti. Elitni teritorij." },
  b_streak60: { n: "Niz od 60 dana", d: "Dva mjeseca bez propuštenog dana. Izvanredan tim." },
  b_streak100: { n: "Niz od 100 dana", d: "Sto dana zaredom. Status legende." },
  b_gear: { n: "Potpuno opremljen", d: "Sve nužne stavke označene." },
  b_scholar: { n: "Pseći učenjak", d: "Pročitano 10 vodiča u knjižnici Uči." },
  b_fixer: { n: "Čitač ponašanja", d: "Pročitano 5 vodiča za ponašanje. Razumijevanje pobjeđuje ispravljanje." },
  b_life1: { n: "Vani u svijetu", d: "Zabilježena prva vježba životne vještine." },
  b_travel: { n: "Karte, molim", d: "Svladana putna vještina: autobus, brod ili avion." },
  b_social: { n: "Društveni leptir", d: "Svladan miran susret sa psom ili mačkom." },
  b_spa: { n: "Redovni gost salona", d: "Svladano šišanje, nokti ili uši." },
  b_vet: { n: "Miljenik veterinara", d: "Svladani sretni posjeti veterinaru." },
  b_hotel: { n: "Prvak noćenja", d: "Svladan boravak u pansionu za pse." },
  b_trick1: { n: "Predstava", d: "Prvi svladani trik." },
  b_agi1: { n: "Agility novak", d: "Prva svladana agility prepreka." },
  b_sess50: { n: "50 vježbi", d: "Zabilježeno 50 vježbi." },
  b_sess100: { n: "Klub stotinu", d: "Zabilježeno 100 vježbi." },
  b_xp500: { n: "500 XP", d: "Dosegnuto 500 XP." },
  b_xp1000: { n: "1.000 XP", d: "Dosegnuto 1.000 XP." },
  b_read25: { n: "Knjižnična iskaznica", d: "Pročitano 25 vodiča." },
  b_school: { n: "Odlikaš", d: "Svladane sve 3 prekretnice škole za pse: prvi sat, semestar, ispit." },
  b_quest7: { n: "Tjedno čudo", d: "Obavljeno 7 dnevnih zadataka. Navika se stvara." },
  b_quest21: { n: "Junak navike", d: "Obavljen 21 dnevni zadatak. Ovo je sad životni stil." },
  b_master25: { n: "Četvrt stoljeća", d: "25 svladanih vještina." },
  b_master50: { n: "Na pola puta", d: "50 svladanih vještina. Pola knjižnice." },
  b_master99: { n: "Do zadnje vještine", d: "Svih 99 vještina svladano. Nema više što naučiti." },
  b_xp3000: { n: "3.000 XP", d: "Dosegnuta razina Prvak." },
  b_xp10000: { n: "10.000 XP", d: "Deset tisuća XP dosljednosti." },
  b_sess250: { n: "250 vježbi", d: "Zabilježeno 250 vježbi." },
};

const equip = {
  must: {
    collar: { n: "Ravna ogrlica s pločicom", note: "Zakonski obvezni podaci na pločici se razlikuju, broj telefona uvijek ide." },
    harness: { n: "Oprsnica Y oblika", note: "Svakodnevne šetnje i trening, bez pritiska na grlo." },
    leash: { n: "Fiksni povodac 1,5 do 2 m", note: "Standardni povodac za trening i grad." },
    pouch: { n: "Torbica za poslastice", note: "Brza isplata je dobar trening. Džepovi su prespori." },
    treats: { n: "Mekane poslastice veličine graška", note: "Male i mekane, 50 nagrada po vježbi mora biti moguće." },
    bags: { n: "Vrećice za izmet s držačem", note: "Građanska dužnost bez pregovora." },
    bowls: { n: "Zdjelice za hranu i vodu", note: "Neklizajuće. Keramika ili čelik pobjeđuju plastiku." },
    bed: { n: "Ležaj ili prostirka", note: "Cilj naredbe Na mjesto i sjedište drijemanja." },
    crate: { n: "Kavez ili ogradica", note: "Brlog, pomoć pri učenju čistoće, sigurnost na putu." },
    chews: { n: "2 do 3 igračke za žvakanje", note: "Mijenjaj radi novosti. Osiguranje za izmjenu zuba." },
    brush: { n: "Četka ili češalj za vrstu dlake", note: "Dlakave pasmine: svaki dan. Pitaj grumera koji alat." },
    vetkit: { n: "Osnovni komplet za njegu", note: "Pinceta za krpelje, škarice za nokte za pse, šampon za pse." },
    dental: { n: "Četkica i pasta za zube za pse", note: "Samo enzimska pasta za pse, nikad ljudska. Svaki dan je idealno, 3 puta tjedno je stvarni život." },
  },
  nice: {
    clicker: { n: "Kliker", note: "Precizni marker. Vidi Kutak za štence." },
    longline: { n: "Dugi povodac 5 do 10 m", note: "Most od treninga dozivanja do slobodnog kretanja." },
    kong: { n: "Gumena igračka za punjenje", note: "Napunjenu zamrzni, kupuje 20 mirnih minuta." },
    snuffle: { n: "Njuškalica", note: "Njuškanje večere umara mozak." },
    lickmat: { n: "Podloga za lizanje", note: "Distrakcija za njegu i kupanje." },
    carrest: { n: "Testirani autokavez ili oprsnica za auto", note: "Sigurnost na svakoj vožnji." },
    whistle: { n: "Zviždaljka za dozivanje", note: "Dosljedan zvuk, nosi dalje od glasa." },
    raincoat: { n: "Kabanica za pse tanke dlake", note: "Neki je psi trebaju, mnogi ne." },
    gps: { n: "GPS tracker", note: "Mir u fazama slobodnog kretanja." },
    puzzle: { n: "Igračke sa zagonetkom za hranu", note: "Posao za mozak za kišne dane." },
    agility: { n: "Mini agility set", note: "Zabava u vrtu kad pas odraste." },
    gate: { n: "Dječja ogradica", note: "Jeftino upravljanje prostorom tijekom treninga." },
    basket: { n: "Košara ili prikolica za bicikl", note: "Mali i srednji psi. Prvo trenirajte kao ležaj, uvijek zakopčaj oprsnicu." },
  },
};

const leash = {
  gear: {
    collar: { n: "Ogrlica", pros: ["Lagana i jednostavna, nosi pločicu", "Brzo gore i dolje", "U redu za školovane pse koji ne vuku"], cons: ["Sav pritisak pada na grlo", "Rizično za pse koji vuku: dušnik, štitnjača i vrat pod opterećenjem", "Neki se psi izvuku iz labavih ogrlica"], verdict: "Zadrži je zbog pločice. Šetaj na njoj samo ako povodac ostaje labav." },
    yharness: { n: "Oprsnica Y", pros: ["Pritisak na prsa i ramena, ne na grlo", "Otporna na bijeg ako dobro pristaje", "Najbolji zadani izbor za štence i trening"], cons: ["Pristajanje je važno, remeni ne smiju ometati pokret ramena", "Malo sporije stavljanje", "Loše dizajnirana oprsnica može žuljati ispod pazuha"], verdict: "Mišljenje: pravi zadani izbor za većinu pasa. Y oblik na prsima, 2 prsta prostora posvuda." },
    frontclip: { n: "Oprsnica s prednjom kopčom", pros: ["Okreće psa prema tebi kad vuče, mehanika pomaže preodgoju", "Bez boli"], cons: ["Alat, ne lijek, trening je i dalje potreban", "Stalno hodanje s prednjom kopčom može utjecati na hod, koristi tijekom preodgoja"], verdict: "Dobra privremena pomoć za jake vučare uz trening hodanja na labavom povodcu." },
  },
  leashes: {
    fixed: { n: "Fiksni povodac 1,5 do 2 m", pros: ["Predvidljiva duljina, jasna komunikacija", "Standard za trening i grad"], cons: ["Kratak radijus za njuškanje na šetnjama u prirodi"], verdict: "Zadani izbor. Kupi kvalitetu jednom." },
    longline: { n: "Dugi povodac 5 do 10 m", pros: ["Sloboda sa sigurnosnom mrežom", "Alat za trening dozivanja i slobodnog kretanja"], cons: ["Rizik od opeklina užetom, rukavice pomažu", "Treba otvoren prostor i malo vještine"], verdict: "Najbolja investicija u trening nakon poslastica." },
    flexi: { n: "Samonavijajući povodac (flexi)", pros: ["Praktičan radijus za školovane, mirne pse na otvorenim površinama"], cons: ["Uči vučenju, napetost proširuje domet", "Ozljede uzicom kod ljudi i pasa su dokumentirane", "Bez kontrole u iznenadnim prometnim situacijama", "Zabranjen ili nepoželjan u mnogim školama za pse"], verdict: "Mišljenje: potpuno ga izostavi tijekom treninga. Ako ikako, samo trakasti tip, samo na otvorenim površinama." },
    slip: { n: "Omča (slip povodac)", pros: ["Brza za kratke prijenose, uobičajena kod veterinara i u azilima"], cons: ["Steže se oko vrata bez ograničenja", "Pogrešan alat za vučare i svakodnevne šetnje"], verdict: "Profesionalni alat za kratke prijenose, ne povodac za svaki dan." },
  },
};

const planAdult = [
  { n: "Provjera temelja", items: ["Iskreno testiraj osnove: sjedni, lezi, ostani, dozivanje, svako u dnevnom boravku i u vrtu", "Sve što je klimavo ponovno treniraj 3-minutnim vježbama, bez srama, hrđa je normalna", "Odaberi svoju valutu nagrade: koja poslastica psu zasvijetli oči"], note: "Ne pretpostavljaj da je išta čvrsto. Iskren test ovaj tjedan štedi 6 tjedana frustracije kasnije." },
  { n: "Reset labavog povodca", items: ["Hodanje na labavom povodcu, 10 minuta dnevno mirnom rutom", "Pravilo stani-kad-se-zategne, svaki put", "Pauze za njuškanje na naredbu kao plaća za šetnju"], note: "Labav povodac je navika, ne trik. Dosljednost pobjeđuje intenzitet, svaki put." },
  { n: "Kontrola impulsa", items: ["Pusti, od hrane na podu do hrane koja pada", "Čekaj na vratima i prije zdjelice", "Ostani: produži trajanje na 30 sekundi dok se udaljavaš"], note: "Dozivanje je životna vještina. Nikad ne zovi psa da bi prekinuo nešto zabavno, inače naredba počne značiti kraj zabave." },
  { n: "Smirivanje na naredbu", items: ["Smirivanje na prostirci tijekom večere i TV večeri", "Mirno ponašanje dobiva tihu isplatu, kaos ne dobiva ništa", "Prva proba za kafić kod kuće: prostirka, žvakalica, 20 minuta"], note: "Rad na smirivanju izgleda kao ništa. Najkorisnija je stvar koju odrastao pas može naučiti." },
  { n: "Učvršćivanje dozivanja", items: ["Dozivanje na dugom povodcu u parku, plati kao dobitak na lotu", "Postupno dodaj distrakcije: udaljenost od drugih pasa, zatim bliže", "Naredba za hitno zaustavljanje kao zasebna vještina"], note: "Kontrola impulsa gradi se u sekundama, ne minutama. Kratka ponavljanja, visoka vrijednost, otiđi kao pobjednik." },
  { n: "Rukovanje i njega", items: ["Oslonac brade za rukovanje: uši, oči, šape", "Četkanje zuba 3 puta ovaj tjedan", "Nokti škaricama ili turpijom, 1 šapa odjednom"], note: "Distrakcija je pravi test. Snizi kriterije na novom mjestu, to nije nazadovanje, to je trening." },
  { n: "Ponašanje u javnosti", items: ["Pravi posjet kafiću ili restoranu, kratak i uspješan", "Pristojni pozdravi: sjedni za pozdrav, bez skakanja", "Mirno čekanje dok razgovaraš s nekim na ulici"], note: "Odrasli psi uče trikove brže od štenaca. Iskoristi ih za obnovu samopouzdanja nakon teškog tjedna." },
  { n: "Obogaćivanje i diploma", items: ["Igre njuškanja: potraga za poslasticama po stanu i vrtu", "Nauči 1 čisto zabavan trik kao nagradu za oboje", "Tjedan pregleda: ponovno testiraj 1. tjedan, proslavi razliku, planiraj dalje"], note: "Održavanje pobjeđuje savršenstvo. 5 minuta 5 dana tjedno čuva sve što si izgradio." },
];

const planPup = [
  { n: "Dolazak i povezivanje", items: ["Prepoznavanje imena", "Napuni riječ marker ili kliker", "Ritam učenja čistoće, van svakih 1 do 2 sata"], note: "Ovaj tjedan bez pritiska naredbama. Povezivanje, san i vrijeme za nuždu su program." },
  { n: "Prva vještina: Sjedni", items: ["Sjedni, 3 kratke vježbe dnevno", "Nastavi plaćati prepoznavanje imena", "Igre s kavezom pri otvorenim vratima"], note: "3 minute računaju se kao vježba. Kratko i veselo pobjeđuje dugo i napeto." },
  { n: "Pridružuje se Lezi", items: ["Lezi", "Ponovi Sjedni u novim prostorijama", "Rukovanje: diraj šape i uši, plati svaki dodir"], note: "Ako Lezi do nedjelje nije glatko, u redu je. Prebaci ga u sljedeći tjedan." },
  { n: "Dođi, temelj", items: ["Dođi u zatvorenom, ping-pong hodnikom", "Tjedan pregleda: Sjedni i Lezi prije obroka", "Čekaj kod zdjelice, 2 sekunde"], note: "Dozivanje je maratonska vještina. Za sada samo u zatvorenom." },
  { n: "Kontrola impulsa", items: ["Pusti, osnovna igra šakom", "Ispusti tijekom igre", "Nastavi plaćati dozivanje u zatvorenom"], note: "Pola treninga pasa je učenje psa da se odustajanje više isplati od grabljenja." },
  { n: "Van u svijet", items: ["Labav povodac, prvih 100 labavih metara", "Gledaj me na ulici", "Sjedni na 1 rubnjaku po šetnji"], note: "Vučenje je u ovoj dobi normalno. Stani-i-kreni, bez trzanja, sitne udaljenosti." },
  { n: "Ostani počinje", items: ["Ostani, samo 1 do 5 sekundi trajanja", "Na mjesto na prostirku", "Ponovi dozivanje, sad s blagim distrakcijama"], note: "Sekunde, ne minute. Ako pas dvaput zaredom prekine Ostani, olakšaj." },
  { n: "Tjedan učvršćivanja", items: ["Bez novih vještina", "Miješane 5-minutne vježbe ponavljanja svega", "1 zabavan trik po tvom izboru kao desert"], note: "Tjedni ponavljanja su napredak. Vještina je stvarna tek kad preživi tjedan miješane vježbe." },
  { n: "U pokretu", items: ["Čekaj na rubnjaku, na svakom prijelazu", "Labav povodac na prometnijim ulicama", "Mirna rutina za posjetitelje, prve postave"], note: "Svijet je sad učionica. Kraće rute veće kvalitete pobjeđuju duge pohode." },
  { n: "Udaljenost i trajanje", items: ["Ostani s 2 do 5 koraka udaljenosti", "Dozivanje vani na dugom povodcu", "Lezi na prostirci dok kuhaš"], note: "Ako neka vještina zaklima, vrati se tjedan unatrag. Kalendar služi tebi, ne obrnuto." },
  { n: "Životne vještine", items: ["Smirivanje ispod stola, prvi posjet kafiću", "Prve mirne vožnje autom", "Rukovanje kao kod veterinara: šape, uši, provjera zuba"], note: "Ovo su vještine koje sljedećih 10 godina čine lakima. Vrijede svakog ponavljanja." },
  { n: "Tjedan diplome", items: ["Bez novih vještina", "Miješane 5-minutne vježbe cijelog seta", "1 omiljeni trik, uglačan za predstavu"], note: "12 tjedana kasnije: imaš školovanog mladog psa i dnevnu naviku. Navika je pravi dar za diplomu." },
];

const puppy = {
  treatsguide: { n: "Poslastice: tvoja valuta za trening", body: ["Veličina: kao grašak ili manje. 5-minutna vježba može potrošiti 30 poslastica, male drže kalorijsku računicu razumnom.", "Mekano pobjeđuje hrskavo, pauze za žvakanje ubijaju ritam treninga.", "Izgradi ljestvicu vrijednosti: briketi za lake zadatke kod kuće, sir, piletina ili kobasica za dozivanje i težak rad vani.", "Poslastice oduzmi od dnevnog obroka, kalorije treninga se računaju. Pravilo: poslastice unutar otprilike 10 % dnevnog unosa.", "Otrovno i zabranjeno: čokolada, grožđe i grožđice, luk, češnjak, sladilo ksilitol, alkohol, kuhane kosti."] },
  clickerguide: { n: "Osnove klikera", body: ["Kliker je precizni instrument: klik označava točan trenutak kad je pas zaradio nagradu.", "Punjenje: klik, zatim poslastica, 10 do 15 puta, dok klik ne podigne uši. To je cijela priprema.", "Ugovor: svaki klik uvijek se plaća. Bez iznimaka, inače instrument gubi vrijednost.", "Vrijeme klika pobjeđuje vrijeme poslastice, poslastica može stići 2 sekunde kasnije, klik ne.", "Bez klikera pri ruci: kratka riječ marker poput Da, izgovorena uvijek isto, radi isti posao malo manje precizno."] },
  teethguide: { n: "Vremenska crta izmjene zuba", body: ["3. do 6. tjedan: dolazi 28 mliječnih zuba.", "3. do 7. mjesec: mliječni zubi ispadaju, izrasta 42 trajna zuba. Vrhunac pritiska za žvakanje, bolne desni, povremene krvave mrlje na igračkama, sve normalno.", "Jelovnik za olakšanje: gumene žvakalice, mokra zamrznuta krpica, zamrznuti komadi mrkve pod nadzorom te žvakalice od drva kave ili masline koje se mrve umjesto da se cijepaju kao štapovi iz vrta.", "Povremeno provjeri zadržane mliječne zube, dvostruki red očnjaka treba veterinarov pogled, često kod malih pasmina.", "Do 7. mjeseca oluja je uglavnom prošla. Kabele i cipele zaštiti do tada, ne zauvijek."] },
  sleepguide: { n: "San i drijemanje", body: ["Štenci trebaju 16 do 20 sati sna dnevno. Većina napada grizenja, ludovanja i cviljenja jednostavno je preumorno štene koje je već trebalo spavati.", "Izgradi ritam drijemanja: kod mladih štenaca otprilike 1 sat budnosti, zatim drijemež. Igra, nužda, pa u siguran prostor na spavanje.", "Drijemanje provodi na mirnom, zamračenom mjestu, pokriveni kavez ili ogradica rade. Preumorno štene često ne može zaspati samo usred kućne vreve.", "Zaštiti noćni san: zadnja nužda kasno navečer, zatim dosadna tama. Mladi štenci možda trebaju 1 noćni izlazak, neka bude tih i poslovan.", "Ako se štene pretvori u kopnenog morskog psa, ne treniraj kroz to. Vrijeme je za drijemež, ne za disciplinu."] },
  homeguide: { n: "Prvi dani u novom domu", body: ["Smanji svijet: 1 soba plus siguran prostor za prve dane. Cijeli se stan zarađuje postupno, sobu po sobu, tako nužda i žvakanje ostaju pod kontrolom.", "Postavi bazu: ležaj ili kavez, voda, žvakalica, u kutu odakle te štene vidi ali odmara neometano. To je utočište, nikad mjesto za kaznu.", "Prva noć: udaljenost spavanja je važna. Mnogi se štenci prvih noći brže smire uz krevet, ležaj možeš kasnije premjestiti.", "Prvi tjedan neka bude namjerno dosadan: bez parade posjetitelja, bez zabava za štene. Štene prerađuje gubitak legla, kućanstvo je dovoljno uzbuđenja.", "Rutine počni od 1. dana: isto vrijeme hranjenja, ista vrata za nuždu, iste riječi. Predvidljivost je način na koji štene uči da je svijet siguran."] },
  socialguide: { n: "Prozor socijalizacije", body: ["Otprilike od 3. do 14. tjedna dobi razdoblje je kad štenci pohranjuju iskustva kao normalna. Što se sad mirno doživi, dosadno je za cijeli život, što se propusti može kasnije zahtijevati ozbiljan rad.", "Socijalizacija znači mirno izlaganje, ne maksimalan kontakt. Gledanje autobusa s 30 metara uz jedenje poslastica savršena je socijalizacija, biti opkoljen s 5 pasa nije.", "Radi po popisu: površine (trava, metalne rešetke, stube), zvukovi (promet, usisavač, snimke grmljavine tiho), ljudi (šeširi, brade, invalidska kolica, djeca na udaljenosti), rukovanje (šape, uši, njuška).", "Prije punog cijepljenja: nosi štene kroz živa mjesta, posjeti cijepljene prijateljske pse kod kuće, sjedni na klupu blizu života. Izlaganje ne zahtijeva dodir s pločnikom.", "Jedno pravilo iznad svih: štene određuje tempo. Prisilni pozdravi uče strah, dobrovoljan pristup uči samopouzdanje."] },
  aloneguide: { n: "Samoća od 1. dana", body: ["Biti sam je vještina, ne tvornička postavka. Štenci koji to nikad ne vježbaju postaju psi koji paničare, počni sa sekundama, ne satima.", "1. dan: izađi iz sobe na 10 sekundi dok štene jede iz igračke za hranu, vrati se prije bilo kakvog nemira. To je jedno ponavljanje.", "Produžuj polako: sekunde u minute u mirnu kavu iza vrata. Ostavi napunjenu žvakalicu, odlasci i dolasci neka budu potpuno dosadni, bez dramatičnih rastanaka.", "Cilj je štene koje u prvim tjednima može samo drijemati 30 do 60 minuta, uvijek nakon kretanja, nužde i s nečim za žvakanje.", "Ako štene paničari umjesto da prosvjeduje, ne guraj kroz plač, smanji korak. Pravi separacijski stres zaslužuje rani profesionalni plan, sam se ne popravlja."] },
  walksguide: { n: "Šetnje šteneta: koliko dugo, koliko često", body: ["Pravilo: otprilike 5 minuta strukturiranog hodanja po mjesecu dobi, 1 do 2 puta dnevno. 4-mjesečno štene: oko 20 minuta po šetnji.", "To ograničava prisilno marširanje, ne kretanje. Slobodna igra, njuškanje i vrijeme na mekoj podlozi reguliraju se sami.", "Njuškanje JEST šetnja. Spora 20-minutna njuškalačka tura umara štene više od 40 brzih minuta.", "Rastući zglobovi ne vole duge pohode, maratone stubama, skokove s visine i trčanje po asfaltu. Trčanje i bicikl sačuvaj za 12 do 18 mjeseci.", "Gledaj štene, ne sat: zaostajanje, lijeganje ili bijesno grizenje usred šetnje znači da je bilo previše. Malo štene radije odnesi kući nego ga vuci.", "3 do 4 kratka izlaska pobjeđuju 1 dugi, a svaki izlazak je ujedno učenje čistoće."] },
  heatguide: { n: "Vodič za prvo tjeranje", body: ["Vrijeme: prvo tjeranje između 6. i 15. mjeseca, male pasmine ranije, velike kasnije. Ponavlja se otprilike svakih 6 do 8 mjeseci.", "Trajanje: oko 2 do 4 tjedna. Znakovi: otečena vulva, krvavi iscjedak, češće mokrenje, promjene raspoloženja, magnetska privlačnost za svakog mužjaka u susjedstvu.", "Upravljanje: cijelo vrijeme samo na povodcu, bez parkova za pse, bez nenadziranog vremena u vrtu, higijenske gaćice u zatvorenom po potrebi.", "Može biti ljepljiva, umorna ili izbirljiva s hranom. Sve normalno, drži rutine mirnima.", "Nakon prvog tjeranja razgovaraj s veterinarom o prednostima, manama i vremenu sterilizacije. Postoje pravi argumenti na obje strane i veličina pasmine je važna, to je osobna odluka, ne automatizam.", "Datume upiši u kalendar. Predvidljivost čini 2. krug lakim."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
