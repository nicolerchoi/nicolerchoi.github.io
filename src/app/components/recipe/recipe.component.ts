import { Component, OnInit } from '@angular/core';
import { RecipeDetail, RecipesService, Ingredient } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

    recipeId: string | null = null;
    recipe?: RecipeDetail;

    multiplier: number = 1;

    ingredients: { section: string, ingredients: Ingredient[] }[] = [];

    constructor(
        private recipesService: RecipesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.recipeId = this.route.snapshot.params['id'];
        if (this.recipeId) {
            this.recipesService.getRecipe(this.recipeId).subscribe(
                result => {
                    this.recipe = result;
                    const ingredientsObj = result.ingredients.reduce((a, c) => {
                        const section = c.type ? c.type : 'main';
                        const sectionIngredients = a[section] ?? [];
                        return {
                            ...a,
                            [section]: [...sectionIngredients, c]
                        };
                    }, {} as { [section: string]: Ingredient[] });
                    this.ingredients = Object.entries(ingredientsObj).map(([section, ingredients]) => ({
                        section, ingredients
                    }))
                        .sort((a, b) => a.section === 'main' ? -1 : b.section === 'main' ? 1 : 0 );
                },
                error => {
                    console.log('errorrrrr:', error)
                }
            )
        }
    }

    onClickLink(link: string): void {
        window.open(link);
    }

    onClickMultiplier(number: number): void {
        this.multiplier = this.multiplier + number;
    }
}
