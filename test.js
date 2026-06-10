// ============================================================
// TEST AUTOMÀTIC — node test.js
// ============================================================
// 1. Valida que families.js i levels.js siguin coherents.
// 2. Fa jugar un "bot" senzill a cada nivell moltes vegades per
//    comprovar que els nivells es poden guanyar amb els
//    moviments configurats.
//
// Útil quan afegeixis o canviïs nivells!
// ============================================================

const fs = require("fs");
const vm = require("vm");

// ---------- DOM simulat (suficient perquè game.js no peti) ----------
function stubEl() {
  const e = {
    style: { setProperty() {} },
    dataset: {},
    children: [],
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    addEventListener() {},
    appendChild(c) { e.children.push(c); },
    remove() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 80, height: 104 }),
    querySelectorAll: () => [],
    closest: () => null,
    clientHeight: 420,
    disabled: false,
    innerHTML: "",
    textContent: "",
    className: "",
    onclick: null
  };
  return e;
}

const magatzem = {};
const sandbox = {
  console,
  document: {
    querySelector: () => stubEl(),
    querySelectorAll: () => [],
    createElement: () => stubEl(),
    addEventListener() {},
    body: { appendChild() {} },
    documentElement: { clientWidth: 390, style: { setProperty() {} } }
  },
  localStorage: {
    getItem: (k) => (k in magatzem ? magatzem[k] : null),
    setItem: (k, v) => { magatzem[k] = String(v); },
    removeItem: (k) => { delete magatzem[k]; }
  },
  getComputedStyle: () => ({ getPropertyValue: () => "104px" }),
  setTimeout: (f) => { f(); return 0; }, // immediat: així les fundacions completes s'alliberen
  clearTimeout() {},
  requestAnimationFrame() {},
  alert: (m) => { console.error("ALERTA del joc:", m); process.exitCode = 1; },
  confirm: () => false,
  location: { protocol: "file:", search: "" },
  navigator: {},
  URLSearchParams,
  Math, JSON, Object, Array
};
sandbox.window = sandbox;
sandbox.addEventListener = () => {};
vm.createContext(sandbox);

for (const fitxer of ["families.js", "dibuixos.js", "levels.js", "game.js"]) {
  vm.runInContext(fs.readFileSync(__dirname + "/" + fitxer, "utf8"), sandbox, { filename: fitxer });
}

// ---------- bot que juga sol ----------
const codiBot = `
// blocs accessibles (la pila contigua de la mateixa família de dalt de cada columna + descart)
function blocsAccessibles() {
  const o = [];
  estat.columnes.forEach((col, ci) => {
    if (!col.length || !col[col.length - 1].destapada) return;
    const fam = col[col.length - 1].familia;
    let i = col.length - 1;
    while (i > 0 && col[i - 1].destapada && col[i - 1].familia === fam) i--;
    o.push({ origen: { tipus: "columna", col: ci, idx: i }, cartes: col.slice(i) });
  });
  if (estat.descart.length) {
    o.push({ origen: { tipus: "descart" }, cartes: [estat.descart[estat.descart.length - 1]] });
  }
  return o;
}

function pasBot() {
  const blocs = blocsAccessibles();
  // 1. un bloc amb carta mestra pot obrir un espai buit
  if (fundacioBuida() >= 0) {
    for (const b of blocs) {
      if (b.cartes.some(c => c.mestra) && mouAFundacio(b.origen)) return true;
    }
  }
  // 2. paraules cap a una fundació activa de la seva família
  for (const b of blocs) {
    if (!b.cartes.some(c => c.mestra) && fundacioActiva(b.cartes[0].familia) >= 0 && mouAFundacio(b.origen)) return true;
  }
  // 3. moure un bloc de columna si això destapa una carta
  for (const b of blocs) {
    if (b.origen.tipus !== "columna" || b.origen.idx === 0) continue;
    for (let cd = 0; cd < estat.columnes.length; cd++) {
      if (cd === b.origen.col) continue;
      if (potMoureAColumna(b.cartes, cd) && mouAColumna(b.origen, cd)) return true;
    }
  }
  // 4. ajuntar el descart amb el seu grup en una columna
  if (estat.descart.length) {
    const top = estat.descart[estat.descart.length - 1];
    if (!top.mestra) {
      for (let cd = 0; cd < estat.columnes.length; cd++) {
        if (potMoureAColumna([top], cd) && estat.columnes[cd].length && mouAColumna({ tipus: "descart" }, cd)) return true;
      }
    }
  }
  // 5. robar (o reciclar)
  if (estat.pila.length || estat.descart.length) { accioRoba(); return true; }
  return false; // bloquejat
}

function simula(intents) {
  const res = [];
  for (let i = 0; i < LEVELS.length; i++) {
    let vict = 0, margeTotal = 0, bloquejos = 0;
    for (let t = 0; t < intents; t++) {
      nouNivell(i);
      let guard = 0;
      while (!estat.acabat && guard++ < 3000) {
        if (!pasBot()) { bloquejos++; break; }
      }
      if (estat.recollides >= estat.totalCartes) { vict++; margeTotal += estat.moviments; }
    }
    res.push({
      nivell: i + 1,
      nom: LEVELS[i].nom,
      ratioBot: +(vict / intents).toFixed(2),
      win_ratio: LEVELS[i].win_ratio ?? null,
      margeMitja: vict ? (margeTotal / vict).toFixed(1) : "-",
      bloquejos
    });
  }
  return res;
}
simula(200);
`;

console.log("1) Validant configuració...");
const errors = vm.runInContext("validaConfiguracio()", sandbox);
if (errors.length) {
  console.error("   ❌ Errors:\n   " + errors.join("\n   "));
  process.exit(1);
}
console.log("   ✓ families.js i levels.js són coherents\n");

console.log("2) El bot juga 200 partides per nivell...");
const resultats = vm.runInContext(codiBot, sandbox);
console.table(resultats);

// el bot és un jugador "decent però sense planificar" i no s'equivoca mai de
// família (un humà sí, i cada error resta): als nivells difícils és normal que
// el bot guanyi força més que el win_ratio humà esperat. Per això el marge
// superior és ampli (+0.35) i el inferior estret (-0.15).
const massaDificils = resultats.filter(r => r.win_ratio != null && r.ratioBot < r.win_ratio - 0.15);
const massaFacils = resultats.filter(r => r.win_ratio != null && r.ratioBot > Math.min(r.win_ratio + 0.35, 1));
if (massaDificils.length)
  console.warn("⚠️  Nivells força per sota del win_ratio esperat (potser massa difícils): " + massaDificils.map(r => r.nivell).join(", "));
if (massaFacils.length)
  console.warn("ℹ️  Nivells molt per sobre del win_ratio esperat (potser massa fàcils): " + massaFacils.map(r => r.nivell).join(", "));
if (!massaDificils.length && !massaFacils.length)
  console.log("✓ Tots els nivells estan dins del marge del seu win_ratio.");
