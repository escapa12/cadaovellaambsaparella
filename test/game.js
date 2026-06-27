// ============================================================
// SOLITARI DE FAMÍLIES — motor del joc
// ============================================================
// Normalment NO cal tocar aquest fitxer.
// Per canviar paraules → families.js
// Per canviar nivells → levels.js
//
// Per debuggejar: obre la consola del navegador (F12).
// Tens disponible `estat` (l'estat de la partida) i `trampa`
// (p. ex. trampa.guanyar() o trampa.moviments(99)).
// ============================================================

"use strict";

// ---------- edicions ----------
// El joc es pot servir en diverses "edicions" (amics, feina, família...),
// cadascuna amb la seva carpeta, els seus nivells i el seu progrés.
// Cada edició ho defineix al seu edicio.js; l'arrel és l'edició "amics".
if (window.FAMILIES_EXTRA) Object.assign(FAMILIES, window.FAMILIES_EXTRA);
const EDICIO_ID = window.EDICIO_ID || "amics";
const RUTA_ARREL = window.RUTA_ARREL || "";
const VERSIO_JOC = "v30"; // mantenir sincronitzada amb sw.js
// comodins 🔍 per defecte segons el bloc (es pot fixar per nivell amb comodins: N):
// Tutorial i Normal en tenen 5; Difícil i Infinit, 3.
function comodinsPerDefecte(idx, infinit) {
  if (infinit) return 3;
  const b = rangsBlocs().find((x) => idx >= x.start && idx < x.end);
  return b && b.id === "dificil" ? 3 : 5;
}

// ---------- utilitats ----------
const $ = (sel) => document.querySelector(sel);
// el progrés de cada edició es guarda amb una clau separada
// (l'edició "amics" manté les claus antigues per no perdre progrés)
const clau = (k) => EDICIO_ID === "amics" ? `solitari.${k}` : `solitari.${EDICIO_ID}.${k}`;

