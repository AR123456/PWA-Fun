// get a handle on the div in html where we want data to appear
const recipes = document.querySelector(".recipes");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

/// render Recipe data function
const renderRecipe = (data, id) => {
  const html = `<div class="card-panel recipe white row" data-id="${id}">
    <img src="/img/dish.png" alt="recipe thumb" />
    <div class="recipe-details">
      <div class="recipe-title">${data.title}</div>
      <div class="recipe-ingredients">${data.ingredients}</div>
    </div>
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}" >delete_outline</i>
    </div>
  </div>`;

  // append html to the recipes div

  recipes.innerHTML += html;
};

// revmove recipe from DOM
const removeRecipe = (id) => {
  // attribute selector in css
  // so have ref to the recipe we want to del
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  //method to remove from DOM
  recipe.remove();
};
