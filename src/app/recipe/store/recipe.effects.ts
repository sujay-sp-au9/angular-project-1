import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  fetchRecipeEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() =>
        this.http.get<Recipe[]>(
          'https://ng-complete-guide-32c40-default-rtdb.firebaseio.com/recipe.json'
        )
      ),
      map((recipes) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      map((recipes) => new RecipeActions.SetRecipe(recipes))
    )
  );
  storeRecipeEffect = createEffect(
    () =>
      this.actions.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        tap(([action, { recipes }]) =>
          this.http.put(
            'https://ng-complete-guide-32c40-default-rtdb.firebaseio.com/recipe.json',
            recipes
          )
        )
      ),
    { dispatch: false }
  );
}
