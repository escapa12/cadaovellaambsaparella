---
name: level-funnel
description: Reporta l'estat i la descripció del level funnel del joc "Cada Ovella amb sa Parella" (Solitari de famílies). Fes-la servir quan vulguis veure la dificultat dels nivells, les mètriques de simulació (moviments restants en guanyar, % de bloqueig, % de sense moviments) o el funnel de progressió/abandó dels jugadors.
---

# Level funnel — Solitari de famílies

Genera un informe de l'estat dels nivells del joc fent jugar el bot moltes
partides per nivell i modelant el funnel de progressió dels jugadors.

## Com s'executa

Des de l'arrel del projecte (`Cada Ovella amb sa Parella`):

```bash
node test.js --funnel
```

Opcions:
- **Edició concreta**: `node test.js --funnel feina` (valida `feina/edicio.js`; per defecte l'edició principal `amics` de `levels.js`).
- **Més precisió**: `INTENTS=1000 node test.js --funnel` (per defecte 200 partides/nivell).
- **Reintents del funnel**: `REINTENTS=5 node test.js --funnel` (quants cops es modela que un jugador prova cada nivell abans d'abandonar; per defecte 3).
- **Filtrar nivells** (mètriques de simulació): `NIVELLS=15,16 node test.js --funnel`.

Si la carpeta de treball no és la del projecte, fes `cd` primer a la carpeta que conté `test.js`, `levels.js` i `families.js`.

## Què conté l'informe

L'script imprimeix Markdown amb dues seccions:

1. **Mètriques per nivell** — per a cada nivell: bloc (Tutorial / Normal / Repte final), famílies amb el nombre de paraules, dificultat objectiu (`win_ratio`), % de victòries del bot, **moviments restants en guanyar** (marge mitjà), **% de bloqueig** (deadlock dur, cap jugada possible) i **% de sense moviments** (perd esgotant el comptador).
2. **Funnel de progressió** — partint del 100% al nivell 1, quant % de jugadors arriba i supera cada nivell (modelat amb el `win_ratio` i els reintents), l'abandó a cada nivell, l'arribada estimada al final i el **punt de major abandó**.

## Com presentar-ho

1. Executa la comanda i mostra les dues taules tal qual (ja venen en Markdown).
2. Afegeix una **lectura curta**:
   - Recorda que el bot **sempre encerta la família**, així que als nivells temàtics i d'amics el seu win% surt inflat; per a una persona la dificultat real ve de la confusió entre paraules. Tracta el `win%` del bot com una cota superior, no com la dificultat humana.
   - Marca els nivells amb **% de bloqueig** o **% de sense moviments** alts (revisar moviments o espais).
   - Destaca el **punt de major abandó** i si la corba de dificultat puja de forma suau dins de cada bloc.
   - Si l'usuari demana un focus concret (un bloc, un nivell, comparar dues edicions), filtra/repeteix amb les opcions de dalt.
