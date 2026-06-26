// Calibratge de moviments: moviments = cartes × factor(win_ratio).
// Com més baix el win_ratio objectiu, més just el marge per carta.
// Ús: node calibra.js          -> mostra la proposta
//     node calibra.js --apply  -> reescriu els moviments a levels.js
const fs = require("fs");
const vm = require("vm");
const sandbox = { Math, JSON, Object, Array, console };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ["families.js", "levels.js"]) vm.runInContext(fs.readFileSync(__dirname + "/" + f, "utf8"), sandbox, { filename: f });
const LEVELS = vm.runInContext("LEVELS", sandbox);

function factor(wr) {
  if (wr >= 0.85) return 3.4;
  if (wr >= 0.70) return 3.1;
  if (wr >= 0.60) return 2.9;
  if (wr >= 0.50) return 2.7;
  if (wr >= 0.40) return 2.5;
  if (wr >= 0.30) return 2.35;
  if (wr >= 0.20) return 2.2;
  return 2.1;
}
const par = (x) => Math.round(x / 2) * 2; // arrodonir a parell

const nous = LEVELS.map((niv) => {
  const cartes = niv.families.reduce((s, f) => s + f.n, 0) + niv.families.length;
  return { nom: niv.nom, wr: niv.win_ratio, cartes, vell: niv.moviments, nou: par(cartes * factor(niv.win_ratio)) };
});

console.log("# | wr | cartes | factor | mov vell -> nou");
nous.forEach((n, i) => console.log(`${i + 1} | ${n.wr} | ${n.cartes} | ${factor(n.wr)} | ${n.vell} -> ${n.nou}`));

if (process.argv.includes("--apply")) {
  let txt = fs.readFileSync(__dirname + "/levels.js", "utf8");
  let i = 0;
  txt = txt.replace(/moviments: \d+/g, () => `moviments: ${nous[i++].nou}`);
  if (i !== nous.length) { console.error(`❌ esperava ${nous.length} substitucions, n'he fet ${i}`); process.exit(1); }
  fs.writeFileSync(__dirname + "/levels.js", txt);
  console.log(`\n✓ Aplicat: ${i} nivells recalibrats a levels.js`);
}
