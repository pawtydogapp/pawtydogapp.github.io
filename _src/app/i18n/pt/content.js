/* Português: conteúdo exceto competências e guias de comportamento (ver cmds.js, behav.js). */
import cmds from "./cmds";
import behav from "./behav";

const tier = { 1: "Fácil", 2: "Intermédio", 3: "Avançado" };
const quest = { new: "Competência nova", cont: "Continua assim", prac: "Revisão" };
const levels = [{ n: "Principiante" }, { n: "Estudante" }, { n: "Graduado" }, { n: "Pro" }, { n: "Campeão" }, { n: "Mestre" }, { n: "Lenda" }];
const ranks = [{ n: "Novato" }, { n: "Aprendiz" }, { n: "Condutor" }, { n: "Treinador" }, { n: "Especialista" }, { n: "Perito" }, { n: "Completo" }];

const stucks = {
  cmd: "Encravados? Torna mais fácil, não mais alto. Volta um passo atrás, consegue 2 vitórias fáceis, termina aí. Volta a mostrar com um isco em vez de repetires o sinal. Se o cão se levanta de uma posição, recompensa mais depressa na repetição seguinte.",
  trick: "Encravados? Parte o truque em pedaços mais pequenos e paga o mais pequeno. Filma uma sessão, a maioria dos problemas com truques esconde-se na mão humana, não no cão.",
  agi: "Recusa o obstáculo? Baixa-o, encurta-o, ou volta a pagar as simples tentativas. Nunca empurres nem levantes o cão para o equipamento, uma repetição assustada custa semanas.",
  life: "Sobrecarregado mais do que encravado? Acrescenta distância, encurta a saída, termina com calma e tenta noutro dia. O trabalho de exposição falha com estrondo mas recupera depressa.",
};

const ladders = {
  cmd: [
    ["Sessão 1 · Mostra, não testes", "Guia cada repetição com uma guloseima na mão, recompensa em 1 segundo. Sucesso = o comportamento aconteceu, com toda a tua ajuda."],
    ["Sessões 2 a 4 · Guia e dá nome", "Continua a guiar, diz o sinal uma vez mesmo antes do comportamento. Sucesso = 3 a 5 repetições ajudadas seguidas."],
    ["Sessões 5 a 7 · Retira o isco", "Mão vazia, mesmo movimento, recompensa da bolsa. As posições merecem 1 a 3 segundos de espera antes do pagamento."],
    ["Sessão 8 em diante · Primeiro o sinal", "Um sinal, sem isco. Aumenta uma dificuldade de cada vez: duração além de 5 segundos, divisões novas, distração ligeira."],
  ],
  trick: [
    ["Sessão 1 · Persegue o isco", "Isco grande e óbvio, pagamento imediato por qualquer movimento na direção certa. Sucesso = uma versão tosca aconteceu uma vez."],
    ["Sessões 2 a 4 · Molda", "Paga as melhores 3 de 5 tentativas, ignora o resto. Diz o sinal uma vez por repetição. Séries de 3 a 5 repetições, os truques cansam o cérebro."],
    ["Sessões 5 a 7 · Reduz a ajuda", "O isco torna-se um pequeno gesto com a mão. A precisão sobe: as repetições mais limpas ganham guloseima dupla."],
    ["Sessão 8 em diante · Espetáculo", "Primeiro o sinal, o gesto só como apoio. Divisões novas, depois à frente de pessoas. Os aplausos contam como distração."],
  ],
  agi: [
    ["Sessão 1 · Faz pequenino", "Barra no chão, túnel curto, mesa baixa. Sucesso = 1 tentativa alegre, paga como um jackpot."],
    ["Sessões 2 a 4 · Constrói amor, não altura", "Repete a versão fácil até o cão te puxar para o obstáculo. Primeiro a confiança, depois os critérios."],
    ["Sessões 5 a 7 · Sobe uma coisa só", "Altura, comprimento ou ângulo, nunca dois numa sessão. Diz o sinal do obstáculo quando o cão se comprometer."],
    ["Sessão 8 em diante · Velocidade e sequência", "Envia a alguns passos de distância, encadeia 2 obstáculos, sessões abaixo de 10 minutos. A alegria é o motor do agility."],
  ],
  life: [
    ["Saída 1 · Explora, não forces", "Versão curta e fácil, abaixo do ponto de stress. Sucesso = momentos de calma na situação, e sair de bom humor."],
    ["Saídas 2 a 4 · A distância é o teu botão", "Repete a uma distância ou duração em que o cão ainda consegue comer, cheirar e olhar para ti. Paga a calma constantemente."],
    ["Saídas 5 a 7 · Fecha a distância", "Mais perto, mais longo ou mais movimentado, um botão por saída. Recuar é estratégia, não fracasso."],
    ["Saída 8 em diante · Torna rotina", "Varia dias, locais e horas para que a calma se generalize. Um 5 significa relaxado da chegada à partida."],
  ],
};

