import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from '../shopping.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-item-edit',
  templateUrl: './shopping-item-edit.component.html',
  styleUrls: ['./shopping-item-edit.component.css'],
})
export class ShoppingItemEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  shoppingSub: Subscription;
  editMode = false;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.shoppingSub = this.store.select('shopping').subscribe((data) => {
      if (data.editor >= 0) {
        const index = data.editor;
        const { name, amount } = data.ingredients[index];
        this.form.setValue({ name, amount });
        this.editMode = true;
      }
    });
  }
  onSubmit(form: NgForm) {
    const {
      value: { name, amount },
    } = form;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingActions.UpdateIngredient({ ingredient }));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingActions.AddToCart(ingredient));
    }
    form.reset();
  }
  onClear() {
    this.editMode = false;
    this.form.reset();
  }
  onDelete() {
    if (this.editMode) {
      this.store.dispatch(new ShoppingActions.DeleteIngredient());
    }
    this.onClear();
  }
  ngOnDestroy() {
    this.shoppingSub.unsubscribe();
  }
}
