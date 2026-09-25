/* Italiano: contenuti esclusi abilità e guide comportamentali (vedi cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Facile", 2: "Intermedio", 3: "Avanzato" };
const quest = { new: "Nuova abilità", cont: "Continua così", prac: "Ripasso" };
const levels = [{ n: "Principiante" }, { n: "Studente" }, { n: "Diplomato" }, { n: "Pro" }, { n: "Campione" }, { n: "Maestro" }, { n: "Leggenda" }];
const ranks = [{ n: "Nuovo arrivato" }, { n: "Apprendista" }, { n: "Conduttore" }, { n: "Educatore" }, { n: "Esperto" }, { n: "Specialista" }, { n: "Completo" }];

const stucks = {
  cmd: "Bloccati? Rendilo più facile, non più forte. Torna indietro di un passo, raccogli 2 vittorie facili, fermati lì. Rimostra con un'esca invece di ripetere il segnale. Se il cane si alza da una posizione, premia prima alla ripetizione successiva.",
  trick: "Bloccati? Spezza il trucco in pezzi più piccoli e paga il più piccolo. Filma una sessione, la maggior parte dei problemi con i trucchi si nasconde nella mano umana, non nel cane.",
  agi: "Rifiuta l'ostacolo? Abbassalo, accorcialo, o torna a pagare i semplici tentativi. Mai spingere o sollevare il cane sull'attrezzo, una ripetizione spaventata costa settimane.",
  life: "Sopraffatto più che bloccato? Aggiungi distanza, accorcia l'uscita, chiudi con calma e riprova un altro giorno. Il lavoro di esposizione fallisce rumorosamente ma si recupera in fretta.",
};

const ladders = {
  cmd: [
    ["Sessione 1 · Mostra, non testare", "Guida ogni ripetizione con uno snack in mano, premia entro 1 secondo. Successo = il comportamento è avvenuto, con tutto il tuo aiuto."],
    ["Sessioni 2-4 · Guida e dai un nome", "Continua a guidare, di' il segnale una volta subito prima del comportamento. Successo = 3-5 ripetizioni assistite di fila."],
    ["Sessioni 5-7 · Togli l'esca", "Mano vuota, stesso movimento, premio dal marsupio. Le posizioni meritano 1-3 secondi di attesa prima del pagamento."],
    ["Dalla sessione 8 · Prima il segnale", "Un segnale, nessuna esca. Aumenta una difficoltà alla volta: durata oltre 5 secondi, stanze nuove, distrazione lieve."],
  ],
  trick: [
    ["Sessione 1 · Insegui l'esca", "Esca grande e ovvia, pagamento immediato per ogni movimento nella direzione giusta. Successo = una versione grezza è avvenuta una volta."],
    ["Sessioni 2-4 · Modella", "Paga i migliori 3 tentativi su 5, ignora il resto. Di' il segnale una volta per ripetizione. Serie di 3-5 ripetizioni, i trucchi stancano il cervello."],
    ["Sessioni 5-7 · Riduci l'aiuto", "L'esca diventa un piccolo gesto della mano. La precisione sale: le ripetizioni più pulite guadagnano uno snack doppio."],
    ["Dalla sessione 8 · In scena", "Prima il segnale, il gesto solo come riserva. Stanze nuove, poi davanti a persone. Gli applausi contano come distrazione."],
  ],
  agi: [
    ["Sessione 1 · Fallo minuscolo", "Barra a terra, tunnel corto, tavolo basso. Successo = 1 tentativo allegro, pagato come un jackpot."],
    ["Sessioni 2-4 · Costruisci amore, non altezza", "Ripeti la versione facile finché il cane non ti trascina verso l'ostacolo. Prima la fiducia, poi i criteri."],
    ["Sessioni 5-7 · Alza una cosa sola", "Altezza, lunghezza o angolo, mai due in una sessione. Di' il segnale dell'ostacolo quando il cane si impegna."],
    ["Dalla sessione 8 · Velocità e sequenza", "Manda da qualche passo di distanza, concatena 2 ostacoli, sessioni sotto i 10 minuti. La gioia è il motore dell'agility."],
  ],
  life: [
    ["Uscita 1 · Esplora, non forzare", "Versione breve e facile, sotto la soglia di stress. Successo = momenti di calma nella situazione, poi andarsene contenti."],
    ["Uscite 2-4 · La distanza è la tua manopola", "Ripeti a una distanza o durata in cui il cane riesce ancora a mangiare, annusare e guardarti. Paga la calma di continuo."],
    ["Uscite 5-7 · Chiudi il divario", "Più vicino, più lungo o più affollato, una manopola per uscita. Ritirarsi è una strategia, non un fallimento."],
    ["Dall'uscita 8 · Rendila routine", "Varia giorni, luoghi e orari così la calma si generalizza. Un 5 significa rilassato dall'arrivo alla partenza."],
  ],
};

const badges = {
  b_first: { n: "Prima sessione", d: "Registrata la tua primissima sessione di allenamento." },
  b_five: { n: "Prime 5 zampe", d: "Un comando ha ottenuto 5 su 5 per la prima volta." },
  b_master1: { n: "Prima padronanza", d: "Primo comando padroneggiato: 3 cinque puliti di fila." },
  b_master5: { n: "Batti il cinque, per cinque", d: "5 comandi padroneggiati." },
  b_master10: { n: "Doppia cifra", d: "10 comandi padroneggiati." },
  b_streak3: { n: "Serie di 3 giorni", d: "Allenamento 3 giorni di fila." },
  b_streak7: { n: "Serie di 7 giorni", d: "Una settimana intera di allenamento quotidiano." },
  b_streak14: { n: "Serie di 14 giorni", d: "Due settimane di fila. La routine è reale." },
  b_streak30: { n: "Serie di 30 giorni", d: "Un mese di costanza. Territorio d'élite." },
  b_streak60: { n: "Serie di 60 giorni", d: "Due mesi senza saltare un giorno. Squadra notevole." },
  b_streak100: { n: "Serie di 100 giorni", d: "Cento giorni di fila. Status di leggenda." },
  b_gear: { n: "Attrezzatura completa", d: "Ogni indispensabile spuntato." },
  b_scholar: { n: "Studioso canino", d: "Lette 10 guide nella libreria Impara." },
  b_fixer: { n: "Lettore di comportamenti", d: "Lette 5 guide comportamentali. Capire batte correggere." },
  b_life1: { n: "Fuori nel mondo", d: "Registrata la prima sessione di abilità di vita." },
  b_travel: { n: "Biglietti, prego", d: "Padroneggiata un'abilità di viaggio: autobus, barca o aereo." },
  b_social: { n: "Farfalla sociale", d: "Padroneggiato un incontro tranquillo con un cane o un gatto." },
  b_spa: { n: "Habitué della spa", d: "Padroneggiate toelettatura, unghie o orecchie." },
  b_vet: { n: "Preferito del veterinario", d: "Padroneggiate le visite felici dal veterinario." },
  b_hotel: { n: "Campione del pigiama party", d: "Padroneggiato un soggiorno in pensione per cani." },
  b_trick1: { n: "In scena", d: "Primo trucco padroneggiato." },
  b_agi1: { n: "Novizio dell'agility", d: "Primo ostacolo di agility padroneggiato." },
  b_sess50: { n: "50 sessioni", d: "Registrate 50 sessioni di allenamento." },
  b_sess100: { n: "Club dei cento", d: "Registrate 100 sessioni di allenamento." },
  b_xp500: { n: "500 XP", d: "Raggiunti 500 XP." },
  b_xp1000: { n: "1.000 XP", d: "Raggiunti 1.000 XP." },
  b_read25: { n: "Tessera della biblioteca", d: "Lette 25 guide." },
  b_school: { n: "Primo della classe", d: "Padroneggiati tutti e 3 i traguardi della scuola cani: prima lezione, semestre, esame." },
  b_quest7: { n: "Meraviglia settimanale", d: "Completate 7 missioni giornaliere. L'abitudine si sta formando." },
  b_quest21: { n: "Eroe dell'abitudine", d: "Completate 21 missioni giornaliere. Ormai è uno stile di vita." },
  b_master25: { n: "Quarto di secolo", d: "25 abilità padroneggiate." },
  b_master50: { n: "A metà strada", d: "50 abilità padroneggiate. Metà libreria." },
  b_master99: { n: "Fino all'ultima", d: "Tutte le 99 abilità padroneggiate. Non resta niente da insegnare." },
  b_xp3000: { n: "3.000 XP", d: "Raggiunto il livello Campione." },
  b_xp10000: { n: "10.000 XP", d: "Diecimila XP di costanza." },
  b_sess250: { n: "250 sessioni", d: "Registrate 250 sessioni di allenamento." },
};

const equip = {
  must: {
    collar: { n: "Collare piatto con medaglietta", note: "I dati obbligatori sulla medaglietta variano, il numero di telefono c'è sempre." },
    harness: { n: "Pettorina a Y", note: "Passeggiate quotidiane e allenamento, senza pressione sulla gola." },
    leash: { n: "Guinzaglio fisso da 1,5-2 m", note: "Il guinzaglio standard per allenamento e città." },
    pouch: { n: "Marsupio porta snack", note: "Pagare in fretta è buon allenamento. Le tasche sono troppo lente." },
    treats: { n: "Snack morbidi grandi come un pisello", note: "Piccoli e morbidi, 50 premi per sessione devono essere possibili." },
    bags: { n: "Sacchetti per bisogni con dispenser", note: "Dovere civico non negoziabile." },
    bowls: { n: "Ciotole per cibo e acqua", note: "Antiscivolo. Ceramica o acciaio battono la plastica." },
    bed: { n: "Cuccia o tappetino", note: "Il bersaglio di Al posto e il quartier generale dei sonnellini." },
    crate: { n: "Kennel o recinto", note: "Tana, aiuto per i bisogni, sicurezza in viaggio." },
    chews: { n: "2-3 giochi da masticare", note: "Ruotali per mantenere la novità. Assicurazione contro la dentizione." },
    brush: { n: "Spazzola o pettine adatto al pelo", note: "Razze a pelo lungo: ogni giorno. Chiedi a un toelettatore quale strumento." },
    vetkit: { n: "Kit di cura di base", note: "Levazecche, tagliaunghie per cani, shampoo per cani." },
    dental: { n: "Spazzolino e dentifricio per cani", note: "Solo dentifricio enzimatico per cani, mai quello umano. Ogni giorno è l'ideale, 3 volte a settimana è la vita vera." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Marcatore di precisione. Vedi Angolo cuccioli." },
    longline: { n: "Lunghina da 5-10 m", note: "Il ponte tra il richiamo e la passeggiata libera." },
    kong: { n: "Gioco in gomma riempibile", note: "Congelalo riempito, compra 20 minuti di calma." },
    snuffle: { n: "Tappeto olfattivo", note: "Annusare la cena stanca il cervello." },
    lickmat: { n: "Tappetino da leccare", note: "Distrazione per toelettatura e bagno." },
    carrest: { n: "Trasportino o pettorina per auto omologati", note: "Sicurezza in ogni viaggio." },
    whistle: { n: "Fischietto per il richiamo", note: "Suono costante, arriva più lontano della voce." },
    raincoat: { n: "Impermeabile per cani a pelo sottile", note: "Alcuni cani ne hanno bisogno, molti no." },
    gps: { n: "Localizzatore GPS", note: "Tranquillità per le fasi senza guinzaglio." },
    puzzle: { n: "Giochi di attivazione mentale", note: "Lavoro per il cervello nei giorni di pioggia." },
    agility: { n: "Mini set di agility", note: "Divertimento in giardino quando il cane è cresciuto." },
    gate: { n: "Cancelletto per bambini", note: "Gestione economica degli spazi durante l'allenamento." },
    basket: { n: "Cestino o rimorchio per bici", note: "Cani piccoli e medi. Prima allenalo come cuccia, aggancia sempre la pettorina." },
  },
};

const leash = {
  gear: {
    collar: { n: "Collare", pros: ["Leggero e semplice, porta la medaglietta", "Veloce da mettere e togliere", "Va bene per cani educati che non tirano"], cons: ["Tutta la pressione finisce sulla gola", "Rischioso per chi tira: trachea, tiroide e collo sotto sforzo", "Alcuni cani sfilano i collari larghi"], verdict: "Tienilo per la medaglietta. Passeggia con quello solo se il guinzaglio resta lento." },
    yharness: { n: "Pettorina a Y", pros: ["Pressione su petto e spalle, non sulla gola", "A prova di fuga se ben regolata", "Scelta migliore per cuccioli e allenamento"], cons: ["La vestibilità conta, le cinghie non devono ostacolare il movimento della spalla", "Leggermente più lenta da mettere", "Una pettorina fatta male può sfregare sotto le ascelle"], verdict: "Opinione: la scelta giusta per la maggior parte dei cani. Forma a Y sul petto, 2 dita di gioco ovunque." },
    frontclip: { n: "Pettorina con aggancio frontale", pros: ["Gira il cane verso di te quando tira, la meccanica aiuta la rieducazione", "Nessun dolore"], cons: ["Uno strumento, non una cura, l'allenamento serve comunque", "Camminare sempre con aggancio frontale può influire sull'andatura, usalo durante la rieducazione"], verdict: "Buon aiuto temporaneo per chi tira forte, insieme all'allenamento al guinzaglio lento." },
  },
  leashes: {
    fixed: { n: "Guinzaglio fisso da 1,5-2 m", pros: ["Lunghezza prevedibile, comunicazione chiara", "Standard per allenamento e città"], cons: ["Raggio corto per annusare nelle passeggiate in campagna"], verdict: "La scelta standard. Compra qualità una volta sola." },
    longline: { n: "Lunghina da 5-10 m", pros: ["Libertà con rete di sicurezza", "Lo strumento per richiamo e lavoro senza guinzaglio"], cons: ["Rischio di bruciature da corda, i guanti aiutano", "Serve spazio aperto e un po' di manualità"], verdict: "Il miglior investimento in allenamento dopo gli snack." },
    flexi: { n: "Avvolgibile (flexi)", pros: ["Raggio comodo per cani educati e tranquilli in spazi aperti"], cons: ["Insegna a tirare, la tensione allunga la portata", "Lesioni da cordino documentate su persone e cani", "Nessun controllo in situazioni di traffico improvvise", "Vietato o malvisto in molte scuole cinofile"], verdict: "Opinione: da evitare del tutto durante l'allenamento. Se proprio, solo a nastro, solo in spazi aperti." },
    slip: { n: "Guinzaglio a strozzo (slip)", pros: ["Veloce per trasferimenti brevi, comune da veterinari e canili"], cons: ["Si stringe sul collo senza limite", "Strumento sbagliato per chi tira e per le passeggiate quotidiane"], verdict: "Strumento professionale per trasferimenti brevi, non un guinzaglio da tutti i giorni." },
  },
};

const planAdult = [
  { n: "Verifica delle basi", items: ["Metti alla prova le basi con onestà: seduto, terra, resta, richiamo, ciascuno in salotto e in giardino", "Riallena ciò che vacilla con sessioni da 3 minuti, senza vergogna, la ruggine è normale", "Scegli la tua moneta di premio: quale snack fa brillare gli occhi al tuo cane"], note: "Non dare niente per scontato. Testare con onestà questa settimana risparmia 6 settimane di frustrazione dopo." },
  { n: "Reset del guinzaglio lento", items: ["Camminata al guinzaglio lento, 10 minuti al giorno su un percorso tranquillo", "La regola fermati-quando-si-tende, ogni singola volta", "Pause per annusare a comando come stipendio della passeggiata"], note: "Il guinzaglio lento è un'abitudine, non un trucco. La costanza batte l'intensità, sempre." },
  { n: "Controllo degli impulsi", items: ["Lascia, dal cibo per terra al cibo che cade", "Aspetta alle porte e prima della ciotola", "Resta: porta la durata a 30 secondi mentre ti allontani"], note: "Il richiamo è un'abilità di vita. Non chiamare mai il cane per interrompere qualcosa di bello, altrimenti il segnale inizia a significare festa finita." },
  { n: "Rilassamento a comando", items: ["Rilassarsi su un tappetino durante la cena e le serate TV", "Il comportamento calmo riceve un pagamento silenzioso, il caos non riceve niente", "Prima prova da bar in casa: tappetino, osso da masticare, 20 minuti"], note: "Il lavoro sul rilassamento sembra non fare niente. È la cosa più utile che un cane adulto possa imparare." },
  { n: "Rendere solido il richiamo", items: ["Richiamo con la lunghina al parco, pagato come una vincita alla lotteria", "Aggiungi distrazioni gradualmente: distanza dagli altri cani, poi più vicino", "Segnale di stop d'emergenza come abilità separata"], note: "Il controllo degli impulsi si costruisce in secondi, non in minuti. Ripetizioni brevi, valore alto, smetti da vincitore." },
  { n: "Manipolazione e cura", items: ["Appoggio del mento per la manipolazione: orecchie, occhi, zampe", "Spazzolare i denti 3 volte questa settimana", "Sessione unghie con tagliaunghie o lima, 1 zampa alla volta"], note: "La distrazione è il vero test. Abbassa i criteri in un posto nuovo, non è regredire, è allenare." },
  { n: "Buone maniere in pubblico", items: ["Visita vera a un bar o ristorante, breve e riuscita", "Saluti educati: seduto per dire ciao, niente salti", "Aspettare con calma mentre chiacchieri con qualcuno per strada"], note: "I cani adulti imparano i trucchi più in fretta dei cuccioli. Usali per ricostruire la fiducia dopo una settimana dura." },
  { n: "Arricchimento e diploma", items: ["Giochi olfattivi: caccia allo snack in casa e in giardino", "Insegna 1 trucco puramente divertente come premio per entrambi", "Settimana di ripasso: ripeti il test della settimana 1, festeggia la differenza, pianifica il prossimo passo"], note: "La manutenzione batte la perfezione. 5 minuti 5 giorni a settimana conservano tutto quello che hai costruito." },
];

const planPup = [
  { n: "Arrivo e legame", items: ["Riconoscimento del nome", "Carica la parola marker o il clicker", "Ritmo per i bisogni, fuori ogni 1-2 ore"], note: "Nessuna pressione con i comandi questa settimana. Legame, sonno e orari dei bisogni sono il programma." },
  { n: "Prima abilità: Seduto", items: ["Seduto, 3 sessioni brevi al giorno", "Continua a pagare il riconoscimento del nome", "Giochi con il kennel a porta aperta"], note: "3 minuti contano come una sessione. Breve e allegro batte lungo e teso." },
  { n: "Si aggiunge Terra", items: ["Terra", "Ripassa Seduto in stanze nuove", "Manipolazione: tocca zampe e orecchie, paga ogni tocco"], note: "Se Terra non è fluido entro domenica, va bene. Portalo alla settimana successiva." },
  { n: "Vieni, le fondamenta", items: ["Vieni in casa, ping-pong nel corridoio", "Settimana di ripasso: Seduto e Terra prima dei pasti", "Aspetta davanti alla ciotola, 2 secondi"], note: "Il richiamo è un'abilità da maratona. Per ora solo in casa." },
  { n: "Controllo degli impulsi", items: ["Lascia, gioco base con il pugno", "Molla durante il gioco", "Continua a pagare il richiamo in casa"], note: "Metà dell'educazione è insegnare al cane che rinunciare paga più di afferrare." },
  { n: "Fuori nel mondo", items: ["Guinzaglio lento, i primi 100 metri lenti", "Guardami per strada", "Seduto a 1 marciapiede per passeggiata"], note: "Tirare è normale a questa età. Fermati e riparti, niente strattoni, distanze minuscole." },
  { n: "Inizia Resta", items: ["Resta, solo 1-5 secondi di durata", "Al posto sul tappetino", "Ripassa il richiamo, ora con distrazioni lievi"], note: "Secondi, non minuti. Rompere un resta due volte di fila significa renderlo più facile." },
  { n: "Settimana di consolidamento", items: ["Nessuna abilità nuova", "Ripassi misti da 5 minuti di tutto", "1 trucco divertente a tua scelta come dessert"], note: "Le settimane di ripasso sono progresso. Un'abilità è reale solo quando sopravvive a una settimana di pratica mista." },
  { n: "In giro", items: ["Aspetta al marciapiede, a ogni attraversamento", "Guinzaglio lento in strade più trafficate", "Routine tranquilla con gli ospiti, prime prove"], note: "Il mondo è ora l'aula. Percorsi più brevi di qualità più alta battono le marce lunghe." },
  { n: "Distanza e durata", items: ["Resta con 2-5 passi di distanza", "Richiamo all'aperto con la lunghina", "Terra sul tappetino mentre cucini"], note: "Se un'abilità vacilla, torna indietro di una settimana. Il calendario serve te, non il contrario." },
  { n: "Abilità di vita", items: ["Rilassarsi sotto il tavolo, prima visita al bar", "Primi viaggi tranquilli in auto", "Manipolazione stile veterinario: zampe, orecchie, controllo denti"], note: "Queste sono le abilità che rendono facili i prossimi 10 anni. Valgono ogni ripetizione." },
  { n: "Settimana del diploma", items: ["Nessuna abilità nuova", "Ripassi misti da 5 minuti dell'intera cassetta degli attrezzi", "1 trucco preferito, lucidato per lo spettacolo"], note: "12 settimane dopo: hai un cane giovane educato e un'abitudine quotidiana. L'abitudine è il vero regalo di diploma." },
];

const puppy = {
  treatsguide: { n: "Snack: la tua moneta di allenamento", body: ["Dimensione: un pisello o più piccolo. Una sessione da 5 minuti può consumare 30 snack, piccoli tengono il conto delle calorie ragionevole.", "Morbido batte croccante, le pause per masticare rompono il ritmo di allenamento.", "Costruisci una scala di valore: crocchette per i compiti facili in casa, formaggio, pollo o würstel per richiamo e lavoro duro fuori.", "Sottrai gli snack dalla razione giornaliera, le calorie dell'allenamento contano. Regola: snack entro circa il 10% dell'apporto quotidiano.", "Tossici e vietati: cioccolato, uva e uvetta, cipolla, aglio, dolcificante xilitolo, alcol, ossa cotte."] },
  clickerguide: { n: "Basi del clicker", body: ["Un clicker è uno strumento di precisione: il click segna l'istante esatto in cui il cane si è guadagnato il premio.", "Caricarlo: click, poi snack, 10-15 volte, finché il click non fa drizzare le orecchie. Questa è tutta la preparazione.", "Il contratto: ogni click viene sempre pagato. Nessuna eccezione, altrimenti lo strumento perde valore.", "Il tempismo del click batte il tempismo dello snack, lo snack può arrivare 2 secondi dopo, il click no.", "Senza clicker a portata di mano: una parola marker breve come Sì, detta sempre allo stesso modo, fa lo stesso lavoro un po' meno precisamente."] },
  teethguide: { n: "Calendario della dentizione", body: ["Settimane 3-6: arrivano 28 denti da latte.", "Mesi 3-7: i denti da latte cadono, spuntano 42 denti permanenti. Massima pressione a masticare, gengive doloranti, qualche macchia di sangue sui giochi, tutto normale.", "Menu di sollievo: giochi in gomma da masticare, uno strofinaccio bagnato congelato, pezzi di carota congelati sotto supervisione, e legni da masticare di caffè o ulivo che si sbriciolano invece di scheggiarsi come i bastoni del giardino.", "Controlla ogni tanto i denti da latte trattenuti, una doppia fila di canini richiede un'occhiata del veterinario, comune nelle razze piccole.", "Entro il mese 7 la tempesta è quasi passata. Proteggi cavi e scarpe fino ad allora, non per sempre."] },
  sleepguide: { n: "Sonno e sonnellini", body: ["I cuccioli hanno bisogno di 16-20 ore di sonno al giorno. La maggior parte degli attacchi di morsi, corse pazze e lamenti è semplicemente un cucciolo esausto che dovrebbe già dormire.", "Costruisci un ritmo di sonnellini: nei cuccioli giovani circa 1 ora sveglio, poi sonnellino. Gioco, pipì, poi nell'area sicura a dormire.", "Imponi i sonnellini in un posto tranquillo e in penombra, un kennel coperto o un recinto funzionano. Un cucciolo esausto spesso non riesce ad addormentarsi da solo in mezzo al trambusto di casa.", "Proteggi il sonno notturno: ultima pipì a tarda sera, poi buio noioso. I cuccioli giovani potrebbero aver bisogno di 1 uscita notturna, tienila silenziosa e senza cerimonie.", "Se il cucciolo si trasforma in uno squalo di terra, non allenare attraverso. È ora del sonnellino, non della disciplina."] },
  homeguide: { n: "I primi giorni nella nuova casa", body: ["Rimpicciolisci il mondo: 1 stanza più l'area sicura per i primi giorni. Tutta la casa si guadagna gradualmente, stanza per stanza, così bisogni e masticazione restano gestibili.", "Allestisci una base: cuccia o kennel, acqua, un gioco da masticare, in un angolo da cui il cucciolo ti vede ma riposa indisturbato. È il rifugio, mai il posto della punizione.", "Prima notte: la distanza per dormire conta. Molti cuccioli si calmano prima accanto al letto nelle prime notti, potrai spostare la cuccia dopo.", "Tieni la prima settimana volutamente noiosa: niente sfilate di ospiti, niente feste per il cucciolo. Il cucciolo sta elaborando la perdita della cucciolata, la casa è già abbastanza emozione.", "Inizia le routine dal giorno 1: stessi orari dei pasti, stessa porta per la pipì, stesse parole. La prevedibilità è il modo in cui un cucciolo impara che il mondo è sicuro."] },
  socialguide: { n: "La finestra di socializzazione", body: ["Dalle 3 alle 14 settimane circa, i cuccioli archiviano le esperienze come normali. Ciò che viene vissuto con calma ora è noioso per tutta la vita, ciò che viene perso può richiedere vero lavoro dopo.", "Socializzare significa esposizione calma, non contatto massimo. Guardare un autobus da 30 metri mangiando snack è socializzazione perfetta, essere circondato da 5 cani no.", "Lavora su una lista: superfici (erba, griglie metalliche, scale), suoni (traffico, aspirapolvere, registrazioni di tuoni a basso volume), persone (cappelli, barbe, sedie a rotelle, bambini a distanza), manipolazione (zampe, orecchie, bocca).", "Prima delle vaccinazioni complete: porta in braccio il cucciolo nei posti affollati, visita cani amici vaccinati a casa loro, siediti su una panchina vicino alla vita. L'esposizione non richiede di toccare il marciapiede.", "Una regola sopra tutte: il cucciolo detta il ritmo. I saluti forzati insegnano la paura, l'avvicinamento volontario insegna la fiducia."] },
  aloneguide: { n: "Tempo da solo dal giorno 1", body: ["Stare da soli è un'abilità, non un'impostazione di fabbrica. I cuccioli che non la praticano mai diventano cani che vanno in panico, inizia con i secondi, non con le ore.", "Giorno 1: esci dalla stanza per 10 secondi mentre il cucciolo mangia da un gioco per il cibo, torna prima di ogni agitazione. Questa è una ripetizione.", "Aumenta lentamente: secondi, minuti, un caffè tranquillo fuori dalla porta. Lascia un gioco riempito, tieni partenze e ritorni completamente noiosi, niente addii drammatici.", "Punta a un cucciolo che riesca a dormire da solo 30-60 minuti entro le prime settimane, sempre dopo esercizio, pipì e con qualcosa da masticare.", "Se il cucciolo va in panico invece di protestare, non insistere attraverso il pianto, riduci il passo. Il vero stress da separazione merita presto un piano professionale, non si risolve da solo."] },
  walksguide: { n: "Passeggiate del cucciolo: quanto e quanto spesso", body: ["Regola: circa 5 minuti di camminata strutturata per mese di età, 1-2 volte al giorno. Un cucciolo di 4 mesi: circa 20 minuti a passeggiata.", "Questo limita la marcia forzata, non il movimento. Gioco libero, annusare e tempo su terreno morbido si regolano da soli.", "Annusare È la passeggiata. Un giro olfattivo lento da 20 minuti stanca un cucciolo più di 40 minuti a passo svelto.", "Le articolazioni in crescita non amano lunghe escursioni, maratone di scale, salti dall'alto e corsa sull'asfalto. Riserva corsa e bici ai 12-18 mesi.", "Guarda il cucciolo, non l'orologio: restare indietro, sdraiarsi o mordere freneticamente a metà passeggiata significa che era troppo. Porta in braccio a casa un cucciolo piccolo piuttosto che trascinarlo.", "3-4 uscite brevi battono 1 lunga, e ogni uscita è anche educazione ai bisogni."] },
  heatguide: { n: "Guida al primo calore", body: ["Quando: primo calore tra i 6 e i 15 mesi, razze piccole prima, razze grandi dopo. Si ripete ogni 6-8 mesi circa.", "Durata: circa 2-4 settimane. Segnali: vulva gonfia, perdite ematiche, pipì più frequenti, sbalzi d'umore, attrazione magnetica per ogni maschio del quartiere.", "Gestione: solo al guinzaglio per tutta la durata, niente aree cani, niente giardino senza sorveglianza, mutandine igieniche in casa se serve.", "Può essere appiccicosa, stanca o schizzinosa con il cibo. Tutto normale, mantieni routine tranquille.", "Dopo il primo calore, parla con il veterinario di pro, contro e tempistica della sterilizzazione. Ci sono argomenti validi da entrambe le parti e la taglia conta, è una decisione personale, non un automatismo.", "Segna le date sul calendario. La prevedibilità rende facile il secondo giro."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
