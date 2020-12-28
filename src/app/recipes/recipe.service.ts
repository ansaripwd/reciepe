import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Exotic peri peri pizza',
      'The best gift to your tummy!',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bbq-pizza-318-1547837614.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('cheese', 20),
        new Ingredient('bread', 20)
        
      ]),
    new Recipe('Pasta',
      'What else you need to say?',
      'https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Spinach-Tomato-Pasta-bowl-500x375.jpg',
      [
        new Ingredient('chees', 2),
        new Ingredient('Meat', 1),
        new Ingredient('egg', 1)
      ]),

      new Recipe('Chicken Chilli',
      '',
      'https://static.toiimg.com/photo/53094926.cms',
      [
        new Ingredient('Chilli Sauce', 1),
        new Ingredient('Meat', 1),
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
