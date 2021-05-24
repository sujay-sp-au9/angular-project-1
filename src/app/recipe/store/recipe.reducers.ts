import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

export function recipeReducer(
  state: State = { recipes: [] },
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES: {
      return { ...state, recipes: action.payload };
    }
    case RecipeActions.ADD_RECIPE: {
      return { ...state, recipes: [...state.recipes, action.payload] };
    }
    case RecipeActions.UPDATE_RECIPE: {
      const recipes = [...state.recipes];
      recipes[action.payload.index] = action.payload.recipe;
      return { ...state, recipes };
    }
    case RecipeActions.DELETE_RECIPE: {
      const recipes = [...state.recipes];
      recipes.splice(action.payload, 1);
      return { ...state, recipes };
    }
    default:
      return state;
  }
}
