// Other Lives v5.3: online-only; no caching of old game scripts.
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('other-lives-')).map(k=>caches.delete(k)))),self.clients.claim()])));