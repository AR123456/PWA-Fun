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
      // getting the id of the document that was just removed
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe

const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };
  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));
  form.title.value = "";
  form.ingredients.value = "";
});
// delete a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (evt) => {
  // console.log(evt);
  if (evt.target.tagName === "I") {
    // get by data attribute
    const id = evt.target.getAttribute("data-id");
    // pass in the id of the document we want to get from the firestore collection
    db.collection("recipes").doc(id).delete();
  }
});
