// Calibratge de moviments per MARGE OBJECTIU.
// Mesura l'ús real del bot amb pressupost il·limitat i fixa
//   moviments = ús_mitjà + marge_objectiu
// on marge_objectiu depèn del win_ratio (màx 15, mínim 3): com més
// baix el win_ratio (i com més s'avança), més baix el marge.
//   node calibra.js          -> mostra la proposta
//   node calibra.js --apply  -> reescriu els moviments a levels.js
const fs = require("fs");
const vm = require("vm");

function stubEl() {
  const e = { style: { setProperty() {} }, dataset: {}, children: [],
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    addEventListener() {}, appendChild(c) { e.children.push(c); }, remove() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 80, height: 104 }),
    querySelectorAll: () => [], closest: () => null, clientHeight: 420,
    disabled: false, innerHTML: "", textContent: "", className: "", onclick: null };
  return e;
}
const magatzem = {};
const sandbox = {
  console,
  document: { querySelector: () => stubEl(), querySelectorAll: () => [], createElement: () => stubEl(),
    addEventListener() {}, body: { appendChild() {} }, documentElement: { clientWidth: 390, style: { setProperty() {} } } },
  localStorage: { getItem: (k) => (k in magatzem ? magatzem[k] : null), setItem: (k, v) => { magatzem[k] = String(v); }, removeItem: (k) => { delete magatzem[k]; } },
  getComputedStyle: () => ({ getPropertyValue: () => "104px" }),
  setTimeout: (f) => { f(); return 0; }, clearTimeout() {}, requestAnimationFrame() {},
  alert: () => {}, confirm: () => false, location: { protocol: "file:", search: "" }, navigator: {}, URLSearchParams, Math, JSON, Object, Array
};
sandbox.window = sandbox;
sandbox.addEventListener = () => {};
vm.createContext(sandbox);
for (const f of ["families.js", "dibuixos.js", "definicions.js", "levels.js", "game.js"]) {
  vm.runInContext(fs.readFileSync(__dirname + "/" + f, "utf8"), sandbox, { filename: f });
}

const LEVELS = vm.runInContext("LEVELS", sandbox);
const BLOCS = vm.runInContext("typeof BLOCS!=='undefined'?BLOCS:[]", sandbox);
const blocDe = (i) => { let a = 0; for (const b of BLOCS) { a += b.mida || 0; if (i < a) return b.id; } return "?"; };

// marge objectiu segons el win_ratio: 15 (fàcil) → 3 (molt difícil)
function margeObjectiu(wr) {
  if (wr == null) wr = 0.5;
  return Math.max(3, Math.min(15, Math.round(2 + wr * 13)));
}

const INTENTS = parseInt(process.env.INTENTS || "300", 10);

// mesura l'ús real (moviments gastats per guanyar) amb pressupost il·limitat
const codiBot = `
function blocsAccessibles(){const o=[];estat.columnes.forEach((col,ci)=>{if(!col.length||!col[col.length-1].destapada)return;const fam=col[col.length-1].familia;let i=col.length-1;while(i>0&&col[i-1].destapada&&col[i-1].familia===fam)i--;o.push({origen:{tipus:"columna",col:ci,idx:i},cartes:col.slice(i)});});if(estat.descart.length)o.push({origen:{tipus:"descart"},cartes:[estat.descart[estat.descart.length-1]]});return o;}
function pasBot(){const blocs=blocsAccessibles();if(fundacioBuida()>=0){for(const b of blocs){if(b.cartes.some(c=>c.mestra)&&mouAFundacio(b.origen))return true;}}for(const b of blocs){if(!b.cartes.some(c=>c.mestra)&&fundacioActiva(b.cartes[0].familia)>=0&&mouAFundacio(b.origen))return true;}for(const b of blocs){if(b.origen.tipus!=="columna"||b.origen.idx===0)continue;for(let cd=0;cd<estat.columnes.length;cd++){if(cd===b.origen.col)continue;if(potMoureAColumna(b.cartes,cd)&&mouAColumna(b.origen,cd))return true;}}if(estat.descart.length){const top=estat.descart[estat.descart.length-1];if(!top.mestra){for(let cd=0;cd<estat.columnes.length;cd++){if(potMoureAColumna([top],cd)&&estat.columnes[cd].length&&mouAColumna({tipus:"descart"},cd))return true;}}}if(estat.pila.length||estat.descart.length){accioRoba();return"roba";}return false;}
function midaUs(intents){const res=[];for(let i=0;i<LEVELS.length;i++){LEVELS[i].moviments=100000;let v=0,sum=0;for(let t=0;t<intents;t++){nouNivell(i);let g=0;let rr=0;while(!estat.acabat&&g++<1500){const p=pasBot();if(!p)break;if(p==="roba"){if(++rr>(estat.pila.length+estat.descart.length+2))break;}else rr=0;}if(estat.recollides>=estat.totalCartes){v++;sum+=100000-estat.moviments;}}res.push({usat:v?sum/v:0,win:v/intents});}return res;}
midaUs(${INTENTS});
`;
const dades = vm.runInContext(codiBot, sandbox);

// rellegim els moviments originals del fitxer (els del sandbox s'han sobreescrit a 100000)
const movOriginals = (fs.readFileSync(__dirname + "/levels.js", "utf8").match(/moviments: \d+/g) || []).map((s) => parseInt(s.slice(11), 10));

const nous = LEVELS.map((niv, i) => {
  const t = margeObjectiu(niv.win_ratio);
  const u = dades[i].usat;
  const mov = Math.round((u + t) / 2) * 2;
  return { i, nom: niv.nom, bloc: blocDe(i), wr: niv.win_ratio, usat: Math.round(u), marge: t, vell: movOriginals[i], nou: mov };
});

console.log("# | bloc | wr | usat | marge_obj | mov vell -> nou");
nous.forEach((n) => console.log(`${n.i + 1} | ${n.bloc} | ${n.wr} | ${n.usat} | ${n.marge} | ${n.vell} -> ${n.nou}`));

if (process.argv.includes("--apply")) {
  let txt = fs.readFileSync(__dirname + "/levels.js", "utf8");
  let k = 0;
  txt = txt.replace(/moviments: \d+/g, () => `moviments: ${nous[k++].nou}`);
  if (k !== nous.length) { console.error(`❌ esperava ${nous.length}, fetes ${k}`); process.exit(1); }
  fs.writeFileSync(__dirname + "/levels.js", txt);
  console.log(`\n✓ Aplicat: ${k} nivells recalibrats per marge objectiu`);
}
