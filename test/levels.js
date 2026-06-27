// ============================================================
// CONFIGURACIÓ DELS NIVELLS
// ============================================================
//   nom:        nom del nivell
//   moviments:  límit de moviments (robar carta també compta;
//               els errors de família resten cada cop més!)
//   espais:     quants espais de col·lecció hi ha a dalt
//   win_ratio:  ràtio de victòries esperada (0 a 1). Objectiu de
//               disseny humà que valida test.js.
//   families:   quines famílies hi surten i quantes paraules
//               de cada una, p. ex. { id: "fruites", n: 6 } (màx 9).
//   columnes:   cartes per columna del tauler, en patró TRIANGULAR.
//
// El joc afegeix automàticament 1 carta mestra 👑 per família.
// Les cartes que no caben a les columnes van a la pila de robar.
// No barregis al mateix nivell famílies que comparteixen una
// paraula; test.js i el mateix joc t'avisaran.
// ============================================================
//
// ESTRUCTURA EN 3 BLOCS (es veuen al menú com a 3 botons):
//   · 🌱 TUTORIAL (1-5)   → introducció, molt fàcil
//   · 🐑 NORMAL   (6-30)  → dificultat oscil·lant; el 30 fa de boss
//   · 🔥 DIFÍCIL  (31-55) → més dur; els 5 últims <20%, el 55 boss final
//
// El darrer nivell de cada bloc és clarament el més difícil del bloc.
// ============================================================
const BLOCS = [
  { id: "tutorial", nom: "Tutorial", emoji: "🌱", mida: 5 },
  { id: "normal",   nom: "Normal",   emoji: "🐑", mida: 25 },
  { id: "dificil",  nom: "Difícil",  emoji: "🔥", mida: 25 }
];