const badges = {
  b_first: { n: "Primeira sessão", d: "Registaste a tua primeira sessão de treino." },
  b_five: { n: "Primeiras 5 patas", d: "Um comando pontuou 5 em 5 pela primeira vez." },
  b_master1: { n: "Primeiro domínio", d: "Primeiro comando dominado: 3 cincos limpos seguidos." },
  b_master5: { n: "Dá cá cinco, cinco vezes", d: "5 comandos dominados." },
  b_master10: { n: "Dois dígitos", d: "10 comandos dominados." },
  b_streak3: { n: "Sequência de 3 dias", d: "Treinaste 3 dias seguidos." },
  b_streak7: { n: "Sequência de 7 dias", d: "Uma semana inteira de treino diário." },
  b_streak14: { n: "Sequência de 14 dias", d: "Duas semanas seguidas. A rotina é real." },
  b_streak30: { n: "Sequência de 30 dias", d: "Um mês de constância. Território de elite." },
  b_streak60: { n: "Sequência de 60 dias", d: "Dois meses sem falhar. Equipa notável." },
  b_streak100: { n: "Sequência de 100 dias", d: "Cem dias seguidos. Estatuto de lenda." },
  b_gear: { n: "Equipamento completo", d: "Todos os essenciais marcados." },
  b_scholar: { n: "Erudito canino", d: "Leste 10 guias na biblioteca Aprender." },
  b_fixer: { n: "Leitor de comportamento", d: "Leste 5 guias de comportamento. Compreender vence corrigir." },
  b_life1: { n: "Pelo mundo fora", d: "Registaste a tua primeira sessão de competência de vida." },
  b_travel: { n: "Bilhetes, por favor", d: "Dominaste uma competência de viagem: autocarro, barco ou avião." },
  b_social: { n: "Borboleta social", d: "Dominaste um encontro calmo com um cão ou um gato." },
  b_spa: { n: "Habitual do spa", d: "Dominaste a tosquia, as unhas ou as orelhas." },
  b_vet: { n: "Preferido do veterinário", d: "Dominaste as visitas felizes ao veterinário." },
  b_hotel: { n: "Campeão da noite fora", d: "Dominaste uma estadia em hotel canino." },
  b_trick1: { n: "Espetáculo", d: "Primeiro truque dominado." },
  b_agi1: { n: "Novato do agility", d: "Primeiro obstáculo de agility dominado." },
  b_sess50: { n: "50 sessões", d: "Registaste 50 sessões de treino." },
  b_sess100: { n: "Clube dos cem", d: "Registaste 100 sessões de treino." },
  b_xp500: { n: "500 XP", d: "Atingiste 500 XP." },
  b_xp1000: { n: "1.000 XP", d: "Atingiste 1.000 XP." },
  b_read25: { n: "Cartão de biblioteca", d: "Leste 25 guias." },
  b_school: { n: "Aluno exemplar", d: "Dominaste os 3 marcos da escola canina: primeira aula, semestre, exame." },
  b_quest7: { n: "Maravilha semanal", d: "7 missões diárias concluídas. O hábito está a formar-se." },
  b_quest21: { n: "Herói do hábito", d: "21 missões diárias concluídas. Isto já é um estilo de vida." },
  b_master25: { n: "Quarto de século", d: "25 competências dominadas." },
  b_master50: { n: "A meio caminho", d: "50 competências dominadas. Meia biblioteca." },
  b_master99: { n: "Até à última", d: "Todas as 99 competências dominadas. Não resta nada para ensinar." },
  b_xp3000: { n: "3.000 XP", d: "Nível Campeão atingido." },
  b_xp10000: { n: "10.000 XP", d: "Dez mil XP de constância." },
  b_sess250: { n: "250 sessões", d: "Registaste 250 sessões de treino." },
};

