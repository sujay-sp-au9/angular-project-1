import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../shopping.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsSubscription: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.ingredients = this.store.select('shopping');
  }
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingActions.SelectIngredient(index));
  }
}
