import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  storeRecipes() {
    this.http
      .put(
        'https://ng-complete-guide-32c40-default-rtdb.firebaseio.com/recipe.json',
        this.recipeService.getRecipes()
      )
      .subscribe();
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-complete-guide-32c40-default-rtdb.firebaseio.com/recipe.json'
      )
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          })
        ),
        tap((recipes) => this.recipeService.setRecipes(recipes))
      );
  }
}
