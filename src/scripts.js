//query selectors
const body = document.querySelector("body");
const favoriteRecipesPage = document.querySelector(".favorite-recipes");
const recipesToCookPage = document.querySelector(".recipes-to-cook");
const pageTitle = document.querySelector("h3");
const mainPage = document.querySelector(".main-page");
const recipePage = document.querySelector(".recipe-page");
const username = document.querySelector(".username");
const searchField = document.querySelector(".search");
const searchBar = document.querySelector(".search-bar");

let allRecipes = [];
let cookbook;
let index;
let pantry;
let totalCost;
let user;

//event listeners
window.onload = loadPage();
body.addEventListener("click", clickHandler);


//event handlers
function loadPage() {
  generateRandomUser();
  generateCookbook();
  generatePantry();
  displayAllRecipes();
};

function clickHandler() {
	if (event.target.classList.contains("heart")) {
		determineFavoriteRecipe();
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
	} else if (event.target.classList.contains("recipe-name")) {
		determineRecipeClicked();
	} else if (event.target.classList.contains("go")) {
		displayAllFilteredRecipesByTag();
	};
};

//other functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function generateRandomUser() {
  index = getRandomIndex(usersData);
  user = new User(usersData[index], ingredientsData);
  displayUsername();
};

function generateCookbook() {
  recipeData.forEach(recipe => {
    allRecipes.push(new Recipe(recipe, ingredientsData))
  })
  cookbook = new Cookbook(allRecipes, ingredientsData);
};

function generatePantry() {
  pantry = new Pantry(usersData[index]);
}

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

function determineTotalCost(recipeID) {
  allRecipes.forEach(recipe => {
    if (recipe.id === recipeID) {
      totalCost = (recipe.getTotalCost() / 100).toFixed(2);
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

function determineRecipeClicked() {
	cookbook.allRecipes.find(recipe => {
		if (event.target.classList.contains(recipe.id)) {
			displayRecipePage(recipe);
		};
	});
};

function getSearchResults() {
	return searchField.value;
};

//DOM manipulation
function displayUsername() {
  username.innerText = `Username: ${user.name}`;
};

function displayAllRecipes() {
	mainPage.innerHTML = ``;
  cookbook.allRecipes.forEach(recipe => {
    determineTotalCost(recipe.id);
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
      <h4 class="recipe-name ${recipe.id}">${recipe.name}</h4>
      <p class="message">This recipe costs $${totalCost}.</p>
    </article>
    `;
  });
};

function displayMainPage() {
	mainPage.classList.remove("hidden");
	searchBar.classList.remove("hidden");
  favoriteRecipesPage.classList.add("hidden");
	recipesToCookPage.classList.add("hidden");
	recipePage.classList.add("hidden");
  pageTitle.innerText = "Recipes";
};

function displayFavoriteRecipes() {
  mainPage.classList.add("hidden");
  recipesToCookPage.classList.add("hidden");
	recipePage.classList.add("hidden");
	searchBar.classList.add("hidden");
	favoriteRecipesPage.classList.remove("hidden");
  pageTitle.innerText = "Favorite Recipes";
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
      <h4 class="recipe-name ${recipe.id}">${recipe.name}</h4>
    </article>
    `;
  });
};

function displayRecipesToCook() {
  mainPage.classList.add("hidden");
  favoriteRecipesPage.classList.add("hidden");
	recipePage.classList.add("hidden");
	searchBar.classList.add("hidden");
	recipesToCookPage.classList.remove("hidden");
  pageTitle.innerText = "Recipes To Cook";
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
      <h4 class="recipe-name ${recipe.id}">${recipe.name}</h4>
      <p class="message">${pantry.checkIngredients(recipe)}.</p>
    </article>
    `;
  });
};

function displayRecipePage(recipe) {
	mainPage.classList.add("hidden");
	favoriteRecipesPage.classList.add("hidden");
	recipesToCookPage.classList.add("hidden");
	searchBar.classList.add("hidden");
	recipePage.classList.remove("hidden");
	pageTitle.innerText = "";
	recipePage.innerHTML = `
		<img class="recipe-page-image" src="${recipe.image}" alt="${recipe.name}">
		<h4 class="recipe-page-name">${recipe.name}</h4>
		<p class="tags">${displayRecipeTags(recipe)}</p>
		<p class="ingredients">${displayIngredients(recipe)}</p>
		<p class="instructions">${displayInstructions(recipe)}</p>
		`
	};

function displayRecipeTags(recipe) {
	let tagList = recipe.tags.map(tag => `${tag} <br>`);
	return tagList.join("");
};

function displayInstructions(recipe) {
	let instructions = recipe.instructions.map(instruction => `- ${instruction.instruction} <br>`);
	return instructions.join("");
};

function displayIngredients(recipe) {
	let ingredients = recipe.ingredients.map(ingredient => `- ${ingredient.id}, Quantity: ${ingredient.quantity.amount} ${ingredient.quantity.unit} <br>`);
	return ingredients.join("");
};

function displayAllFilteredRecipesByTag() {
	let searchInput = getSearchResults();
	let filteredRecipes = cookbook.filterAllRecipesByTag(searchInput);
	mainPage.innerHTML = ``;
	filteredRecipes.forEach(recipe => {
		determineTotalCost(recipe.id);
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
      <h4 class="recipe-name ${recipe.id}">${recipe.name}</h4>
      <p class="message">This recipe costs $${totalCost}.</p>
    </article>
    `;
	});
};