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

              return fetchRes;
            });
          })
        );
      })

      .catch(() => {
        // adding conditional here to check the kind of request that is being made
        // only retun if an html page
        // still have access to event object so go it, request, url and use
        // indexOf() to look for the index of .html
        // indexOf searches a string for whatever we put in
        // it returns an integer which is the postion of .html
        // if .html is not inside of the url indexOf returns -1
        // so only return if greater than -1
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