function barreja(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function missatge(text, ms = 2200) {
  const el = $("#missatge-flotant");
  el.textContent = text;
  el.classList.remove("amagada");
  clearTimeout(missatge._t);
  missatge._t = setTimeout(() => el.classList.add("amagada"), ms);
}

// ---------- validació de la configuració ----------
function validaConfiguracio() {
  const errors = [];
  LEVELS.forEach((niv, i) => {
    const n = i + 1;
    let total = 0;
    const vistes = new Set();
    (niv.families || []).forEach((f) => {
      if (!FAMILIES[f.id]) errors.push(`Nivell ${n}: la família "${f.id}" no existeix a families.js`);
      else if (f.n > FAMILIES[f.id].paraules.length)
        errors.push(`Nivell ${n}: la família "${f.id}" demana ${f.n} paraules però només en té ${FAMILIES[f.id].paraules.length}`);
      if (f.n > 9) errors.push(`Nivell ${n}: la família "${f.id}" té n=${f.n}; el màxim permès és 9`);
      // si la família és de dibuixos, cada paraula necessita el seu SVG a dibuixos.js
      if (FAMILIES[f.id] && FAMILIES[f.id].dibuixos) {
        const lib = (typeof DIBUIXOS !== "undefined" && DIBUIXOS[f.id]) || {};
        FAMILIES[f.id].paraules.forEach((p) => {
          if (!lib[p]) errors.push(`Nivell ${n}: falta el dibuix de "${p}" (família "${f.id}") a dibuixos.js`);
        });
      }
      if (vistes.has(f.id)) errors.push(`Nivell ${n}: la família "${f.id}" està repetida`);
      vistes.add(f.id);
      total += f.n;
    });
    // paraules repetides entre famílies del mateix nivell (el jugador no sabria de quina família és)
    const paraulesVistes = {};
    (niv.families || []).forEach((f) => {
      if (!FAMILIES[f.id]) return;
      FAMILIES[f.id].paraules.forEach((p) => {
        const k = p.toLowerCase();
        if (paraulesVistes[k] && paraulesVistes[k] !== f.id)
          errors.push(`Nivell ${n}: la paraula "${p}" és a "${paraulesVistes[k]}" i a "${f.id}" — no barregis aquestes famílies al mateix nivell`);
        paraulesVistes[k] = f.id;
      });
    });
    const totalAmbMestres = total + (niv.families || []).length; // +1 carta mestra per família
    const enColumnes = (niv.columnes || []).reduce((a, b) => a + b, 0);
    if (enColumnes > totalAmbMestres) errors.push(`Nivell ${n}: les columnes demanen ${enColumnes} cartes però només n'hi ha ${totalAmbMestres} (paraules + mestres)`);
    if (niv.espais < 1) errors.push(`Nivell ${n}: cal com a mínim 1 espai`);
    if (niv.families.length === 1 && niv.espais < 1) errors.push(`Nivell ${n}: espais insuficients`);
  });
  return errors;
}

// ---------- estat ----------
let estat = null;
window.trampa = {
  guanyar() { estat.columnes.forEach(c => c.length = 0); estat.pila = []; estat.descart = []; estat.recollides = estat.totalCartes; comprovaFinal(); renderitza(); },
  moviments(n) { estat.moviments = n; renderitza(); }
};

// nucli compartit: construeix la partida a partir d'una config de nivell
function iniciaPartida(niv, idx, infinit) {
  const baralla = [];
  const necessitats = {};
  niv.families.forEach((f) => {
    necessitats[f.id] = f.n;
    barreja(FAMILIES[f.id].paraules).slice(0, f.n).forEach((p) => {
      baralla.push({ familia: f.id, paraula: p, destapada: false });
    });
    baralla.push({ familia: f.id, paraula: FAMILIES[f.id].nom, mestra: true, destapada: false });
  });
  const barrejada = barreja(baralla);

  const columnes = niv.columnes.map((quantes) => {
    const col = barrejada.splice(0, quantes);
    if (col.length) col[col.length - 1].destapada = true;
    return col;
  });

  estat = {
    nivellIdx: idx,
    infinit: !!infinit,
    nomNivell: niv.nom,
    moviments: niv.moviments,
    comodins: niv.comodins != null ? niv.comodins : comodinsPerDefecte(idx, infinit),
    columnes,
    pila: barrejada, // la resta va a la pila de robar
    descart: [],
    fundacions: Array(niv.espais).fill(null),
    necessitats,
    errors: 0,
    recollides: 0,
    totalCartes: baralla.length,
    historial: [],
    acabat: false
  };
  window.estat = estat;

  $("#pantalla-inici").classList.add("amagada");
  $("#pantalla-joc").classList.remove("amagada");
  $("#modal").classList.add("amagada");
  calculaMides();
  renderitza();
}

function nouNivell(idx) {
  comptaIntent(idx);
  iniciaPartida(LEVELS[idx], idx, false);
  if (idx === 0 && !localStorage.getItem(clau("pista"))) {
    localStorage.setItem(clau("pista"), "1");
    setTimeout(() => missatge("Arrossega les cartes 👑 a un espai de dalt per obrir una col·lecció", 4000), 600);
  }
}

// ---------- intents per bloc ----------
function comptaIntent(idx) {
  const b = rangsBlocs().find((x) => idx >= x.start && idx < x.end);
  if (!b) return;
  const d = JSON.parse(localStorage.getItem(clau("intents")) || "{}");
  d[b.id] = (d[b.id] || 0) + 1;
  localStorage.setItem(clau("intents"), JSON.stringify(d));
}
function intentsBloc(id) {
  return (JSON.parse(localStorage.getItem(clau("intents")) || "{}"))[id] || 0;
}

// ---------- mode infinit: nivell aleatori, sempre dificultat experta ----------
function generaNivellRandom() {
  const nFam = 6 + Math.floor(Math.random() * 3); // 6-8 famílies (menys confusió → dificultat ~0.45)
  const triades = [];
  const usades = new Set();
  for (const id of barreja(Object.keys(FAMILIES))) {
    if (triades.length >= nFam) break;
    const fam = FAMILIES[id];
    if (fam.paraules.length < 5) continue;
    // evita col·lisions de paraules entre famílies del mateix nivell
    if (fam.paraules.some((p) => usades.has(p))) continue;
    fam.paraules.forEach((p) => usades.add(p));
    triades.push({ id, n: Math.min(5 + Math.floor(Math.random() * 2), fam.paraules.length, 9) });
  }
  const F = triades.length;
  const cartes = triades.reduce((s, f) => s + f.n, 0) + F;
  return {
    nom: "Nivell infinit",
    moviments: Math.round((cartes * 2.4) / 2) * 2, // marge més folgat (dificultat ~0.45)
    espais: F >= 8 ? 5 : 4,
    win_ratio: 0.45,
    families: triades,
    columnes: F >= 8 ? [4, 5, 6, 7, 8] : [3, 4, 5, 6, 7]
  };
}

function nouNivellInfinit() {
  iniciaPartida(generaNivellRandom(), null, true);
  setTimeout(() => missatge("♾️ Mode infinit: nivell aleatori a dificultat experta 🔥", 3500), 500);
}

// ---------- historial (desfer) ----------
function guardaHistorial() {
  const { historial, ...resta } = estat;
  estat.historial.push(JSON.stringify(resta));
  if (estat.historial.length > 200) estat.historial.shift();
}

function desfer() {
  if (!estat.historial.length || estat.acabat) return;
  const movAra = estat.moviments;
  const previ = JSON.parse(estat.historial.pop());
  Object.assign(estat, previ);
  estat.moviments = movAra - 1; // desfer NO recupera el moviment: en costa un més
  window.estat = estat;
  missatge("↩️ Moviment desfet (−1 moviment)");
  renderitza();
  marcaPenalitzacio();
  comprovaFinal();
}

// ---------- regles ----------
function fundacioActiva(familia) {
  return estat.fundacions.findIndex(f => f && f.familia === familia && f.compte < f.necessari);
}
function fundacioBuida() {
  return estat.fundacions.findIndex(f => f === null);
}

// agafa les cartes movibles a partir d'una posició (totes destapades i de la mateixa família)
function pilaMovible(col, idx) {
  const cartes = estat.columnes[col].slice(idx);
  if (!cartes.length || !cartes[0].destapada) return null;
  const fam = cartes[0].familia;
  if (cartes.some(c => !c.destapada || c.familia !== fam)) return null;
  return cartes;
}

function destapaUltima(col) {
  const c = estat.columnes[col];
  if (c.length && !c[c.length - 1].destapada) c[c.length - 1].destapada = true;
}

function gastaMoviment() {
  estat.moviments--;
}

// envia un bloc de cartes (mateixa família) a una fundació
// REGLA CLAU: un espai buit només es pot obrir amb la carta mestra
function enviaAFundacio(cartes, slotPreferit = -1) {
  const fam = cartes[0].familia;
  let slot = slotPreferit;
  if (slot < 0 || !esSlotValid(slot, cartes)) {
    slot = fundacioActiva(fam);
    if (slot < 0) slot = fundacioBuida();
  }
  if (slot < 0) return false;
  if (!esSlotValid(slot, cartes)) return false;

  if (estat.fundacions[slot] === null) {
    estat.fundacions[slot] = { familia: fam, compte: 0, necessari: estat.necessitats[fam], ultima: "" };
  }
  const f = estat.fundacions[slot];
  cartes.forEach(c => {
    if (!c.mestra) { f.compte++; f.ultima = c.paraula; }
    estat.recollides++;
  });

  if (f.compte >= f.necessari) {
    // família completada: l'espai queda lliure
    setTimeout(() => {
      const fd = estat.fundacions[slot];
      if (fd && fd.compte >= fd.necessari) {
        estat.fundacions[slot] = null;
        renderitza();
      }
    }, 650);
  }
  return true;
}

function esSlotValid(slot, cartes) {
  const fam = cartes[0].familia;
  const teMestra = cartes.some(c => c.mestra);
  const paraules = cartes.length - (teMestra ? 1 : 0);
  const f = estat.fundacions[slot];
  if (f === null) return teMestra && paraules <= estat.necessitats[fam]; // cal la mestra per obrir
  return !teMestra && f.familia === fam && f.compte + paraules <= f.necessari;
}

// pot moure's un bloc de cartes a la columna destí?
// - un bloc amb carta mestra NOMÉS pot anar a un espai de col·lecció o a una columna buida
// - una carta mestra a dalt d'una columna la BLOQUEJA (no s'hi pot posar res més)
function potMoureAColumna(cartes, colDesti) {
  const col = estat.columnes[colDesti];
  if (!col.length) return true;
  if (cartes.some(c => c.mestra)) return false;
  const top = col[col.length - 1];
  return top.destapada && !top.mestra && top.familia === cartes[0].familia;
}

// ---------- accions ----------
function accioRoba() {
  if (estat.acabat) return;
  if (!estat.pila.length && !estat.descart.length) return;
  guardaHistorial();
  if (estat.pila.length) {
    const c = estat.pila.pop();
    c.destapada = true;
    estat.descart.push(c);
  } else {
    // reciclar el descart
    estat.pila = estat.descart.reverse().map(c => ({ ...c, destapada: false }));
    estat.descart = [];
    missatge("♻️ Pila reciclada");
  }
  gastaMoviment();
  finalitzaAccio();
}

// origen: { tipus: "columna", col, idx } o { tipus: "descart" }
function agafaCartes(origen) {
  if (origen.tipus === "descart") {
    return estat.descart.length ? [estat.descart[estat.descart.length - 1]] : null;
  }
  return pilaMovible(origen.col, origen.idx);
}

function treuCartes(origen, quantes) {
  if (origen.tipus === "descart") estat.descart.splice(-quantes, quantes);
  else {
    estat.columnes[origen.col].splice(origen.idx, quantes);
    destapaUltima(origen.col);
  }
}

function mouAColumna(origen, colDesti) {
  const cartes = agafaCartes(origen);
  if (!cartes || !potMoureAColumna(cartes, colDesti)) return false;
  if (origen.tipus === "columna" && origen.col === colDesti) return false;
  guardaHistorial();
  treuCartes(origen, cartes.length);
  estat.columnes[colDesti].push(...cartes);
  gastaMoviment();
  finalitzaAccio();
  return true;
}

function mouAFundacio(origen, slot = -1) {
  const cartes = agafaCartes(origen);
  if (!cartes) return false;
  guardaHistorial();
  if (!enviaAFundacio(cartes, slot)) { estat.historial.pop(); return false; }
  treuCartes(origen, cartes.length);
  gastaMoviment();
  finalitzaAccio();
  return true;
}

// pinta el comptador de granat un instant
function marcaPenalitzacio() {
  const cm = $("#comptador-moviments");
  cm.classList.add("penalitzat");
  setTimeout(() => cm.classList.remove("penalitzat"), 900);
}

// penalització PROGRESSIVA: cada 3 errors puja 1 moviment
// (errors 1-3: −1, errors 4-6: −2, errors 7-9: −3...)
// retorna el cost aplicat, per mostrar-lo al missatge
function penalitza() {
  estat.errors = (estat.errors || 0) + 1;
  const cost = Math.min(5, 1 + Math.floor((estat.errors - 1) / 3)); // mai més de 5 per error
  estat.moviments -= cost;
  renderitza();
  marcaPenalitzacio();
  comprovaFinal();
  return cost;
}

// explica per què un moviment cap a una fundació no és vàlid
// PENALITZA (−1 moviment) només si la família és incorrecta; la resta només informa
function explicaFundacio(slot, cartes) {
  const fam = cartes[0].familia;
  const teMestra = cartes.some(c => c.mestra);
  const f = estat.fundacions[slot];
  if (f === null && !teMestra) { missatge("🔒 Primer cal la carta mestra 👑 per obrir aquesta col·lecció"); renderitza(); return; }
  if (f && !teMestra && f.familia !== fam) { const c = penalitza(); missatge(`❌ Família incorrecta! (−${c} ${c === 1 ? "moviment" : "moviments"})`); return; }
  if (f && teMestra) { missatge("👑 La carta mestra només pot obrir un espai buit"); renderitza(); return; }
  missatge("Aquí no hi va, aquesta carta");
  renderitza();
}

// explica per què un moviment cap a una columna no és vàlid
// PENALITZA (−1 moviment) només si la família és incorrecta; la resta només informa
function explicaColumna(origen, colDesti, cartes) {
  if (origen.tipus === "columna" && origen.col === colDesti) { renderitza(); return; } // tornar al lloc: res
  if (cartes.some(c => c.mestra)) {
    missatge("👑 La carta mestra només pot anar a un espai de col·lecció o a una columna buida");
    renderitza();
    return;
  }
  const col = estat.columnes[colDesti];
  const top = col[col.length - 1];
  if (top && top.destapada && top.familia !== cartes[0].familia) {
    const c = penalitza();
    missatge(`❌ Família incorrecta! (−${c} ${c === 1 ? "moviment" : "moviments"})`);
    return;
  }
  if (top && top.destapada && top.mestra) {
    missatge("⛔ Columna bloquejada per la carta mestra 👑");
    renderitza();
    return;
  }
  missatge("⛔ Aquí no hi pots posar aquesta carta");
  renderitza();
}

function finalitzaAccio() {
  renderitza();
  comprovaFinal();
}

function comprovaFinal() {
  if (estat.acabat) return;
  if (estat.recollides >= estat.totalCartes) {
    estat.acabat = true;
    if (estat.infinit) {
      const r = parseInt(localStorage.getItem(clau("inf_ratxa")) || "0", 10) + 1;
      localStorage.setItem(clau("inf_ratxa"), String(r));
      const rec = Math.max(r, parseInt(localStorage.getItem(clau("inf_record")) || "0", 10));
      localStorage.setItem(clau("inf_record"), String(rec));
    } else {
      // progrés per bloc: nombre de nivells completats dins del bloc
      const b = rangsBlocs().find((x) => estat.nivellIdx >= x.start && estat.nivellIdx < x.end);
      if (b) {
        const pos = estat.nivellIdx - b.start + 1; // quants completats fins aquí
        const abans = progresBloc(b.id);
        desaProgresBloc(b.id, pos);
        // en completar el Normal es desbloquegen Difícil i Infinit:
        // reiniciem el comptador d'intents del difícil (comencen de zero)
        if (b.id === "normal" && abans < b.mida && pos >= b.mida) {
          const d = JSON.parse(localStorage.getItem(clau("intents")) || "{}");
          d.dificil = 0;
          localStorage.setItem(clau("intents"), JSON.stringify(d));
        }
      }
    }
    setTimeout(() => mostraModal(true), 800);
  } else if (estat.moviments <= 0) {
    estat.acabat = true;
    if (estat.infinit) localStorage.setItem(clau("inf_ratxa"), "0");
    setTimeout(() => mostraModal(false), 600);
  }
}

// ---------- modal ----------
function mostraModal(victoria) {
  const inf = estat.infinit;
  const idx = estat.nivellIdx;
  const blocs = rangsBlocs();
  const normal = blocs.find((b) => b.id === "normal");
  const ultimNivell = !inf && idx === LEVELS.length - 1;
  const acabaNormal = !inf && normal && idx + 1 === normal.end; // ha completat el Normal

  const botons = $("#modal-botons");
  botons.innerHTML = "";
  const fes = (text, classe, fn) => {
    const b = document.createElement("button");
    b.className = `btn-modal ${classe}`;
    b.textContent = text;
    b.onclick = fn;
    botons.appendChild(b);
  };

  let emoji, titol, text;
  if (victoria && acabaNormal) {
    // SORPRESA: en acabar el Normal es revelen el Difícil i l'Infinit
    emoji = "🔥🐑🔥";
    titol = "S'HA OBERT EL MODE EXPERT!";
    text = "Pensaves que ja ho havies vist tot? Doncs no. Has domat totes les ovelles fàcils... i ara s'obren dues bèsties: el MODE DIFÍCIL (ramat salvatge, paraules traïdores i marges sense pietat) i el ♾️ MODE INFINIT (nivells aleatoris infinits a dificultat experta). Només per a pastors de debò. Hi entres? 🐏💀";
    fes("Vull patir 🔥", "primari", () => nouNivell(idx + 1));
    fes("Ara no, gràcies 🏠", "secundari", vesAInici);
  } else if (victoria && ultimNivell) {
    // final del joc
    emoji = "🐑👑🏆";
    titol = "HAS DOMAT TOTES LES OVELLES!";
    text = "Has completat els 55 nivells. Ets oficialment una LLEGENDA de les paraules! 🎉 Encara tens el ♾️ MODE INFINIT esperant-te, amb nivells aleatoris fins que el cap digui prou.";
    fes("Mode infinit ♾️", "primari", nouNivellInfinit);
    fes("Inici 🏠", "secundari", vesAInici);
  } else if (inf && victoria) {
    const r = parseInt(localStorage.getItem(clau("inf_ratxa")) || "0", 10);
    const rec = parseInt(localStorage.getItem(clau("inf_record")) || "0", 10);
    emoji = "♾️🔥";
    titol = "Ratxa: " + r + "!";
    text = `Nivell infinit superat amb ${estat.moviments} de marge. Ratxa actual: ${r} · Rècord: ${rec}.`;
    fes("Un altre ▶", "primari", nouNivellInfinit);
    fes("Inici 🏠", "secundari", vesAInici);
  } else if (inf && !victoria) {
    emoji = "😅";
    titol = "S'ha trencat la ratxa!";
    text = "Sense moviments. El mode infinit no perdona... Tornem-hi?";
    fes("Un altre ▶", "primari", nouNivellInfinit);
    fes("Inici 🏠", "secundari", vesAInici);
  } else if (victoria) {
    emoji = "🏆";
    titol = "Nivell superat!";
    text = `Has completat «${estat.nomNivell}» amb ${estat.moviments} moviments de marge.`;
    fes("Següent nivell ▶", "primari", () => nouNivell(idx + 1));
    fes("Inici 🏠", "secundari", vesAInici);
  } else {
    emoji = "😅";
    titol = "Sense moviments!";
    text = "T'has quedat sense moviments. Torna-ho a intentar!";
    fes("Torna-ho a provar 🔄", "primari", () => nouNivell(idx));
    // easter egg: no afegeix res, només demana un Bizum
    const bizum = document.createElement("button");
    bizum.className = "btn-modal secundari";
    bizum.textContent = "Afegeix 5 moviments 💰";
    bizum.onclick = () => {
      $("#modal-text").textContent = "Primer fes un Bizum a l'Arnau de 5 euros 😏";
      bizum.textContent = "Esperant el Bizum... 💸";
      bizum.disabled = true;
      bizum.style.opacity = ".6";
    };
    botons.appendChild(bizum);
    fes("Inici 🏠", "secundari", vesAInici);
  }

  $("#modal-emoji").textContent = emoji;
  $("#modal-titol").textContent = titol;
  $("#modal-text").textContent = text;
  $("#modal").classList.remove("amagada");
}

// ---------- pantalla d'inici ----------
// progrés PER BLOC: { tutorial, normal, dificil } = nivells completats
function progresBlocs() {
  return JSON.parse(localStorage.getItem(clau("prog")) || "{}");
}
function progresBloc(id) {
  return progresBlocs()[id] || 0;
}
function desaProgresBloc(id, n) {
  const p = progresBlocs();
  if (n > (p[id] || 0)) { p[id] = n; localStorage.setItem(clau("prog"), JSON.stringify(p)); }
}
// Normal i Tutorial sempre desbloquejats; Difícil i Infinit, només
// quan s'ha completat tot el bloc Normal.
function normalComplet() {
  const n = rangsBlocs().find((b) => b.id === "normal");
  return n ? progresBloc("normal") >= n.mida : false;
}
function blocDesbloquejat(b) {
  if (adminActiu()) return true;
  return b.id === "tutorial" || b.id === "normal" || normalComplet();
}
function infinitDesbloquejat() {
  return adminActiu() || normalComplet();
}
// nivell on porta el botó "Continua": el primer pendent d'un bloc desbloquejat
function nivellContinua() {
  for (const b of rangsBlocs()) {
    if (!blocDesbloquejat(b)) continue;
    const fets = progresBloc(b.id);
    if (fets < b.mida) return b.start + fets;
  }
  return null;
}

function vesAInici() {
  $("#modal").classList.add("amagada");
  $("#pantalla-joc").classList.add("amagada");
  $("#pantalla-inici").classList.remove("amagada");
  pintaGraellaNivells();
}

function adminActiu() {
  return localStorage.getItem(clau("admin")) === "1";
}

// rangs dels blocs (índexs 0-based, end exclusiu) a partir de la mida
function rangsBlocs() {
  let acc = 0;
  return (typeof BLOCS !== "undefined" ? BLOCS : []).map((b) => {
    const start = acc; acc += b.mida || 0;
    return { ...b, start, end: acc };
  });
}

// null = pantalla dels 3 botons de bloc; nombre = índex del bloc obert
let blocSeleccionat = null;

function pintaGraellaNivells() {
  const menu = $("#menu-blocs");
  const graella = $("#graella-nivells");
  const btnTornar = $("#btn-tornar-blocs");
  const admin = adminActiu();
  const blocs = rangsBlocs();
  menu.innerHTML = "";
  graella.innerHTML = "";

  if (blocSeleccionat === null) {
    // ----- pantalla principal: hero + targetes desbloquejades -----
    menu.classList.remove("amagada");
    graella.classList.add("amagada");
    btnTornar.classList.add("amagada");

    // HERO "Continua": salta directament al següent nivell pendent
    const seg = nivellContinua();
    if (seg !== null) {
      const bSeg = blocs.find((b) => seg >= b.start && seg < b.end);
      const hero = document.createElement("button");
      hero.className = "btn-continua";
      hero.innerHTML =
        `<span class="cont-titol">▶ Continua</span>` +
        `<span class="cont-sub">Nivell ${seg + 1}${bSeg && bSeg.id === "dificil" ? " · " + bSeg.nom : ""}</span>`;
      hero.onclick = () => nouNivell(seg);
      menu.appendChild(hero);
    }

    // targetes de bloc: NOMÉS les desbloquejades (Normal sempre visible;
    // Difícil amagat fins completar el Normal, perquè sigui sorpresa).
    blocs.forEach((b, bi) => {
      if (!blocDesbloquejat(b)) return;
      const fets = progresBloc(b.id);
      const pct = Math.round((100 * fets) / b.mida);
      const btn = document.createElement("button");
      btn.className = "btn-bloc";
      if (fets >= b.mida) btn.classList.add("complet");
      btn.innerHTML =
        `<span class="bloc-emoji">${b.emoji}</span>` +
        `<span class="bloc-info"><span class="bloc-nom">${b.nom}</span>` +
        `<span class="bloc-barra"><span style="width:${pct}%"></span></span></span>` +
        `<span class="bloc-prog">${fets}/${b.mida}<small>${intentsBloc(b.id)} intents</small></span>`;
      btn.onclick = () => { blocSeleccionat = bi; pintaGraellaNivells(); };
      menu.appendChild(btn);
    });

    // mode infinit: desbloquejat en completar el Normal
    if (infinitDesbloquejat()) {
      const ratxa = parseInt(localStorage.getItem(clau("inf_ratxa")) || "0", 10);
      const record = parseInt(localStorage.getItem(clau("inf_record")) || "0", 10);
      const inf = document.createElement("button");
      inf.className = "btn-bloc infinit";
      inf.innerHTML =
        `<span class="bloc-emoji">♾️</span>` +
        `<span class="bloc-info"><span class="bloc-nom">Mode infinit</span>` +
        `<span class="bloc-sub">Aleatori · dificultat experta</span></span>` +
        `<span class="bloc-prog">🔥${ratxa}<small>rècord ${record}</small></span>`;
      inf.onclick = () => nouNivellInfinit();
      menu.appendChild(inf);
    }
  } else {
    // ----- graella de nivells del bloc seleccionat -----
    menu.classList.add("amagada");
    graella.classList.remove("amagada");
    btnTornar.classList.remove("amagada");
    const b = blocs[blocSeleccionat];
    const fets = progresBloc(b.id);
    btnTornar.innerHTML = `← ${b.emoji} ${b.nom}`;
    for (let i = b.start; i < b.end && i < LEVELS.length; i++) {
      const pos = i - b.start;            // posició dins del bloc (0-based)
      const obert = admin || pos <= fets; // el primer sempre obert; després, seqüencial
      const completat = pos < fets;
      const cell = document.createElement("button");
      cell.className = "btn-nivell";
      if (completat) cell.classList.add("superat");
      if (!obert) cell.classList.add("bloquejat");
      cell.innerHTML = !obert ? "🔒" : `${i + 1}<small>${completat ? "⭐" : ""}</small>`;
      if (obert) cell.onclick = () => nouNivell(i);
      graella.appendChild(cell);
    }
  }

  $("#btn-admin").textContent = admin
    ? `🔧 Mode admin: ACTIVAT · ${VERSIO_JOC} · edició ${EDICIO_ID}`
    : "🔧 Mode admin";
  $("#btn-admin").classList.toggle("admin-actiu", admin);
}

// ---------- mides ----------
let ampleActual = 78; // amplada de carta vigent (px), per dimensionar la lletra

function calculaMides() {
  const ncols = estat
    ? Math.max(estat.columnes.length, estat.fundacions.length)
    : Math.max(LEVELS[0].columnes.length, LEVELS[0].espais);
  const vw = document.documentElement.clientWidth;
  const ample = Math.max(54, Math.min(84, Math.floor((vw - 20 - (ncols - 1) * 8) / ncols)));
  ampleActual = ample;
  const root = document.documentElement.style;
  root.setProperty("--ample-carta", ample + "px");
  root.setProperty("--alt-carta", Math.round(ample * 1.32) + "px");
}

// ---------- renderitzat ----------
function renderitza() {
  if (!estat) return;
  // capçalera
  $("#nom-nivell").textContent = estat.infinit
    ? `♾️ ${estat.nomNivell}`
    : `Nivell ${estat.nivellIdx + 1} · ${estat.nomNivell}`;
  const cm = $("#comptador-moviments");
  cm.innerHTML = `Moviments: <b>${estat.moviments}</b>`;
  cm.classList.toggle("alerta", estat.moviments <= 5);
  const cw = $("#comodins-compte");
  if (cw) cw.textContent = estat.comodins;
  // indicador de risc: 3 punts que s'omplen amb cada error; quan els 3
  // són del mateix color, la multa puja i recomencen amb el color següent
  // (groc → taronja → vermell → vermell fort), amb la flama i el −X.
  const punts = document.querySelectorAll("#mw-punts i");
  if (punts.length) {
    const errs = estat.errors || 0;
    const cost = Math.min(5, 1 + Math.floor(errs / 3)); // cost del pròxim error
    const colors = ["#ffd34d", "#ff9f1c", "#ff5246", "#a30f0f"]; // groc→taronja→vermell→vermell fort
    let tier, plens;
    if (cost >= 5) { tier = 3; plens = 3; }            // topall: 3 punts vermell fort
    else if (errs === 0) { tier = 0; plens = 0; }
    else { tier = Math.min(3, Math.floor((errs - 1) / 3)); plens = ((errs - 1) % 3) + 1; }
    punts.forEach((d, k) => { d.style.background = k < plens ? colors[tier] : "rgba(255,255,255,.25)"; });
    $("#mw-label").innerHTML = `<span class="mw-flama" style="font-size:${10 + cost * 3}px">🔥</span>−${cost}`;
    $("#multa-widget").classList.toggle("max", cost >= 5);
  }
  $("#btn-desfer").disabled = !estat.historial.length;

  pintaFundacions();
  pintaTauler();
  pintaPeu();
}

// mida de lletra calculada segons l'AMPLADA REAL de la carta (que varia
// amb el nombre de columnes) i la paraula més llarga, perquè la paraula
// càpiga en una línia sempre que es pugui i mai surti tallada.
function estilParaula(text) {
  const llarg = Math.max(...String(text).split(/\s+/).map(w => w.length)) || 1;
  const usable = ampleActual - 10;            // amplada interior de la carta
  const ampleLletra = 0.62;                    // factor d'amplada de la lletra negreta
  let font = Math.floor(usable / (ampleLletra * llarg));
  font = Math.max(8, Math.min(13, font));      // entre 8 i 13 px
  return ` style="font-size:${font}px"`;
}

// contingut d'una carta: les paraules NO mostren la família (l'has d'endevinar!)
// les cartes mestres porten la corona i el nom de la família
// les famílies amb dibuixos mostren el seu SVG en comptes de la paraula
function htmlCarta(carta) {
  const fam = FAMILIES[carta.familia];
  if (carta.mestra) {
    // la mestra indica quantes paraules té la família en aquest nivell
    const n = estat && estat.necessitats[carta.familia];
    const compte = n ? `<div class="n-mestra">×${n}</div>` : "";
    return `<div class="paraula"${estilParaula(fam.nom)}>${fam.nom}</div><div class="corona">👑</div>${compte}`;
  }
  if (fam.dibuixos && typeof DIBUIXOS !== "undefined" && DIBUIXOS[carta.familia] && DIBUIXOS[carta.familia][carta.paraula])
    return `<div class="dibuix">${DIBUIXOS[carta.familia][carta.paraula]}</div>`;
  return `<div class="paraula"${estilParaula(carta.paraula)}>${carta.paraula}</div>`;
}
function classesCarta(carta) {
  return "carta destapada" + (carta.mestra ? " mestra" : "");
}

function pintaFundacions() {
  const cont = $("#fundacions");
  cont.innerHTML = "";
  estat.fundacions.forEach((f, slot) => {
    const div = document.createElement("div");
    div.dataset.slot = slot;
    if (f === null) {
      div.className = "fundacio buida";
      div.textContent = "👑";
    } else {
      const fam = FAMILIES[f.familia];
      div.className = "fundacio activa" + (f.compte >= f.necessari ? " completa" : "");
      div.innerHTML = `
        <div class="etiqueta">${fam.nom}</div>
        <div class="femoji">${fam.emoji}</div>
        <div class="fcompte">${f.compte}/${f.necessari}</div>
        <div class="fparaula">${f.ultima || ""}</div>`;
    }
    cont.appendChild(div);
  });
}

function pintaTauler() {
  const tauler = $("#tauler");
  tauler.innerHTML = "";
  const altCarta = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--alt-carta"));
  const altDisponible = tauler.clientHeight || 300;

  estat.columnes.forEach((col, ci) => {
    const colDiv = document.createElement("div");
    colDiv.className = "columna" + (col.length ? "" : " buida-col");
    colDiv.dataset.col = ci;

    // calcular separacions (comprimir si no hi cap)
    let sepTapada = 14, sepDestapada = 30;
    const tapades = col.filter(c => !c.destapada).length;
    const destapades = col.length - tapades;
    const altNecessari = tapades * sepTapada + Math.max(0, destapades - 1) * sepDestapada + altCarta;
    if (altNecessari > altDisponible) {
      const factor = (altDisponible - altCarta) / (altNecessari - altCarta);
      sepTapada = Math.max(7, sepTapada * factor);
      sepDestapada = Math.max(16, sepDestapada * factor);
    }

    let y = 0;
    col.forEach((carta, idx) => {
      const cDiv = document.createElement("div");
      cDiv.className = carta.destapada ? classesCarta(carta) : "carta tapada";
      cDiv.style.top = y + "px";
      cDiv.dataset.col = ci;
      cDiv.dataset.idx = idx;
      if (carta.destapada) {
        cDiv.innerHTML = htmlCarta(carta);
        registraPunter(cDiv, { tipus: "columna", col: ci, idx });
      }
      colDiv.appendChild(cDiv);
      y += carta.destapada ? sepDestapada : sepTapada;
    });

    tauler.appendChild(colDiv);
  });
}

function pintaPeu() {
  // descart: només les 3 últimes cartes
  const descart = $("#descart");
  descart.innerHTML = "";
  const ultimes = estat.descart.slice(-3);
  ultimes.forEach((carta, i) => {
    const esUltima = i === ultimes.length - 1;
    const cDiv = document.createElement("div");
    cDiv.className = classesCarta(carta);
    cDiv.style.left = (i * 28) + "px";
    cDiv.innerHTML = htmlCarta(carta);
    if (esUltima) registraPunter(cDiv, { tipus: "descart" });
    else cDiv.style.filter = "brightness(.82)";
    descart.appendChild(cDiv);
  });

  // pila de robar
  const pila = $("#pila-robar");
  pila.innerHTML = "";
  pila.className = "";
  if (estat.pila.length) {
    pila.classList.add("amb-cartes");
    pila.innerHTML = `❖<div class="compte-pila">${estat.pila.length}</div>`;
  } else if (estat.descart.length) {
    pila.classList.add("amb-cartes");
    pila.textContent = "♻️";
  } else {
    pila.classList.add("buida-pila");
  }
}

// ---------- interacció (arrossegar) ----------
let drag = null;

// les cartes de la mateixa família sempre es mouen EN BLOC:
// si agafes una carta del mig del bloc, s'agafa tot el bloc
function iniciBloc(origenBase) {
  if (origenBase.tipus !== "columna") return origenBase;
  const col = estat.columnes[origenBase.col];
  const fam = col[origenBase.idx].familia;
  let i = origenBase.idx;
  while (i > 0 && col[i - 1].destapada && col[i - 1].familia === fam) i--;
  return { tipus: "columna", col: origenBase.col, idx: i };
}

// consulta la definició d'una carta (comodí 🔍). Gasta 1 comodí.
function consultaDefinicio(carta) {
  const paraula = carta.mestra ? FAMILIES[carta.familia].nom : carta.paraula;
  const def = (typeof DEFINICIONS !== "undefined" && DEFINICIONS[paraula]) || null;
  if (carta.mestra) { missatge(`👑 ${paraula}`); return; } // la mestra ja diu la família: gratis
  if (!def) { missatge(`📖 «${paraula}»: sense definició`); return; }
  if (estat.comodins <= 0) { missatge("🔍 No et queden comodins en aquest nivell!"); return; }
  estat.comodins--;
  renderitza();
  missatge(`🔍 ${paraula}: ${def}`, 4500);
}

function registraPunter(el, origenBase) {
  el.addEventListener("pointerdown", (e) => {
    if (estat.acabat) return;
    e.preventDefault();
    // carta concreta que s'ha tocat (per a la consulta de definició)
    const cartaClic = origenBase.tipus === "columna"
      ? estat.columnes[origenBase.col][origenBase.idx]
      : estat.descart[estat.descart.length - 1];
    const origen = iniciBloc(origenBase);
    const cartes = agafaCartes(origen);
    // capturar el punter: així el dit pot sortir de la carta sense perdre el gest
    try { el.setPointerCapture(e.pointerId); } catch (err) { /* navegadors antics */ }
    // l'element d'on parteix el fantasma és la primera carta del bloc
    const elBloc = (cartes && origen.tipus === "columna")
      ? document.querySelector(`.carta[data-col="${origen.col}"][data-idx="${origen.idx}"]`) || el
      : el;
    drag = {
      origen, cartes: cartes || null,
      x0: e.clientX, y0: e.clientY,
      el: elBloc, fantasma: null,
      rect: elBloc.getBoundingClientRect(),
      timer: null
    };
    // pulsació llarga (450 ms sense moure) → consultar definició
    drag.timer = setTimeout(() => {
      if (!drag) return;
      if (drag.fantasma) drag.fantasma.remove();
      drag = null;
      mostraOcults();
      consultaDefinicio(cartaClic);
    }, 450);
  });
}

// si el sistema cancel·la el gest (trucada, notificació, gest del navegador...),
// ho deixem tot net perquè cap carta quedi penjada a mig camí
document.addEventListener("pointercancel", () => {
  if (!drag) return;
  const d = drag;
  drag = null;
  if (d.timer) clearTimeout(d.timer);
  if (d.fantasma) d.fantasma.remove();
  mostraOcults();
  renderitza();
});

// evitar el menú de pulsació llarga sobre les cartes (interromp l'arrossegament)
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest && e.target.closest(".carta, #pila-robar")) e.preventDefault();
});

