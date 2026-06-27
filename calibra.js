// Calibratge de moviments BASAT EN LA SIMULACIÓ.
// Mesura quants moviments gasta de mitjana el bot per guanyar cada
// nivell i fixa el límit a: gastat_mitjà × BUFFER (per bloc), amb un
// marge mínim garantit. Així es retalla el marge sobrant sense fer
// els nivells impossibles.
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

// buffer (marge multiplicatiu sobre el que gasta el bot) i marge mínim per bloc
const BUFFER = { tutorial: 1.7, normal: 1.4, dificil: 1.55 };
const MIN_MARGE = { tutorial: 12, normal: 8, dificil: 8 };

const INTENTS = parseInt(process.env.INTENTS || "400", 10);

// bot: per cada nivell, mesura el gastat mitjà per guanyar i el % de victòries
const codiBot = `
function blocsAccessibles(){const o=[];estat.columnes.forEach((col,ci)=>{if(!col.length||!col[col.length-1].destapada)return;const fam=col[col.length-1].familia;let i=col.length-1;while(i>0&&col[i-1].destapada&&col[i-1].familia===fam)i--;o.push({origen:{tipus:"columna",col:ci,idx:i},cartes:col.slice(i)});});if(estat.descart.length)o.push({origen:{tipus:"descart"},cartes:[estat.descart[estat.descart.length-1]]});return o;}
function pasBot(){const blocs=blocsAccessibles();if(fundacioBuida()>=0){for(const b of blocs){if(b.cartes.some(c=>c.mestra)&&mouAFundacio(b.origen))return true;}}for(const b of blocs){if(!b.cartes.some(c=>c.mestra)&&fundacioActiva(b.cartes[0].familia)>=0&&mouAFundacio(b.origen))return true;}for(const b of blocs){if(b.origen.tipus!=="columna"||b.origen.idx===0)continue;for(let cd=0;cd<estat.columnes.length;cd++){if(cd===b.origen.col)continue;if(potMoureAColumna(b.cartes,cd)&&mouAColumna(b.origen,cd))return true;}}if(estat.descart.length){const top=estat.descart[estat.descart.length-1];if(!top.mestra){for(let cd=0;cd<estat.columnes.length;cd++){if(potMoureAColumna([top],cd)&&estat.columnes[cd].length&&mouAColumna({tipus:"descart"},cd))return true;}}}if(estat.pila.length||estat.descart.length){accioRoba();return"roba";}return false;}
function midaUs(intents){const res=[];for(let i=0;i<LEVELS.length;i++){let vict=0,usatTotal=0;const lim=LEVELS[i].moviments;for(let t=0;t<intents;t++){nouNivell(i);let g=0;while(!estat.acabat&&g++<3000){if(!pasBot())break;}if(estat.recollides>=estat.totalCartes){vict++;usatTotal+=(lim-estat.moviments);}}res.push({win:vict/intents,usat:vict?usatTotal/vict:lim});}return res;}
midaUs(${INTENTS});
`;
const dades = vm.runInContext(codiBot, sandbox);

const nous = LEVELS.map((niv, i) => {
  const bloc = blocDe(i);
  const usat = dades[i].usat;
  const buf = BUFFER[bloc] || 1.5, minM = MIN_MARGE[bloc] || 8;
  let mov = Math.max(Math.round(usat * buf), Math.round(usat + minM));
  mov = Math.min(niv.moviments, mov); // només retallar, mai augmentar
  mov = Math.round(mov / 2) * 2;
  return { i, nom: niv.nom, bloc, vell: niv.moviments, usat: Math.round(usat), win: Math.round(dades[i].win * 100), nou: mov };
});

console.log("# | bloc | usat | win% | mov vell -> nou (marge nou)");
nous.forEach((n) => console.log(`${n.i + 1} | ${n.bloc} | ${n.usat} | ${n.win}% | ${n.vell} -> ${n.nou} (${n.nou - n.usat})`));

if (process.argv.includes("--apply")) {
  let txt = fs.readFileSync(__dirname + "/levels.js", "utf8");
  let k = 0;
  txt = txt.replace(/moviments: \d+/g, () => `moviments: ${nous[k++].nou}`);
  if (k !== nous.length) { console.error(`❌ esperava ${nous.length}, fetes ${k}`); process.exit(1); }
  fs.writeFileSync(__dirname + "/levels.js", txt);
  console.log(`\n✓ Aplicat: ${k} nivells recalibrats segons l'ús del bot`);
}
