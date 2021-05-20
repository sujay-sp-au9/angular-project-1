import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[];
  recipesListUpdateSubscription: Subscription;
  constructor(private recipeService: RecipeService) {}
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesListUpdateSubscription =
      this.recipeService.recipesListUpdate.subscribe(
        (recipes) => (this.recipes = recipes)
      );
  }
}
