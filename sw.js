// install service worker 
 self.addEventListener('install', evt => {
   console.log('service worker installed');
});

// activate event
 
self.addEventListener("activate", evt=>{
  console.log("servicer just got activated ")
})

 // fetch event 
 self.addEventListener("fetch",evt=>{
   console.log("fetch just happened",evt)
 })
 /// change 