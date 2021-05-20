import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-item-edit',
  templateUrl: './shopping-item-edit.component.html',
  styleUrls: ['./shopping-item-edit.component.css'],
})
export class ShoppingItemEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editingSubscription: Subscription;
  editMode = { i: -1, isTrue: false };
  editIngredient: Ingredient;
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit() {
    this.editingSubscription = this.shoppingService.ingredientEdit.subscribe(
      (i) => {
        this.editMode = { i, isTrue: true };
        this.editIngredient = this.shoppingService.getIngredient(
          this.editMode.i
        );
        const { name, amount } = this.editIngredient;
        this.form.setValue({ name, amount });
      }
    );
  }
  onSubmit(form: NgForm) {
    console.log(form);

    const {
      value: { name, amount },
    } = form;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode.isTrue) {
      this.shoppingService.updateIngredient(this.editMode.i, newIngredient);
      this.editMode = { i: -1, isTrue: false };
    } else {
      this.shoppingService.addToCart(newIngredient);
    }
    form.reset();
  }
  onClear() {
    this.editMode = { i: -1, isTrue: false };
    this.form.reset();
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.editMode.i);
    this.onClear();
  }
  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
