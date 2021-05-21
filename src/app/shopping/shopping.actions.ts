import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddToCart implements Action {
  constructor(public payload: Ingredient) {}
  readonly type = ADD_TO_CART;
}
export class AddMultipleToCart implements Action {
  constructor(public payload: Ingredient[]) {}
  readonly type = ADD_MULTIPLE_TO_CART;
}
export class SelectIngredient implements Action {
  constructor(public payload: number) {}
  readonly type = SELECT_INGREDIENT;
}
export class UpdateIngredient implements Action {
  constructor(public payload: { ingredient: Ingredient }) {}
  readonly type = UPDATE_INGREDIENT;
}
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}
export type ShoppingActions =
  | AddToCart
  | AddMultipleToCart
  | SelectIngredient
  | UpdateIngredient
  | DeleteIngredient;
