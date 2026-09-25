/* Slovenščina: vsebina razen veščin in vedenjskih vodnikov (glej cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Lahko", 2: "Srednje", 3: "Napredno" };
const quest = { new: "Nova veščina", cont: "Kar naprej", prac: "Osvežitev" };
const levels = [{ n: "Začetnik" }, { n: "Učenec" }, { n: "Diplomant" }, { n: "Profesionalec" }, { n: "Prvak" }, { n: "Mojster" }, { n: "Legenda" }];
const ranks = [{ n: "Novinec" }, { n: "Vajenec" }, { n: "Vodnik" }, { n: "Trener" }, { n: "Strokovnjak" }, { n: "Specialist" }, { n: "Popoln" }];

const stucks = {
  cmd: "Zataknilo? Naredi lažje, ne glasneje. Pojdi en korak nazaj, zberi 2 lahki zmagi, končaj tam. Znova pokaži z vabo, namesto da ponavljaš ukaz. Če pes vstane iz položaja, pri naslednji ponovitvi nagradi hitreje.",
  trick: "Zataknilo? Razdeli trik na manjše dele in plačaj najmanjšega. Posnemi vajo, večina težav pri trikih se skriva v človeški roki, ne v psu.",
  agi: "Zavrača oviro? Znižaj jo, skrajšaj ali se vrni k plačevanju golih poskusov. Psa nikoli ne potiskaj ali dviguj na opremo, ena prestrašena ponovitev stane tedne.",
  life: "Bolj preobremenjen kot zataknjen? Dodaj razdaljo, skrajšaj izlet, končaj z mirom in poskusi znova kdaj drugič. Delo z izpostavljanjem glasno odpove, a se hitro popravi.",
};

const ladders = {
  cmd: [
    ["1. vaja · Pokaži, ne preizkušaj", "Vsako ponovitev vodi s priboljškom v roki, nagradi v 1 sekundi. Uspeh = vedenje se je sploh zgodilo, s tvojo polno pomočjo."],
    ["2. do 4. vaja · Vabi in poimenuj", "Še naprej vabi, ukaz izreci enkrat tik pred vedenjem. Uspeh = 3 do 5 vodenih ponovitev zapored."],
    ["5. do 7. vaja · Umakni vabo", "Prazna roka, isti gib, nagrada iz vrečke. Položaji si zaslužijo 1 do 3 sekunde čakanja pred plačilom."],
    ["Od 8. vaje naprej · Najprej ukaz", "En ukaz, brez vabe. Povečuj eno težavnost naenkrat: trajanje čez 5 sekund, novi prostori, blaga motnja."],
  ],
  trick: [
    ["1. vaja · Lovi vabo", "Velika očitna vaba, takojšnje plačilo za vsak gib v pravo smer. Uspeh = groba različica se je enkrat zgodila."],
    ["2. do 4. vaja · Oblikuj", "Plačaj najboljše 3 od 5 poskusov, ostale ignoriraj. Ukaz izreci enkrat na ponovitev. Serije naj bodo 3 do 5 ponovitev, triki utrudijo možgane."],
    ["5. do 7. vaja · Zmanjšaj pomoč", "Vaba postane majhen znak z roko. Natančnost raste: najčistejše ponovitve zaslužijo dvojni priboljšek."],
    ["Od 8. vaje naprej · Predstava", "Najprej ukaz, znak z roko le kot rezerva. Novi prostori, nato pred ljudmi. Aplavz šteje kot motnja."],
  ],
  agi: [
    ["1. vaja · Naredi majhno", "Palica na tleh, tunel kratek, miza nizka. Uspeh = 1 vesel poskus, plačan kot jackpot."],
    ["2. do 4. vaja · Gradi ljubezen, ne višine", "Ponavljaj lahko različico, dokler te pes ne vleče k oviri. Najprej samozavest, merila pozneje."],
    ["5. do 7. vaja · Dvigni eno stvar", "Višina, dolžina ali kot, nikoli dvoje v eni vaji. Ukaz za oviro izreci, ko se pes odloči."],
    ["Od 8. vaje naprej · Hitrost in zaporedje", "Pošlji z nekaj korakov razdalje, poveži 2 oviri, vaje naj bodo krajše od 10 minut. Veselje je motor agilityja."],
  ],
  life: [
    ["1. izlet · Raziskuj, ne sili", "Kratka in lahka različica, pod mejo stresa. Uspeh = mirni trenutki v situaciji, nato odhod z dobrim občutkom."],
    ["2. do 4. izlet · Razdalja je tvoj gumb", "Ponavljaj na razdalji ali v trajanju, kjer pes še lahko jé, vohlja in te gleda. Mir plačuj nenehno."],
    ["5. do 7. izlet · Zapri razkorak", "Bližje, dlje ali bolj živahno, en gumb na izlet. Umik je strategija, ne neuspeh."],
    ["Od 8. izleta naprej · Naredi rutino", "Spreminjaj dneve, kraje in ure, da se mir posploši. Ocena 5 pomeni sproščen od prihoda do odhoda."],
  ],
};

const badges = {
  b_first: { n: "Prva vaja", d: "Zabeležena tvoja čisto prva vaja." },
  b_five: { n: "Prvih 5 tačk", d: "Ukaz je prvič dobil oceno 5 od 5." },
  b_master1: { n: "Prvo obvladanje", d: "Prvi obvladan ukaz: 3 čiste petice zapored." },
  b_master5: { n: "Petkrat pet", d: "5 obvladanih ukazov." },
  b_master10: { n: "Dvomestno", d: "10 obvladanih ukazov." },
  b_streak3: { n: "3-dnevni niz", d: "Trening 3 dni zapored." },
  b_streak7: { n: "7-dnevni niz", d: "Cel teden dnevnega treninga." },
  b_streak14: { n: "14-dnevni niz", d: "Dva tedna zapored. Rutina je resnična." },
  b_streak30: { n: "30-dnevni niz", d: "Mesec doslednosti. Elitno ozemlje." },
  b_streak60: { n: "60-dnevni niz", d: "Dva meseca brez izpuščenega dne. Izjemna ekipa." },
  b_streak100: { n: "100-dnevni niz", d: "Sto dni zapored. Status legende." },
  b_gear: { n: "Popolnoma opremljen", d: "Vsi nujni predmeti odkljukani." },
  b_scholar: { n: "Pasji učenjak", d: "Prebranih 10 vodnikov v knjižnici Uči se." },
  b_fixer: { n: "Bralec vedenja", d: "Prebranih 5 vedenjskih vodnikov. Razumevanje premaga popravljanje." },
  b_life1: { n: "Zunaj v svetu", d: "Zabeležena prva vaja življenjske veščine." },
  b_travel: { n: "Vozovnica, prosim", d: "Obvladana potovalna veščina: avtobus, ladja ali letalo." },
  b_social: { n: "Družabni metulj", d: "Obvladano mirno srečanje s psom ali mačko." },
  b_spa: { n: "Redni gost v salonu", d: "Obvladana nega, striženje krempljev ali čiščenje ušes." },
  b_vet: { n: "Ljubljenček veterinarja", d: "Obvladani sproščeni obiski veterinarja." },
  b_hotel: { n: "Prvak prenočevanja", d: "Obvladano bivanje v pasjem hotelu." },
  b_trick1: { n: "Predstava", d: "Prvi obvladan trik." },
  b_agi1: { n: "Agility novinec", d: "Prva obvladana agility ovira." },
  b_sess50: { n: "50 vaj", d: "Zabeleženih 50 vaj." },
  b_sess100: { n: "Klub stotih", d: "Zabeleženih 100 vaj." },
  b_xp500: { n: "500 XP", d: "Doseženih 500 XP." },
  b_xp1000: { n: "1.000 XP", d: "Doseženih 1.000 XP." },
  b_read25: { n: "Knjižnična izkaznica", d: "Prebranih 25 vodnikov." },
  b_school: { n: "Odličnjak", d: "Obvladani vsi 3 mejniki pasje šole: prva ura, semester, izpit." },
  b_quest7: { n: "Tedensko čudo", d: "Opravljenih 7 dnevnih nalog. Navada nastaja." },
  b_quest21: { n: "Junak navade", d: "Opravljenih 21 dnevnih nalog. To je zdaj življenjski slog." },
  b_master25: { n: "Četrt stoletja", d: "25 obvladanih veščin." },
  b_master50: { n: "Na polovici", d: "50 obvladanih veščin. Polovica knjižnice." },
  b_master99: { n: "Do zadnje veščine", d: "Vseh 99 veščin obvladanih. Ničesar več za naučiti." },
  b_xp3000: { n: "3.000 XP", d: "Dosežena stopnja Prvak." },
  b_xp10000: { n: "10.000 XP", d: "Deset tisoč XP prisotnosti." },
  b_sess250: { n: "250 vaj", d: "Zabeleženih 250 vaj." },
};

const equip = {
  must: {
    collar: { n: "Ploščata ovratnica z obeskom", note: "Zakonsko zahtevani podatki na obesku se razlikujejo, telefonska številka je vedno nanj." },
    harness: { n: "Oprsnica v obliki Y", note: "Vsakodnevni sprehodi in trening, brez pritiska na vrat." },
    leash: { n: "Fiksni povodec 1,5 do 2 m", note: "Standardni povodec za trening in mesto." },
    pouch: { n: "Vrečka za priboljške", note: "Hitro plačilo je dober trening. Žepi so prepočasni." },
    treats: { n: "Mehki priboljški velikosti graha", note: "Majhni in mehki, 50 nagrad na vajo mora biti mogočih." },
    bags: { n: "Vrečke za iztrebke z nosilcem", note: "Nepogrešljiva javna dolžnost." },
    bowls: { n: "Posodi za hrano in vodo", note: "Nedrseči. Keramika ali jeklo premaga plastiko." },
    bed: { n: "Ležišče ali podloga", note: "Cilj za ukaz Na mesto in središče dremežev." },
    crate: { n: "Boks ali ograjica", note: "Brlog, pomoč pri učenju čistoče, varnost na potovanju." },
    chews: { n: "2 do 3 igrače za žvečenje", note: "Menjavaj za novost. Zavarovanje ob menjavi zob." },
    brush: { n: "Krtača ali glavnik za vrsto dlake", note: "Dlakave pasme: vsak dan. Vprašaj pasjega frizerja, katero orodje." },
    vetkit: { n: "Osnovni komplet za nego", note: "Pinceta za klope, škarje za kremplje, psu prijazen šampon." },
    dental: { n: "Pasja zobna ščetka in pasta", note: "Samo encimska pasja zobna pasta, nikoli človeška. Vsak dan je idealno, 3-krat na teden je resnično življenje." },
  },
  nice: {
    clicker: { n: "Kliker", note: "Natančni označevalec. Glej Kotiček za mladičke." },
    longline: { n: "Dolga vrv 5 do 10 m", note: "Most od treninga odpoklica do prostega gibanja." },
    kong: { n: "Gumijasta igrača za polnjenje", note: "Napolnjeno zamrzni, kupi 20 mirnih minut." },
    snuffle: { n: "Vohalna podloga", note: "Vohljanje večerje utrudi možgane." },
    lickmat: { n: "Podloga za lizanje", note: "Odvračanje pozornosti med nego in kopanjem." },
    carrest: { n: "Testirani avtomobilski boks ali oprsnica", note: "Varnost na vsaki vožnji." },
    whistle: { n: "Piščalka za odpoklic", note: "Dosleden zvok, seže dlje kot glas." },
    raincoat: { n: "Dežni plašč za pse s tanko dlako", note: "Nekateri psi ga potrebujejo, mnogi ne." },
    gps: { n: "GPS sledilnik", note: "Mir v faza prostega gibanja." },
    puzzle: { n: "Igrače z uganko za hrano", note: "Delo za možgane za deževne dni." },
    agility: { n: "Mini agility komplet", note: "Zabava na vrtu, ko pes odraste." },
    gate: { n: "Otroška ograjica", note: "Poceni upravljanje prostorov med treningom." },
    basket: { n: "Kolesarska košara ali prikolica", note: "Majhni in srednji psi. Najprej trenirajte kot ležišče, vedno pripni oprsnico." },
  },
};

const leash = {
  gear: {
    collar: { n: "Ovratnica", pros: ["Lahka in preprosta, nosi obesek", "Hitro gor in dol", "V redu za trenirane pse, ki ne vlečejo"], cons: ["Ves pritisk pristane na grlu", "Tvegano za pse, ki vlečejo: obremenitev sapnika, ščitnice in vratu", "Nekateri psi se izmuznejo iz ohlapnih ovratnic"], verdict: "Obdrži jo zaradi obeska. Sprehajaj na njej le, če povodec ostane ohlapen." },
    yharness: { n: "Oprsnica Y", pros: ["Pritisk na prsi in ramena, ne na grlo", "Odporna na pobeg, če je dobro nameščena", "Najboljša privzeta izbira za mladičke in trening"], cons: ["Prileganje je pomembno, trakovi ne smejo ovirati gibanja ramen", "Malenkost počasnejše nadevanje", "Slabo oblikovana oprsnica lahko drgne pod pazduho"], verdict: "Mnenje: prava privzeta izbira za večino psov. Oblika Y na prsih, povsod 2 prsta prostora." },
    frontclip: { n: "Oprsnica s sprednjim obročem", pros: ["Ob vlečenju psa obrne k tebi, mehanika pomaga pri prevzgoji", "Brez bolečine"], cons: ["Orodje, ne zdravilo, trening je še vedno potreben", "Stalna hoja s sprednjim obročem lahko vpliva na hojo, uporabljaj med prevzgojo"], verdict: "Dobra začasna pomoč za močne vlečnike ob treningu hoje na ohlapnem povodcu." },
  },
  leashes: {
    fixed: { n: "Fiksni povodec 1,5 do 2 m", pros: ["Predvidljiva dolžina, jasna komunikacija", "Standard za trening in mesto"], cons: ["Kratek radij za vohljanje na sprehodih v naravi"], verdict: "Privzeta izbira. Enkrat kupi kakovost." },
    longline: { n: "Dolga vrv 5 do 10 m", pros: ["Svoboda z varnostno mrežo", "Orodje za trening odpoklica in prostega gibanja"], cons: ["Tveganje opeklin od vrvi, rokavice pomagajo", "Potrebuje odprt prostor in nekaj spretnosti"], verdict: "Najboljša naložba v trening po priboljških." },
    flexi: { n: "Samonavijalni povodec (flexi)", pros: ["Priročen radij za trenirane, mirne pse na odprtih površinah"], cons: ["Uči vlečenja, napetost podaljša doseg", "Poškodbe z vrvico pri človeku in psu so dokumentirane", "Brez nadzora v nenadnih prometnih situacijah", "Prepovedan ali nezaželen v mnogih pasjih šolah"], verdict: "Mnenje: med treningom ga popolnoma izpusti. Če že, samo trakasti tip, samo na odprtih površinah." },
    slip: { n: "Zanka (slip lead)", pros: ["Hitra za kratke prenose, pogosta pri veterinarjih in v zavetiščih"], cons: ["Zateguje se okoli vratu brez omejitve", "Napačno orodje za vlečnike in vsakodnevne sprehode"], verdict: "Profesionalno orodje za kratke prenose, ne povodec za vsak dan." },
  },
};

const planAdult = [
  { n: "Pregled temeljev", items: ["Iskreno preizkusi osnove: sedi, prostor, ostani, odpoklic, vsako v dnevni sobi in na vrtu", "Vse, kar je majavo, znova treniraj s 3-minutnimi vajami, brez sramu, rja je normalna", "Izberi svojo valuto nagrad: kateri priboljšek psu zasveti oči"], note: "Ne predpostavljaj, da je karkoli trdno. Iskren preizkus ta teden prihrani 6 tednov frustracij pozneje." },
  { n: "Ponastavitev ohlapnega povodca", items: ["Hoja na ohlapnem povodcu, 10 minut dnevno na mirni poti", "Pravilo ustavi-se-ko-se-napne, vsakič", "Odmori za vohljanje na ukaz kot plača za sprehod"], note: "Ohlapen povodec je navada, ne trik. Doslednost vsakič premaga intenzivnost." },
  { n: "Nadzor impulzov", items: ["Pusti, od hrane na tleh do padle hrane", "Čakaj pri vratih in pred posodo s hrano", "Ostani: podaljšaj trajanje na 30 sekund, medtem ko se odmikaš"], note: "Odpoklic je življenjska veščina. Psa nikoli ne pokliči, da bi končal nekaj zabavnega, sicer ukaz začne pomeniti, da je zabave konec." },
  { n: "Umiritev na ukaz", items: ["Umiritev na podlogi med večerjo in televizijskimi večeri", "Mirno vedenje dobi tiho plačilo, kaos ne dobi nič", "Prva vaja za kavarno doma: podloga, žvečilo, 20 minut"], note: "Delo na umiritvi izgleda kot nič. Je najbolj uporabna stvar, ki se je lahko nauči odrasel pes." },
  { n: "Utrjevanje odpoklica", items: ["Odpoklic na dolgi vrvi v parku, plačaj kot loterijski dobitek", "Postopoma dodajaj motnje: razdalja do drugih psov, nato bližje", "Ukaz za nujno ustavitev kot ločena veščina"], note: "Nadzor impulzov se gradi v sekundah, ne minutah. Kratke ponovitve, visoka vrednost, odidi kot zmagovalec." },
  { n: "Rokovanje in nega", items: ["Naslon brade za nego: ušesa, oči, tačke", "Ščetkanje zob 3-krat ta teden", "Striženje ali brušenje krempljev, 1 tačka naenkrat"], note: "Motnja je pravi preizkus. Na novem kraju znižaj merila, to ni nazadovanje, to je trening." },
  { n: "Vedenje v javnosti", items: ["Pravi obisk kavarne ali restavracije, kratek in uspešen", "Vljudni pozdravi: sedi za pozdrav, brez skakanja", "Mirno čakanje, medtem ko se na ulici pogovarjaš"], note: "Odrasli psi se trikov naučijo hitreje kot mladički. Uporabi jih za obnovo samozavesti po težkem tednu." },
  { n: "Obogatitev in zaključek", items: ["Vohalne igre: iskanje priboljškov po stanovanju in vrtu", "Nauči 1 čisto zabaven trik kot nagrado za oba", "Teden pregleda: znova preizkusi 1. teden, proslavi razliko, načrtuj naprej"], note: "Vzdrževanje premaga popolnost. 5 minut 5 dni na teden ohrani vse, kar si zgradil." },
];

const planPup = [
  { n: "Prihod in povezovanje", items: ["Prepoznavanje imena", "Napolni označevalno besedo ali kliker", "Ritem učenja čistoče, ven vsake 1 do 2 uri"], note: "Ta teden brez pritiska z ukazi. Vezanje, spanje in čas za stranišče so učni načrt." },
  { n: "Prva veščina: Sedi", items: ["Sedi, 3 kratke vaje na dan", "Še naprej plačuj prepoznavanje imena", "Igre z boksom pri odprtih vratih"], note: "3 minute štejejo kot vaja. Kratko in veselo premaga dolgo in napeto." },
  { n: "Pridruži se Prostor", items: ["Prostor", "Ponovi Sedi v novih prostorih", "Rokovanje: dotikaj se tačk in ušes, plačaj vsak dotik"], note: "Če Prostor do nedelje ni gladek, je v redu. Prenesi ga v naslednji teden." },
  { n: "Pridi, temelj", items: ["Pridi v zaprtih prostorih, pingpong po hodniku", "Teden pregleda: Sedi in Prostor pred obroki", "Čakaj pri posodi s hrano, 2 sekundi"], note: "Odpoklic je maratonska veščina. Za zdaj samo v zaprtih prostorih." },
  { n: "Nadzor impulzov", items: ["Pusti, osnovna igra s pestjo", "Spusti med igro", "Še naprej plačuj odpoklic v zaprtih prostorih"], note: "Polovica treninga psov je učenje psa, da se odpoved bolj splača kot grabljenje." },
  { n: "Ven v svet", items: ["Ohlapen povodec, prvih 100 ohlapnih metrov", "Glej me na ulici", "Sedi pri 1 robniku na sprehod"], note: "Vlečenje je v tej starosti normalno. Ustavi-in-pojdi, brez cukanja, majhne razdalje." },
  { n: "Ostani se začne", items: ["Ostani, samo 1 do 5 sekund trajanja", "Na mesto na podlogo", "Ponovi odpoklic, zdaj z blagimi motnjami"], note: "Sekunde, ne minute. Če pes dvakrat zapored prekine Ostani, naredi lažje." },
  { n: "Teden utrjevanja", items: ["Brez novih veščin", "Mešane 5-minutne vaje ponavljanja vsega", "1 zabaven trik po tvoji izbiri za sladico"], note: "Tedni ponavljanja so napredek. Veščina je resnična šele, ko preživi teden mešane vadbe." },
  { n: "Na poti", items: ["Čakaj pri robniku, pri vsakem prečkanju", "Ohlapen povodec na bolj prometnih ulicah", "Mirna rutina za obiskovalce, prve postavitve"], note: "Svet je zdaj učilnica. Krajše poti z višjo kakovostjo premagajo dolge pohode." },
  { n: "Razdalja in trajanje", items: ["Ostani z 2 do 5 koraki razdalje", "Odpoklic zunaj na dolgi vrvi", "Prostor na podlogi, medtem ko kuhaš"], note: "Če katera veščina zaniha, se vrni teden nazaj. Koledar služi tebi, ne obratno." },
  { n: "Življenjske veščine", items: ["Umiritev pod mizo, prvi obisk kavarne", "Prve mirne vožnje z avtom", "Rokovanje kot pri veterinarju: tačke, ušesa, pregled zob"], note: "To so veščine, ki naredijo naslednjih 10 let lahkih. Vredne vsake ponovitve." },
  { n: "Teden zaključka", items: ["Brez novih veščin", "Mešane 5-minutne vaje ponavljanja celotnega nabora", "1 najljubši trik, zloščen za predstavo"], note: "12 tednov: imaš treniranega mladega psa in dnevno navado. Navada je pravo darilo ob zaključku." },
];

const puppy = {
  treatsguide: { n: "Priboljški: tvoja valuta za trening", body: ["Velikost: kot grah ali manjši. 5-minutna vaja lahko porabi 30 priboljškov, majhni ohranjajo kalorično računico razumno.", "Mehko premaga hrustljavo, premori za žvečenje ubijejo ritem treninga.", "Zgradi lestvico vrednosti: briketi za lahke naloge doma, sir, piščanec ali klobasa za odpoklic in težko delo zunaj.", "Priboljške vzemi iz dnevnega obroka hrane, kalorije treninga štejejo. Pravilo: priboljški v okviru približno 10 % dnevnega vnosa.", "Strupeno in prepovedano: čokolada, grozdje in rozine, čebula, česen, sladilo ksilitol, alkohol, kuhane kosti."] },
  clickerguide: { n: "Osnove klikerja", body: ["Kliker je natančen instrument: klik označi točen trenutek, ko si je pes zaslužil nagrado.", "Polnjenje: klik, nato priboljšek, 10- do 15-krat, dokler klik ne dvigne ušes. To je celotna priprava.", "Pogodba: vsak klik je vedno plačan. Brez izjem, sicer instrument izgubi vrednost.", "Čas klika premaga čas priboljška, priboljšek lahko pride 2 sekundi pozneje, klik ne.", "Brez klikerja pri roki: kratka označevalna beseda, kot je Ja, izrečena vedno enako, opravi isto nalogo malce manj natančno."] },
  teethguide: { n: "Časovnica menjave zob", body: ["3. do 6. teden: pride 28 mlečnih zob.", "3. do 7. mesec: mlečni zobje izpadejo, izraste 42 stalnih zob. Vrhunec pritiska za žvečenje, boleče dlesni, občasne krvave lise na igračah, vse normalno.", "Meni za olajšanje: gumijasta žvečila, mokra zamrznjena krpica, zamrznjeni kosi korenja pod nadzorom in žvečila iz kavovca ali oljke, ki se drobijo, namesto da bi se cepila kot palice z vrta.", "Občasno preveri zadržane mlečne zobe, dvojna vrsta podočnikov potrebuje veterinarjev pogled, pogosto pri majhnih pasmah.", "Do 7. meseca je nevihta večinoma mimo. Kable in čevlje zaščiti do takrat, ne za vedno."] },
  sleepguide: { n: "Spanje in dremeži", body: ["Mladički potrebujejo 16 do 20 ur spanja na dan. Večina napadov grizenja, norenja in cviljenja je preprosto preutrujen mladiček, ki bi moral že spati.", "Zgradi ritem dremežev: pri mladih mladičkih približno 1 ura budnosti, nato dremež. Igra, stranišče, nato v varen prostor spat.", "Dremeže uveljavljaj na mirnem, zatemnjenem mestu, pokrit boks ali ograjica delujeta. Preutrujen mladiček pogosto ne more zaspati sam sredi dogajanja v gospodinjstvu.", "Zaščiti nočno spanje: zadnje stranišče pozno zvečer, nato dolgočasna tema. Mladi mladički morda potrebujejo 1 nočni obisk stranišča, naj bo tih in poslovno.", "Če se mladiček spremeni v kopenskega morskega psa, ne treniraj skozi to. Čas je za dremež, ne za disciplino."] },
  homeguide: { n: "Prvi dnevi v novem domu", body: ["Zmanjšaj svet: 1 soba plus varen prostor za prve dni. Celotno stanovanje se zasluži postopoma, sobo za sobo, tako ostajata stranišče in žvečenje obvladljiva.", "Postavi bazo: ležišče ali boks, voda, žvečilo, v kotu, kjer te mladiček lahko vidi, a nemoteno počiva. To je zatočišče, nikoli prostor za kazen.", "Prva noč: razdalja spanja je pomembna. Mnogi mladički se prve noči hitreje umirijo ob postelji, ležišče lahko pozneje preseliš.", "Prvi teden naj bo namerno dolgočasen: brez parad obiskovalcev, brez zabav za mladičke. Mladiček predeluje izgubo legla, gospodinjstvo je dovolj vznemirjenja.", "Rutine začni od 1. dne: isti čas hranjenja, ista vrata za stranišče, iste besede. Predvidljivost je način, kako se mladiček nauči, da je svet varen."] },
  socialguide: { n: "Okno socializacije", body: ["Približno od 3. do 14. tedna starosti je obdobje, ko mladički izkušnje shranjujejo kot normalne. Kar je zdaj mirno doživeto, je dolgočasno za vse življenje, kar je zamujeno, lahko pozneje zahteva pravo delo.", "Socializacija pomeni mirno izpostavljanje, ne največ stika. Opazovanje avtobusa s 30 metrov ob jedenju priboljškov je popolna socializacija, biti obkoljen s 5 psi pa ni.", "Delaj po seznamu: površine (trava, kovinske rešetke, stopnice), zvoki (promet, sesalnik, posnetki grmenja na nizki glasnosti), ljudje (klobuki, brade, invalidski vozički, otroci na razdalji), rokovanje (tačke, ušesa, gobec).", "Pred popolnim cepljenjem: nosi mladička skozi živahne kraje, obišči cepljene prijateljske pse doma, sedi na klopi blizu življenja. Izpostavljanje ne zahteva stika s pločnikom.", "Eno pravilo nad vsemi: mladiček določa tempo. Prisilni pozdravi učijo strah, prostovoljni pristop uči samozavest."] },
  aloneguide: { n: "Samota od 1. dne", body: ["Biti sam je veščina, ne privzeta nastavitev. Mladički, ki tega nikoli ne vadijo, postanejo psi, ki paničarijo, začni s sekundami, ne z urami.", "1. dan: stopi iz sobe za 10 sekund, medtem ko mladiček jé iz igrače za hrano, vrni se pred vsakim vznemirjenjem. To je ena ponovitev.", "Podaljšuj počasi: sekunde v minute v mirno kavo pred vrati. Pusti napolnjeno žvečilo, odhodi in prihodi naj bodo popolnoma dolgočasni, brez dramatičnih slovesov.", "Cilj je mladiček, ki lahko v prvih tednih sam dremlje 30 do 60 minut, vedno po gibanju, stranišču in z nečim za žvečenje.", "Če mladiček paničari, namesto da protestira, ne vztrajaj skozi jok, zmanjšaj korak. Pravi ločitveni stres si zgodaj zasluži strokovni načrt, sam se ne popravi."] },
  walksguide: { n: "Sprehodi z mladičkom: kako dolgo, kako pogosto", body: ["Pravilo: približno 5 minut strukturirane hoje na mesec starosti, 1- do 2-krat na dan. 4-mesečni mladiček: približno 20 minut na sprehod.", "To omejuje prisilno korakanje, ne gibanja. Prosta igra, vohljanje in čas na mehki podlagi se uravnavajo sami.", "Vohljanje JE sprehod. Počasna 20-minutna vohalna tura utrudi mladička bolj kot 40 hitrih minut.", "Rastoči sklepi ne marajo dolgih pohodov, maratonov po stopnicah, skokov z višine in teka po asfaltu. Tek in kolesarjenje prihrani za 12 do 18 mesecev.", "Opazuj mladička, ne ure: zaostajanje, uleganje ali besno grizenje sredi sprehoda pomeni, da je bilo preveč. Majhnega mladička raje odnesi domov, kot da ga vlečeš.", "3 do 4 kratki izleti premagajo 1 dolgega, in vsak izlet je hkrati učenje čistoče."] },
  heatguide: { n: "Vodnik za prvo gonitev", body: ["Čas: prva gonitev med 6. in 15. mesecem, majhne pasme prej, velike pasme pozneje. Ponavlja se približno vsakih 6 do 8 mesecev.", "Trajanje: približno 2 do 4 tedne. Znaki: otečena vulva, krvav izcedek, pogostejše lulanje, nihanje razpoloženja, magnetna privlačnost za vsakega samca v okolici.", "Upravljanje: ves čas samo na povodcu, brez pasjih parkov, brez nenadzorovanega časa na vrtu, po potrebi higienske hlačke v zaprtih prostorih.", "Lahko je lepljiva, utrujena ali izbirčna pri hrani. Vse normalno, rutine naj ostanejo mirne.", "Po prvi gonitvi se z veterinarjem pogovori o prednostih, slabostih in času sterilizacije. Obstajajo pravi argumenti na obeh straneh in velikost pasme je pomembna, to je osebna odločitev, ne privzeta.", "Datume zapiši v koledar. Predvidljivost naredi 2. krog lahek."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
