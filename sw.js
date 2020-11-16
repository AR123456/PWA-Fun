// const for the application shell cashe
const staticCacheName = "site-static-v2";
// this is a different cache to be used of pages beyond the home page
const dynamicCache = "site-dynamic-v1";

// const for assets array - array of requests
const assets = [
  // the request urls (key) the cache gets the value
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

// install service worker
self.addEventListener("install", (evt) => {
  //  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  // console.log("servicer just got activated ")
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
// looking for each fetch event here
self.addEventListener("fetch", (evt) => {
  //  console.log("fetch just happened",evt)
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      // the fetch(evt.request) is asyncronis so we can attach a .then
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          // in here take what is returned to us and store it in the cache
          // so we can serve up this new page if user goes off line
          // so use the const dynamic cache
          return caches.open(dynamicCache).then((cache) => {
            // put this response in this cache
            // need 2 args the resoruce url and the response (key value)
            // need to use a copy of fetchRes so that we do not use it up
            cache.put(evt.request.url, fetchRes.clone());
            // here is were we need to use fetchRes
            return fetchRes;
          });
        })
      );
    })
  );
});
