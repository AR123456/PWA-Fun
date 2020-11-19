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

// add new recipe
// const to get ref from DOM
const form = document.querySelector("form");
// add Event Listener for the  submit event and fire a call back
// when it happens (evt)
form.addEventListener("submit", (evt) => {
  // the default action of a form on submit it is to refresh the page
  // so preventing that
  evt.preventDefault();
  // object that represents a new recipe
  const recipe = {
    // can use the id of title to get referance from form
    title: form.title.value,
    ingredients: form.ingredients.value,
  };
  // add this object as a document in the db
  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));
  // set the title and ingredients feild value back to null
  // could have also used the reset method
  form.title.value = "";
  form.ingredients.value = "";
});
