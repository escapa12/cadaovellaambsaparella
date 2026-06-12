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
    paraules: ["Morter", "Setrill", "Escorredora", "Espàtula", "Cassó", "Tupí", "Greixonera", "Embut", "Batedor", "Romana"]
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
    paraules: ["Be", "Deu", "Es", "Ma", "Mes", "Mon", "Pel", "Que", "Se", "Si", "Sol", "Te", "Ossos", "Adeu", "Rodamon", "Subsol"]
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
    nom: "Mariona Ribes",
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
    paraules: ["St. Pere de Torelló", "Regencós", "St. Esteve d'en Bas", "Caldetes", "Son", "Antís"]
  },
  capitals: {
    nom: "Capitals de comarca",
    emoji: "🏛️",
    paraules: ["Falset", "Gandesa", "El Vendrell", "Moià", "Amposta", "Banyoles", "Solsona", "Puigcerdà", "Tremp", "Mollerussa"]
  },
  nba: {
    nom: "NBA catalana",
    emoji: "🏀",
    paraules: ["Màgia", "Ossos", "San Antoni", "Guerrers", "Nàggets", "Cèrvols", "Àligues", "Pistons", "Reis", "Llams"]
  },
  // ----- famílies FÀCILS per als primers nivells -----
  granja: {
    nom: "La granja",
    emoji: "🐄",
    paraules: ["Vaca", "Cavall", "Ovella", "Porc", "Gallina", "Conill", "Ase", "Cabra"]
  },
  colors_basics: {
    nom: "Colors bàsics",
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
  }
};