const LEVELS = [

  // ========================================================
  // 🌱 BLOC 1 · TUTORIAL (1-5)
  // ========================================================
  {
    nom: "Primeres passes",
    moviments: 58,
    espais: 2,
    win_ratio: 0.95,
    families: [
      { id: "fruites", n: 4 },
      { id: "granja", n: 4 },
      { id: "escola", n: 4 },
      { id: "colors_basics", n: 3 }
    ],
    columnes: [1, 2, 3]
  },
  {
    nom: "Senyals al camí",
    moviments: 72,
    espais: 2,
    win_ratio: 0.9,
    families: [
      { id: "senyals", n: 5 },
      { id: "transport", n: 5 },
      { id: "esmorzar", n: 4 },
      { id: "dies", n: 3 },
      { id: "postres", n: 3 }
    ],
    columnes: [1, 2, 3, 4]
  },
  {
    nom: "Amb el Pau",
    moviments: 84,
    espais: 2,
    win_ratio: 0.93,
    families: [
      { id: "escacs", n: 6 },
      { id: "pau_mas", n: 6 },
      { id: "postres", n: 5 },
      { id: "colors_basics", n: 4 },
      { id: "fruites", n: 4 }
    ],
    columnes: [2, 3, 4, 4]
  },
  {
    nom: "Amb la Lupe",
    moviments: 100,
    espais: 3,
    win_ratio: 0.88,
    families: [
      { id: "joies", n: 6 },
      { id: "lupe", n: 5 },
      { id: "escola", n: 5 },
      { id: "esmorzar", n: 4 },
      { id: "dies", n: 5 },
      { id: "transport", n: 4 }
    ],
    columnes: [2, 3, 4, 5]
  },
  {
    // boss del tutorial
    nom: "La volta al món",
    moviments: 138,
    espais: 4,
    win_ratio: 0.72,
    families: [
      { id: "paisos", n: 6 },
      { id: "animals", n: 7 },
      { id: "instruments", n: 5 },
      { id: "temps", n: 5 },
      { id: "capitals", n: 6 },
      { id: "escacs", n: 4 },
      { id: "ma", n: 4 },
      { id: "mobles", n: 4 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },

  // ========================================================
  // 🐑 BLOC 2 · NORMAL (6-30) · oscil·lant; el 30 fa de boss
  // ========================================================
  {
    nom: "Geografia: primer viatge",
    moviments: 74,
    espais: 4,
    win_ratio: 0.72,
    families: [
      { id: "rius_facils", n: 5 },
      { id: "muntanyes_facils", n: 5 },
      { id: "mars_facils", n: 5 },
      { id: "llacs_facils", n: 4 },
      { id: "paisos", n: 5 },
      { id: "gina", n: 5 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Set famílies (i mitja)",
    moviments: 142,
    espais: 4,
    win_ratio: 0.6,
    families: [
      { id: "senyals", n: 6 },
      { id: "mobles", n: 8 },
      { id: "oficis", n: 5 },
      { id: "begudes", n: 6 },
      { id: "vehicles", n: 4 },
      { id: "joies", n: 4 },
      { id: "colors", n: 5 },
      { id: "nba", n: 5 },
      { id: "cuina", n: 4 },
      { id: "pere", n: 6 }
    ],
    columnes: [3, 4, 5, 5, 6, 6]
  },
  {
    nom: "Cultura general",
    moviments: 76,
    espais: 4,
    win_ratio: 0.7,
    families: [
      { id: "musics_facils", n: 5 },
      { id: "escriptors_facils", n: 5 },
      { id: "actors_facils", n: 5 },
      { id: "cientifics_facils", n: 5 },
      { id: "instruments", n: 5 },
      { id: "ivet", n: 5 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "El Marc i l'Aina",
    moviments: 96,
    espais: 4,
    win_ratio: 0.62,
    families: [
      { id: "marc_granado", n: 8 },
      { id: "aina", n: 6 },
      { id: "esports", n: 5 },
      { id: "arbres", n: 5 },
      { id: "escacs", n: 5 },
      { id: "fruites", n: 5 },
      { id: "oficis", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Cafès i tiberi",
    moviments: 84,
    espais: 4,
    win_ratio: 0.68,
    families: [
      { id: "cafes", n: 6 },
      { id: "pizzes", n: 6 },
      { id: "pastes", n: 5 },
      { id: "begudes", n: 5 },
      { id: "postres", n: 5 },
      { id: "carbo", n: 6 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "El tiberi",
    moviments: 90,
    espais: 4,
    win_ratio: 0.58,
    families: [
      { id: "pizzes", n: 6 },
      { id: "pastes", n: 6 },
      { id: "formatges", n: 6 },
      { id: "embotits", n: 6 },
      { id: "salses", n: 5 },
      { id: "montcada", n: 6 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Festa major",
    moviments: 102,
    espais: 4,
    win_ratio: 0.66,
    families: [
      { id: "balls", n: 6 },
      { id: "festes", n: 5 },
      { id: "instruments", n: 5 },
      { id: "begudes", n: 5 },
      { id: "roba", n: 5 },
      { id: "pau_mas", n: 6 },
      { id: "pol", n: 6 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Cares noves",
    moviments: 104,
    espais: 4,
    win_ratio: 0.56,
    families: [
      { id: "pere", n: 6 },
      { id: "pol", n: 6 },
      { id: "joana", n: 5 },
      { id: "rosa", n: 6 },
      { id: "gina", n: 5 },
      { id: "ma", n: 4 },
      { id: "residencies", n: 4 },
      { id: "colors", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Bosc i camp",
    moviments: 82,
    espais: 4,
    win_ratio: 0.68,
    families: [
      { id: "bolets", n: 6 },
      { id: "arbres", n: 5 },
      { id: "flors", n: 5 },
      { id: "aus", n: 5 },
      { id: "herbes", n: 5 },
      { id: "buxo", n: 6 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Anatomia",
    moviments: 106,
    espais: 4,
    win_ratio: 0.54,
    families: [
      { id: "cos", n: 6 },
      { id: "ossos", n: 6 },
      { id: "musculs", n: 6 },
      { id: "paisos", n: 5 },
      { id: "diacritics", n: 6 },
      { id: "instruments", n: 5 },
      { id: "verdures", n: 5 },
      { id: "temps", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Mercat i monedes",
    moviments: 82,
    espais: 4,
    win_ratio: 0.64,
    families: [
      { id: "monedes", n: 6 },
      { id: "oficis", n: 5 },
      { id: "eines", n: 5 },
      { id: "teixits", n: 5 },
      { id: "especies", n: 5 },
      { id: "rosa", n: 6 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "El gran batibull",
    moviments: 148,
    espais: 5,
    win_ratio: 0.56,
    families: [
      { id: "colors", n: 5 },
      { id: "vehicles", n: 6 },
      { id: "temps", n: 5 },
      { id: "capitals", n: 7 },
      { id: "festes", n: 5 },
      { id: "esports", n: 5 },
      { id: "escacs", n: 5 },
      { id: "joies", n: 4 },
      { id: "senyals", n: 5 },
      { id: "arbres", n: 4 },
      { id: "lupe", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    nom: "Mar i costa",
    moviments: 62,
    espais: 4,
    win_ratio: 0.66,
    families: [
      { id: "nautica", n: 6 },
      { id: "marisc", n: 6 },
      { id: "peixos", n: 5 },
      { id: "mars_facils", n: 5 },
      { id: "llacs_facils", n: 4 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Escapada de cap de setmana",
    moviments: 144,
    espais: 5,
    win_ratio: 0.54,
    families: [
      { id: "residencies", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 5 },
      { id: "vehicles", n: 5 },
      { id: "begudes", n: 5 },
      { id: "temps", n: 5 },
      { id: "festes", n: 5 },
      { id: "roba", n: 4 },
      { id: "cuina", n: 3 },
      { id: "instruments", n: 4 },
      { id: "mariona", n: 6 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    nom: "Pobles i ciutats",
    moviments: 76,
    espais: 4,
    win_ratio: 0.62,
    families: [
      { id: "pobles", n: 6 },
      { id: "capitals", n: 6 },
      { id: "comarques", n: 6 },
      { id: "muntanyes_facils", n: 5 },
      { id: "rius_facils", n: 5 },
      { id: "residencies", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Cel nocturn",
    moviments: 72,
    espais: 4,
    win_ratio: 0.56,
    families: [
      { id: "constel", n: 6 },
      { id: "nuvols", n: 6 },
      { id: "planetes", n: 6 },
      { id: "temps", n: 5 },
      { id: "marquina", n: 6 }
    ],
    columnes: [3, 4, 5, 6]
  },
  {
    nom: "El rebost",
    moviments: 128,
    espais: 5,
    win_ratio: 0.62,
    families: [
      { id: "verdures", n: 6 },
      { id: "cuina", n: 6 },
      { id: "begudes", n: 5 },
      { id: "fruites", n: 6 },
      { id: "mobles", n: 6 },
      { id: "oficis", n: 5 },
      { id: "roba", n: 4 },
      { id: "animals", n: 5 },
      { id: "festes", n: 3 },
      { id: "joies", n: 3 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Tota la colla",
    moviments: 112,
    espais: 4,
    win_ratio: 0.54,
    families: [
      { id: "marquina", n: 6 },
      { id: "carbo", n: 6 },
      { id: "montcada", n: 7 },
      { id: "buxo", n: 6 },
      { id: "ivet", n: 6 },
      { id: "nba", n: 5 },
      { id: "capitals", n: 5 },
      { id: "escacs", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Matemàtiques",
    moviments: 72,
    espais: 4,
    win_ratio: 0.6,
    families: [
      { id: "branques", n: 7 },
      { id: "operacions", n: 7 },
      { id: "objectes_mates", n: 7 },
      { id: "matematics", n: 6 },
      { id: "unitats", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Llegendes",
    moviments: 82,
    espais: 4,
    win_ratio: 0.56,
    families: [
      { id: "mitologia", n: 6 },
      { id: "criatures", n: 6 },
      { id: "escacs", n: 5 },
      { id: "joies", n: 5 },
      { id: "paisos", n: 5 },
      { id: "joana", n: 5 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Edat mitjana",
    moviments: 84,
    espais: 4,
    win_ratio: 0.58,
    families: [
      { id: "castells", n: 6 },
      { id: "monedes", n: 6 },
      { id: "mitologia", n: 6 },
      { id: "criatures", n: 6 },
      { id: "eines_camp", n: 6 },
      { id: "oficis", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Anatomia avançada",
    moviments: 80,
    espais: 4,
    win_ratio: 0.52,
    families: [
      { id: "cos", n: 6 },
      { id: "ossos", n: 6 },
      { id: "musculs", n: 6 },
      { id: "diacritics", n: 6 },
      { id: "ma", n: 5 },
      { id: "especies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Ciència i cosmos",
    moviments: 78,
    espais: 4,
    win_ratio: 0.56,
    families: [
      { id: "elements", n: 6 },
      { id: "planetes", n: 6 },
      { id: "unitats", n: 6 },
      { id: "constel", n: 5 },
      { id: "nuvols", n: 5 },
      { id: "minerals", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "La lliga",
    moviments: 130,
    espais: 5,
    win_ratio: 0.52,
    families: [
      { id: "nba", n: 8 },
      { id: "esports", n: 6 },
      { id: "escacs", n: 6 },
      { id: "musculs", n: 5 },
      { id: "cos", n: 5 },
      { id: "clubs", n: 6 },
      { id: "colors", n: 5 },
      { id: "olimpiades", n: 5 },
      { id: "ossos", n: 4 },
      { id: "ma", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    // boss del bloc Normal
    nom: "Calaix de sastre",
    moviments: 108,
    espais: 4,
    win_ratio: 0.4,
    families: [
      { id: "eines", n: 6 },
      { id: "teixits", n: 6 },
      { id: "insectes", n: 6 },
      { id: "minerals", n: 6 },
      { id: "especies", n: 5 },
      { id: "flors", n: 5 },
      { id: "aus", n: 5 },
      { id: "peixos", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },

  // ========================================================
  // 🔥 BLOC 3 · DIFÍCIL (31-55) · els 5 últims <20%; el 55 boss
  // ========================================================
  {
    nom: "Geografia: repte mundial",
    moviments: 120,
    espais: 4,
    win_ratio: 0.5,
    families: [
      { id: "rius", n: 7 },
      { id: "muntanyes", n: 7 },
      { id: "mars", n: 7 },
      { id: "llacs", n: 7 },
      { id: "comarques", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Paraulada",
    moviments: 174,
    espais: 5,
    win_ratio: 0.4,
    families: [
      { id: "diacritics", n: 8 },
      { id: "capitals", n: 6 },
      { id: "instruments", n: 6 },
      { id: "arbres", n: 6 },
      { id: "temps", n: 6 },
      { id: "senyals", n: 6 },
      { id: "ossos", n: 5 },
      { id: "ma", n: 5 },
      { id: "colors", n: 4 },
      { id: "cuina", n: 6 },
      { id: "esports", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Cultura: nivell expert",
    moviments: 98,
    espais: 4,
    win_ratio: 0.48,
    families: [
      { id: "musics", n: 8 },
      { id: "escriptors", n: 8 },
      { id: "actors", n: 8 },
      { id: "cientifics", n: 8 },
      { id: "instruments", n: 6 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Tots els amics",
    moviments: 172,
    espais: 5,
    win_ratio: 0.38,
    families: [
      { id: "pau_mas", n: 6 },
      { id: "marc_granado", n: 8 },
      { id: "mariona", n: 6 },
      { id: "lupe", n: 5 },
      { id: "aina", n: 6 },
      { id: "residencies", n: 6 },
      { id: "nba", n: 6 },
      { id: "joies", n: 6 },
      { id: "escacs", n: 6 },
      { id: "senyals", n: 3 },
      { id: "capitals", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Tresor i mercaderies",
    moviments: 92,
    espais: 4,
    win_ratio: 0.46,
    families: [
      { id: "monedes", n: 6 },
      { id: "minerals", n: 6 },
      { id: "especies", n: 6 },
      { id: "teixits", n: 6 },
      { id: "eines", n: 6 },
      { id: "joies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Anatomia total",
    moviments: 122,
    espais: 4,
    win_ratio: 0.36,
    families: [
      { id: "cos", n: 6 },
      { id: "ossos", n: 6 },
      { id: "musculs", n: 6 },
      { id: "diacritics", n: 6 },
      { id: "animals", n: 6 },
      { id: "verdures", n: 6 },
      { id: "especies", n: 5 },
      { id: "temps", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Tempesta a alta mar",
    moviments: 98,
    espais: 4,
    win_ratio: 0.46,
    families: [
      { id: "nautica", n: 7 },
      { id: "marisc", n: 7 },
      { id: "peixos", n: 6 },
      { id: "mars", n: 6 },
      { id: "llacs", n: 6 },
      { id: "rius", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "El garbuix",
    moviments: 160,
    espais: 5,
    win_ratio: 0.34,
    families: [
      { id: "colors", n: 5 },
      { id: "vehicles", n: 6 },
      { id: "capitals", n: 6 },
      { id: "festes", n: 5 },
      { id: "esports", n: 5 },
      { id: "escacs", n: 5 },
      { id: "joies", n: 5 },
      { id: "senyals", n: 5 },
      { id: "arbres", n: 5 },
      { id: "mobles", n: 6 },
      { id: "temps", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Natura amagada",
    moviments: 100,
    espais: 4,
    win_ratio: 0.44,
    families: [
      { id: "bolets", n: 6 },
      { id: "herbes", n: 6 },
      { id: "flors", n: 6 },
      { id: "aus", n: 6 },
      { id: "insectes", n: 6 },
      { id: "arbres", n: 5 },
      { id: "especies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    nom: "El poti-poti",
    moviments: 152,
    espais: 5,
    win_ratio: 0.36,
    families: [
      { id: "capitals", n: 6 },
      { id: "nba", n: 6 },
      { id: "escacs", n: 6 },
      { id: "joies", n: 6 },
      { id: "instruments", n: 6 },
      { id: "vehicles", n: 6 },
      { id: "colors", n: 5 },
      { id: "senyals", n: 5 },
      { id: "mobles", n: 5 },
      { id: "temps", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Cosmos profund",
    moviments: 90,
    espais: 4,
    win_ratio: 0.44,
    families: [
      { id: "constel", n: 6 },
      { id: "nuvols", n: 6 },
      { id: "planetes", n: 6 },
      { id: "elements", n: 6 },
      { id: "unitats", n: 5 },
      { id: "minerals", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Llegendes i mites",
    moviments: 92,
    espais: 4,
    win_ratio: 0.34,
    families: [
      { id: "mitologia", n: 7 },
      { id: "criatures", n: 7 },
      { id: "escacs", n: 5 },
      { id: "diacritics", n: 6 },
      { id: "capitals", n: 5 },
      { id: "joies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Setge medieval",
    moviments: 96,
    espais: 4,
    win_ratio: 0.44,
    families: [
      { id: "castells", n: 7 },
      { id: "monedes", n: 6 },
      { id: "eines_camp", n: 6 },
      { id: "oficis", n: 6 },
      { id: "mitologia", n: 6 },
      { id: "residencies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Paraulada II",
    moviments: 158,
    espais: 5,
    win_ratio: 0.32,
    families: [
      { id: "diacritics", n: 7 },
      { id: "ma", n: 5 },
      { id: "ossos", n: 5 },
      { id: "colors", n: 5 },
      { id: "senyals", n: 5 },
      { id: "capitals", n: 6 },
      { id: "cuina", n: 5 },
      { id: "temps", n: 5 },
      { id: "esports", n: 4 },
      { id: "instruments", n: 5 },
      { id: "arbres", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Nit de gala",
    moviments: 84,
    espais: 4,
    win_ratio: 0.42,
    families: [
      { id: "balls", n: 6 },
      { id: "cafes", n: 6 },
      { id: "begudes", n: 5 },
      { id: "roba", n: 5 },
      { id: "instruments", n: 5 },
      { id: "festes", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "El rebost ple",
    moviments: 144,
    espais: 5,
    win_ratio: 0.34,
    families: [
      { id: "verdures", n: 6 },
      { id: "cuina", n: 6 },
      { id: "begudes", n: 6 },
      { id: "fruites", n: 6 },
      { id: "mobles", n: 6 },
      { id: "oficis", n: 6 },
      { id: "roba", n: 5 },
      { id: "animals", n: 5 },
      { id: "especies", n: 4 },
      { id: "peixos", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Sobretaula",
    moviments: 100,
    espais: 4,
    win_ratio: 0.42,
    families: [
      { id: "cafes", n: 6 },
      { id: "pizzes", n: 6 },
      { id: "pastes", n: 6 },
      { id: "formatges", n: 6 },
      { id: "embotits", n: 6 },
      { id: "salses", n: 5 },
      { id: "begudes", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    nom: "Catalunya a fons",
    moviments: 126,
    espais: 4,
    win_ratio: 0.32,
    families: [
      { id: "comarques", n: 6 },
      { id: "simbols", n: 6 },
      { id: "capitals", n: 6 },
      { id: "festes", n: 5 },
      { id: "rius", n: 6 },
      { id: "muntanyes", n: 6 },
      { id: "pobles", n: 6 },
      { id: "residencies", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Ciència dura",
    moviments: 94,
    espais: 4,
    win_ratio: 0.38,
    families: [
      { id: "elements", n: 6 },
      { id: "planetes", n: 6 },
      { id: "unitats", n: 6 },
      { id: "cos", n: 5 },
      { id: "ossos", n: 5 },
      { id: "musculs", n: 5 },
      { id: "minerals", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    nom: "Matemàtiques expert",
    moviments: 94,
    espais: 4,
    win_ratio: 0.3,
    families: [
      { id: "branques", n: 7 },
      { id: "operacions", n: 7 },
      { id: "objectes_mates", n: 7 },
      { id: "matematics", n: 7 },
      { id: "unitats", n: 6 },
      { id: "especies", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    // últims 5 < 20%
    nom: "La lliga total",
    moviments: 148,
    espais: 5,
    win_ratio: 0.19,
    families: [
      { id: "nba", n: 8 },
      { id: "esports", n: 6 },
      { id: "escacs", n: 6 },
      { id: "musculs", n: 5 },
      { id: "cos", n: 5 },
      { id: "clubs", n: 6 },
      { id: "colors", n: 5 },
      { id: "olimpiades", n: 5 },
      { id: "ossos", n: 4 },
      { id: "ma", n: 4 },
      { id: "capitals", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Geografia infernal",
    moviments: 126,
    espais: 4,
    win_ratio: 0.16,
    families: [
      { id: "rius", n: 7 },
      { id: "muntanyes", n: 7 },
      { id: "mars", n: 7 },
      { id: "llacs", n: 7 },
      { id: "comarques", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 6 },
      { id: "pobles", n: 6 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "L'enciclopèdia",
    moviments: 184,
    espais: 6,
    win_ratio: 0.18,
    families: [
      { id: "musics", n: 7 },
      { id: "escriptors", n: 7 },
      { id: "actors", n: 7 },
      { id: "cientifics", n: 7 },
      { id: "rius", n: 6 },
      { id: "muntanyes", n: 6 },
      { id: "mars", n: 6 },
      { id: "llacs", n: 6 },
      { id: "comarques", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 6 },
      { id: "monedes", n: 6 }
    ],
    columnes: [5, 6, 7, 8, 9, 9]
  },
  {
    nom: "Paraulada final",
    moviments: 168,
    espais: 6,
    win_ratio: 0.14,
    families: [
      { id: "diacritics", n: 8 },
      { id: "capitals", n: 6 },
      { id: "instruments", n: 6 },
      { id: "arbres", n: 6 },
      { id: "temps", n: 6 },
      { id: "senyals", n: 6 },
      { id: "ossos", n: 5 },
      { id: "ma", n: 5 },
      { id: "colors", n: 5 },
      { id: "cuina", n: 6 },
      { id: "esports", n: 5 },
      { id: "vehicles", n: 4 }
    ],
    columnes: [5, 6, 7, 8, 9, 9]
  },
  {
    // boss final
    nom: "L'infern de les ovelles",
    moviments: 166,
    espais: 6,
    win_ratio: 0.08,
    families: [
      { id: "cos", n: 6 },
      { id: "ossos", n: 6 },
      { id: "musculs", n: 6 },
      { id: "diacritics", n: 7 },
      { id: "animals", n: 6 },
      { id: "verdures", n: 6 },
      { id: "colors", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 6 },
      { id: "senyals", n: 5 },
      { id: "joies", n: 3 },
      { id: "mobles", n: 4 }
    ],
    columnes: [5, 6, 7, 8, 9, 9]
  }
];
