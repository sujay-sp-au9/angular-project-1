import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../shopping.actions';
import { State } from '../shopping.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsSubscription: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<{ shopping: State }>) {}
  ngOnInit(): void {
    this.ingredients = this.store.select('shopping');
  }
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingActions.SelectIngredient(index));
  }
}
