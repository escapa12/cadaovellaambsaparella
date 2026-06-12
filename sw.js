// Service worker: fa que el joc funcioni sense connexió un cop carregat.
// Si canvies el joc, puja el número de versió perquè els mòbils es refresquin.
const VERSIO = "solitari-v20";
const FITXERS = ["./", "index.html", "style.css", "game.js", "families.js", "dibuixos.js", "levels.js", "manifest.json", "icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSIO).then((c) => c.addAll(FITXERS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((claus) => Promise.all(claus.filter((k) => k !== VERSIO).map((k) => caches.delete(k))))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copia = resp.clone();
        caches.open(VERSIO).then((c) => c.put(e.request, copia));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
