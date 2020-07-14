//query selectors
const body = document.querySelector("body");
const recipeCard = document.querySelector(".main-page");
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
	} else if (event.target.classList.contains("frying-pan")) {
		determineRecipeToCook();
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

//DOM manipulation
function displayUsername() {
  username.innerText = `Username: ${user.name}`;
};

function displayAllRecipes() {
	recipeCard.innerHTML = ``;
  cookbook.allRecipes.forEach(recipe => {
    recipeCard.innerHTML += `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
      <section class="recipe-graphics">
        <div>
          <input type="image" src="../assets/heart.png" class="icon heart ${recipe.id}">
        </div>
        <div>
          <input type="image" src="../assets/frying-pan.png" class="icon frying-pan ${recipe.id}">
        </div>
      </section>
      <h4>${recipe.name}</h4>
    </article>
    `;
  });
};