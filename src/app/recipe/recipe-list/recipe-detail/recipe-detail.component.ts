import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.model';
import * as fromApp from '../../../store/app.reducer';
import * as ShoppingActions from '../../../shopping/shopping.actions';
import * as RecipeActions from '../../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  paramsSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(({ id }) =>
      this.store
        .select('recipe')
        .pipe(take(1))
        .subscribe(({ recipes }) => (this.recipe = recipes[Number(id)]))
    );
  }
  @ViewChild('ReceiveClickFromButton') ReceiveClickFromButton: ElementRef<any>;
  propagateClickToUL() {
    this.ReceiveClickFromButton.nativeElement.click();
  }
  addTocart() {
    this.store.dispatch(
      new ShoppingActions.AddMultipleToCart(this.recipe.ingredients)
    );
  }
  deleteRecipe() {
    this.store.dispatch(
      new RecipeActions.DeleteRecipe(this.route.snapshot.params.id)
    );
    setTimeout(
      () => this.router.navigate(['../'], { relativeTo: this.route }),
      1000
    );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
