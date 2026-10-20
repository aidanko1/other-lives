// Other Lives v5.1 — online-only worker; clear caches left by older releases.
self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(Promise.all([
  caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('other-lives-')).map(k => caches.delete(k)))),
  self.clients.claim()
])));
