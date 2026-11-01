// Entrenaitor: guarda la app en el móvil para que abra rápido.
// Los datos de la rutina siempre se piden a Google (nunca se guardan aquí).
const VERSION = 'entrenaitor-v16';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/nutricion.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Google y fuentes: directo a la red
  // Primero la red (para recibir mejoras), y si no hay conexión, la copia guardada
  // cache: 'no-cache' = preguntar siempre al servidor si hay versión nueva (sin esperar los 10 min de caché del navegador)
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => {
    const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
