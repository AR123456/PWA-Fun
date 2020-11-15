// const for the application shell cashe
const staticCacheName = "site-static-v2";
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
  // wrap in the waitUntil so we know the assets get cashed before intall inihshes
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      // add items to the cache
      // cache.add() or cache.addAll() both reach out the server and get the resouce
      // the array are the keys, the values are what is on the server and come back in responses
      // they then get added to the cache
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  // console.log("servicer just got activated ")
  // remove/delete the old cache
  evt.waitUntil(
    // async returns a promise - looks for keys and returns them
    caches.keys().then((keys) => {
      // console.log(keys);
      // now need to do several async tasks - could be several old caches
      // need to wait for each one to delete then go to the next
      // Promise.all takes an array of promises and waits till all in the array
      // have returned before going on
      return Promise.all(
        keys
          // does the key of that cache not eq the current staticCacheName ?
          // if it is not equal then remove it, filter it out so
          //put it into the new array that we are going to del
          .filter((key) => key !== staticCacheName)
          // then map to an array of promises to del
          .map((key) => caches.delete(key))
        // when all have been del the "Promise.all" is returned
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  //  console.log("fetch just happened",evt)
  // pause the fetch event and respond with our custom event.
  // a resonse from cache
  evt.respondWith(
    // check to see if somthing in the request matches something in the cache
    //this is async and returns a promis
    caches.match(evt.request).then((cacheRes) => {
      // will be the response that matches the request
      // or
      // if something that is not in the caches it will be empty
      // so here return the cacheRes if it exits or if it dosent exist return the original event request
      return cacheRes || fetch(evt.request);
    })
  );
});