const equip = {
  must: {
    collar: { n: "Coleira plana com placa", note: "Os dados obrigatórios na placa variam, o número de telefone vai sempre." },
    harness: { n: "Peitoral em Y", note: "Passeios diários e treino, sem pressão na garganta." },
    leash: { n: "Trela fixa de 1,5 a 2 m", note: "A trela padrão para treino e cidade." },
    pouch: { n: "Bolsa de guloseimas", note: "Pagar depressa é bom treino. Os bolsos são demasiado lentos." },
    treats: { n: "Guloseimas macias do tamanho de uma ervilha", note: "Pequenas e macias, 50 recompensas por sessão têm de ser possíveis." },
    bags: { n: "Sacos para dejetos com dispensador", note: "Dever cívico inegociável." },
    bowls: { n: "Tigelas de comida e água", note: "Antiderrapantes. Cerâmica ou aço vencem o plástico." },
    bed: { n: "Cama ou manta", note: "O alvo de Para o lugar e o quartel-general das sestas." },
    crate: { n: "Caixa de transporte ou parque", note: "Toca, ajuda para o treino de necessidades, segurança em viagem." },
    chews: { n: "2 a 3 brinquedos de mastigar", note: "Roda-os para manter a novidade. Seguro contra a dentição." },
    brush: { n: "Escova ou pente para o tipo de pelo", note: "Raças de pelo: todos os dias. Pergunta a um tosquiador que ferramenta." },
    vetkit: { n: "Kit de cuidados básico", note: "Pinça de carraças, corta-unhas para cão, champô próprio para cães." },
    dental: { n: "Escova e pasta de dentes para cão", note: "Só pasta enzimática para cães, nunca humana. Todos os dias é o ideal, 3 vezes por semana é a vida real." },
  },
  nice: {
    clicker: { n: "Clicker", note: "Marcador de precisão. Ver Cantinho do cachorro." },
    longline: { n: "Trela longa de 5 a 10 m", note: "A ponte entre o treino de chamada e a liberdade sem trela." },
    kong: { n: "Brinquedo de borracha para rechear", note: "Congela-o recheado, compra 20 minutos de calma." },
    snuffle: { n: "Tapete olfativo", note: "Cheirar o jantar cansa o cérebro." },
    lickmat: { n: "Tapete de lamber", note: "Distração para tosquia e banhos." },
    carrest: { n: "Caixa ou peitoral de carro homologados", note: "Segurança em cada viagem." },
    whistle: { n: "Apito de chamada", note: "Som constante, chega mais longe do que a voz." },
    raincoat: { n: "Capa de chuva para cães de pelo fino", note: "Alguns cães precisam, muitos não." },
    gps: { n: "Localizador GPS", note: "Tranquilidade nas fases sem trela." },
    puzzle: { n: "Brinquedos de puzzle com comida", note: "Trabalho mental para dias de chuva." },
    agility: { n: "Mini kit de agility", note: "Diversão no jardim quando o cão crescer." },
    gate: { n: "Cancela de bebé", note: "Gestão de espaço barata durante o treino." },
    basket: { n: "Cesto ou atrelado de bicicleta", note: "Cães pequenos e médios. Treina primeiro como cama, prende sempre o peitoral." },
  },
};

