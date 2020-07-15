//query selectors
const body = document.querySelector("body");
const iconButtonBackground = document.querySelector("div");
const favoriteRecipesButton = document.querySelector(".favorite-recipes-button");
const homeButton = document.querySelector(".home")
const recipesToCookButton = document.querySelector(".recipes-to-cook-button");
const favoriteRecipesPage = document.querySelector(".favorite-recipes");
const pageTitle = document.querySelector("h3");
const recipesToCookPage = document.querySelector(".recipes-to-cook");
const mainPage = document.querySelector(".main-page");
const recipeImage = document.querySelector(".recipe-image");
const username = document.querySelector(".username");

let cookbook;
let user;

//event listeners
window.onload = loadPage();
body.addEventListener("click", clickHandler);


//event handlers
function loadPage() {
  generateRandomUser();
  generateCookbook();
  displayAllRecipes();
};

function clickHandler() {
	if (event.target.classList.contains("heart")) {
		determineFavoriteRecipe();
    // changeButtonColor();
	} else if (event.target.classList.contains("frying-pan")) {
		determineRecipeToCook();
  } else if (event.target.classList.contains("favorites-trash")) {
    deleteFavoriteRecipe();
  } else if (event.target.classList.contains("to-cook-trash")) {
    deleteRecipeToCook();
  } else if (event.target.classList.contains("home")) {
    displayMainPage();
	} else if (event.target.classList.contains("favorite-recipes-button")) {
    displayFavoriteRecipes();
  } else if (event.target.classList.contains("recipes-to-cook-button")) {
    displayRecipesToCook();
  }
};

//other functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function generateRandomUser() {
  let index = getRandomIndex(usersData);
  user = new User(usersData[index], ingredientsData);
  displayUsername();
};

function generateCookbook() {
  cookbook = new Cookbook(recipeData, ingredientsData);
};

function determineFavoriteRecipe() {
	cookbook.allRecipes.find(recipe => {
		if (event.target.classList.contains(recipe.id)) {
			user.addFavoriteRecipe(recipe);
		};
	});
};

function determineRecipeToCook() {
	cookbook.allRecipes.find(recipe => {
		if (event.target.classList.contains(recipe.id)) {
			user.addRecipeToCook(recipe);
		};
	});
};

function deleteFavoriteRecipe() {
  user.favoriteRecipes.forEach(recipe => {
    if (event.target.classList.contains(recipe.id)) {
      user.removeFavoriteRecipe(recipe);
    };
  });
  displayFavoriteRecipes();
};

function deleteRecipeToCook() {
  user.recipesToCook.forEach(recipe => {
    if (event.target.classList.contains(recipe.id)) {
      user.removeRecipeToCook(recipe);
    };
  });
  displayRecipesToCook();
};

//DOM manipulation
function displayUsername() {
  username.innerText = `Username: ${user.name}`;
};

function displayAllRecipes() {
	mainPage.innerHTML = ``;
  cookbook.allRecipes.forEach(recipe => {
    mainPage.innerHTML += `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
      <section class="recipe-graphics">
        <div class="">
          <input type="image" src="../assets/heart.png" class="icon heart ${recipe.id}">
        </div>
        <div class="">
          <input type="image" src="../assets/frying-pan.png" class="icon frying-pan ${recipe.id}">
        </div>
      </section>
      <h4>${recipe.name}</h4>
    </article>
    `;
  });
};

function changeButtonColor() {
  // console.log(iconButtonBackground)
  // iconButtonBackground.classList.add("clicked");
  // console.log(iconButtonBackground.classList)
};

function displayMainPage() {
  mainPage.classList.remove("hidden");
  favoriteRecipesPage.classList.add("hidden");
  recipesToCookPage.classList.add("hidden");
  pageTitle.innerHTML = `Recipes`;
};

function displayFavoriteRecipes() {
  mainPage.classList.add("hidden");
  recipesToCookPage.classList.add("hidden");
  favoriteRecipesPage.classList.remove("hidden");
  pageTitle.innerHTML = `Favorite Recipes`;
  favoriteRecipesPage.innerHTML = ``;
  user.favoriteRecipes.forEach(recipe => {
    favoriteRecipesPage.innerHTML += `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
      <section class="recipe-graphics">
        <div class="">
          <input type="image" src="../assets/trash-icon.png" class="icon favorites-trash ${recipe.id}">
        </div>
        <div class="">
          <input type="image" src="../assets/frying-pan.png" class="icon frying-pan ${recipe.id}">
        </div>
      </section>
      <h4>${recipe.name}</h4>
    </article>
    `;
  });
};

function displayRecipesToCook() {
  mainPage.classList.add("hidden");
  favoriteRecipesPage.classList.add("hidden");
  recipesToCookPage.classList.remove("hidden");
  pageTitle.innerHTML = `Recipes To Cook`;
  recipesToCookPage.innerHTML = ``;
  user.recipesToCook.forEach(recipe => {
    recipesToCookPage.innerHTML += `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
      <section class="recipe-graphics">
        <div class="">
          <input type="image" src="../assets/heart.png" class="icon heart ${recipe.id}">
        </div>
        <div class="">
          <input type="image" src="../assets/trash-icon.png" class="icon to-cook-trash ${recipe.id}">
        </div>
      </section>
      <h4>${recipe.name}</h4>
    </article>
    `;
  });
};
