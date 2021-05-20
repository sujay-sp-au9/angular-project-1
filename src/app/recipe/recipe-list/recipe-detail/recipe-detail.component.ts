import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  paramsSubscription: Subscription;
  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      ({ id }) => (this.recipe = this.recipeService.getRecipe(Number(id)))
    );
  }
  @ViewChild('ReceiveClickFromButton') ReceiveClickFromButton: ElementRef<any>;
  propagateClickToUL() {
    this.ReceiveClickFromButton.nativeElement.click();
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.route.snapshot.params.id);
    setTimeout(
      () => this.router.navigate(['../'], { relativeTo: this.route }),
      1000
    );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
