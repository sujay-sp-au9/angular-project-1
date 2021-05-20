import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../shared/directives.module';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UnselectedComponent } from './recipe-list/unselected/unselected.component';
import { RecipeComponent } from './recipe.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    UnselectedComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DirectivesModule, RouterModule],
})
export class RecipesModule {}
