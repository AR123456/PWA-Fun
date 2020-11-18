// here is the js to communicate with the db add a script tag in index for this
// here we want to communicate with the recipes collection, use collection() method
////// real time listener
// set up real time listioner to the database - so we know when evers something changes
// use the onSnapshot() method , it takes a callback
db.collection("recipes").onSnapshot((snapshot) => {
  // liston for change and when there is when send a snapshot of the collection to me in this
  // call back
  // console.log(snapshot.docChanges());
  // cycle throught the changes and output the change
  // array of document changes
  // .forEach()  will cycle through and perform a function on each item in the array
  // call back takes the individual object for that iteration
  snapshot.docChanges().forEach((change) => {
    // this gets us the data object of this change
    // console.log(change, change.doc.data(), change.doc.id);
    // look at the type of each change, if something is added
    // output to the dom, if removed do not add to the dom
    if (change.type === "added") {
      // add the document data to the web page
    }
    if (change.type === "removed") {
      // remove the document data from the web page
    }
  });
});
