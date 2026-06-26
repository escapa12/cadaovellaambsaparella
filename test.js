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

// `node test.js` valida l'edició principal (amics);
// `node test.js feina` valida l'edició de la carpeta "feina", etc.
// `node test.js --funnel` afegeix l'informe del level funnel (ho fa servir la skill).
const args = process.argv.slice(2);
const funnelMode = args.includes("--funnel");
const edicio = args.find((a) => !a.startsWith("--"));
const fitxerNivells = edicio ? `${edicio}/edicio.js` : "levels.js";
if (edicio && !fs.existsSync(__dirname + "/" + fitxerNivells)) {
  console.error(`❌ No existeix l'edició "${edicio}" (falta ${fitxerNivells})`);
  process.exit(1);
}
console.log(`Edició: ${edicio || "amics (principal)"}\n`);

for (const fitxer of ["families.js", "dibuixos.js", fitxerNivells, "game.js"]) {
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
  if (estat.pila.length || estat.descart.length) { accioRoba(); return "roba"; }
  return false; // bloquejat
}

function simula(intents) {
  // NIVELLS="15,16" INTENTS=1000 node test.js -> simula només aquests nivells
  const filtre = (typeof NIVELLS_FILTRE !== "undefined" && NIVELLS_FILTRE) || null;
  const res = [];
  for (let i = 0; i < LEVELS.length; i++) {
    if (filtre && !filtre.includes(i + 1)) continue;
    let vict = 0, margeTotal = 0, bloquejat = 0, senseMovLluitant = 0, senseMovCiclant = 0;
    for (let t = 0; t < intents; t++) {
      nouNivell(i);
      let guard = 0, encallat = false, robadesSeguides = 0;
      while (!estat.acabat && guard++ < 3000) {
        const pas = pasBot();
        if (!pas) { encallat = true; break; }
        if (pas === "roba") robadesSeguides++;
        else robadesSeguides = 0;
      }
      if (estat.recollides >= estat.totalCartes) { vict++; margeTotal += estat.moviments; }
      else if (encallat) bloquejat++; // cap jugada possible, ni robant (deadlock dur)
      else {
        // si quan mor portava més d'un cicle sencer de pila sense cap
        // jugada productiva, en realitat estava encallat cremant comptador
        const midaCicle = estat.pila.length + estat.descart.length + 1;
        if (robadesSeguides > midaCicle) senseMovCiclant++;
        else senseMovLluitant++;
      }
    }
    res.push({
      nivell: i + 1,
      nom: LEVELS[i].nom,
      ratioBot: +(vict / intents).toFixed(2),
      win_ratio: LEVELS[i].win_ratio ?? null,
      "mortLluitant%": Math.round(100 * senseMovLluitant / intents),
      "mortCiclant%": Math.round(100 * senseMovCiclant / intents),
      "bloquejat%": Math.round(100 * bloquejat / intents),
      margeMitja: vict ? (margeTotal / vict).toFixed(1) : "-"
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

const nivellsFiltre = process.env.NIVELLS ? process.env.NIVELLS.split(",").map(Number) : null;
const intents = parseInt(process.env.INTENTS || "200", 10);
vm.runInContext(`const NIVELLS_FILTRE = ${JSON.stringify(nivellsFiltre)};`, sandbox);
console.log(`2) El bot juga ${intents} partides per nivell...`);
const resultats = vm.runInContext(codiBot.replace("simula(200)", `simula(${intents})`), sandbox);
if (!funnelMode) console.table(resultats);

// ---------- informe del LEVEL FUNNEL (node test.js --funnel) ----------
if (funnelMode) {
  const levels = vm.runInContext("LEVELS", sandbox);
  const fams = vm.runInContext("FAMILIES", sandbox);
  const blocs = vm.runInContext("typeof BLOCS !== 'undefined' ? BLOCS : null", sandbox);
  const nomBloc = (i) => {
    if (!blocs || !blocs.length) return "";
    let acc = 0;
    for (const b of blocs) { acc += b.mida || 0; if (i < acc) return `${b.emoji} ${b.nom}`; }
    const u = blocs[blocs.length - 1];
    return `${u.emoji} ${u.nom}`;
  };
  const dif = (r) => r.win_ratio == null ? "?" :
    r.win_ratio >= 0.8 ? "Molt fàcil" : r.win_ratio >= 0.6 ? "Fàcil" :
    r.win_ratio >= 0.45 ? "Mitjana" : r.win_ratio >= 0.3 ? "Difícil" : "Molt difícil";

  console.log(`\n# 📊 Level funnel — edició ${edicio || "amics"} (${intents} partides/nivell)\n`);
  console.log("## Mètriques per nivell\n");
  console.log("| # | Nivell | Bloc | Famílies | Dificultat | Bot win% | Mov. rest. en guanyar | % bloqueig | % sense moviments |");
  console.log("|--:|---|---|---|---|--:|--:|--:|--:|");
  resultats.forEach((r, i) => {
    const familiesTxt = levels[i].families.map((f) => `${(fams[f.id] && fams[f.id].nom) || f.id}·${f.n}`).join(", ");
    const senseMov = r["mortLluitant%"] + r["mortCiclant%"];
    console.log(`| ${r.nivell} | ${r.nom} | ${nomBloc(i)} | ${familiesTxt} | ${dif(r)} (${r.win_ratio ?? "?"}) | ${Math.round(r.ratioBot * 100)}% | ${r.margeMitja} | ${r["bloquejat%"]}% | ${senseMov}% |`);
  });

  // funnel de progressió: modelat amb la dificultat objectiu (win_ratio).
  // Els jugadors reintenten cada nivell, així que la probabilitat de superar-lo
  // és 1-(1-win_ratio)^reintents. Ajusta amb REINTENTS=n node test.js --funnel.
  const reintents = parseInt(process.env.REINTENTS || "3", 10);
  console.log(`\n## Funnel de progressió (win_ratio objectiu, fins a ${reintents} intents/nivell)\n`);
  console.log("Partim del 100% dels jugadors que comencen el nivell 1. Es modela que");
  console.log(`cadascú prova cada nivell fins a ${reintents} cops abans d'abandonar.\n`);
  console.log("| # | Nivell | % que hi arriba | % que el supera | abandó al nivell |");
  console.log("|--:|---|--:|--:|--:|");
  let arriba = 1;
  let pitjorDrop = { nivell: null, drop: -1 };
  resultats.forEach((r, i) => {
    const wr = r.win_ratio == null ? 1 : r.win_ratio;
    const pSupera = 1 - Math.pow(1 - wr, reintents);
    const supera = arriba * pSupera;
    const abandó = arriba - supera;
    if (abandó > pitjorDrop.drop) pitjorDrop = { nivell: r.nivell, nom: r.nom, drop: abandó };
    console.log(`| ${r.nivell} | ${r.nom} | ${(arriba * 100).toFixed(1)}% | ${(supera * 100).toFixed(1)}% | ${(abandó * 100).toFixed(1)}% |`);
    arriba = supera;
  });
  console.log(`\n**Arribada estimada al final (nivell ${resultats.length}):** ${(arriba * 100).toFixed(2)}%`);
  if (pitjorDrop.nivell != null)
    console.log(`**Punt de major abandó:** nivell ${pitjorDrop.nivell} «${pitjorDrop.nom}» (${(pitjorDrop.drop * 100).toFixed(1)}% del total).`);
  console.log("");
}

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
