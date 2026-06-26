// ============================================================
// CONFIGURACIÓ DELS NIVELLS
// ============================================================
// Cada nivell és un objecte amb:
//
//   nom:        nom del nivell
//   moviments:  límit de moviments (robar carta també compta;
//               els errors de família resten cada cop més!)
//   espais:     quants espais de col·lecció hi ha a dalt
//   win_ratio:  ràtio de victòries esperada (0 a 1). Referència
//               de dificultat que valida test.js.
//   families:   quines famílies hi surten i quantes paraules
//               de cada una, p. ex. { id: "fruites", n: 6 }
//               (les claus han d'existir a families.js).
//               Les "n" poden ser ben diferents, màxim 9.
//   columnes:   cartes per columna del tauler, en patró
//               TRIANGULAR: columnes curtes a l'esquerra i
//               llargues (amb més tapades) a la dreta.
//               Només la carta de dalt comença destapada.
//
// El joc afegeix automàticament 1 carta mestra 👑 per família:
// el total de cartes és (suma de n) + (nombre de famílies).
// Les cartes que no caben a les columnes van a la pila de robar.
//
// Compte: no barregis al mateix nivell famílies que comparteixen
// una paraula (p. ex. Joies i Mà tenen "Anell"); test.js i el
// mateix joc t'avisaran si passa.
// ============================================================
//
// ESTRUCTURA EN 3 BLOCS:
//   · Nivells 1-5  → TUTORIAL (suau; el 5è una mica més fort)
//   · Nivells 6-23 → BLOC MITJÀ (dificultat OSCIL·LANT, mai tan
//                     dura com el gran repte). Els nivells nous
//                     van aquí per defecte.
//   · Nivells 24-28 → GRAN REPTE (els més difícils)
//
// Els nivells temàtics estan intercalats dins del bloc mitjà.
// ============================================================
//
// BLOCS DEL MENÚ (les 3 distincions de dificultat que es veuen
// a la pantalla d'inici). El joc assigna cada nivell a un bloc
// per POSICIÓ: els primers `primers` nivells al Tutorial, els
// últims `ultims` al Repte final, i tota la resta al bloc del
// mig. Així, quan afegeixis nivells nous al mig, els blocs
// s'ajusten sols (no cal tocar res aquí).
// ============================================================
const BLOCS = [
  { id: "tutorial", nom: "Tutorial",    emoji: "🌱", primers: 5 },
  { id: "mig",      nom: "Normal",      emoji: "🐑" },
  { id: "repte",    nom: "Repte final", emoji: "🔥", ultims: 5 }
];

