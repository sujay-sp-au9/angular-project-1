import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSub: Subscription;
  recipesListUpdateSubscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.recipesSub = this.store
      .select('recipe')
      .subscribe(({ recipes }) => (this.recipes = recipes));
  }
  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }
}
