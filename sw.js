// const for the application shell cashe
const staticCacheName = "site-static"
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
]


// install service worker 
 self.addEventListener('install', evt => {
  //  console.log('service worker installed');
  // wrap in the waitUntil so we know the assets get cashed before intall inihshes 
  evt.waitUntil(
  caches.open(staticCacheName).then(cache =>{
    // add items to the cache
   // cache.add() or cache.addAll() both reach out the server and get the resouce 
   // the array are the keys, the values are what is on the server and come back in responses
   // they then get added to the cache
   console.log("caching shell assets")
   cache.addAll(assets)
    
  }))
});

// activate event
 
self.addEventListener("activate", evt=>{
  // console.log("servicer just got activated ")
})

 // fetch event 
 self.addEventListener("fetch",evt=>{
  //  console.log("fetch just happened",evt)
 })