document.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
  // moure el dit cancel·la la pulsació llarga (és un arrossegament)
  if (drag.timer && Math.hypot(dx, dy) > 8) { clearTimeout(drag.timer); drag.timer = null; }
  if (!drag.cartes) return; // carta no arrossegable: només admetia long-press
  if (!drag.fantasma && Math.hypot(dx, dy) > 8) creaFantasma(e);
  if (drag.fantasma) {
    drag.fantasma.style.left = (drag.rect.left + dx) + "px";
    drag.fantasma.style.top = (drag.rect.top + dy) + "px";
  }
});

document.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const d = drag;
  drag = null;
  if (d.timer) clearTimeout(d.timer);

  if (!d.fantasma) {
    // toc curt: si la carta no es podia agafar, fes el gest de "no"
    if (!d.cartes && d.el) { d.el.classList.add("no-no"); setTimeout(() => d.el.classList.remove("no-no"), 350); }
    return; // un toc sense arrossegar no mou res
  }

  // ha estat un arrossegament
  d.fantasma.remove();
  mostraOcults();

  const sota = document.elementFromPoint(e.clientX, e.clientY);
  const fundacio = sota && sota.closest(".fundacio");
  const columna = sota && sota.closest(".columna");

  if (fundacio) {
    const slot = parseInt(fundacio.dataset.slot, 10);
    if (esSlotValid(slot, d.cartes)) mouAFundacio(d.origen, slot);
    else explicaFundacio(slot, d.cartes);
  } else if (columna) {
    const cd = parseInt(columna.dataset.col, 10);
    if (!mouAColumna(d.origen, cd)) explicaColumna(d.origen, cd, d.cartes);
  } else {
    renderitza(); // deixat enlloc: torna-ho tot al seu lloc sense conseqüències
  }
});

