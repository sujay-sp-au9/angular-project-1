import * as fromShopping from '../shopping/shopping.reducer';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromRecipe from '../recipe/store/recipe.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shopping: fromShopping.State;
  auth: fromAuth.State;
  recipe: fromRecipe.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  shopping: fromShopping.shoppingReducer,
  auth: fromAuth.authReducer,
  recipe: fromRecipe.recipeReducer,
};