const LEVELS = [

  // ========================================================
  // BLOC 1 · TUTORIAL (1-5)
  // ========================================================
  {
    nom: "Primeres passes",
    moviments: 40,
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
    moviments: 52,
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
    moviments: 62,
    espais: 2,
    win_ratio: 0.86,
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
    moviments: 76,
    espais: 3,
    win_ratio: 0.82,
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
    nom: "La volta al món",
    moviments: 85,
    espais: 4,
    win_ratio: 0.76,
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
  // BLOC 2 · MITJÀ (6-20) · dificultat oscil·lant
  // ========================================================
  {
    // temàtic GEOGRAFIA (versió fàcil: rius/muntanyes/mars/llacs CONEGUTS)
    nom: "Geografia: primer viatge",
    moviments: 68,
    espais: 4,
    win_ratio: 0.7,
    families: [
      { id: "rius_facils", n: 5 },
      { id: "muntanyes_facils", n: 5 },
      { id: "mars_facils", n: 5 },
      { id: "llacs_facils", n: 4 },
      { id: "paisos", n: 5 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "Set famílies (i mitja)",
    moviments: 102,
    espais: 4,
    win_ratio: 0.58,
    families: [
      { id: "senyals", n: 6 },
      { id: "mobles", n: 8 },
      { id: "oficis", n: 5 },
      { id: "begudes", n: 6 },
      { id: "vehicles", n: 4 },
      { id: "joies", n: 4 },
      { id: "colors", n: 5 },
      { id: "nba", n: 5 },
      { id: "cuina", n: 4 }
    ],
    columnes: [3, 4, 5, 5, 6]
  },
  {
    // temàtic CULTURA (versió fàcil: noms MOLT coneguts)
    nom: "Cultura general",
    moviments: 58,
    espais: 4,
    win_ratio: 0.68,
    families: [
      { id: "musics_facils", n: 5 },
      { id: "escriptors_facils", n: 5 },
      { id: "actors_facils", n: 5 },
      { id: "cientifics_facils", n: 5 },
      { id: "instruments", n: 5 }
    ],
    columnes: [2, 3, 4, 5, 6]
  },
  {
    nom: "El Marc i l'Aina",
    moviments: 78,
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
    columnes: [2, 3, 4, 5, 6]
  },
  {
    // temàtic ESPORTS
    nom: "Esports",
    moviments: 62,
    espais: 4,
    win_ratio: 0.66,
    families: [
      { id: "esports", n: 6 },
      { id: "nba", n: 6 },
      { id: "clubs", n: 6 },
      { id: "olimpiades", n: 5 },
      { id: "escacs", n: 5 },
      { id: "musculs", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    // temàtic MENJAR (italià + xarcuteria)
    nom: "El tiberi",
    moviments: 64,
    espais: 4,
    win_ratio: 0.62,
    families: [
      { id: "pizzes", n: 6 },
      { id: "pastes", n: 6 },
      { id: "formatges", n: 6 },
      { id: "embotits", n: 6 },
      { id: "salses", n: 5 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Nivell dels amics",
    moviments: 108,
    espais: 4,
    win_ratio: 0.54,
    families: [
      { id: "pau_mas", n: 5 },
      { id: "marc_granado", n: 6 },
      { id: "mariona", n: 6 },
      { id: "lupe", n: 4 },
      { id: "aina", n: 5 },
      { id: "residencies", n: 5 },
      { id: "ma", n: 4 },
      { id: "senyals", n: 5 },
      { id: "nba", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Cares noves",
    moviments: 96,
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
    // temàtic CIÈNCIA
    nom: "Ciència",
    moviments: 60,
    espais: 4,
    win_ratio: 0.64,
    families: [
      { id: "elements", n: 6 },
      { id: "planetes", n: 6 },
      { id: "unitats", n: 6 },
      { id: "cos", n: 5 },
      { id: "ossos", n: 5 },
      { id: "musculs", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7]
  },
  {
    nom: "Anatomia",
    moviments: 110,
    espais: 4,
    win_ratio: 0.52,
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
    // temàtic CATALUNYA
    nom: "Tot Catalunya",
    moviments: 62,
    espais: 4,
    win_ratio: 0.62,
    families: [
      { id: "comarques", n: 6 },
      { id: "simbols", n: 6 },
      { id: "capitals", n: 6 },
      { id: "festes", n: 5 },
      { id: "rius", n: 5 },
      { id: "residencies", n: 4 }
    ],
    columnes: [4, 5, 6, 7]
  },
  {
    nom: "El gran repte",
    moviments: 138,
    espais: 4,
    win_ratio: 0.5,
    families: [
      { id: "colors", n: 5 },
      { id: "vehicles", n: 7 },
      { id: "temps", n: 5 },
      { id: "capitals", n: 8 },
      { id: "festes", n: 5 },
      { id: "esports", n: 6 },
      { id: "escacs", n: 6 },
      { id: "joies", n: 6 },
      { id: "senyals", n: 5 },
      { id: "arbres", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    // temàtic MATEMÀTIQUES
    nom: "Matemàtiques",
    moviments: 54,
    espais: 4,
    win_ratio: 0.6,
    families: [
      { id: "branques", n: 7 },
      { id: "operacions", n: 7 },
      { id: "objectes_mates", n: 7 },
      { id: "matematics", n: 6 },
      { id: "unitats", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "Escapada de cap de setmana",
    moviments: 116,
    espais: 4,
    win_ratio: 0.5,
    families: [
      { id: "residencies", n: 6 },
      { id: "capitals", n: 7 },
      { id: "paisos", n: 6 },
      { id: "vehicles", n: 6 },
      { id: "begudes", n: 5 },
      { id: "temps", n: 5 },
      { id: "festes", n: 5 },
      { id: "roba", n: 4 },
      { id: "cuina", n: 3 },
      { id: "instruments", n: 4 }
    ],
    columnes: [3, 4, 5, 6, 7, 8]
  },
  {
    // temàtic POBLACIONS
    nom: "Pobles i ciutats",
    moviments: 60,
    espais: 4,
    win_ratio: 0.58,
    families: [
      { id: "pobles", n: 7 },
      { id: "capitals", n: 7 },
      { id: "comarques", n: 6 },
      { id: "muntanyes", n: 5 },
      { id: "rius", n: 5 },
      { id: "residencies", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "La lliga",
    moviments: 132,
    espais: 5,
    win_ratio: 0.5,
    families: [
      { id: "nba", n: 8 },
      { id: "esports", n: 6 },
      { id: "escacs", n: 6 },
      { id: "musculs", n: 5 },
      { id: "cos", n: 5 },
      { id: "marc_granado", n: 6 },
      { id: "colors", n: 5 },
      { id: "aina", n: 5 },
      { id: "ossos", n: 4 },
      { id: "ma", n: 4 }
    ],
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "El rebost",
    moviments: 108,
    espais: 5,
    win_ratio: 0.56,
    families: [
      { id: "verdures", n: 7 },
      { id: "cuina", n: 7 },
      { id: "begudes", n: 6 },
      { id: "fruites", n: 7 },
      { id: "mobles", n: 6 },
      { id: "oficis", n: 6 },
      { id: "roba", n: 5 },
      { id: "animals", n: 5 },
      { id: "festes", n: 3 },
      { id: "joies", n: 3 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Tota la colla",
    moviments: 104,
    espais: 5,
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

  // ========================================================
  // BLOC 3 · GRAN REPTE (24-28)
  // ========================================================
  {
    // temàtic GEOGRAFIA (versió difícil: rius/muntanyes/mars/llacs POC CONEGUTS)
    nom: "Geografia: el repte mundial",
    moviments: 70,
    espais: 4,
    win_ratio: 0.42,
    families: [
      { id: "rius", n: 7 },
      { id: "muntanyes", n: 7 },
      { id: "mars", n: 7 },
      { id: "llacs", n: 7 },
      { id: "comarques", n: 6 },
      { id: "capitals", n: 6 },
      { id: "paisos", n: 5 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Paraulada",
    moviments: 113,
    espais: 5,
    win_ratio: 0.36,
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
    // temàtic CULTURA (versió difícil)
    nom: "Cultura: nivell expert",
    moviments: 52,
    espais: 4,
    win_ratio: 0.32,
    families: [
      { id: "musics", n: 8 },
      { id: "escriptors", n: 8 },
      { id: "actors", n: 8 },
      { id: "cientifics", n: 8 },
      { id: "instruments", n: 6 }
    ],
    columnes: [4, 5, 6, 7, 8, 9]
  },
  {
    nom: "Tots els amics",
    moviments: 127,
    espais: 5,
    win_ratio: 0.28,
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
    columnes: [4, 5, 6, 7, 8]
  },
  {
    nom: "L'infern de les ovelles",
    moviments: 132,
    espais: 5,
    win_ratio: 0.24,
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
    columnes: [4, 5, 6, 7, 8, 9]
  }
];