function creaFantasma(e) {
  const d = drag;
  const fant = document.createElement("div");
  fant.id = "fantasma";
  fant.style.left = d.rect.left + "px";
  fant.style.top = d.rect.top + "px";
  fant.style.width = d.rect.width + "px";

  d.cartes.forEach((carta, i) => {
    const c = document.createElement("div");
    c.className = classesCarta(carta);
    c.style.top = (i * 30) + "px";
    c.innerHTML = htmlCarta(carta);
    fant.appendChild(c);
  });
  document.body.appendChild(fant);
  d.fantasma = fant;

  // amagar les cartes originals mentre s'arrosseguen
  d.ocults = [];
  if (d.origen.tipus === "columna") {
    document.querySelectorAll(`.carta[data-col="${d.origen.col}"]`).forEach((el) => {
      if (parseInt(el.dataset.idx, 10) >= d.origen.idx) { el.style.visibility = "hidden"; d.ocults.push(el); }
    });
  } else {
    d.el.style.visibility = "hidden";
    d.ocults.push(d.el);
  }
  drag.mostraOcults = () => d.ocults.forEach(el => el.style.visibility = "");
  // (no ressaltem cap destí: il·luminar la fundació delataria la família de la carta)
}

function mostraOcults() {
  document.querySelectorAll(".carta").forEach(el => el.style.visibility = "");
}

