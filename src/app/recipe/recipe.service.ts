import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping/shopping.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesListUpdate: Subject<Recipe[]> = new Subject();
  constructor(private shoppingService: ShoppingService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test Recipe',
  //     'This is a test',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
  //     [new Ingredient('Meat', 1), new Ingredient('French fries', 21)]
  //   ),
  //   new Recipe(
  //     '2nd test Recipe',
  //     'This is also a test',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  emitRecipeListChange() {
    this.recipesListUpdate.next([...this.recipes]);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.emitRecipeListChange();
  }
  getRecipes() {
    return [...this.recipes];
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToCart(ingredients: Ingredient[]) {
    this.shoppingService.addMultipleToCart(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes = [...this.recipes, recipe];
    this.emitRecipeListChange();
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.emitRecipeListChange();
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitRecipeListChange();
  }
}
