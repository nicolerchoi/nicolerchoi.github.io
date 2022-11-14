import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Ingredient, QuantifiedIngredient, RecipeDetail, UNIT, UnquantifiedIngredient } from 'src/app/services/recipes.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent implements OnInit {

    form: FormGroup = new FormGroup({});

    ingredientsTableColumns = ['quantity', 'unit', 'ingredient', 'tools'];

    unitOptions = Object.values(UNIT);
    ingredientFormGroup: FormGroup = this.fb.group({
        quantity: [],
        unit: [],
        ingredient: ['', [Validators.required]],
        type: []
    });
    ingredientsArray: Ingredient[] = [];

    stepsText: string = '';

    recipe?: RecipeDetail;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            hashtags: [[]],
            ingredients: this.fb.array([]),
            steps: this.fb.array([]),
            originalRecipe: [],
            video: []
        });
    }

    ngOnInit(): void {
        console.log(this.form.value, this.ingredientsArray, this.stepsText)
    }

    get hashtagsControl(): FormControl {
        return this.form.get('hashtags') as FormControl;
    }

    get ingredientsControl(): FormArray {
        return this.form.get('ingredients') as FormArray;
    }

    addHashtag(event: MatChipInputEvent): void {
        if (event.value) {
            this.hashtagsControl.value.push(event.value);
            event.chipInput!.clear();
        }
    }

    removeHashtag(hashtag: string, index: number): void {
        this.hashtagsControl.value.splice(index, 1);
    }

    onDropIngredient(event: CdkDragDrop<Ingredient[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    onDeleteIngredient(index: number): void {
        this.ingredientsArray.splice(index, 1);
    }

    onAddIngredient(): void {
        const newIngredient: Ingredient = this.ingredientFormGroup.value;
        if (newIngredient.quantity && newIngredient.unit) {
            this.ingredientsArray.push(newIngredient as QuantifiedIngredient);
        } else {
            this.ingredientsArray.push({
                ingredient: newIngredient.ingredient
            } as UnquantifiedIngredient);
        }
        this.ingredientFormGroup.reset();
    }

    onSubmit(): void {
        this.recipe = {
            ...this.form.value,
            ingredients: this.ingredientsArray,
            steps: this.stepsText.split('\n'),
        };
        console.log(this.recipe);
    }
}
