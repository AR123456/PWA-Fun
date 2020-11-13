// install event
// self here, inside of service worker refers to the service worker
// evt is the event 
// when this occurs it is going to fire a callback funciton 
// this callback function takes as a paramiter 
// an event object that represent the install event 

self.addEventListener('install', evt => {
  // could add add assets to the cash here for use in offline mode
  // things that do not change much like the main css file, logo, index page ect
  console.log('service worker installed');
});
