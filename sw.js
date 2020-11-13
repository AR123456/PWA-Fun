// listing for the activate event inside the service worker 
 self.addEventListener('install', evt => {
  // could add add assets to the cash here for use in offline mode
  // things that do not change much like the main css file, logo, index page ect
  console.log('service worker installed');
});

// listen for activate service worker - browser will not automaticaly reactive and replace
 
self.addEventListener("activate", evt=>{


  console.log("servicer just got activated ")

})

// skip waiting or activate on relload as a devloper 