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
//               de dificultat que valida test.js; baixa
//               gradualment amb els nivells.
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
// Els 4 primers nivells fan servir les famílies FÀCILS
// (granja, colors_basics, transport, escola, esmorzar);
// a partir del 5 entren les famílies amb paraules traïdores.
//
// Compte: no barregis al mateix nivell famílies que comparteixen
// una paraula (p. ex. Joies i Mà tenen "Anell", NBA i Festes
// tenen "Reis", NBA i Diacrítics tenen "Ossos");
// test.js i el mateix joc t'avisaran si passa.
// ============================================================

const LEVELS = [
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
    win_ratio: 0.85,
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
    win_ratio: 0.8,
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
  {
    nom: "El Marc i l'Aina",
    moviments: 92,
    espais: 4,
    win_ratio: 0.68,
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
    nom: "Set famílies (i mitja)",
    moviments: 102,
    espais: 4,
    win_ratio: 0.62,
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
    nom: "Nivell dels amics",
    moviments: 108,
    espais: 4,
    win_ratio: 0.55,
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
    nom: "Anatomia",
    moviments: 110,
    espais: 4,
    win_ratio: 0.5,
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
    nom: "El gran repte",
    moviments: 130,
    espais: 4,
    win_ratio: 0.45,
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
    nom: "Escapada de cap de setmana",
    moviments: 104,
    espais: 4,
    win_ratio: 0.4,
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
    nom: "La lliga",
    moviments: 121,
    espais: 4,
    win_ratio: 0.35,
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
    moviments: 95,
    espais: 5,
    win_ratio: 0.3,
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
    nom: "Paraulada",
    moviments: 113,
    espais: 5,
    win_ratio: 0.25,
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
    nom: "Tots els amics",
    moviments: 119,
    espais: 5,
    win_ratio: 0.2,
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
    moviments: 124,
    espais: 5,
    win_ratio: 0.15,
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