const leash = {
  gear: {
    collar: { n: "Coleira", pros: ["Leve e simples, leva a placa", "Rápida de pôr e tirar", "Boa para cães educados que não puxam"], cons: ["Toda a pressão cai na garganta", "Arriscada para os que puxam: traqueia, tiroide e pescoço sob esforço", "Alguns cães escapam de coleiras largas"], verdict: "Mantém-na pela placa. Passeia com ela só se a trela ficar solta." },
    yharness: { n: "Peitoral em Y", pros: ["Pressão no peito e ombros, não na garganta", "À prova de fuga se bem ajustado", "Melhor escolha por defeito para cachorros e treino"], cons: ["O ajuste importa, as fitas não devem cruzar o movimento do ombro", "Um pouco mais lento de pôr", "Um peitoral mal desenhado pode roçar nas axilas"], verdict: "Opinião: a escolha certa para a maioria dos cães. Forma de Y no peito, 2 dedos de folga em todo o lado." },
    frontclip: { n: "Peitoral com engate frontal", pros: ["Vira o cão para ti quando puxa, a mecânica ajuda a reeducar", "Sem dor"], cons: ["Uma ferramenta, não uma cura, o treino continua a ser preciso", "Passear sempre com engate frontal pode afetar a marcha, usa durante a reeducação"], verdict: "Boa ajuda temporária para os que puxam com força, a par do treino de trela solta." },
  },
  leashes: {
    fixed: { n: "Trela fixa de 1,5 a 2 m", pros: ["Comprimento previsível, comunicação clara", "Padrão para treino e cidade"], cons: ["Raio curto para cheirar em passeios no campo"], verdict: "A escolha por defeito. Compra qualidade uma vez." },
    longline: { n: "Trela longa de 5 a 10 m", pros: ["Liberdade com rede de segurança", "A ferramenta para chamada e trabalho sem trela"], cons: ["Risco de queimaduras de corda, as luvas ajudam", "Precisa de espaço aberto e alguma prática"], verdict: "O melhor investimento em treino a seguir às guloseimas." },
    flexi: { n: "Extensível (flexi)", pros: ["Raio conveniente para cães educados e calmos em zonas abertas"], cons: ["Ensina a puxar, a tensão aumenta o alcance", "Lesões documentadas pelo fio em pessoas e cães", "Sem controlo em situações de trânsito repentinas", "Proibida ou mal vista em muitas escolas caninas"], verdict: "Opinião: elimina-a por completo durante o treino. Se mesmo assim, só de fita, só em zonas abertas." },
    slip: { n: "Trela de laço (slip)", pros: ["Rápida para transferências curtas, comum em veterinários e abrigos"], cons: ["Aperta o pescoço sem limite", "Ferramenta errada para os que puxam e para passeios diários"], verdict: "Ferramenta profissional para transferências curtas, não uma trela de todos os dias." },
  },
};

const planAdult = [
  { n: "Auditoria dos fundamentos", items: ["Testa as bases com honestidade: senta, deita, fica, chamada, cada uma na sala e no jardim", "Retreina o que estiver frágil com sessões de 3 minutos, sem vergonha, a ferrugem é normal", "Escolhe a tua moeda de recompensa: que guloseima faz brilhar os olhos do teu cão"], note: "Não assumas nada como sólido. Testar com honestidade esta semana poupa 6 semanas de frustração depois." },
  { n: "Reinício da trela solta", items: ["Caminhada de trela solta, 10 minutos por dia numa rota calma", "A regra parar-quando-estica, todas as vezes", "Pausas para cheirar a pedido como salário do passeio"], note: "A trela solta é um hábito, não um truque. A constância vence a intensidade, sempre." },
  { n: "Controlo de impulsos", items: ["Deixa, desde comida no chão a comida a cair", "Espera nas portas e antes da tigela", "Fica: aumenta a duração para 30 segundos enquanto te afastas"], note: "A chamada é uma competência de vida. Nunca chames o teu cão para acabar algo divertido, ou o sinal passa a significar fim da festa." },
  { n: "Acalmar a pedido", items: ["Acalmar numa manta durante o jantar e as noites de televisão", "O comportamento calmo recebe pagamento discreto, o caos não recebe nada", "Primeiro ensaio de café em casa: manta, brinquedo de mastigar, 20 minutos"], note: "O trabalho de acalmar parece não fazer nada. É a coisa mais útil que um cão adulto pode aprender." },
  { n: "Blindar a chamada", items: ["Chamada com trela longa no parque, paga como uma vitória na lotaria", "Acrescenta distrações aos poucos: distância de outros cães, depois mais perto", "Sinal de paragem de emergência como competência separada"], note: "O controlo de impulsos constrói-se em segundos, não em minutos. Repetições curtas, valor alto, sai a ganhar." },
  { n: "Manuseamento e cuidados", items: ["Apoio do queixo para o manuseamento: orelhas, olhos, patas", "Escovagem dos dentes 3 vezes esta semana", "Sessão de unhas com corta-unhas ou lima, 1 pata de cada vez"], note: "A distração é o verdadeiro teste. Baixa os critérios num sítio novo, isso não é regredir, é treinar." },
  { n: "Boas maneiras em público", items: ["Visita real a um café ou restaurante, curta e bem-sucedida", "Cumprimentos educados: senta para dizer olá, sem saltos", "Espera calma enquanto conversas com alguém na rua"], note: "Os cães adultos aprendem truques mais depressa do que os cachorros. Usa-os para reconstruir a confiança depois de uma semana difícil." },
  { n: "Enriquecimento e graduação", items: ["Jogos de faro: caça às guloseimas pela casa e pelo jardim", "Ensina 1 truque puramente divertido como recompensa para ambos", "Semana de revisão: repete o teste da semana 1, celebra a diferença, planeia o que vem a seguir"], note: "Manter vence aperfeiçoar. 5 minutos 5 dias por semana conservam tudo o que construíste." },
];

