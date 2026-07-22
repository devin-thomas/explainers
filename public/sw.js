/*
 * Uppercut Labs Explainers service worker.
 *
 * It intentionally does not intercept fetch requests. That avoids stale explainer
 * builds and adds no service-worker routing latency while still providing a clean
 * foundation for future offline support, background updates, and notifications.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
