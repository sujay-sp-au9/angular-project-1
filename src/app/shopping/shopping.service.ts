import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 7),
  ];
  ingredientsAdded = new Subject<Ingredient[]>();
  ingredientEdit = new Subject<number>();
  emitAdditionEvent() {
    this.ingredientsAdded.next([...this.ingredients]);
  }
  getIngredients() {
    this.emitAdditionEvent();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addToCart(ingredient) {
    this.ingredients = [...this.ingredients, ingredient];
    this.emitAdditionEvent();
  }
  addMultipleToCart(ingredients) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.emitAdditionEvent();
  }
  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.emitAdditionEvent();
  }
  deleteIngredient(index: number) {
    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.emitAdditionEvent();
    }
  }
}
