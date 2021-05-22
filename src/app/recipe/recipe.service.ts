import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../shopping/shopping.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesListUpdate: Subject<Recipe[]> = new Subject();
  constructor(private store: Store<fromApp.AppState>) {}
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
    this.store.dispatch(new ShoppingActions.AddMultipleToCart(ingredients));
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
