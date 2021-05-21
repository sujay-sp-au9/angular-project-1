import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingActions from './shopping.actions';

export interface State {
  ingredients: Ingredient[];
  editor: number;
}

export function shoppingReducer(
  state: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Oranges', 7)],
    editor: -1,
  },
  action: ShoppingActions.ShoppingActions
) {
  switch (action.type) {
    case ShoppingActions.ADD_TO_CART: {
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    }
    case ShoppingActions.ADD_MULTIPLE_TO_CART: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    }
    case ShoppingActions.SELECT_INGREDIENT: {
      return { ...state, editor: action.payload };
    }
    case ShoppingActions.UPDATE_INGREDIENT: {
      const ingredients = state.ingredients.slice();
      if (state.editor < 0) {
        return state;
      }
      ingredients[state.editor] = action.payload.ingredient;
      return { ...state, ingredients, editor: -1 };
    }
    case ShoppingActions.DELETE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      if (state.editor < 0) {
        return state;
      }
      ingredients.splice(state.editor, 1);
      return { ...state, ingredients, editor: -1 };
    }
    default:
      return state;
  }
}
