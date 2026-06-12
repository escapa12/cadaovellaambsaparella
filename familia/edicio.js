// ============================================================
// EDICIÓ: FAMÍLIA
// ============================================================
// Aquesta carpeta és una edició independent del joc:
//   - el seu enllaç:    .../familia/
//   - el seu progrés:   separat de les altres edicions
//   - els seus nivells: els d'aquest fitxer
//
// Per crear una edició nova: copia aquesta carpeta sencera,
// canvia EDICIO_ID i fes els teus nivells.
// Per validar-la: node test.js familia
// ============================================================

window.EDICIO_ID = "familia";
window.RUTA_ARREL = "../";

// Famílies pròpies d'aquesta edició (se sumen a les de families.js).
// Exemple: una família amb els cosins, tiets i padrins:
window.FAMILIES_EXTRA = {
  // cosins: {
  //   nom: "Els cosins",
  //   emoji: "👨‍👩‍👧‍👦",
  //   paraules: ["Mote 1", "Mote 2", "Mote 3", "Mote 4", "Mote 5", "Mote 6"]
  // }
};

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
    nom: "Escac i mat",
    moviments: 62,
    espais: 2,
    win_ratio: 0.85,
    families: [
      { id: "escacs", n: 6 },
      { id: "transport", n: 6 },
      { id: "postres", n: 5 },
      { id: "colors_basics", n: 4 },
      { id: "fruites", n: 4 }
    ],
    columnes: [2, 3, 4, 4]
  },
  {
    nom: "Joies de la corona",
    moviments: 76,
    espais: 3,
    win_ratio: 0.8,
    families: [
      { id: "joies", n: 6 },
      { id: "granja", n: 5 },
      { id: "escola", n: 5 },
      { id: "esmorzar", n: 4 },
      { id: "dies", n: 5 },
      { id: "postres", n: 4 }
    ],
    columnes: [2, 3, 4, 5]
  },
  {
    nom: "La volta al món",
    moviments: 90,
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
    nom: "Vuit famílies",
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
      { id: "arbres", n: 5 },
      { id: "cuina", n: 4 }
    ],
    columnes: [3, 4, 5, 5, 6]
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
  }
];
