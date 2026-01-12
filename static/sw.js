(() => {
  // _build/js/release/build/worker/worker.js
  var kazuph$blog_admin$worker$$handle_install = (event) => {
    const CACHE_NAME = "blog-admin-v1";
    const STATIC_ASSETS = ["/loader.js", "/markdown_editor.js"];
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
  };
  var kazuph$blog_admin$worker$$handle_activate = (event) => {
    const CACHE_NAME = "blog-admin-v1";
    event.waitUntil(
      caches.keys().then(
        (keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
    );
    self.clients.claim();
  };
  var kazuph$blog_admin$worker$$handle_fetch = (event) => {
    const CACHE_NAME = "blog-admin-v1";
    const STATIC_ASSETS = ["/loader.js", "/markdown_editor.js"];
    const url = new URL(event.request.url);
    if (STATIC_ASSETS.some((a) => url.pathname === a) || url.pathname.endsWith(".js")) {
      event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        }))
      );
      return;
    }
    if (event.request.mode === "navigate") {
      event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
      );
      return;
    }
    event.respondWith(fetch(event.request));
  };
  var kazuph$blog_admin$worker$$register_sw_listeners = (installFn, activateFn, fetchFn) => {
    self.addEventListener("install", installFn);
    self.addEventListener("activate", activateFn);
    self.addEventListener("fetch", fetchFn);
  };
  function kazuph$blog_admin$worker$$start() {
    kazuph$blog_admin$worker$$register_sw_listeners(kazuph$blog_admin$worker$$handle_install, kazuph$blog_admin$worker$$handle_activate, kazuph$blog_admin$worker$$handle_fetch);
  }

  // static/_sw_entry.js
  kazuph$blog_admin$worker$$start();
})();
//# sourceMappingURL=sw.js.map
