// link from index.html script and every other page 
// check if browser supports service workers fist, check the navigator object 
if("serviceWorker" in navigator){
    // yes browser supports so register service worker use register method,
    // this is an async task, returns a promise using .then promis syntax here  
    // the promise says that at some point this will resolve or be rejected 
    navigator.serviceWorker.register("/sw.js")
    .then((reg)=> console.log("service worker registered",reg))
    .catch((err) => console.log("service worker not registered",err))
}

// this is a stack overflow ref about then/catch vs async/await 
//https://stackoverflow.com/questions/59620213/using-async-await-with-service-worker
// the async await syntax using try catch 
// Promises with then/catch can be used interchangeably with async/await. If you wish, you can replace the then's with awaits and the errors with catches...

// inside an async function
// assuming that register() is a promise-returning function...
// try {
//     let registration = await navigator.serviceWorker.register('/sw.js')
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   } catch(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   }
// an article about async await 
//https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789
