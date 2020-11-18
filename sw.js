// const for the application shell cashe
const staticCacheName = "site-static-v2";
// this is a different cache to be used of pages beyond the home page
const dynamicCacheName = "site-dynamic-v1";

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
  "/pages/fallback.html",
];
// cache size limit function
// create function we are going to call if in the fetch event
// takes in the name of the cache we want to limit the size of and the limit size in number of items
const limitCacheSize = (name, size) => {
  // async, promise so .then
  caches.open(name).then((cache) => {
    // keys is an array - it is the list of assets from cache
    cache.keys().then((keys) => {
      // is the array over the size?
      if (keys.length > size) {
        // deleteing the first item in the array whichh is the oldest
        cache
          .delete(keys[0])
          // async so .then, call the limitCacheSize funciton again
          // doing this untill the keys.length > 1 is no longer true
          .then(limitCacheSize(name, size));
      }
    });
  });
};

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
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
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
    // look here do we have a resouce stored ?  if so return it.
    caches
      .match(evt.request)
      .then((cacheRes) => {
        // the fetch(evt.request) is asyncronis so we can attach a .then
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // do call limit cache size here so we dont put too much stuff into cache
              // pass in name and limit
              limitCacheSize(dynamicCacheName, 15);
              return fetchRes;
            });
          })
        );
      })

      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