const planPup = [
  { n: "Chegada e ligação", items: ["Reconhecimento do nome", "Carrega a tua palavra marcadora ou clicker", "Ritmo de necessidades, para a rua a cada 1 a 2 horas"], note: "Sem pressão de comandos esta semana. Ligação, sono e horários de xixi são o programa." },
  { n: "Primeira competência: Senta", items: ["Senta, 3 sessões curtas por dia", "Continua a pagar o reconhecimento do nome", "Jogos de caixa com a porta aberta"], note: "3 minutos contam como sessão. Curto e alegre vence longo e tenso." },
  { n: "Junta-se o Deita", items: ["Deita", "Revê Senta em divisões novas", "Manuseamento: toca em patas e orelhas, paga cada toque"], note: "Se o Deita não estiver fluido até domingo, não faz mal. Leva-o para a semana seguinte." },
  { n: "Anda cá, a base", items: ["Anda cá dentro de casa, pingue-pongue pelo corredor", "Semana de revisão: Senta e Deita antes das refeições", "Espera à tigela, 2 segundos"], note: "A chamada é uma competência de maratona. Por agora só dentro de casa." },
  { n: "Controlo de impulsos", items: ["Deixa, jogo básico com o punho", "Larga durante a brincadeira", "Continua a pagar a chamada dentro de casa"], note: "Metade do treino de cães é ensinar ao cão que ceder paga mais do que agarrar." },
  { n: "Para a rua", items: ["Trela solta, os primeiros 100 metros soltos", "Olha para mim na rua", "Senta em 1 lancil por passeio"], note: "Puxar é normal nesta idade. Para e segue, sem esticões, distâncias minúsculas." },
  { n: "Começa o Fica", items: ["Fica, apenas 1 a 5 segundos de duração", "Para o lugar na manta", "Revê a chamada, agora com distrações ligeiras"], note: "Segundos, não minutos. Quebrar um fica duas vezes seguidas significa tornar mais fácil." },
  { n: "Semana de consolidação", items: ["Sem competências novas", "Sessões mistas de 5 minutos a rever tudo", "1 truque divertido à tua escolha como sobremesa"], note: "As semanas de revisão são progresso. Uma competência só é real quando sobrevive a uma semana de prática mista." },
  { n: "Em movimento", items: ["Espera no lancil, em cada travessia", "Trela solta em ruas mais movimentadas", "Rotina calma com visitas, primeiros ensaios"], note: "O mundo é agora a sala de aula. Rotas mais curtas com mais qualidade vencem as caminhadas longas." },
  { n: "Distância e duração", items: ["Fica com 2 a 5 passos de distância", "Chamada ao ar livre com a trela longa", "Deita na manta enquanto cozinhas"], note: "Se alguma competência vacilar, recua uma semana. O calendário serve-te a ti, não o contrário." },
  { n: "Competências de vida", items: ["Acalmar debaixo da mesa, primeira visita ao café", "Primeiras viagens calmas de carro", "Manuseamento tipo veterinário: patas, orelhas, verificação dos dentes"], note: "Estas são as competências que tornam os próximos 10 anos fáceis. Valem cada repetição." },
  { n: "Semana de graduação", items: ["Sem competências novas", "Revisões mistas de 5 minutos de toda a caixa de ferramentas", "1 truque favorito, polido para mostrar"], note: "12 semanas depois: tens um cão jovem educado e um hábito diário. O hábito é o verdadeiro presente de graduação." },
];