// ---------- esdeveniments globals ----------
$("#pila-robar").addEventListener("click", accioRoba);
$("#btn-desfer").addEventListener("click", desfer);
$("#btn-reiniciar").addEventListener("click", () => nouNivell(estat.nivellIdx));
$("#btn-inici").addEventListener("click", vesAInici);
$("#btn-tornar-blocs").addEventListener("click", () => { blocSeleccionat = null; pintaGraellaNivells(); });
$("#btn-multa-info").addEventListener("click", () => {
  const cost = estat ? Math.min(5, 1 + Math.floor((estat.errors || 0) / 3)) : 1;
  missatge(`⚠️ Cada error de família resta moviments. Els 3 punts s'omplen amb cada error; quan s'omplen, la multa puja (−1 → −2 → −3 → fins a −5) i canvien de color. Ara el pròxim error et costaria −${cost}.`, 5500);
});
$("#btn-comodins-info").addEventListener("click", () => {
  const queden = estat ? ` Te'n queden ${estat.comodins}.` : "";
  missatge("🔍 Comodí: mantén premuda una carta (click & hold) i et dirà la seva definició, per ajudar-te a endevinar la família. Cada consulta gasta un comodí." + queden, 5500);
});
$("#btn-admin").addEventListener("click", () => {
  if (adminActiu()) {
    localStorage.setItem(clau("admin"), "0"); // desactivar no demana contrasenya
  } else {
    const pin = prompt("Contrasenya del mode admin:");
    if (pin !== "1111") { if (pin !== null) alert("Contrasenya incorrecta"); return; }
    localStorage.setItem(clau("admin"), "1");
  }
  pintaGraellaNivells();
});

