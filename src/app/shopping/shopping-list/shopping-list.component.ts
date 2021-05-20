import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsSubscription: Subscription;
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.ingredientsSubscription = this.shoppingService.ingredientsAdded
      .pipe(
        map((ingredients: Ingredient[]) =>
          ingredients.map((ingredient: Ingredient) => {
            ingredient.amount = Number(ingredient.amount) + 0.1;
            return ingredient;
          })
        )
      )
      .subscribe(
        (ingredients: Ingredient[]) => (this.ingredients = ingredients)
      );
    this.shoppingService.emitAdditionEvent();
  }
  onEditItem(index: number) {
    this.shoppingService.ingredientEdit.next(index);
  }
  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }
}
