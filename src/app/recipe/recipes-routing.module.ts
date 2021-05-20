import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../auth/auth.gaurd';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { CanDeactivateGaurd } from './recipe-list/recipe-edit/can-deactivate-gaurd.service';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { UnselectedComponent } from './recipe-list/unselected/unselected.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeComponent } from './recipe.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurd],
    resolve: [RecipeResolverService],
    component: RecipeComponent,
    children: [
      { path: '', redirectTo: 'unselected', pathMatch: 'full' },
      { path: 'unselected', component: UnselectedComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateGaurd],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateGaurd],
      },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class RecipesRoutingModule {}
