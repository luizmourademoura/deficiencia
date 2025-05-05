const CACHE_NAME = 'plam-nutrientes-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // se tiver um CSS externo, descomente a linha abaixo
  // './style.css',
  './nitrogenio.html',
  './potassio.html',
  './fosforo.html',
  './magnesio.html',
  './calcio.html',
  './ferro.html',
  './enxofre.html',
  './boro.html',
  './zinco.html',
  './manganes.html',
  // adicione quaisquer outros recursos estáticos (imagens, ícones, scripts)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
