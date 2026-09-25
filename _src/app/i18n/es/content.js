/* Español: contenido salvo habilidades y guías de comportamiento (ver cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Fácil", 2: "Intermedio", 3: "Avanzado" };
const quest = { new: "Habilidad nueva", cont: "Sigue así", prac: "Repaso" };
const levels = [{ n: "Principiante" }, { n: "Estudiante" }, { n: "Graduado" }, { n: "Pro" }, { n: "Campeón" }, { n: "Maestro" }, { n: "Leyenda" }];
const ranks = [{ n: "Novato" }, { n: "Aprendiz" }, { n: "Guía" }, { n: "Adiestrador" }, { n: "Experto" }, { n: "Especialista" }, { n: "Completo" }];

const stucks = {
  cmd: "¿Atascados? Hazlo más fácil, no más alto. Retrocede un paso, consigue 2 éxitos fáciles, termina ahí. Vuelve a mostrar con un señuelo en vez de repetir la señal. Si el perro se levanta de una posición, premia más rápido en la siguiente repetición.",
  trick: "¿Atascados? Divide el truco en piezas más pequeñas y paga la más pequeña. Graba una sesión, la mayoría de los problemas con trucos se esconden en la mano humana, no en el perro.",
  agi: "¿Rechaza el obstáculo? Bájalo, acórtalo o vuelve a pagar los simples intentos. Nunca empujes ni subas al perro al equipo, una repetición con miedo cuesta semanas.",
  life: "¿Desbordado más que atascado? Añade distancia, acorta la salida, termina en calma e inténtalo otro día. El trabajo de exposición falla ruidosamente pero se recupera rápido.",
};

const ladders = {
  cmd: [
    ["Sesión 1 · Muestra, no pongas a prueba", "Guía cada repetición con un premio en la mano, recompensa en 1 segundo. Éxito = el comportamiento ocurrió, con toda tu ayuda."],
    ["Sesiones 2 a 4 · Guía y ponle nombre", "Sigue guiando, di la señal una vez justo antes del comportamiento. Éxito = 3 a 5 repeticiones ayudadas seguidas."],
    ["Sesiones 5 a 7 · Retira el señuelo", "Mano vacía, mismo movimiento, recompensa desde la riñonera. Las posiciones ganan 1 a 3 segundos de espera antes del pago."],
    ["Sesión 8 en adelante · Primero la señal", "Una señal, sin señuelo. Aumenta una dificultad cada vez: duración más allá de 5 segundos, habitaciones nuevas, distracción leve."],
  ],
  trick: [
    ["Sesión 1 · Persigue el señuelo", "Señuelo grande y obvio, pago instantáneo por cualquier movimiento en la dirección correcta. Éxito = una versión tosca ocurrió una vez."],
    ["Sesiones 2 a 4 · Moldéalo", "Paga los mejores 3 de 5 intentos, ignora el resto. Di la señal una vez por repetición. Series de 3 a 5 repeticiones, los trucos cansan el cerebro."],
    ["Sesiones 5 a 7 · Reduce la ayuda", "El señuelo se convierte en un gesto pequeño con la mano. Sube la precisión: las repeticiones más limpias ganan premio doble."],
    ["Sesión 8 en adelante · A escena", "Primero la señal, el gesto solo como apoyo. Habitaciones nuevas, luego delante de gente. Los aplausos cuentan como distracción."],
  ],
  agi: [
    ["Sesión 1 · Hazlo diminuto", "Barra en el suelo, túnel corto, mesa baja. Éxito = 1 intento alegre, pagado como un bote."],
    ["Sesiones 2 a 4 · Construye amor, no altura", "Repite la versión fácil hasta que el perro te arrastre hacia el obstáculo. Primero confianza, criterios después."],
    ["Sesiones 5 a 7 · Sube una sola cosa", "Altura, longitud o ángulo, nunca dos en una sesión. Di la señal del obstáculo cuando el perro se comprometa."],
    ["Sesión 8 en adelante · Velocidad y secuencia", "Envía desde unos pasos atrás, encadena 2 obstáculos, sesiones de menos de 10 minutos. La alegría es el motor del agility."],
  ],
  life: [
    ["Salida 1 · Explora, no presiones", "Versión corta y fácil, por debajo del punto de estrés. Éxito = momentos de calma en la situación, y marcharse con buen sabor de boca."],
    ["Salidas 2 a 4 · La distancia es tu regulador", "Repite a una distancia o duración en la que el perro todavía pueda comer, olfatear y mirarte. Paga la calma constantemente."],
    ["Salidas 5 a 7 · Cierra la distancia", "Más cerca, más largo o más concurrido, un regulador por salida. Retirarse es una estrategia, no un fracaso."],
    ["Salida 8 en adelante · Conviértelo en rutina", "Varía días, lugares y horas para que la calma se generalice. Un 5 significa relajado de la llegada a la salida."],
  ],
};

const badges = {
  b_first: { n: "Primera sesión", d: "Registraste tu primerísima sesión de entrenamiento." },
  b_five: { n: "Primeras 5 patas", d: "Una orden puntuó 5 de 5 por primera vez." },
  b_master1: { n: "Primer dominio", d: "Primera orden dominada: 3 cincos limpios seguidos." },
  b_master5: { n: "Choca esos cinco, por cinco", d: "5 órdenes dominadas." },
  b_master10: { n: "Dos cifras", d: "10 órdenes dominadas." },
  b_streak3: { n: "Racha de 3 días", d: "Entrenaste 3 días seguidos." },
  b_streak7: { n: "Racha de 7 días", d: "Una semana entera de entrenamiento diario." },
  b_streak14: { n: "Racha de 14 días", d: "Dos semanas seguidas. La rutina es real." },
  b_streak30: { n: "Racha de 30 días", d: "Un mes de constancia. Territorio de élite." },
  b_streak60: { n: "Racha de 60 días", d: "Dos meses sin fallar. Equipo notable." },
  b_streak100: { n: "Racha de 100 días", d: "Cien días seguidos. Estatus de leyenda." },
  b_gear: { n: "Equipamiento completo", d: "Todos los imprescindibles marcados." },
  b_scholar: { n: "Erudito canino", d: "Leíste 10 guías en la biblioteca de Aprender." },
  b_fixer: { n: "Lector de comportamiento", d: "Leíste 5 guías de comportamiento. Entender gana a corregir." },
  b_life1: { n: "Por el mundo", d: "Registraste tu primera sesión de habilidad para la vida." },
  b_travel: { n: "Billete para viajar", d: "Dominaste una habilidad de viaje: autobús, barco o avión." },
  b_social: { n: "Mariposa social", d: "Dominaste un encuentro tranquilo con un perro o un gato." },
  b_spa: { n: "Habitual del spa", d: "Dominaste la peluquería, las uñas o las orejas." },
  b_vet: { n: "Favorito del veterinario", d: "Dominaste las visitas felices al veterinario." },
  b_hotel: { n: "Campeón de la pijamada", d: "Dominaste una estancia en hotel canino." },
  b_trick1: { n: "A escena", d: "Primer truco dominado." },
  b_agi1: { n: "Novato del agility", d: "Primer obstáculo de agility dominado." },
  b_sess50: { n: "50 sesiones", d: "Registraste 50 sesiones de entrenamiento." },
  b_sess100: { n: "Club de los cien", d: "Registraste 100 sesiones de entrenamiento." },
  b_xp500: { n: "500 XP", d: "Alcanzaste 500 XP." },
  b_xp1000: { n: "1.000 XP", d: "Alcanzaste 1.000 XP." },
  b_read25: { n: "Carné de biblioteca", d: "Leíste 25 guías." },
  b_school: { n: "Alumno de honor", d: "Dominaste los 3 hitos de la escuela canina: primera clase, semestre, examen." },
  b_quest7: { n: "Maravilla semanal", d: "7 misiones diarias completadas. El hábito se está formando." },
  b_quest21: { n: "Héroe del hábito", d: "21 misiones diarias completadas. Esto ya es un estilo de vida." },
  b_master25: { n: "Cuarto de siglo", d: "25 habilidades dominadas." },
  b_master50: { n: "A mitad de camino", d: "50 habilidades dominadas. Media biblioteca." },
  b_master99: { n: "Hasta la última habilidad", d: "Las 99 habilidades dominadas. No queda nada por enseñar." },
  b_xp3000: { n: "3.000 XP", d: "Nivel Campeón alcanzado." },
  b_xp10000: { n: "10.000 XP", d: "Diez mil XP de constancia." },
  b_sess250: { n: "250 sesiones", d: "250 sesiones de entrenamiento registradas." },
};

const equip = {
  must: {
    collar: { n: "Collar plano con chapa", note: "Los datos obligatorios de la chapa varían, el teléfono siempre va." },
    harness: { n: "Arnés en Y", note: "Paseo diario y entrenamiento, sin presión en la garganta." },
    leash: { n: "Correa fija de 1,5 a 2 m", note: "La correa estándar para entrenar y para la ciudad." },
    pouch: { n: "Riñonera de premios", note: "Pagar rápido es buen entrenamiento. Los bolsillos son demasiado lentos." },
    treats: { n: "Premios blandos del tamaño de un guisante", note: "Pequeños y blandos, 50 recompensas por sesión tienen que ser posibles." },
    bags: { n: "Bolsas para heces con dispensador", note: "Deber cívico innegociable." },
    bowls: { n: "Cuencos de comida y agua", note: "Antideslizantes. Cerámica o acero ganan al plástico." },
    bed: { n: "Cama o manta", note: "El objetivo de A tu sitio y el cuartel general de las siestas." },
    crate: { n: "Transportín o parque", note: "Guarida, ayuda para la educación en casa, seguridad en viajes." },
    chews: { n: "2 o 3 mordedores", note: "Rótalos para mantener la novedad. Seguro contra la dentición." },
    brush: { n: "Cepillo o peine para el tipo de pelo", note: "Razas con pelo: a diario. Pregunta a un peluquero qué herramienta." },
    vetkit: { n: "Botiquín básico", note: "Saca-garrapatas, cortaúñas para perro, champú apto para perros." },
    dental: { n: "Cepillo y pasta de dientes para perro", note: "Solo pasta enzimática para perros, nunca pasta humana. A diario es lo ideal, 3 veces por semana es la vida real." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Marcador de precisión. Ver Rincón del cachorro." },
    longline: { n: "Correa larga de 5 a 10 m", note: "El puente entre la llamada y el paseo sin correa." },
    kong: { n: "Juguete de goma rellenable", note: "Congélalo relleno, compra 20 minutos de calma." },
    snuffle: { n: "Alfombra olfativa", note: "Olfatear la cena cansa el cerebro." },
    lickmat: { n: "Alfombra de lamer", note: "Distracción para peluquería y baños." },
    carrest: { n: "Transportín o arnés de coche homologado", note: "Seguridad en cada viaje." },
    whistle: { n: "Silbato de llamada", note: "Sonido constante, llega más lejos que la voz." },
    raincoat: { n: "Chubasquero para perros de pelo fino", note: "Algunos perros lo necesitan, muchos no." },
    gps: { n: "Localizador GPS", note: "Tranquilidad en las fases sin correa." },
    puzzle: { n: "Juguetes de comida tipo puzle", note: "Trabajo mental para días de lluvia." },
    agility: { n: "Mini set de agility", note: "Diversión en el jardín cuando el perro haya crecido." },
    gate: { n: "Barrera para bebés", note: "Gestión barata del espacio durante el entrenamiento." },
    basket: { n: "Cesta o remolque de bicicleta", note: "Perros pequeños y medianos. Entrénalo primero como cama, engancha siempre el arnés." },
  },
};

const leash = {
  gear: {
    collar: { n: "Collar", pros: ["Ligero y sencillo, lleva la chapa", "Rápido de poner y quitar", "Bien para perros educados que no tiran"], cons: ["Toda la presión cae en la garganta", "Arriesgado para los que tiran: tráquea, tiroides y cuello sufren", "Algunos perros se escapan de collares flojos"], verdict: "Déjalo puesto por la chapa. Pasea con él solo si la correa se mantiene floja." },
    yharness: { n: "Arnés en Y", pros: ["Presión en pecho y hombros, no en la garganta", "Resistente a escapes si está bien ajustado", "La mejor opción por defecto para cachorros y entrenamiento"], cons: ["El ajuste importa, las cintas no deben cruzar el movimiento del hombro", "Un poco más lento de poner", "Un arnés mal diseñado puede rozar las axilas"], verdict: "Opinión: la opción correcta para la mayoría de los perros. Forma de Y en el pecho, 2 dedos de holgura en todas partes." },
    frontclip: { n: "Arnés con enganche frontal", pros: ["Gira al perro hacia ti cuando tira, la mecánica ayuda a reeducar", "Sin dolor"], cons: ["Una herramienta, no una cura, sigue haciendo falta entrenar", "Pasear siempre con enganche frontal puede afectar a la marcha, úsalo durante la reeducación"], verdict: "Buena ayuda temporal para los que tiran fuerte, junto con el entrenamiento de correa floja." },
  },
  leashes: {
    fixed: { n: "Correa fija de 1,5 a 2 m", pros: ["Longitud predecible, comunicación clara", "Estándar para entrenamiento y ciudad"], cons: ["Radio corto para olfatear en paseos rurales"], verdict: "La opción por defecto. Compra calidad una sola vez." },
    longline: { n: "Correa larga de 5 a 10 m", pros: ["Libertad con red de seguridad", "La herramienta para la llamada y el trabajo sin correa"], cons: ["Riesgo de quemaduras por roce, los guantes ayudan", "Necesita espacio abierto y algo de manejo"], verdict: "La mejor inversión en entrenamiento después de los premios." },
    flexi: { n: "Extensible (flexi)", pros: ["Radio cómodo para perros educados y tranquilos en zonas abiertas"], cons: ["Enseña a tirar, la tensión amplía el alcance", "Hay lesiones documentadas por el cordón en personas y perros", "Sin control en situaciones de tráfico repentinas", "Prohibida o mal vista en muchas escuelas caninas"], verdict: "Opinión: descártala por completo durante el entrenamiento. Si acaso, solo de cinta, solo en espacios abiertos." },
    slip: { n: "Correa de ahorque (slip)", pros: ["Rápida para traslados cortos, habitual en veterinarios y protectoras"], cons: ["Se cierra sobre el cuello sin límite", "Herramienta equivocada para los que tiran y para paseos diarios"], verdict: "Herramienta profesional para traslados cortos, no una correa de paseo diario." },
  },
};

const planAdult = [
  { n: "Auditoría de fundamentos", items: ["Pon a prueba lo básico con sinceridad: sienta, tumba, quieto, llamada, cada uno en el salón y en el jardín", "Reentrena lo que flojee con sesiones de 3 minutos, sin vergüenza, el óxido es normal", "Elige tu moneda de recompensa: qué premio hace que a tu perro le brillen los ojos"], note: "No des nada por sólido. Probar con sinceridad esta semana ahorra 6 semanas de frustración después." },
  { n: "Reinicio de correa floja", items: ["Paseo con correa floja, 10 minutos diarios por una ruta tranquila", "La regla de parar cuando se tensa, todas y cada una de las veces", "Pausas para olfatear a la señal como salario del paseo"], note: "La correa floja es un hábito, no un truco. La constancia gana a la intensidad siempre." },
  { n: "Control de impulsos", items: ["Deja, desde comida en el suelo hasta comida que se cae", "Espera en las puertas y antes del cuenco", "Quieto: alarga la duración a 30 segundos mientras te alejas"], note: "La llamada es una habilidad para la vida. Nunca llames a tu perro para terminar algo divertido, o la señal empezará a significar que la diversión se acaba." },
  { n: "Relajación a la señal", items: ["Relajarse en una manta durante la cena y las tardes de tele", "El comportamiento tranquilo recibe pago silencioso, el caos no recibe nada", "Primer ensayo de cafetería en casa: manta, mordedor, 20 minutos"], note: "El trabajo de relajación parece no hacer nada. Es lo más útil que puede aprender un perro adulto." },
  { n: "Afianzar la llamada", items: ["Llamada con correa larga en el parque, paga como si fuera la lotería", "Añade distracciones poco a poco: distancia de otros perros, luego más cerca", "Señal de parada de emergencia como habilidad aparte"], note: "El control de impulsos se construye en segundos, no en minutos. Repeticiones cortas, valor alto, retírate ganando." },
  { n: "Manejo y cuidados", items: ["Apoyo de barbilla para el manejo: orejas, ojos, patas", "Cepillado de dientes 3 veces esta semana", "Sesión de uñas con cortaúñas o lima, 1 pata cada vez"], note: "La distracción es la prueba real. Baja tus criterios en un sitio nuevo, eso no es retroceder, es entrenar." },
  { n: "Modales en público", items: ["Visita real a una cafetería o restaurante, corta y con éxito", "Saludos educados: sienta para saludar, sin saltos", "Esperar tranquilo mientras charlas con alguien en la calle"], note: "Los perros adultos aprenden trucos más rápido que los cachorros. Úsalos para recuperar la confianza tras una semana dura." },
  { n: "Enriquecimiento y graduación", items: ["Juegos de olfato: buscar el premio por el piso y el jardín", "Enseña 1 truco puramente divertido como recompensa para los dos", "Semana de repaso: repite la prueba de la semana 1, celebra la diferencia, planifica lo siguiente"], note: "Mantener gana a perfeccionar. 5 minutos 5 días por semana conservan todo lo que has construido." },
];

const planPup = [
  { n: "Llegar y conectar", items: ["Reconocimiento del nombre", "Carga tu palabra marcadora o clicker", "Ritmo de educación en casa, fuera cada 1 o 2 horas"], note: "Esta semana sin presión de órdenes. Vínculo, sueño y horarios de pipí son el programa." },
  { n: "Primera habilidad: Sienta", items: ["Sienta, 3 sesiones cortas al día", "Sigue pagando el reconocimiento del nombre", "Juegos de transportín con la puerta abierta"], note: "3 minutos cuentan como sesión. Corto y alegre gana a largo y tenso." },
  { n: "Se suma Tumba", items: ["Tumba", "Repasa Sienta en habitaciones nuevas", "Manejo: toca patas y orejas, paga cada toque"], note: "Si Tumba no sale fluido para el domingo, no pasa nada. Llévalo a la semana siguiente." },
  { n: "Ven, la base", items: ["Ven en casa, ping-pong por el pasillo", "Semana de repaso: Sienta y Tumba antes de las comidas", "Espera ante el cuenco, 2 segundos"], note: "La llamada es una habilidad de maratón. Por ahora solo en casa." },
  { n: "Control de impulsos", items: ["Deja, juego básico con el puño", "Suelta durante el juego", "Sigue pagando la llamada en casa"], note: "La mitad del adiestramiento es enseñar al perro que renunciar paga mejor que agarrar." },
  { n: "Salir al mundo", items: ["Correa floja, los primeros 100 metros sin tensión", "Mírame en la calle", "Sienta en 1 bordillo por paseo"], note: "Tirar es normal a esta edad. Parar y seguir, sin tirones, distancias mínimas." },
  { n: "Empieza Quieto", items: ["Quieto, solo 1 a 5 segundos de duración", "A tu sitio en la manta", "Repasa la llamada, ahora con distracciones leves"], note: "Segundos, no minutos. Romper un quieto dos veces seguidas significa hacerlo más fácil." },
  { n: "Semana de consolidación", items: ["Sin habilidades nuevas", "Sesiones mixtas de repaso de 5 minutos con todo", "1 truco divertido a tu elección como postre"], note: "Las semanas de repaso son progreso. Una habilidad solo es real cuando sobrevive a una semana de práctica mixta." },
  { n: "De paseo", items: ["Espera en el bordillo, en cada cruce", "Correa floja en calles más concurridas", "Rutina tranquila con visitas, primeros montajes"], note: "El mundo es ahora el aula. Rutas más cortas con más calidad ganan a las marchas largas." },
  { n: "Distancia y duración", items: ["Quieto con 2 a 5 pasos de distancia", "Llamada al aire libre con la correa larga", "Tumba en la manta mientras cocinas"], note: "Si alguna habilidad flojea, retrocede una semana. El calendario te sirve a ti, no al revés." },
  { n: "Habilidades para la vida", items: ["Relajarse bajo la mesa, primera visita a una cafetería", "Primeros viajes tranquilos en coche", "Manejo tipo veterinario: patas, orejas, revisión de dientes"], note: "Estas son las habilidades que hacen fáciles los próximos 10 años. Merecen cada repetición." },
  { n: "Semana de graduación", items: ["Sin habilidades nuevas", "Repasos mixtos de 5 minutos de toda la caja de herramientas", "1 truco favorito, pulido para lucirlo"], note: "12 semanas después: tienes un perro joven educado y un hábito diario. El hábito es el verdadero regalo de graduación." },
];

const puppy = {
  treatsguide: { n: "Premios: tu moneda de entrenamiento", body: ["Tamaño: como un guisante o más pequeño. Una sesión de 5 minutos puede gastar 30 premios, lo pequeño mantiene las cuentas de calorías razonables.", "Blando gana a crujiente, las pausas para masticar rompen el ritmo de entrenamiento.", "Construye un menú de valor: pienso para trabajos fáciles en casa, queso, pollo o salchicha para la llamada y el trabajo duro al aire libre.", "Descuenta los premios de la ración diaria, las calorías del entrenamiento también cuentan. Regla general: premios dentro de un 10 % de la ingesta diaria.", "Tóxico y prohibido: chocolate, uvas y pasas, cebolla, ajo, edulcorante xilitol, alcohol, huesos cocinados."] },
  clickerguide: { n: "Básicos del clicker", body: ["Un clicker es un instrumento de precisión: el clic marca el momento exacto en que el perro se ganó la recompensa.", "Cargarlo: clic, luego premio, 10 a 15 veces, hasta que el clic levante las orejas. Esa es toda la preparación.", "El contrato: cada clic se paga siempre. Sin excepciones, o el instrumento pierde valor.", "El momento del clic gana al momento del premio, el premio puede llegar 2 segundos después, el clic no.", "Sin clicker a mano: una palabra marcadora corta como Sí, dicha siempre igual, hace el mismo trabajo un poco menos preciso."] },
  teethguide: { n: "Calendario de la dentición", body: ["Semanas 3 a 6: llegan 28 dientes de leche.", "Meses 3 a 7: caen los dientes de leche, salen 42 dientes definitivos. Máxima presión de masticar, encías doloridas, alguna mancha de sangre en los juguetes, todo normal.", "Menú de alivio: mordedores de goma, un paño mojado congelado, trozos de zanahoria congelados con supervisión, y mordedores de madera de café u olivo, que se desmenuzan en vez de astillarse como los palos del jardín.", "Revisa de vez en cuando si quedan dientes de leche, una doble fila de colmillos necesita un vistazo del veterinario, es frecuente en razas pequeñas.", "Para el mes 7 la tormenta ha pasado casi del todo. Protege cables y zapatos hasta entonces, no para siempre."] },
  sleepguide: { n: "Sueño y siestas", body: ["Los cachorros necesitan de 16 a 20 horas de sueño al día. La mayoría de los ataques de mordiscos, carreras y lloriqueos son simplemente un cachorro agotado que ya debería estar durmiendo.", "Crea un ritmo de siestas: en cachorros jóvenes, más o menos 1 hora despierto y luego siesta. Jugar, pipí, y a su espacio seguro a dormir.", "Impón las siestas en un sitio tranquilo y en penumbra, un transportín cubierto o un parque sirven. Un cachorro agotado a menudo no puede dormirse solo en medio del ajetreo de la casa.", "Protege el sueño nocturno: último pipí tarde por la noche, luego oscuridad aburrida. Los cachorros jóvenes pueden necesitar 1 salida nocturna, que sea silenciosa y sin ceremonia.", "Si el cachorro se convierte en un tiburón de tierra, no entrenes a través de ello. Es hora de siesta, no de disciplina."] },
  homeguide: { n: "Primeros días en el nuevo hogar", body: ["Reduce el mundo: 1 habitación más el espacio seguro los primeros días. La casa entera se gana poco a poco, habitación a habitación, así el pipí y los mordiscos siguen siendo manejables.", "Monta una base: cama o transportín, agua, un mordedor, en un rincón desde el que el cachorro te vea pero descanse sin molestias. Es el refugio, nunca el lugar de castigo.", "Primera noche: la distancia al dormir importa. Muchos cachorros se calman antes junto a la cama las primeras noches, puedes mover la cama después.", "Mantén la primera semana aburrida a propósito: sin desfiles de visitas, sin fiestas de cachorro. El cachorro está procesando la pérdida de su camada, la casa ya es suficiente emoción.", "Empieza las rutinas desde el día 1: mismas horas de comida, misma puerta para el pipí, mismas palabras. La previsibilidad es cómo un cachorro aprende que el mundo es seguro."] },
  socialguide: { n: "La ventana de socialización", body: ["De las 3 a las 14 semanas de edad, aproximadamente, es el periodo en que los cachorros archivan las experiencias como normales. Lo que se vive con calma ahora es aburrido de por vida, lo que se pierde puede requerir trabajo serio después.", "Socializar significa exposición tranquila, no contacto máximo. Mirar un autobús desde 30 metros comiendo premios es socialización perfecta, que 5 perros te acosen no lo es.", "Trabaja con una lista: superficies (hierba, rejillas metálicas, escaleras), sonidos (tráfico, aspiradora, grabaciones de truenos a bajo volumen), personas (sombreros, barbas, sillas de ruedas, niños a distancia), manejo (patas, orejas, boca).", "Antes de completar las vacunas: lleva al cachorro en brazos por sitios concurridos, visita perros amigos vacunados en casa, siéntate en un banco cerca de la vida. La exposición no requiere tocar el suelo.", "Una regla sobre todas: el cachorro marca el ritmo. Los saludos forzados enseñan miedo, el acercamiento voluntario enseña confianza."] },
  aloneguide: { n: "Tiempo a solas desde el día 1", body: ["Estar solo es una habilidad, no algo de serie. Los cachorros que nunca lo practican se convierten en perros que entran en pánico, empieza con segundos, no con horas.", "Día 1: sal de la habitación 10 segundos mientras el cachorro come de un juguete de comida, vuelve antes de cualquier protesta. Eso es una repetición.", "Crece despacio: segundos a minutos a un café tranquilo al otro lado de la puerta. Deja un mordedor relleno, mantén salidas y regresos completamente aburridos, sin despedidas dramáticas.", "Apunta a un cachorro que pueda dormir solo de 30 a 60 minutos en las primeras semanas, siempre tras ejercicio, pipí y con algo que masticar.", "Si el cachorro entra en pánico en vez de protestar, no fuerces el llanto, reduce el paso. La angustia por separación real merece un plan profesional pronto, no se arregla sola."] },
  walksguide: { n: "Paseos de cachorro: cuánto y con qué frecuencia", body: ["Regla general: unos 5 minutos de paseo estructurado por mes de edad, 1 o 2 veces al día. Un cachorro de 4 meses: unos 20 minutos por paseo.", "Esto limita las marchas forzadas, no el movimiento. El juego libre, el olfateo y el tiempo en suelo blando se regulan solos.", "Olfatear ES el paseo. Una vuelta olfativa lenta de 20 minutos cansa más a un cachorro que 40 minutos a buen paso.", "Las articulaciones en crecimiento no toleran caminatas largas, maratones de escaleras, saltos desde altura ni correr sobre asfalto. Guarda el footing y la bici para los 12 a 18 meses.", "Mira al cachorro, no al reloj: rezagarse, tumbarse o morder frenéticamente a mitad de paseo significa que fue demasiado. Lleva a un cachorro pequeño en brazos a casa en vez de arrastrarlo.", "3 o 4 salidas cortas ganan a 1 larga, y cada salida es también educación en casa."] },
  heatguide: { n: "Guía del primer celo", body: ["Cuándo: primer celo entre los 6 y los 15 meses, razas pequeñas antes, razas grandes después. Se repite más o menos cada 6 a 8 meses.", "Duración: unas 2 a 4 semanas. Señales: vulva hinchada, flujo con sangre, pipí más frecuente, cambios de humor, atractivo magnético para todos los machos del barrio.", "Manejo: solo con correa durante todo el celo, sin parques caninos, sin tiempo en el jardín sin vigilancia, braguitas higiénicas en casa si hace falta.", "Puede estar pegajosa, cansada o quisquillosa con la comida. Todo normal, mantén rutinas tranquilas.", "Tras el primer celo, habla con tu veterinario sobre pros, contras y momento de la esterilización. Hay argumentos reales a ambos lados y el tamaño de la raza importa, es una decisión personal, no un automatismo.", "Apunta las fechas en tu calendario. La previsibilidad hace fácil la segunda ronda."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
