class User {
  constructor(userData, ingredientsData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.allIngredients = ingredientsData;
  }

  addRecipe(recipe, savedRecipes) {
    if (savedRecipes.includes(recipe) === false) {
      savedRecipes.push(recipe);
    }
  }

  removeRecipe(recipe, savedRecipes) {
    let index = savedRecipes.indexOf(recipe);
    savedRecipes.splice(index, 1);
  }

  filterFavoriteRecipesByTag(tag) {
    return this.favoriteRecipes.reduce((foundRecipes, recipe) => {
      if (recipe.tags.includes(tag)) {
        foundRecipes.push(recipe);
      }
      return foundRecipes;
    }, []);
  }

  filterRecipesToCookByTag(tag) {
    return this.recipesToCook.reduce((foundRecipes, recipe) => {
      if (recipe.tags.includes(tag)) {
        foundRecipes.push(recipe);
      }
      return foundRecipes;
    }, []);
  }

  filterFavoriteRecipesByName(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return this.favoriteRecipes.reduce((foundRecipes, recipe) => {
      if (recipe.name.includes(name)) {
        foundRecipes.push(recipe);
      }
      return foundRecipes;
    }, []);
  }

  filterRecipesToCookByName(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return this.recipesToCook.reduce((foundRecipes, recipe) => {
      if (recipe.name.includes(name)) {
        foundRecipes.push(recipe);
      }
      return foundRecipes;
    }, []);
  }

  filterFavoriteRecipesByIngredient(item) {
    const inputtedItemID = (this.allIngredients.find(ingredient => ingredient.name === item)).id
    return this.favoriteRecipes.reduce((foundRecipes, recipe) => {
      recipe.ingredients.find(ingredient => {
        if (ingredient.id === inputtedItemID) {
          foundRecipes.push(recipe)
        }
      })
      return foundRecipes;
    }, []);
  }

  filterRecipesToCookByIngredient(item) {
    const inputtedItemID = (this.allIngredients.find(ingredient => ingredient.name === item)).id
    return this.recipesToCook.reduce((foundRecipes, recipe) => {
      recipe.ingredients.find(ingredient => {
        if (ingredient.id === inputtedItemID) {
          foundRecipes.push(recipe)
        }
      })
      return foundRecipes;
    }, []);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