// ---------- instruccions ----------
let pantallaAnterior = "inici"; // d'on s'ha obert: "inici" o "joc"

function obreInstruccions(desDe) {
  pantallaAnterior = desDe;
  $("#pantalla-inici").classList.add("amagada");
  $("#pantalla-joc").classList.add("amagada");
  $("#pantalla-instruccions").classList.remove("amagada");
}

$("#btn-instruccions-inici").addEventListener("click", () => obreInstruccions("inici"));
$("#btn-instruccions-joc").addEventListener("click", () => obreInstruccions("joc"));
$("#btn-tancar-instruccions").addEventListener("click", () => {
  $("#pantalla-instruccions").classList.add("amagada");
  if (pantallaAnterior === "joc" && estat && !estat.acabat) {
    $("#pantalla-joc").classList.remove("amagada");
  } else {
    $("#pantalla-inici").classList.remove("amagada");
    pintaGraellaNivells();
  }
});
$("#btn-esborrar-progres").addEventListener("click", () => {
  if (confirm("Segur que vols esborrar el progrés?")) {
    localStorage.removeItem(clau("prog"));
    localStorage.removeItem(clau("intents"));
    localStorage.removeItem(clau("inf_ratxa"));
    localStorage.removeItem(clau("inf_record"));
    blocSeleccionat = null;
    pintaGraellaNivells();
  }
});
window.addEventListener("resize", () => { if (estat) { calculaMides(); renderitza(); } });

// ---------- arrencada ----------
(function arrenca() {
  // REINICI ÚNIC en estrenar la versió nova (nou model de progrés per blocs):
  // tothom comença de 0 i s'esborra el progrés antic perquè no quedi brossa.
  if (!localStorage.getItem(clau("reset_v2"))) {
    ["progres", "prog", "intents", "inf_ratxa", "inf_record"].forEach((k) => localStorage.removeItem(clau(k)));
    localStorage.setItem(clau("reset_v2"), "1");
  }

  const errors = validaConfiguracio();
  if (errors.length) {
    alert("⚠️ Hi ha errors a la configuració:\n\n" + errors.join("\n"));
  }
  // service worker per poder instal·lar-lo al mòbil (només funciona amb https)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register(RUTA_ARREL + "sw.js").catch(() => {});
  }
  // ?nivell=3 per anar directe a un nivell (útil per provar)
  const param = new URLSearchParams(location.search).get("nivell");
  if (param && LEVELS[param - 1]) nouNivell(param - 1);
  else pintaGraellaNivells();
})();
