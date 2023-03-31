//cache all assets
var cache_src = [
  "/",
  "/styles.css",
  "/index.html",
  "/favicon.ico",
  "/src/js/app.js",
  "/manifest.json",
  "/src/images/icons/app-icon-48x48.png",
  "/src/images/icons/app-icon-96x96.png",
  "/src/images/icons/app-icon-144x144.png",
  "/src/images/icons/app-icon-192x192.png",
  "/src/images/icons/app-icon-256x256.png",
  "/src/images/icons/app-icon-384x384.png",
  "/src/images/icons/app-icon-512x512.png",
  "/src/images/about-header.jpg",
  "/src/images/contact-image.jpg",
  "/src/images/example-blog01.jpg",
  "/src/images/example-blog02.jpg",
  "/src/images/example-blog03.jpg",
  "/src/images/example-blog04.jpg",
  "/src/images/example-blog05.jpg",
  "/src/images/example-blog06.jpg",
  "/src/images/example-blog07.jpg",
  "/src/images/example-work01.jpg",
  "/src/images/example-work02.jpg",
  "/src/images/example-work03.jpg",
  "/src/images/example-work04.jpg",
  "/src/images/example-work05.jpg",
  "/src/images/example-work06.jpg",
  "/src/images/example-work07.jpg",
  "/src/images/example-work08.jpg",
  "/src/images/example-work09.jpg",
  "/src/images/footer-background.png",
  "/src/images/header-bg.jpg",
  "/src/images/logo.png",
  "/sw.js",
  "/src/images/photo-wide.jpg",
  "/src/images/photo.jpg",
  "/src/images/portfolio-example-01.jpg",
  "/src/images/portfolio-example-02.jpg",
  "/src/images/portfolio-example-03.jpg",
  "/src/images/portfolio-example-04.jpg",
  "/src/images/portfolio-example-05.jpg",
  "/src/images/portfolio-example-06.jpg",
  "/about.html",
  "/contact.html",
  "/blog.html",
  "/portfolio-example01.html",
  "/src/images/icons/portfolio-icon-16x16.png",
  "/src/images/icons/portfolio-icon-24x24.png",
  "/src/images/icons/portfolio-icon-32x32.png",
  "/src/images/icons/portfolio-icon-64x64.png",
  "/src/images/icons/portfolio-icon-128x128.png",
  "/src/images/icons/portfolio-icon-256x256.png",
  "/src/images/icons/portfolio-icon-512x512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("portfolio-app").then(function (cache) {
      cache.addAll(cache_src);
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response; // return cached response if found
      }
      // if response is not found in cache, fetch from network
      return fetch(event.request).then(function (response) {
        if (cache_src.indexOf(event.request.url) !== -1) {
          return caches.open("portfolio-app").then(function (cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        } else {
          return response;
        }
      });
    })
  );
});
