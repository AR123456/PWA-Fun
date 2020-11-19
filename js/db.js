db.collection("recipes").onSnapshot((snapshot) => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);

    if (change.type === "added") {
      // call a function that will update our UI with data from the DOM
      // we need the doc.id() to track changes - this has to do with UI so define function in ui.js
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove the document data from the web page
    }
  });
});
