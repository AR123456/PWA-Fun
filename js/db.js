// enable offline data
db.enablePersistence().catch(function (err) {
  if (err.code == "failed-precondition") {
    // probably multible tabs open at once
    console.log("persistance failed");
  } else if (err.code == "unimplemented") {
    // lack of browser support for the feature
    console.log("persistance not available");
  }
});

db.collection("recipes").onSnapshot((snapshot) => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);

    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove the document data from the web page
    }
  });
});
