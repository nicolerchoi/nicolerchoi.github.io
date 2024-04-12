import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetail, Ingredient, RecipesService } from '../../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit, OnDestroy {

    recipeId?: string;
    recipe?: RecipeDetail;
    ingredients: IngredientGroup[] = [];

    multiplier: number = 1;

    private subscription: Subscription = new Subscription();

    constructor(
        private recipesService: RecipesService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('recipeId');
        if (id) {
            this.recipeId = id;
            this.subscription.add(this.recipesService.getRecipe(id).subscribe(
                result => {
                    this.recipe = result;
                    this.ingredients = this.groupedIngredients(this.recipe.ingredients);
                    this.cd.markForCheck();
                },
                error => {
                    console.log(`Cannot get recipe ${id}`, error)
                }
            ));
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    groupedIngredients(ingredients: Ingredient[]): IngredientGroup[] {
        const ingredientGroups = ingredients.reduce((a, c) => {
            const section = c.type ? c.type : 'main';
            const sectionIngredients = a[section] ?? [];
            return {
                ...a,
                [section]: [...sectionIngredients, c]
            };
        }, {} as { [section: string]: Ingredient[]; });

        return Object.entries(ingredientGroups)
            .map(([section, ingredients]) => ({ section, ingredients }))
            .sort((a, b) => a.section === 'main' ? -1 : b.section === 'main' ? 1 : 0 );
    }

    onClickLink(link: string): void {
        window.open(link);
    }
}

interface IngredientGroup {
    section: string;
    ingredients: Ingredient[];
}