# 👑 Solitari de Famílies

Un joc de mòbil en català: un mix entre el Solitari clàssic i el joc de les famílies de paraules. Fet amb HTML + CSS + JavaScript, sense cap motor de joc ni instal·lació — s'obre directament al navegador.

## Com es juga

L'objectiu és enviar totes les cartes als espais de col·lecció de dalt abans de quedar-te sense moviments.

**La carta mestra 👑** (daurada, amb el nom de la família) és la clau del joc: un espai de col·lecció només es pot obrir posant-hi la carta mestra d'una família. Sense la mestra, les paraules d'aquella família no poden anar enlloc més que al tauler. Un bloc que conté la mestra **només pot anar a un espai de col·lecció o a una columna buida**. I compte: una columna amb la mestra a dalt queda **bloquejada** — ja no s'hi pot afegir res més.

La resta de regles: al tauler només pots apilar paraules de la mateixa família, i un cop ajuntades **sempre es mouen en bloc** (agafis la carta que agafis del grup). Quan treus una carta d'una columna, la tapada de sota es gira. Si no tens jugades, roba de la pila (a dalt a la dreta) — això també gasta un moviment. Quan completes una família, l'espai queda lliure per a la següent.

**Penalitzacions**: equivocar-te de **família** (ajuntar dues cartes de famílies diferents al tauler, o posar una carta en una col·lecció d'una altra família) **resta 1 moviment** i el comptador es pinta de granat un instant. Els altres errors (columna bloquejada per la mestra, obrir una col·lecció sense la mestra, moure malament la mestra) només mostren un missatge informatiu, sense restar.

Controls: **arrossega** les cartes on vulguis (cap destí es ressalta: endevinar la família és part del joc). El botó ↩️ desfà l'últim moviment, però **costa 1 moviment** fer-lo servir.

## Fitxers del projecte

| Fitxer | Què és |
|---|---|
| `families.js` | **El teu fitxer**: les famílies de paraules acceptades |
| `dibuixos.js` | **El teu fitxer**: els SVG de les famílies visuals (dibuixos: true) |
| `levels.js` | **El teu fitxer**: el disseny de cada nivell |
| `index.html` | L'estructura de les pantalles |
| `style.css` | L'aspecte visual |
| `game.js` | El motor del joc (normalment no cal tocar-lo) |
| `test.js` | Test automàtic de la configuració i jugabilitat |
| `manifest.json`, `sw.js`, `icon.png` | Perquè es pugui "instal·lar" al mòbil |

## Com provar-lo en local

L'opció ràpida: **fes doble clic a `index.html`** i s'obrirà al navegador. Tot funciona.

L'opció completa (recomanada per provar com es veurà al mòbil):

```bash
cd <carpeta del projecte>
python3 -m http.server 8000
```

Obre `http://localhost:8000` a Chrome. Per simular un mòbil: F12 → icona de mòbil/tauleta (Ctrl/Cmd+Shift+M) → tria "iPhone" o "Pixel".

### Trucs de depuració

Amb la consola oberta (F12 → Console) tens:

- `estat` — tot l'estat de la partida (columnes, pila, fundacions, moviments)
- `trampa.guanyar()` — guanya el nivell immediatament
- `trampa.moviments(99)` — posa't els moviments que vulguis
- `?nivell=5` al final de la URL — entra directe al nivell 5 (p. ex. `index.html?nivell=5`)

A més, a la pantalla d'inici hi ha el botó **🔧 Mode admin**: desbloqueja tots els nivells per poder anar a qualsevol (es queda activat fins que el tornis a prémer).

Si trenques alguna cosa a `families.js` o `levels.js`, el joc t'avisarà amb un missatge d'error en obrir-se, i també pots executar el test:

```bash
node test.js
```

Aquest test valida la configuració i fa que un bot jugui 200 partides per nivell, per comprovar que tots els nivells es poden guanyar amb els moviments configurats. Fes-lo servir cada cop que creïs nivells nous!

## Com editar famílies i nivells

**Afegir una família** a `families.js`:

```js
peixos: {
  nom: "Peixos",
  emoji: "🐟",
  paraules: ["Sardina", "Tonyina", "Lluç", "Rap", "Orada", "Seitó"]
},
```

**Famílies de dibuixos**: si hi afegeixes `dibuixos: true`, les cartes mostren un dibuix gran i centrat en comptes de la paraula (com les d'escacs, joies, països, senyals i fruites). Cal definir un SVG per a cada paraula a `dibuixos.js`; la validació t'avisa si en falta algun. Cada nivell hauria de tenir com a mínim una família de dibuixos.

**Tria de paraules**: la gràcia és que el jugador no sàpiga d'entrada de quina família és cada paraula. Tria paraules rares o ambigües («Trapezi» és un múscul? una forma? un circ?) i barreja famílies que es puguin confondre (Parts del cos + Ossos + Músculs al mateix nivell, com fa el nivell 9 «Anatomia»).

**Afegir un nivell** a `levels.js`:

```js
{
  nom: "El meu nivell",
  moviments: 50,        // límit de moviments
  espais: 3,            // espais de col·lecció a dalt (menys = més difícil)
  win_ratio: 0.85,      // ràtio de victòries esperada (referència per a test.js)
  families: [
    { id: "peixos", n: 4 },   // 4 paraules de la família "peixos"
    { id: "fruites", n: 4 }
  ],
  columnes: [2, 3, 4, 5]  // patró triangular: curtes a l'esquerra, llargues a la dreta
},
```

El joc afegeix automàticament la carta mestra 👑 de cada família (no l'has de definir tu). Les cartes que no caben a les columnes van a la pila de robar. Com a referència de dificultat, dona uns 3 moviments per carta. Compte amb barrejar famílies que comparteixen una paraula (p. ex. Pau Mas i Instruments tenen «Guitarra»): la validació t'avisarà.

`test.js` compara la ràtio de victòries del bot amb el `win_ratio` de cada nivell i t'avisa si un nivell queda massa difícil o massa fàcil respecte del que esperaves.

## Com compartir-lo amb els amics (sense Google Play)

La millor opció és **GitHub Pages** (gratuït):

1. Crea un compte a [github.com](https://github.com) si no en tens.
2. Crea un repositori nou (p. ex. `solitari`), marca'l com a **Public**.
3. Puja-hi tots els fitxers d'aquesta carpeta (Add file → Upload files).
4. Ves a Settings → Pages → a "Branch" tria `main` i desa.
5. Al cap d'un minut tindràs una URL tipus `https://elteunom.github.io/solitari/`.

Envia aquesta URL per WhatsApp i llestos. Cada cop que actualitzis els fitxers al repositori, el joc s'actualitza per a tothom. **Important**: quan facis canvis, puja el número de versió a `sw.js` (`solitari-v1` → `solitari-v2`) perquè els mòbils que ja tinguin el joc en memòria cau es refresquin.

Alternatives: [Netlify Drop](https://app.netlify.com/drop) (arrossegues la carpeta i et dona una URL a l'instant) o [itch.io](https://itch.io) (puges un zip i té aparador de jocs).

## Com "instal·lar-lo" al mòbil

Un cop publicat amb https (GitHub Pages o Netlify), el joc és una PWA:

- **Android (Chrome)**: obre la URL → menú ⋮ → "Afegeix a la pantalla d'inici". S'obre a pantalla completa com una app i funciona sense connexió.
- **iPhone (Safari)**: obre la URL → botó de compartir → "Afegir a pantalla d'inici".

## Per què no Unity?

Per a un joc de cartes 2D com aquest, Unity és matar mosques a canonades: necessitaries aprendre C#, l'editor, i per compartir-lo hauries de generar APKs i que els amics activessin "orígens desconeguts". Amb web tens: zero instal·lacions, debug amb les eines de Chrome que ja coneixes, configuració en JS (el teu stack), i compartir = enviar un enllaç. Si algun dia el vols a Google Play, es pot empaquetar tal qual amb [Capacitor](https://capacitorjs.com) o [PWABuilder](https://www.pwabuilder.com).
