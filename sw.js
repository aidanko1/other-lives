// Other Lives v5.1: online-only. Prevent stale offline bundles on installed iPhone icons.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(Promise.all([
  caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('other-lives-')).map(key => caches.delete(key)))),
  self.clients.claim()
])));
self.addEventListener('fetch', event => {
  // Let Chrome/Safari navigate directly to the current GitHub Pages files.
});