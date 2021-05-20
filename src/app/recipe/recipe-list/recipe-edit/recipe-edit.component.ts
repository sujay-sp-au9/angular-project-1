import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  paramsSubscription: Subscription;
  valueChangesSubscription: Subscription;
  editMode: { i: number; is: boolean };
  recipeForm: FormGroup;
  changesSaved: boolean = false;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(({ id }) => {
      if (id) {
        this.editMode = { i: id, is: true };
      } else {
        this.editMode = { i: -1, is: false };
      }
      this.initForm();
    });
    this.valueChangesSubscription = this.recipeForm.valueChanges.subscribe(
      () => (this.changesSaved = false)
    );
  }
  private initForm() {
    const { name, imagePath, description, ingredients } = this.editMode.is
      ? this.recipeService.getRecipe(this.editMode.i)
      : new Recipe();
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: new FormArray(
        ingredients.map(
          ({ name, amount }) =>
            new FormGroup({
              name: new FormControl(name, Validators.required),
              amount: new FormControl(amount, [
                Validators.required,
                Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),
              ]),
            })
        )
      ),
    });
  }
  getIngredients() {
    return <FormArray>this.recipeForm.get('ingredients');
  }
  addIngredientControl() {
    const formArray = this.recipeForm.get('ingredients');
    if (formArray.valid) {
      (<FormArray>formArray).push(
        new FormGroup({
          name: new FormControl('', Validators.required),
          amount: new FormControl('', Validators.required),
        })
      );
    }
  }
  removeIngredientControl(index: number) {
    const formArray = this.recipeForm.get('ingredients');
    (<FormArray>formArray).removeAt(index);
    this.recipeForm.markAsDirty();
  }
  canDeactivate() {
    if (this.recipeForm.dirty && !this.changesSaved) {
      return confirm('Leave without saving changes?');
    }
    return true;
  }
  onSubmit() {
    this.recipeForm.markAsPristine();
    this.changesSaved = true;
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode.is) {
      this.recipeService.updateRecipe(this.editMode.i, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    setTimeout(
      () => this.router.navigate(['../'], { relativeTo: this.route }),
      1000
    );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
