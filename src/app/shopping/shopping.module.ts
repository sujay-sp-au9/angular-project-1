import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingItemEditComponent } from './shopping-item-edit/shopping-item-edit.component';
import { AddTaxPipe } from './shopping-list/addTax.pipe';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingItemEditComponent,
    ShoppingComponent,
    AddTaxPipe,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ShoppingListComponent,
    ShoppingItemEditComponent,
    ShoppingComponent,
    RouterModule,
    AddTaxPipe,
  ],
})
export class ShoppingModule {}
