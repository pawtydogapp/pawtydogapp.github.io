/* Polski: treści poza umiejętnościami i poradnikami zachowań (zob. cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Łatwe", 2: "Średnie", 3: "Zaawansowane" };
const quest = { new: "Nowa umiejętność", cont: "Tak trzymaj", prac: "Odświeżenie" };
const levels = [{ n: "Początkujący" }, { n: "Uczeń" }, { n: "Absolwent" }, { n: "Pro" }, { n: "Mistrz" }, { n: "Arcymistrz" }, { n: "Legenda" }];
const ranks = [{ n: "Nowicjusz" }, { n: "Praktykant" }, { n: "Przewodnik" }, { n: "Trener" }, { n: "Ekspert" }, { n: "Specjalista" }, { n: "Kompletny" }];

const stucks = {
  cmd: "Utknęliście? Ułatw, nie podnoś głosu. Cofnij się o krok, zdobądź 2 łatwe sukcesy i zakończ. Pokaż jeszcze raz z pomocą smakołyka zamiast powtarzać komendę. Jeśli pies wstaje z pozycji, nagradzaj szybciej w następnym powtórzeniu.",
  trick: "Utknęliście? Podziel sztuczkę na mniejsze kawałki i płać za najmniejszy. Nagraj sesję, większość problemów ze sztuczkami kryje się w ludzkiej ręce, nie w psie.",
  agi: "Odmawia przeszkody? Obniż, skróć lub wróć do płacenia za same próby. Nigdy nie popychaj ani nie podnoś psa na sprzęt, jedno przestraszone powtórzenie kosztuje tygodnie.",
  life: "Przytłoczony bardziej niż utknięty? Dodaj dystans, skróć wyjście, zakończ spokojnie i spróbuj innego dnia. Praca nad ekspozycją zawodzi głośno, ale szybko się odbudowuje.",
};

const ladders = {
  cmd: [
    ["Sesja 1 · Pokazuj, nie testuj", "Prowadź każde powtórzenie smakołykiem w dłoni, nagradzaj w ciągu 1 sekundy. Sukces = zachowanie w ogóle się wydarzyło, z całą Twoją pomocą."],
    ["Sesje 2 do 4 · Prowadź i nazywaj", "Nadal prowadź, wypowiedz komendę raz tuż przed zachowaniem. Sukces = 3 do 5 wspomaganych powtórzeń z rzędu."],
    ["Sesje 5 do 7 · Usuń przynętę", "Pusta dłoń, ten sam ruch, nagroda z saszetki. Pozycje zasługują na 1 do 3 sekund czekania przed wypłatą."],
    ["Od sesji 8 · Najpierw komenda", "Jedna komenda, bez przynęty. Zwiększaj jedną trudność naraz: czas trwania powyżej 5 sekund, nowe pomieszczenia, lekkie rozproszenie."],
  ],
  trick: [
    ["Sesja 1 · Goń przynętę", "Duża, wyraźna przynęta, natychmiastowa wypłata za każdy ruch we właściwym kierunku. Sukces = surowa wersja wydarzyła się raz."],
    ["Sesje 2 do 4 · Kształtuj", "Płać za najlepsze 3 z 5 prób, resztę ignoruj. Wypowiadaj komendę raz na powtórzenie. Serie po 3 do 5 powtórzeń, sztuczki męczą mózg."],
    ["Sesje 5 do 7 · Zmniejsz pomoc", "Przynęta staje się małym gestem ręki. Precyzja rośnie: najczystsze powtórzenia zarabiają podwójny smakołyk."],
    ["Od sesji 8 · Czas na show", "Najpierw komenda, gest ręki tylko jako zapas. Nowe pomieszczenia, potem przed ludźmi. Oklaski liczą się jako rozproszenie."],
  ],
  agi: [
    ["Sesja 1 · Zrób malutko", "Poprzeczka na ziemi, tunel krótki, stół nisko. Sukces = 1 radosna próba, opłacona jak jackpot."],
    ["Sesje 2 do 4 · Buduj miłość, nie wysokość", "Powtarzaj łatwą wersję, aż pies zacznie ciągnąć Cię do przeszkody. Najpierw pewność siebie, potem kryteria."],
    ["Sesje 5 do 7 · Podnieś jedną rzecz", "Wysokość, długość lub kąt, nigdy dwie w jednej sesji. Wypowiedz komendę przeszkody, gdy pies się decyduje."],
    ["Od sesji 8 · Szybkość i sekwencja", "Wysyłaj z kilku kroków, łącz 2 przeszkody, sesje poniżej 10 minut. Radość jest silnikiem agility."],
  ],
  life: [
    ["Wyjście 1 · Odkrywaj, nie naciskaj", "Krótka, łatwa wersja, poniżej progu stresu. Sukces = spokojne chwile w sytuacji, potem odejście w dobrym nastroju."],
    ["Wyjścia 2 do 4 · Dystans to Twoje pokrętło", "Powtarzaj w odległości lub czasie, w których pies wciąż może jeść, wąchać i patrzeć na Ciebie. Płać za spokój nieustannie."],
    ["Wyjścia 5 do 7 · Zmniejszaj lukę", "Bliżej, dłużej lub w większym tłumie, jedno pokrętło na wyjście. Wycofanie się to strategia, nie porażka."],
    ["Od wyjścia 8 · Zrób z tego rutynę", "Zmieniaj dni, miejsca i pory, aby spokój się uogólnił. Ocena 5 oznacza zrelaksowany od przyjścia do wyjścia."],
  ],
};

const badges = {
  b_first: { n: "Pierwsza sesja", d: "Zapisano Twoją pierwszą sesję treningową." },
  b_five: { n: "Pierwsze 5 łap", d: "Komenda po raz pierwszy oceniona na 5 z 5." },
  b_master1: { n: "Pierwsze opanowanie", d: "Pierwsza opanowana komenda: 3 czyste piątki z rzędu." },
  b_master5: { n: "Piątka, razy pięć", d: "5 opanowanych komend." },
  b_master10: { n: "Dwucyfrowo", d: "10 opanowanych komend." },
  b_streak3: { n: "Seria 3 dni", d: "Trening 3 dni z rzędu." },
  b_streak7: { n: "Seria 7 dni", d: "Cały tydzień codziennego treningu." },
  b_streak14: { n: "Seria 14 dni", d: "Dwa tygodnie z rzędu. Rutyna jest prawdziwa." },
  b_streak30: { n: "Seria 30 dni", d: "Miesiąc konsekwencji. Elitarne terytorium." },
  b_streak60: { n: "Seria 60 dni", d: "Dwa miesiące bez opuszczonego dnia. Niezwykły zespół." },
  b_streak100: { n: "Seria 100 dni", d: "Sto dni z rzędu. Status legendy." },
  b_gear: { n: "W pełni wyposażony", d: "Wszystkie niezbędne rzeczy odhaczone." },
  b_scholar: { n: "Psi uczony", d: "Przeczytano 10 poradników w bibliotece Nauki." },
  b_fixer: { n: "Czytelnik zachowań", d: "Przeczytano 5 poradników zachowań. Zrozumienie wygrywa z korygowaniem." },
  b_life1: { n: "W świat", d: "Zapisano pierwszą sesję umiejętności życiowej." },
  b_travel: { n: "Bilety proszę", d: "Opanowano umiejętność podróżną: autobus, łódź lub samolot." },
  b_social: { n: "Motyl towarzyski", d: "Opanowano spokojne spotkanie z psem lub kotem." },
  b_spa: { n: "Bywalec spa", d: "Opanowano groomera, pazury lub uszy." },
  b_vet: { n: "Ulubieniec weterynarza", d: "Opanowano radosne wizyty u weterynarza." },
  b_hotel: { n: "Mistrz nocowania", d: "Opanowano pobyt w hotelu dla psów." },
  b_trick1: { n: "Czas na show", d: "Pierwsza opanowana sztuczka." },
  b_agi1: { n: "Nowicjusz agility", d: "Pierwsza opanowana przeszkoda agility." },
  b_sess50: { n: "50 sesji", d: "Zapisano 50 sesji treningowych." },
  b_sess100: { n: "Klub stu", d: "Zapisano 100 sesji treningowych." },
  b_xp500: { n: "500 XP", d: "Osiągnięto 500 XP." },
  b_xp1000: { n: "1 000 XP", d: "Osiągnięto 1 000 XP." },
  b_read25: { n: "Karta biblioteczna", d: "Przeczytano 25 poradników." },
  b_school: { n: "Prymus", d: "Opanowano wszystkie 3 etapy szkoły dla psów: pierwsza lekcja, semestr, egzamin." },
  b_quest7: { n: "Cud tygodnia", d: "Ukończono 7 dziennych misji. Nawyk się tworzy." },
  b_quest21: { n: "Bohater nawyku", d: "Ukończono 21 dziennych misji. To już styl życia." },
  b_master25: { n: "Ćwierć setki", d: "25 opanowanych umiejętności." },
  b_master50: { n: "W połowie drogi", d: "50 opanowanych umiejętności. Pół biblioteki." },
  b_master99: { n: "Do samego końca", d: "Wszystkie 99 umiejętności opanowane. Nie ma już czego uczyć." },
  b_xp3000: { n: "3 000 XP", d: "Osiągnięto poziom Mistrz." },
  b_xp10000: { n: "10 000 XP", d: "Dziesięć tysięcy XP konsekwencji." },
  b_sess250: { n: "250 sesji", d: "Zapisano 250 sesji treningowych." },
};

const equip = {
  must: {
    collar: { n: "Płaska obroża z adresatką", note: "Wymagane dane na adresatce się różnią, numer telefonu zawsze." },
    harness: { n: "Szelki typu Y", note: "Codzienne spacery i trening, bez nacisku na gardło." },
    leash: { n: "Stała smycz 1,5 do 2 m", note: "Standardowa smycz do treningu i miasta." },
    pouch: { n: "Saszetka na smakołyki", note: "Szybka wypłata to dobry trening. Kieszenie są za wolne." },
    treats: { n: "Miękkie smakołyki wielkości groszku", note: "Małe i miękkie, 50 nagród na sesję musi być możliwe." },
    bags: { n: "Woreczki na odchody z dozownikiem", note: "Obywatelski obowiązek bez dyskusji." },
    bowls: { n: "Miski na wodę i jedzenie", note: "Antypoślizgowe. Ceramika lub stal wygrywają z plastikiem." },
    bed: { n: "Legowisko lub mata", note: "Cel komendy Na miejsce i kwatera główna drzemek." },
    crate: { n: "Klatka kennelowa lub kojec", note: "Nora, pomoc w nauce czystości, bezpieczeństwo w podróży." },
    chews: { n: "2 do 3 gryzaków", note: "Rotuj, aby były nowe. Ubezpieczenie na ząbkowanie." },
    brush: { n: "Szczotka lub grzebień do typu sierści", note: "Rasy z długą sierścią: codziennie. Zapytaj groomera o narzędzie." },
    vetkit: { n: "Podstawowa apteczka pielęgnacyjna", note: "Kleszczołapka, cążki do pazurów dla psów, psi szampon." },
    dental: { n: "Szczoteczka i pasta do zębów dla psa", note: "Tylko enzymatyczna pasta dla psów, nigdy ludzka. Codziennie to ideał, 3 razy w tygodniu to realne życie." },
  },
  nice: {
    clicker: { n: "Kliker", note: "Precyzyjny marker. Zobacz Kącik szczeniaka." },
    longline: { n: "Długa linka 5 do 10 m", note: "Pomost między nauką przywołania a spacerem bez smyczy." },
    kong: { n: "Gumowa zabawka do wypełniania", note: "Zamroź wypełnioną, kupuje 20 minut spokoju." },
    snuffle: { n: "Mata węchowa", note: "Wywąchiwanie kolacji męczy mózg." },
    lickmat: { n: "Mata do lizania", note: "Odwrócenie uwagi przy pielęgnacji i kąpieli." },
    carrest: { n: "Certyfikowana klatka lub szelki samochodowe", note: "Bezpieczeństwo w każdej podróży." },
    whistle: { n: "Gwizdek do przywołania", note: "Stały dźwięk, niesie dalej niż głos." },
    raincoat: { n: "Płaszcz przeciwdeszczowy dla psów o cienkiej sierści", note: "Niektóre psy go potrzebują, wiele nie." },
    gps: { n: "Lokalizator GPS", note: "Spokój ducha w fazie bez smyczy." },
    puzzle: { n: "Zabawki logiczne na smakołyki", note: "Praca dla mózgu na deszczowe dni." },
    agility: { n: "Mini zestaw agility", note: "Zabawa w ogrodzie, gdy pies dorośnie." },
    gate: { n: "Bramka dla dzieci", note: "Tanie zarządzanie przestrzenią podczas treningu." },
    basket: { n: "Koszyk lub przyczepka rowerowa", note: "Małe i średnie psy. Najpierw naucz jak legowiska, zawsze przypinaj szelki." },
  },
};

const leash = {
  gear: {
    collar: { n: "Obroża", pros: ["Lekka i prosta, nosi adresatkę", "Szybko zakładana i zdejmowana", "W porządku dla wyszkolonych psów, które nie ciągną"], cons: ["Cały nacisk trafia na gardło", "Ryzykowna dla ciągnących: tchawica, tarczyca i szyja pod obciążeniem", "Niektóre psy wyślizgują się z luźnych obroży"], verdict: "Zostaw ją na adresatkę. Spaceruj na niej tylko wtedy, gdy smycz pozostaje luźna." },
    yharness: { n: "Szelki typu Y", pros: ["Nacisk na klatkę piersiową i barki, nie na gardło", "Trudne do zsunięcia przy dobrym dopasowaniu", "Najlepszy domyślny wybór dla szczeniąt i treningu"], cons: ["Dopasowanie ma znaczenie, paski nie mogą krzyżować ruchu barku", "Nieco dłużej się zakłada", "Źle zaprojektowane szelki mogą obcierać pod pachami"], verdict: "Opinia: właściwy domyślny wybór dla większości psów. Kształt Y na klatce, 2 palce luzu wszędzie." },
    frontclip: { n: "Szelki z zapięciem z przodu", pros: ["Obracają psa w Twoją stronę, gdy ciągnie, mechanika pomaga w przeuczeniu", "Bez bólu"], cons: ["Narzędzie, nie lekarstwo, trening nadal potrzebny", "Ciągłe chodzenie na przednim zapięciu może wpłynąć na chód, używaj podczas przeuczania"], verdict: "Dobra tymczasowa pomoc dla mocno ciągnących obok treningu luźnej smyczy." },
  },
  leashes: {
    fixed: { n: "Stała smycz 1,5 do 2 m", pros: ["Przewidywalna długość, jasna komunikacja", "Standard do treningu i miasta"], cons: ["Mały promień wąchania na wiejskich spacerach"], verdict: "Domyślny wybór. Kup jakość raz." },
    longline: { n: "Długa linka 5 do 10 m", pros: ["Wolność z siatką bezpieczeństwa", "Narzędzie do przywołania i pracy bez smyczy"], cons: ["Ryzyko otarć od liny, rękawiczki pomagają", "Wymaga otwartej przestrzeni i trochę wprawy"], verdict: "Najlepsza inwestycja treningowa po smakołykach." },
    flexi: { n: "Smycz automatyczna (flexi)", pros: ["Wygodny promień dla wyszkolonych, spokojnych psów na otwartym terenie"], cons: ["Uczy ciągnięcia, napięcie wydłuża zasięg", "Udokumentowane urazy od linki u ludzi i psów", "Brak kontroli w nagłych sytuacjach drogowych", "Zakazana lub źle widziana w wielu szkołach dla psów"], verdict: "Opinia: całkowicie pomiń podczas treningu. Jeśli w ogóle, tylko taśmowa, tylko na otwartym terenie." },
    slip: { n: "Smycz zaciskowa (slip)", pros: ["Szybka do krótkich przekazań, powszechna u weterynarzy i w schroniskach"], cons: ["Zaciska się na szyi bez ograniczenia", "Złe narzędzie dla ciągnących i na codzienne spacery"], verdict: "Narzędzie profesjonalne do krótkich przekazań, nie smycz na co dzień." },
  },
};

const planAdult = [
  { n: "Audyt podstaw", items: ["Szczerze przetestuj podstawy: siad, waruj, zostań, przywołanie, każde w salonie i w ogrodzie", "Przeucz wszystko, co się chwieje, sesjami po 3 minuty, bez wstydu, rdza jest normalna", "Wybierz swoją walutę nagrody: który smakołyk sprawia, że psu błyszczą oczy"], note: "Nie zakładaj, że coś jest solidne. Szczery test w tym tygodniu oszczędza 6 tygodni frustracji później." },
  { n: "Reset luźnej smyczy", items: ["Spacer na luźnej smyczy, 10 minut dziennie spokojną trasą", "Zasada stój-gdy-napięta, za każdym razem", "Przerwy na wąchanie na komendę jako wypłata za spacer"], note: "Luźna smycz to nawyk, nie sztuczka. Konsekwencja wygrywa z intensywnością, za każdym razem." },
  { n: "Kontrola impulsów", items: ["Zostaw, od jedzenia na podłodze po spadające jedzenie", "Czekaj przy drzwiach i przed miską", "Zostań: wydłuż czas do 30 sekund, gdy się oddalasz"], note: "Przywołanie to umiejętność życiowa. Nigdy nie wołaj psa, aby zakończyć coś przyjemnego, inaczej komenda zacznie oznaczać koniec zabawy." },
  { n: "Wyciszenie na komendę", items: ["Wyciszenie na macie podczas kolacji i wieczorów z telewizorem", "Spokojne zachowanie dostaje cichą wypłatę, chaos nie dostaje nic", "Pierwsza domowa próba kawiarni: mata, gryzak, 20 minut"], note: "Praca nad wyciszeniem wygląda jak nicnierobienie. To najbardziej użyteczna rzecz, jakiej może nauczyć się dorosły pies." },
  { n: "Wzmocnienie przywołania", items: ["Przywołanie na długiej lince w parku, opłacone jak wygrana na loterii", "Dodawaj rozproszenia stopniowo: dystans od innych psów, potem bliżej", "Komenda awaryjnego zatrzymania jako osobna umiejętność"], note: "Kontrolę impulsów buduje się w sekundach, nie minutach. Krótkie powtórzenia, wysoka wartość, kończ jako zwycięzca." },
  { n: "Dotyk i pielęgnacja", items: ["Oparcie brody do dotykania: uszy, oczy, łapy", "Szczotkowanie zębów 3 razy w tym tygodniu", "Sesja pazurów cążkami lub pilnikiem, 1 łapa na raz"], note: "Rozproszenie to prawdziwy test. Obniż kryteria w nowym miejscu, to nie regres, to trening." },
  { n: "Maniery w miejscach publicznych", items: ["Prawdziwa wizyta w kawiarni lub restauracji, krótka i udana", "Grzeczne powitania: siad na powitanie, bez skakania", "Spokojne czekanie, gdy rozmawiasz z kimś na ulicy"], note: "Dorosłe psy uczą się sztuczek szybciej niż szczeniaki. Użyj ich do odbudowy pewności siebie po trudnym tygodniu." },
  { n: "Wzbogacenie i dyplom", items: ["Gry węchowe: polowanie na smakołyki w mieszkaniu i ogrodzie", "Naucz 1 czysto zabawnej sztuczki jako nagrody dla was obojga", "Tydzień powtórki: powtórz test z tygodnia 1, świętuj różnicę, zaplanuj kolejny krok"], note: "Utrzymanie wygrywa z perfekcją. 5 minut 5 dni w tygodniu zachowuje wszystko, co zbudowałeś/aś." },
];

const planPup = [
  { n: "Przybycie i więź", items: ["Rozpoznawanie imienia", "Naładuj słowo-marker lub kliker", "Rytm nauki czystości, na dwór co 1 do 2 godzin"], note: "W tym tygodniu bez presji komend. Więź, sen i pory siusiania to program." },
  { n: "Pierwsza umiejętność: Siad", items: ["Siad, 3 krótkie sesje dziennie", "Nadal płać za rozpoznawanie imienia", "Zabawy z klatką przy otwartych drzwiczkach"], note: "3 minuty liczą się jako sesja. Krótko i wesoło wygrywa z długo i nerwowo." },
  { n: "Dołącza Waruj", items: ["Waruj", "Powtórz Siad w nowych pomieszczeniach", "Dotyk: dotykaj łap i uszu, płać za każdy dotyk"], note: "Jeśli Waruj nie jest płynne do niedzieli, nic nie szkodzi. Przenieś je na następny tydzień." },
  { n: "Do mnie, fundament", items: ["Do mnie w domu, ping-pong przez korytarz", "Tydzień powtórki: Siad i Waruj przed posiłkami", "Czekaj przy misce, 2 sekundy"], note: "Przywołanie to umiejętność maratońska. Na razie tylko w domu." },
  { n: "Kontrola impulsów", items: ["Zostaw, podstawowa gra z pięścią", "Puść podczas zabawy", "Nadal płać za przywołanie w domu"], note: "Połowa szkolenia psa to nauczenie go, że odpuszczenie opłaca się bardziej niż chwytanie." },
  { n: "W świat", items: ["Luźna smycz, pierwsze 100 luźnych metrów", "Patrz na mnie na ulicy", "Siad przy 1 krawężniku na spacer"], note: "Ciągnięcie jest normalne w tym wieku. Stój i idź, bez szarpania, malutkie dystanse." },
  { n: "Zostań się zaczyna", items: ["Zostań, tylko 1 do 5 sekund", "Na miejsce na macie", "Powtórz przywołanie, teraz z lekkimi rozproszeniami"], note: "Sekundy, nie minuty. Przerwanie Zostań dwa razy z rzędu oznacza, że trzeba ułatwić." },
  { n: "Tydzień utrwalenia", items: ["Bez nowych umiejętności", "Mieszane 5-minutowe powtórki wszystkiego", "1 zabawna sztuczka według Twojego wyboru na deser"], note: "Tygodnie powtórek to postęp. Umiejętność jest prawdziwa dopiero wtedy, gdy przetrwa tydzień mieszanej praktyki." },
  { n: "W ruchu", items: ["Czekaj przy krawężniku, na każdym przejściu", "Luźna smycz na ruchliwszych ulicach", "Spokojna rutyna z gośćmi, pierwsze ustawienia"], note: "Świat jest teraz salą lekcyjną. Krótsze trasy wyższej jakości wygrywają z długimi marszami." },
  { n: "Dystans i czas", items: ["Zostań z 2 do 5 krokami dystansu", "Przywołanie na dworze na długiej lince", "Waruj na macie, gdy gotujesz"], note: "Jeśli jakaś umiejętność się chwieje, cofnij się o tydzień. Kalendarz służy Tobie, nie odwrotnie." },
  { n: "Umiejętności życiowe", items: ["Wyciszenie pod stołem, pierwsza wizyta w kawiarni", "Pierwsze spokojne jazdy samochodem", "Dotyk w stylu weterynaryjnym: łapy, uszy, sprawdzanie zębów"], note: "To umiejętności, które ułatwiają następne 10 lat. Warte każdego powtórzenia." },
  { n: "Tydzień dyplomu", items: ["Bez nowych umiejętności", "Mieszane 5-minutowe powtórki całego zestawu", "1 ulubiona sztuczka, dopracowana na pokaz"], note: "12 tygodni później: masz wyszkolonego młodego psa i codzienny nawyk. Nawyk to prawdziwy prezent na zakończenie." },
];

const puppy = {
  treatsguide: { n: "Smakołyki: Twoja waluta treningowa", body: ["Rozmiar: groszek lub mniejszy. 5-minutowa sesja może zużyć 30 smakołyków, małe utrzymują rozsądny bilans kalorii.", "Miękkie wygrywa z chrupiącym, przerwy na gryzienie psują rytm treningu.", "Zbuduj drabinę wartości: sucha karma do łatwych zadań w domu, ser, kurczak lub kiełbasa do przywołania i trudnej pracy na dworze.", "Odejmuj smakołyki od dziennej porcji, kalorie treningowe się liczą. Zasada: smakołyki w granicach około 10% dziennego spożycia.", "Toksyczne i zakazane: czekolada, winogrona i rodzynki, cebula, czosnek, słodzik ksylitol, alkohol, gotowane kości."] },
  clickerguide: { n: "Podstawy klikera", body: ["Kliker to precyzyjny instrument: klik oznacza dokładny moment, w którym pies zasłużył na nagrodę.", "Ładowanie: klik, potem smakołyk, 10 do 15 razy, aż klik podniesie uszy. To cała konfiguracja.", "Umowa: każdy klik jest zawsze opłacany. Bez wyjątków, inaczej instrument traci wartość.", "Timing kliku wygrywa z timingiem smakołyka, smakołyk może przyjść 2 sekundy później, klik nie.", "Bez klikera pod ręką: krótkie słowo-marker jak Tak, wypowiadane zawsze tak samo, robi tę samą robotę nieco mniej precyzyjnie."] },
  teethguide: { n: "Oś czasu ząbkowania", body: ["Tygodnie 3 do 6: pojawia się 28 zębów mlecznych.", "Miesiące 3 do 7: zęby mleczne wypadają, wyrasta 42 zębów stałych. Szczyt potrzeby gryzienia, bolące dziąsła, okazjonalne plamki krwi na zabawkach, wszystko normalne.", "Menu ulgi: gumowe gryzaki, mokra zamrożona myjka, zamrożone kawałki marchewki pod nadzorem oraz gryzaki z drewna kawowego lub oliwnego, które się kruszą zamiast rozszczepiać jak patyki z ogrodu.", "Sprawdzaj od czasu do czasu, czy nie zostały zęby mleczne, podwójny rząd kłów wymaga spojrzenia weterynarza, częste u małych ras.", "Do miesiąca 7 burza w większości mija. Do tego czasu chroń kable i buty, nie na zawsze."] },
  sleepguide: { n: "Sen i drzemki", body: ["Szczeniaki potrzebują 16 do 20 godzin snu dziennie. Większość napadów gryzienia, szaleństwa i marudzenia to po prostu przemęczony szczeniak, który powinien już spać.", "Zbuduj rytm drzemek: u młodych szczeniąt około 1 godzina czuwania, potem drzemka. Zabawa, siusiu, potem do bezpiecznego miejsca spać.", "Egzekwuj drzemki w cichym, zaciemnionym miejscu, przykryta klatka lub kojec działają. Przemęczony szczeniak często nie potrafi sam zasnąć w środku domowego zgiełku.", "Chroń nocny sen: ostatnie siusiu późnym wieczorem, potem nudna ciemność. Młode szczeniaki mogą potrzebować 1 nocnego wyjścia, niech będzie ciche i rzeczowe.", "Jeśli szczeniak zamienia się w lądowego rekina, nie trenuj przez to. To pora drzemki, nie dyscypliny."] },
  homeguide: { n: "Pierwsze dni w nowym domu", body: ["Zmniejsz świat: 1 pokój plus bezpieczne miejsce na pierwsze dni. Całe mieszkanie zdobywa się stopniowo, pokój po pokoju, dzięki temu czystość i gryzienie pozostają pod kontrolą.", "Urządź bazę: legowisko lub klatka, woda, jeden gryzak, w kącie, z którego szczeniak Cię widzi, ale odpoczywa bez zakłóceń. To schronienie, nigdy kąt kary.", "Pierwsza noc: odległość spania ma znaczenie. Wiele szczeniąt szybciej się uspokaja tuż przy łóżku przez pierwsze noce, legowisko możesz przenieść później.", "Pierwszy tydzień celowo nudny: bez parady gości, bez imprez szczeniaka. Szczeniak przetwarza utratę miotu, dom to już dość emocji.", "Zacznij rutyny od dnia 1: te same pory posiłków, te same drzwi na siusiu, te same słowa. Przewidywalność to sposób, w jaki szczeniak uczy się, że świat jest bezpieczny."] },
  socialguide: { n: "Okno socjalizacji", body: ["Około 3 do 14 tygodnia życia to okres, w którym szczeniaki zapisują doświadczenia jako normalne. To, co teraz przeżyte spokojnie, jest nudne na całe życie, to, co pominięte, może później wymagać prawdziwej pracy.", "Socjalizacja oznacza spokojną ekspozycję, nie maksymalny kontakt. Patrzenie na autobus z 30 metrów podczas jedzenia smakołyków to idealna socjalizacja, otoczenie przez 5 psów nie.", "Pracuj z listą: podłoża (trawa, metalowe kratki, schody), dźwięki (ruch uliczny, odkurzacz, nagrania burzy cicho), ludzie (kapelusze, brody, wózki inwalidzkie, dzieci z dystansu), dotyk (łapy, uszy, pysk).", "Przed pełnymi szczepieniami: noś szczeniaka przez ruchliwe miejsca, odwiedzaj zaszczepione zaprzyjaźnione psy w ich domach, usiądź na ławce blisko życia. Ekspozycja nie wymaga dotykania chodnika.", "Jedna zasada ponad wszystkie: szczeniak nadaje tempo. Wymuszone powitania uczą strachu, dobrowolne podejście uczy pewności siebie."] },
  aloneguide: { n: "Czas w samotności od dnia 1", body: ["Bycie samemu to umiejętność, nie ustawienie fabryczne. Szczeniaki, które nigdy tego nie ćwiczą, stają się psami, które panikują, zacznij od sekund, nie godzin.", "Dzień 1: wyjdź z pokoju na 10 sekund, gdy szczeniak je z zabawki na jedzenie, wróć przed jakimkolwiek niepokojem. To jedno powtórzenie.", "Wydłużaj powoli: sekundy w minuty w spokojną kawę za drzwiami. Zostaw wypełniony gryzak, wyjścia i powroty niech będą kompletnie nudne, bez dramatycznych pożegnań.", "Celuj w szczeniaka, który w pierwszych tygodniach potrafi drzemać sam 30 do 60 minut, zawsze po ruchu, siusiu i z czymś do gryzienia.", "Jeśli szczeniak panikuje zamiast protestować, nie przepychaj przez płacz, zmniejsz krok. Prawdziwy stres separacyjny zasługuje na wczesny profesjonalny plan, sam się nie naprawia."] },
  walksguide: { n: "Spacery szczeniaka: jak długo, jak często", body: ["Zasada: około 5 minut zorganizowanego spaceru na miesiąc życia, 1 do 2 razy dziennie. Szczeniak 4-miesięczny: około 20 minut na spacer.", "To ogranicza wymuszony marsz, nie ruch. Swobodna zabawa, wąchanie i czas na miękkim podłożu regulują się same.", "Wąchanie TO spacer. Powolna 20-minutowa wyprawa węchowa męczy szczeniaka bardziej niż 40 minut szybkiego marszu.", "Rosnące stawy nie lubią długich wędrówek, maratonów po schodach, skoków z wysokości i biegania po asfalcie. Bieganie i rower zostaw na 12 do 18 miesięcy.", "Patrz na szczeniaka, nie na zegarek: zostawanie w tyle, kładzenie się lub gorączkowe gryzienie w połowie spaceru oznacza, że było za dużo. Małego szczeniaka nieś do domu zamiast go ciągnąć.", "3 do 4 krótkich wyjść wygrywa z 1 długim, a każde wyjście to też nauka czystości."] },
  heatguide: { n: "Przewodnik po pierwszej cieczce", body: ["Kiedy: pierwsza cieczka między 6 a 15 miesiącem, małe rasy wcześniej, duże później. Powtarza się mniej więcej co 6 do 8 miesięcy.", "Czas trwania: około 2 do 4 tygodni. Objawy: obrzęk sromu, krwawa wydzielina, częstsze siusianie, wahania nastroju, magnetyczne przyciąganie wszystkich samców w okolicy.", "Zarządzanie: przez cały czas tylko na smyczy, bez psich parków, bez czasu w ogrodzie bez nadzoru, majtki higieniczne w domu w razie potrzeby.", "Może być lepka, zmęczona lub wybredna w jedzeniu. Wszystko normalne, utrzymuj spokojne rutyny.", "Po pierwszej cieczce porozmawiaj z weterynarzem o zaletach, wadach i terminie sterylizacji. Są prawdziwe argumenty po obu stronach, a wielkość rasy ma znaczenie, to osobista decyzja, nie automatyzm.", "Zapisz daty w kalendarzu. Przewidywalność sprawia, że druga runda jest łatwa."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
