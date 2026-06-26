// ============================================================
// FAMÍLIES DE PARAULES
// ============================================================
// Aquest és EL TEU fitxer: afegeix, treu o canvia famílies.
//
// Cada família té:
//   - nom:    el nom que es mostra al joc (a la carta mestra)
//   - emoji:  la icona de la família (només surt a la col·lecció)
//   - paraules: llista de paraules acceptades
//   - dibuixos: true → les cartes mostren dibuixos en comptes de
//     paraules (cal definir-los a dibuixos.js, un per paraula)
//
// FILOSOFIA DEL DISSENY: les paraules han de ser poc òbvies,
// que el jugador NO sàpiga immediatament de quina família són.
// (Un "Trapezi" és un múscul? Una forma? Un trapezi de circ?)
//
// Regles:
//   - La "clau" (p. ex. "ossos") és la que fas servir a levels.js
//   - Cada família necessita com a mínim tantes paraules com
//     el màxim "n" que li demanis a un nivell (màxim 9).
// ============================================================

const FAMILIES = {
  fruites: {
    nom: "Fruites",
    emoji: "🍎",
    dibuixos: true,
    paraules: ["Poma", "Pera", "Plàtan", "Raïm", "Síndria", "Meló", "Cirera", "Préssec", "Maduixa", "Taronja"]
  },
  animals: {
    nom: "Animals",
    emoji: "🐾",
    paraules: ["Fagina", "Toixó", "Geneta", "Mussol", "Talp", "Eriçó", "Fura", "Isard", "Cabirol", "Senglar"]
  },
  colors: {
    nom: "Colors",
    emoji: "🎨",
    paraules: ["Atzur", "Carmesí", "Ocre", "Magenta", "Turquesa", "Beix", "Granat", "Malva", "Sèpia", "Maragda"]
  },
  oficis: {
    nom: "Oficis",
    emoji: "👷",
    paraules: ["Boter", "Calafat", "Terrissaire", "Vidrier", "Cisteller", "Esmolet", "Matalasser", "Pellaire", "Courer", "Llauner"]
  },
  esports: {
    nom: "Esports",
    emoji: "⚽",
    paraules: ["Curling", "Biatló", "Esgrima", "Halterofília", "Waterpolo", "Bàdminton", "Petanca", "Croquet", "Pentatló", "Espeleologia"]
  },
  mobles: {
    nom: "Mobles",
    emoji: "🪑",
    paraules: ["Escambell", "Tocador", "Paraigüer", "Vitrina", "Bagul", "Arca", "Penjador", "Capçal", "Llibreria"]
  },
  vehicles: {
    nom: "Vehicles",
    emoji: "🚗",
    paraules: ["Tartana", "Carrossa", "Funicular", "Telefèric", "Troleibús", "Gòndola", "Zepelí", "Catamarà", "Quad", "Trineu"]
  },
  instruments: {
    nom: "Instruments",
    emoji: "🎸",
    paraules: ["Tenora", "Tible", "Flabiol", "Sac de gemecs", "Viola de roda", "Llaüt", "Clavicèmbal", "Ocarina", "Tamborí", "Gralla"]
  },
  verdures: {
    nom: "Verdures",
    emoji: "🥦",
    paraules: ["Xirivia", "Colinap", "Bleda", "Escarola", "Nap", "Rave", "Fonoll", "Carxofa", "Bròquil", "Api"]
  },
  roba: {
    nom: "Roba",
    emoji: "👕",
    paraules: ["Armilla", "Enagos", "Polaines", "Gec", "Brusa", "Calçotets", "Davantal", "Capell", "Xal", "Faixa"]
  },
  cos: {
    nom: "Parts del cos",
    emoji: "💪",
    paraules: ["Clatell", "Aixella", "Engonal", "Turmell", "Canell", "Empenya", "Panxell", "Nineta", "Geniva", "Campaneta"]
  },
  ossos: {
    nom: "Ossos",
    emoji: "🦴",
    paraules: ["Fèmur", "Húmer", "Estèrnum", "Clavícula", "Ròtula", "Peroné", "Omòplat", "Vèrtebra", "Costella", "Mandíbula"]
  },
  musculs: {
    nom: "Músculs",
    emoji: "🏋️",
    paraules: ["Bíceps", "Tríceps", "Quàdriceps", "Bessons", "Deltoide", "Trapezi", "Dorsal", "Pectoral", "Lumbar", "Masseter"]
  },
  temps: {
    nom: "Meteorologia",
    emoji: "🌦️",
    paraules: ["Calabruix", "Torb", "Xàfec", "Gebre", "Boirina", "Marinada", "Garbí", "Tramuntana", "Llevantada", "Ruixat"]
  },
  cuina: {
    nom: "Cuina",
    emoji: "🍳",
    paraules: ["Morter", "Setrill", "Escorredora", "Espàtula", "Cassó", "Tupí", "Greixonera", "Embut", "Batedor"]
  },
  arbres: {
    nom: "Arbres",
    emoji: "🌳",
    paraules: ["Lledoner", "Servera", "Moixera", "Tamariu", "Alber", "Om", "Freixe", "Teix", "Boix", "Arboç"]
  },
  begudes: {
    nom: "Begudes",
    emoji: "🥤",
    paraules: ["Ratafia", "Vermut", "Most", "Mistela", "Aiguardent", "Moscatell", "Sidra", "Cigaló", "Orxata", "Granissat"]
  },
  festes: {
    nom: "Festes catalanes",
    emoji: "🎉",
    paraules: ["Sant Jordi", "Carnaval", "Castanyada", "Reis", "Pasqua", "La Mercè", "Tió", "Calçotada", "La Patum", "Sant Medir"]
  },
  diacritics: {
    nom: "Accent diacrític",
    emoji: "✍️",
    // s'escriuen SENSE accent a la carta: així no es delata la família!
    paraules: ["Be", "Deu", "Es", "Ma", "Mes", "Mon", "Pel", "Que", "Se", "Si", "Sol", "Te", "Ossos", "Adeu"]
  },
  pau_mas: {
    nom: "Pau Mas",
    emoji: "🎸",
    paraules: ["Guitarra", "Músic", "Cartera", "Claus", "Clara", "Rotterdam"]
  },
  marc_granado: {
    nom: "Marc Granado",
    emoji: "🚴",
    paraules: ["Glutis", "Partícules", "Birmingham", "París", "Farandula", "Mòbil nou", "Van der Poel", "Birra", "Gaudí"]
  },
  mariona: {
    nom: "Mariona Ribas",
    emoji: "🔥",
    paraules: ["Motivada", "Malmho", "Rossa", "Bric", "Pol", "Expat"]
  },
  lupe: {
    nom: "Lupe",
    emoji: "👒",
    paraules: ["Rubia", "Pija", "Coruña", "Disseny", "Sergis"]
  },
  aina: {
    nom: "Aina",
    emoji: "🚬",
    paraules: ["Bodorrio", "Tabac", "Padelera", "Gallines", "Cesc", "Convido braves", "Metre cinquanta"]
  },
  ma: {
    nom: "Mà",
    emoji: "✋",
    paraules: ["Polze", "Índex", "Dit del mig", "Anular", "Menovell", "Anell"]
  },
  residencies: {
    nom: "Segones residències",
    emoji: "🏡",
    paraules: ["St. Pere de Torelló", "Regencós", "St. Esteve d'en Bas", "Caldetes", "Son", "Antist"]
  },
  capitals: {
    nom: "Capitals de comarca",
    emoji: "🏛️",
    paraules: ["Falset", "Gandesa", "El Vendrell", "Moià", "Amposta", "Banyoles", "Solsona", "Puigcerdà", "Tremp", "Mollerussa"]
  },
  nba: {
    nom: "NBA catalana",
    emoji: "🏀",
    paraules: ["Màgia", "Ossos", "San Antoni", "Guerrers", "Nàggets", "Cèrvols", "Àligues", "Pistons", "Reis", "Llamps"]
  },
  // ----- més famílies d'amics (bromes internes) -----
  pere: {
    nom: "Pere",
    emoji: "🧔",
    paraules: ["Base", "Vegeteria", "Esportista", "Funcionari", "Periodista", "Cork", "Mudances", "Tres"]
  },
  pol: {
    nom: "Pol",
    emoji: "🤓",
    paraules: ["Professor", "Emborratxador", "Esquerrà", "Mòdul", "Tilburg", "Bonpreu", "Flautista", "Garmin", "Marions"]
  },
  joana: {
    nom: "Joana",
    emoji: "💜",
    paraules: ["Polseres vermelles", "Oh mami", "Herois", "Otto", "D'arc", "Selftape", "Cites"]
  },
  rosa: {
    nom: "Rosa",
    emoji: "🎨",
    paraules: ["Ceramista", "Mango", "Morena", "Pubilla catalana", "Arnau", "Giralt", "Manualitats", "Sexy"]
  },
  gina: {
    nom: "Gina",
    emoji: "🏃",
    paraules: ["Trail runner", "Queixal", "Collbató", "Furgo life", "Strava", "Adri"]
  },
  marquina: {
    nom: "Marquina",
    emoji: "🎺",
    paraules: ["Kogoro", "Trompetista", "Sardana", "Tentacles", "Roca", "T3", "Laia"]
  },
  carbo: {
    nom: "Carbó",
    emoji: "🎧",
    paraules: ["Butifarro", "H2O", "Pilar", "Helena", "Depu", "Arrossaire", "Dj Bacardit"]
  },
  montcada: {
    nom: "Montcada",
    emoji: "💊",
    paraules: ["Certificador", "Siesta", "08202", "Chicote", "Entrades", "Oli", "Laura", "Palmera", "Pidgeotto", "Farmàcia"]
  },
  buxo: {
    nom: "Buxó",
    emoji: "🛗",
    paraules: ["Ascensor aturat", "Gatets", "Manifestació", "Manguera", "Aixeca morts", "Calendari", "Treballar poc"]
  },
  ivet: {
    nom: "Ivet",
    emoji: "🎭",
    paraules: ["Rubén", "Metre cinquanta-u i mig", "Actriu", "Odio als homes", "Turists go home", "Àlex abella", "Heterocromia"]
  },
  // ----- famílies FÀCILS per als primers nivells -----
  granja: {
    nom: "La granja",
    emoji: "🐄",
    paraules: ["Vaca", "Cavall", "Ovella", "Porc", "Gallina", "Conill", "Ase", "Cabra"]
  },
  colors_basics: {
    // clau interna "colors_basics" (diferent de "colors", la família difícil),
    // però al jugador se li mostra simplement "Colors"
    nom: "Colors",
    emoji: "🌈",
    paraules: ["Vermell", "Blau", "Verd", "Groc", "Rosa", "Negre", "Blanc", "Lila"]
  },
  transport: {
    nom: "Transports",
    emoji: "🚌",
    paraules: ["Cotxe", "Moto", "Tren", "Avió", "Vaixell", "Bicicleta", "Autobús", "Camió"]
  },
  escola: {
    nom: "L'escola",
    emoji: "🎒",
    paraules: ["Llapis", "Goma", "Llibreta", "Motxilla", "Pissarra", "Estoig", "Regle", "Tisores"]
  },
  esmorzar: {
    nom: "L'esmorzar",
    emoji: "🥐",
    paraules: ["Pa", "Croissant", "Galetes", "Mantega", "Melmelada", "Cereals", "Iogurt", "Mel"]
  },
  dies: {
    nom: "Dies de la setmana",
    emoji: "📅",
    paraules: ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"]
  },
  postres: {
    nom: "Postres",
    emoji: "🍰",
    paraules: ["Flam", "Gelat", "Pastís", "Crema catalana", "Coca", "Torró", "Magdalena", "Xocolata"]
  },
  escacs: {
    nom: "Escacs",
    emoji: "♟️",
    dibuixos: true,
    paraules: ["Rei", "Dama", "Torre", "Alfil", "Cavall", "Peó"]
  },
  joies: {
    nom: "Joies",
    emoji: "💍",
    dibuixos: true,
    paraules: ["Anell", "Corona", "Diamant", "Collaret", "Arracada", "Polsera"]
  },
  paisos: {
    nom: "Països",
    emoji: "🗺️",
    dibuixos: true,
    paraules: ["Itàlia", "França", "Espanya", "Portugal", "Noruega", "Japó"]
  },
  senyals: {
    nom: "Senyals de trànsit",
    emoji: "🚦",
    dibuixos: true,
    paraules: ["Stop", "Cediu", "Prohibit", "Perill", "Rotonda", "Vianants"]
  },

  // ============================================================
  // FAMÍLIES GENERALS NOVES (per tenir més varietat i repetir menys)
  // Mateix estil "traïdor": paraules que no es deixen endevinar fàcil.
  // ============================================================
  eines: {
    nom: "Eines",
    emoji: "🛠️",
    paraules: ["Tenalles", "Filaberquí", "Escarpra", "Garlopa", "Ribot", "Enformador", "Trepant", "Mall", "Punxó", "Aixol"]
  },
  aus: {
    nom: "Ocells",
    emoji: "🐦",
    paraules: ["Òliba", "Xoriguer", "Aufrany", "Bitó", "Cucut", "Puput", "Gaig", "Mallerenga", "Tudó", "Pinsà"]
  },
  peixos: {
    nom: "Peixos",
    emoji: "🐟",
    paraules: ["Lluç", "Rèmol", "Congre", "Sorell", "Llissa", "Moll", "Espet", "Gall", "Maire", "Bonítol"]
  },
  flors: {
    nom: "Flors",
    emoji: "🌸",
    paraules: ["Petúnia", "Dàlia", "Begònia", "Crisantem", "Gerani", "Azalea", "Camèlia", "Glicina", "Hortènsia", "Lavanda"]
  },
  insectes: {
    nom: "Insectes",
    emoji: "🐞",
    paraules: ["Libèl·lula", "Pregadéu", "Tisoreta", "Saltamartí", "Efímera", "Tàvec", "Borinot", "Cigala", "Panerola", "Cuca de llum"]
  },
  minerals: {
    nom: "Minerals",
    emoji: "💎",
    paraules: ["Quars", "Pirita", "Galena", "Malaquita", "Ònix", "Topazi", "Calcita", "Mica", "Gneis", "Basalt"]
  },
  especies: {
    nom: "Espècies",
    emoji: "🧂",
    paraules: ["Comí", "Cúrcuma", "Nou moscada", "Anís", "Safrà", "Llorer", "Coriandre", "Pebre", "Clau", "Gingebre"]
  },
  teixits: {
    nom: "Teixits",
    emoji: "🧵",
    paraules: ["Lli", "Vellut", "Pana", "Dril", "Tul", "Cànem", "Setí", "Llana", "Seda", "Ras"]
  },

  // ============================================================
  // ESPORTS (per al nivell temàtic d'esports)
  // ============================================================
  clubs: {
    nom: "Clubs de futbol",
    emoji: "⚽",
    paraules: ["Liverpool", "Arsenal", "Chelsea", "Sevilla", "Nàpols", "Porto", "Ajax", "Mònaco", "Leeds", "Lió"]
  },
  olimpiades: {
    nom: "Seus olímpiques",
    emoji: "🏅",
    paraules: ["Atenes", "Hèlsinki", "Melbourne", "Munic", "Moscou", "Seül", "Atlanta", "Sydney", "Torí", "Nagano"]
  },

  // ============================================================
  // GEOGRAFIA (nivells temàtics: geografia fàcil i difícil)
  // ============================================================
  // --- versions CONEGUDES (per a Geografia fàcil) ---
  rius_facils: {
    nom: "Rius",
    emoji: "🏞️",
    paraules: ["Nil", "Amazones", "Danubi", "Ter", "Ebre", "Llobregat", "Sena", "Tàmesi", "Roine", "Segre"]
  },
  muntanyes_facils: {
    nom: "Muntanyes",
    emoji: "⛰️",
    paraules: ["Everest", "Mont Blanc", "Teide", "Kilimanjaro", "Fuji", "Etna", "Montserrat", "Aneto", "Canigó", "Pedraforca"]
  },
  mars_facils: {
    nom: "Mars",
    emoji: "🌊",
    paraules: ["Mediterrani", "Carib", "Mar del Nord", "Mar Negre", "Mar Roig", "Bàltic", "Mar Mort", "Adriàtic", "Egeu", "Pacífic"]
  },
  llacs_facils: {
    nom: "Llacs",
    emoji: "🛶",
    paraules: ["Banyoles", "Ness", "Titicaca", "Garda", "Como", "Victòria", "Bàikal", "Michigan", "Ginebra", "Constança"]
  },
  // --- versions POC CONEGUDES (per a Geografia difícil; rius i muntanyes
  //     són catalans menys coneguts, també s'usen als nivells de Catalunya) ---
  rius: {
    nom: "Rius",
    emoji: "🏞️",
    paraules: ["Fluvià", "Besòs", "Tordera", "Gaià", "Muga", "Onyar", "Sénia", "Brugent", "Daró", "Ridaura"]
  },
  muntanyes: {
    nom: "Muntanyes",
    emoji: "⛰️",
    paraules: ["Puigmal", "Matagalls", "Carlit", "Bastiments", "Tagamanent", "Montcau", "Costabona", "Puigsacalm", "Comabona", "Gallinàs"]
  },
  mars: {
    nom: "Mars",
    emoji: "🌊",
    paraules: ["Tirrè", "Jònic", "Lígur", "Cèltic", "Cantàbric", "Aral", "Aràbic", "Andaman", "Tasman", "Banda"]
  },
  llacs: {
    nom: "Llacs",
    emoji: "🛶",
    paraules: ["Ladoga", "Erie", "Malawi", "Onega", "Tanganyika", "Balaton", "Ohrid", "Vänern", "Maracaibo", "Eyre"]
  },

  // ============================================================
  // CULTURA (nivells temàtics)
  // La dificultat ve de la FAMA, com la geografia:
  //   · versions "_facils" → noms MOLT coneguts (Cultura general)
  //   · versions de nínxol  → noms per a entesos (Cultura expert)
  // ============================================================
  // --- versions MOLT CONEGUDES (per a Cultura general) ---
  musics_facils: {
    nom: "Músics",
    emoji: "🎼",
    paraules: ["Beethoven", "Mozart", "Bach", "Chopin", "Vivaldi", "Verdi", "Wagner", "Txaikovski", "Strauss", "Haydn"]
  },
  escriptors_facils: {
    nom: "Escriptors",
    emoji: "📚",
    paraules: ["Shakespeare", "Cervantes", "Dickens", "Tolstoi", "Kafka", "Orwell", "Dante", "Goethe", "Dostoievski", "Hemingway"]
  },
  actors_facils: {
    nom: "Actors",
    emoji: "🎬",
    paraules: ["DiCaprio", "Hanks", "Roberts", "Pitt", "Cruise", "Washington", "Jolie", "Clooney", "Damon", "Lawrence"]
  },
  cientifics_facils: {
    nom: "Científics",
    emoji: "🔬",
    paraules: ["Einstein", "Newton", "Darwin", "Curie", "Tesla", "Galileu", "Edison", "Hawking", "Pasteur", "Arquimedes"]
  },
  // --- versions de NÍNXOL (per a Cultura expert) ---
  musics: {
    nom: "Músics",
    emoji: "🎼",
    paraules: ["Telemann", "Scarlatti", "Albinoni", "Boccherini", "Saint-Saëns", "Bruckner", "Janáček", "Smetana", "Granados", "Albéniz"]
  },
  escriptors: {
    nom: "Escriptors",
    emoji: "📚",
    paraules: ["Rodoreda", "Verdaguer", "Espriu", "Sagarra", "Calders", "Monzó", "Llull", "Maragall", "Oller", "Foix"]
  },
  actors: {
    nom: "Actors",
    emoji: "🎬",
    paraules: ["Brando", "Pacino", "Streep", "Hepburn", "Hopkins", "Nicholson", "Olivier", "Bergman", "Mastroianni", "Depardieu"]
  },
  cientifics: {
    nom: "Científics",
    emoji: "🔬",
    paraules: ["Bohr", "Faraday", "Planck", "Heisenberg", "Maxwell", "Pauli", "Schrödinger", "Rutherford", "Lavoisier", "Mendeleiev"]
  },

  // ============================================================
  // MATEMÀTIQUES (nivell temàtic)
  // ============================================================
  branques: {
    nom: "Branques",
    emoji: "➗",
    paraules: ["Àlgebra", "Càlcul", "Probabilitat", "Geometria", "Topologia", "Estadística", "Trigonometria", "Aritmètica", "Lògica", "Anàlisi"]
  },
  operacions: {
    nom: "Operacions",
    emoji: "🧮",
    paraules: ["Suma", "Resta", "Producte", "Divisió", "Potència", "Arrel", "Derivada", "Integral", "Factorial", "Mòdul"]
  },
  objectes_mates: {
    nom: "Objectes de mates",
    emoji: "📐",
    paraules: ["Calculadora", "Ordinador", "Àbac", "Compàs", "Transportador", "Esquadra", "Cartabó", "Regle", "Escaire", "Plantilla"]
  },
  matematics: {
    nom: "Matemàtics",
    emoji: "🧠",
    paraules: ["Euler", "Gauss", "Pitàgores", "Fermat", "Hilbert", "Riemann", "Turing", "Fibonacci", "Cantor", "Arnau Escapa"]
  },

  // ============================================================
  // CIÈNCIA (nivell temàtic)
  // ============================================================
  elements: {
    nom: "Elements químics",
    emoji: "⚗️",
    paraules: ["Hidrogen", "Heli", "Liti", "Carboni", "Oxigen", "Sodi", "Ferro", "Neó", "Argó", "Iode"]
  },
  planetes: {
    nom: "Planetes i astres",
    emoji: "🪐",
    paraules: ["Mercuri", "Venus", "Mart", "Júpiter", "Saturn", "Urà", "Neptú", "Plutó", "Terra", "Lluna"]
  },
  unitats: {
    nom: "Unitats",
    emoji: "📏",
    paraules: ["Joule", "Pascal", "Volt", "Amper", "Hertz", "Kelvin", "Watt", "Mol", "Lux", "Bar"]
  },

  // ============================================================
  // CATALUNYA i POBLACIONS (nivells temàtics)
  // ============================================================
  comarques: {
    nom: "Comarques",
    emoji: "🗾",
    paraules: ["Garrotxa", "Empordà", "Priorat", "Anoia", "Segarra", "Garraf", "Maresme", "Bages", "Osona", "Conflent"]
  },
  simbols: {
    nom: "Símbols catalans",
    emoji: "🎗️",
    paraules: ["Senyera", "Barretina", "Caganer", "Sardana", "Castells", "Diada", "Estaca", "Espardenya", "Porró", "Calçot"]
  },
  pobles: {
    nom: "Pobles amb encant",
    emoji: "🏘️",
    paraules: ["Begur", "Cadaqués", "Besalú", "Rupit", "Siurana", "Peratallada", "Mura", "Cardona", "Pals", "Beget"]
  },

  // ============================================================
  // MENJAR (nivell temàtic italià/xarcuteria)
  // ============================================================
  pizzes: {
    nom: "Pizzes",
    emoji: "🍕",
    paraules: ["Margarita", "Diàvola", "Quatre formatges", "Prosciutto", "Napolitana", "Capricciosa", "Hawaiana", "Calzone", "Marinara", "Pepperoni"]
  },
  pastes: {
    nom: "Pastes",
    emoji: "🍝",
    paraules: ["Espaguetis", "Macarrons", "Lasanya", "Tallarines", "Raviolis", "Penne", "Fusilli", "Canelons", "Nyoquis", "Tagliatelle"]
  },
  formatges: {
    nom: "Formatges",
    emoji: "🧀",
    paraules: ["Brie", "Gouda", "Parmesà", "Manxec", "Roquefort", "Mozzarella", "Emmental", "Gruyère", "Cheddar", "Mascarpone"]
  },
  embotits: {
    nom: "Embotits",
    emoji: "🥓",
    paraules: ["Fuet", "Xoriço", "Llonganissa", "Botifarra", "Salami", "Mortadel·la", "Bull", "Sobrassada", "Pernil", "Cansalada"]
  },
  salses: {
    nom: "Salses",
    emoji: "🥫",
    paraules: ["Pesto", "Bolonyesa", "Beixamel", "Pomodoro", "Allioli", "Maionesa", "Tàrtara", "Romesco", "Quetxup", "Mostassa"]
  },

  // ============================================================
  // FAMÍLIES NOVES (estil "traïdor": paraules ambigües)
  // ============================================================
  balls: {
    nom: "Balls",
    emoji: "💃",
    paraules: ["Vals", "Tango", "Bolero", "Xotis", "Jota", "Fandango", "Pasdoble", "Rumba", "Polca", "Txa-txa-txà"]
  },
  monedes: {
    nom: "Monedes",
    emoji: "🪙",
    paraules: ["Florí", "Dracma", "Escut", "Ducat", "Xíling", "Rupia", "Còrdova", "Lempira", "Ral", "Marc"]
  },
  bolets: {
    nom: "Bolets",
    emoji: "🍄",
    paraules: ["Rovelló", "Múrgola", "Camagroc", "Fredolic", "Llenega", "Carlet", "Ou de reig", "Cep", "Trompeta", "Pixacà"]
  },
  nautica: {
    nom: "Nàutica",
    emoji: "⛵",
    paraules: ["Proa", "Popa", "Quilla", "Timó", "Babord", "Estribord", "Coberta", "Àncora", "Pal", "Bauprès"]
  },
  constel: {
    nom: "Constel·lacions",
    emoji: "✨",
    paraules: ["Orió", "Lira", "Cigne", "Pegàs", "Andròmeda", "Cassiopea", "Drac", "Balena", "Bover", "Óssa"]
  },
  mitologia: {
    nom: "Mitologia",
    emoji: "⚡",
    paraules: ["Zeus", "Apol·lo", "Hermes", "Atena", "Hades", "Posidó", "Hefest", "Àrtemis", "Demèter", "Ares"]
  },
  criatures: {
    nom: "Criatures",
    emoji: "🐉",
    paraules: ["Esfinx", "Hidra", "Quimera", "Grifó", "Centaure", "Minotaure", "Basilisc", "Cíclop", "Sirena", "Harpia"]
  },
  cafes: {
    nom: "Cafès",
    emoji: "☕",
    paraules: ["Tallat", "Caputxino", "Espresso", "Americà", "Bombó", "Carajillo", "Ristretto", "Cremat", "Vienès", "Macchiato"]
  },
  marisc: {
    nom: "Marisc",
    emoji: "🦑",
    paraules: ["Pop", "Sípia", "Calamar", "Musclo", "Escopinya", "Cloïssa", "Ostra", "Navalla", "Garota", "Cargol"]
  },
  herbes: {
    nom: "Herbes",
    emoji: "🌿",
    paraules: ["Camamilla", "Til·la", "Marduix", "Sàlvia", "Farigola", "Romaní", "Menta", "Melissa", "Berbena", "Saüc"]
  },
  castells: {
    nom: "Castells medievals",
    emoji: "🏰",
    paraules: ["Merlet", "Fossat", "Torreó", "Muralla", "Talaia", "Almena", "Matacà", "Rastell", "Aljub", "Lliça"]
  },
  eines_camp: {
    nom: "Eines del camp",
    emoji: "🌾",
    paraules: ["Falç", "Aixada", "Rascle", "Forca", "Càvec", "Arada", "Garbell", "Dalla", "Sàrria", "Bieldo"]
  },
  nuvols: {
    nom: "Núvols",
    emoji: "☁️",
    paraules: ["Cúmul", "Cirrus", "Estrat", "Nimbus", "Cirrocúmul", "Altostrat", "Lenticular", "Estratocúmul"]
  }
};