const puppy = {
  treatsguide: { n: "Guloseimas: a tua moeda de treino", body: ["Tamanho: uma ervilha ou mais pequeno. Uma sessão de 5 minutos pode gastar 30 guloseimas, pequenas mantêm as contas de calorias razoáveis.", "Macio vence estaladiço, as pausas para mastigar quebram o ritmo do treino.", "Constrói uma escada de valor: ração para tarefas fáceis em casa, queijo, frango ou salsicha para chamada e trabalho difícil na rua.", "Desconta as guloseimas da ração diária, as calorias do treino contam. Regra: guloseimas dentro de cerca de 10% da ingestão diária.", "Tóxico e proibido: chocolate, uvas e passas, cebola, alho, adoçante xilitol, álcool, ossos cozinhados."] },
  clickerguide: { n: "Básicos do clicker", body: ["Um clicker é um instrumento de precisão: o clique marca o instante exato em que o cão ganhou a recompensa.", "Carregar: clique, depois guloseima, 10 a 15 vezes, até o clique levantar as orelhas. É toda a preparação.", "O contrato: cada clique é sempre pago. Sem exceções, ou o instrumento perde valor.", "O momento do clique vence o momento da guloseima, a guloseima pode chegar 2 segundos depois, o clique não.", "Sem clicker à mão: uma palavra marcadora curta como Sim, dita sempre da mesma forma, faz o mesmo trabalho um pouco menos precisamente."] },
  teethguide: { n: "Calendário da dentição", body: ["Semanas 3 a 6: chegam 28 dentes de leite.", "Meses 3 a 7: os dentes de leite caem, nascem 42 dentes definitivos. Pico de pressão para mastigar, gengivas doridas, manchas de sangue ocasionais nos brinquedos, tudo normal.", "Menu de alívio: mastigadores de borracha, um pano molhado congelado para as gengivas, pedaços de cenoura congelados sob supervisão, e madeira de cafeeiro ou oliveira, que se desfaz em vez de lascar como os paus do jardim.", "Verifica de vez em quando dentes de leite retidos, uma fila dupla de caninos precisa de um olhar do veterinário, comum em raças pequenas.", "Por volta do mês 7 a tempestade já passou quase toda. Protege cabos e sapatos até lá, não para sempre."] },
  sleepguide: { n: "Sono e sestas", body: ["Os cachorros precisam de 16 a 20 horas de sono por dia. A maioria dos ataques de mordidelas, correrias e choramingos é simplesmente um cachorro exausto que já devia estar a dormir.", "Constrói um ritmo de sestas: em cachorros novos, cerca de 1 hora acordado e depois sesta. Brincar, xixi, e para o espaço seguro dormir.", "Impõe as sestas num sítio calmo e escurecido, uma caixa coberta ou um parque funcionam. Um cachorro exausto muitas vezes não consegue adormecer sozinho no meio da azáfama da casa.", "Protege o sono noturno: último xixi ao fim da noite, depois escuridão aborrecida. Os cachorros novos podem precisar de 1 saída noturna, mantém-na silenciosa e sem cerimónias.", "Se o cachorro se transforma num tubarão de terra, não treines através disso. É hora de sesta, não de disciplina."] },
  homeguide: { n: "Primeiros dias na nova casa", body: ["Encolhe o mundo: 1 divisão mais o espaço seguro nos primeiros dias. A casa toda ganha-se aos poucos, divisão a divisão, o que mantém xixi e mastigação controláveis.", "Monta uma base: cama ou caixa, água, um brinquedo de mastigar, num canto de onde o cachorro te vê mas descansa sem ser incomodado. É o refúgio, nunca o cantinho do castigo.", "Primeira noite: a distância ao dormir importa. Muitos cachorros acalmam mais depressa ao lado da cama nas primeiras noites, podes mudar a cama mais tarde.", "Mantém a primeira semana deliberadamente aborrecida: sem desfiles de visitas, sem festas de cachorro. O cachorro está a processar a perda da ninhada, a casa já é emoção suficiente.", "Começa as rotinas desde o dia 1: mesmas horas de refeição, mesma porta para o xixi, mesmas palavras. A previsibilidade é a forma como um cachorro aprende que o mundo é seguro."] },
  socialguide: { n: "A janela de socialização", body: ["Das 3 às 14 semanas de idade, aproximadamente, é o período em que os cachorros arquivam experiências como normais. O que é vivido com calma agora é aborrecido para a vida, o que é perdido pode exigir trabalho a sério depois.", "Socializar significa exposição calma, não contacto máximo. Ver um autocarro a 30 metros a comer guloseimas é socialização perfeita, ser rodeado por 5 cães não é.", "Trabalha com uma lista: superfícies (relva, grelhas de metal, escadas), sons (trânsito, aspirador, gravações de trovões em volume baixo), pessoas (chapéus, barbas, cadeiras de rodas, crianças à distância), manuseamento (patas, orelhas, boca).", "Antes das vacinas completas: leva o cachorro ao colo por sítios movimentados, visita cães amigos vacinados em casa deles, senta-te num banco perto da vida. A exposição não exige tocar no passeio.", "Uma regra acima de todas: o cachorro dita o ritmo. Cumprimentos forçados ensinam medo, a aproximação voluntária ensina confiança."] },
  aloneguide: { n: "Tempo sozinho desde o dia 1", body: ["Estar sozinho é uma competência, não uma definição de fábrica. Os cachorros que nunca a praticam tornam-se cães que entram em pânico, começa com segundos, não com horas.", "Dia 1: sai da divisão por 10 segundos enquanto o cachorro come de um brinquedo com comida, volta antes de qualquer agitação. É uma repetição.", "Aumenta devagar: segundos para minutos para um café calmo do outro lado da porta. Deixa um brinquedo recheado, mantém saídas e regressos totalmente aborrecidos, sem despedidas dramáticas.", "Aponta para um cachorro que consiga fazer a sesta sozinho 30 a 60 minutos nas primeiras semanas, sempre depois de exercício, xixi e com algo para mastigar.", "Se o cachorro entra em pânico em vez de protestar, não insistas através do choro, reduz o passo. O verdadeiro stress de separação merece um plano profissional cedo, não se resolve sozinho."] },
  walksguide: { n: "Passeios de cachorro: quanto tempo, com que frequência", body: ["Regra: cerca de 5 minutos de caminhada estruturada por mês de idade, 1 a 2 vezes por dia. Um cachorro de 4 meses: cerca de 20 minutos por passeio.", "Isto limita a marcha forçada, não o movimento. Brincadeira livre, cheirar e tempo em piso macio regulam-se sozinhos.", "Cheirar É o passeio. Uma volta olfativa lenta de 20 minutos cansa mais um cachorro do que 40 minutos a passo acelerado.", "As articulações em crescimento não gostam de caminhadas longas, maratonas de escadas, saltos de altura e corrida em asfalto. Guarda a corrida e a bicicleta para os 12 a 18 meses.", "Observa o cachorro, não o relógio: ficar para trás, deitar-se ou morder freneticamente a meio do passeio significa que foi demais. Leva um cachorro pequeno ao colo para casa em vez de o arrastares.", "3 a 4 saídas curtas vencem 1 longa, e cada saída é também treino de necessidades."] },
  heatguide: { n: "Guia do primeiro cio", body: ["Quando: primeiro cio entre os 6 e os 15 meses, raças pequenas mais cedo, raças grandes mais tarde. Repete-se a cada 6 a 8 meses, aproximadamente.", "Duração: cerca de 2 a 4 semanas. Sinais: vulva inchada, corrimento com sangue, xixi mais frequente, mudanças de humor, atração magnética para todos os machos do bairro.", "Gestão: só de trela durante todo o cio, sem parques caninos, sem tempo no jardim sem vigilância, cuecas higiénicas em casa se for preciso.", "Pode ficar pegajosa, cansada ou esquisita com a comida. Tudo normal, mantém rotinas calmas.", "Depois do primeiro cio, fala com o veterinário sobre prós, contras e o momento da esterilização. Há argumentos reais dos dois lados e o tamanho da raça importa, é uma decisão pessoal, não um automatismo.", "Aponta as datas no calendário. A previsibilidade torna a segunda ronda fácil."] },
};

export default { cmds, behav, equip, leash, puppy, planAdult, planPup, badges, levels, ranks, ladders, stucks, tier, quest };
