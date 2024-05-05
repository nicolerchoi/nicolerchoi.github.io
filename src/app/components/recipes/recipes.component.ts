import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipesService, Recipe, RecipeDetail } from '../../services/recipes.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {

    recipes: Recipe[] = [];
    selectedRecipeId?: string;
    selectedRecipe?: RecipeDetail;

    suggestions: Recipe[] = [];

    randomSuggestion?: Recipe;

    cuisines: string[] = [];
    selectedCuisine?: string;
    // cuisineRecipes: Recipe[] = [];

    hashtags: string[] = [];
    selectedHashtags?: string[];

    ingredients: SelectItem[] = [];
    selectedIngredients?: string[];

    filteredRecipes: Recipe[] = [];

    constructor(
        private recipesService: RecipesService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.recipesService.getAllRecipes().subscribe(
            result => {
                this.recipes = result;
                this.filteredRecipes = this.recipes;
                this.cuisines = [...new Set(result.flatMap(r => r.cuisines))];
                this.hashtags = [...new Set(result.flatMap(r => r.hashtags))];
                this.ingredients = [...new Set(result.flatMap(r => r.ingredients))].sort()
                    .map(i => ({ label: capitalise(i), value: i}));
                this.cd.markForCheck();
            },
            error => {
                console.log('Cannot get recipe list', error)
            }
        )
    }

    search(event: AutoCompleteCompleteEvent): void {
        this.suggestions = this.recipes.filter(r => r.title.toLowerCase().includes(event.query.trim().toLowerCase()));
    }

    navigateToRecipePage(selected: Recipe): void {
        this.router.navigate(['recipe', selected.id], {relativeTo: this.route});
    }

    pickRandom(overlaypanel: OverlayPanel, event: MouseEvent): void {
        const random = Math.floor(Math.random() * this.recipes.length);
        this.randomSuggestion = this.recipes[random];
        if (!overlaypanel.overlayVisible) {
            overlaypanel.show(event);
        }
    }

    // getRecipesByCuisine(): Recipe[] {
    //     return this.recipes.filter(r => r.cuisines.includes(this.selectedCuisine ?? ''));
    // }

    // onSelectCuisine(cuisine: string): void {
    //     this.selectedCuisine = cuisine;
    //     this.cuisineRecipes = this.getRecipesByCuisine();
    // }

    // isSelectedCuisine(cuisine: string): boolean {
    //     return this.selectedCuisine === cuisine;
    // }

    // deselectCuisine(event: MouseEvent): void {
    //     event.stopPropagation();
    //     this.selectedCuisine = undefined;
    //     this.cuisineRecipes = this.getRecipesByCuisine();
    // }

    onFilterChange(): void {
        const filterByCuisine = this.selectedCuisine
            ? this.recipes.filter(r => r.cuisines.includes(this.selectedCuisine!))
            : this.recipes
        const filterByHashtags = this.selectedHashtags?.length
            ? filterByCuisine.filter(r => r.hashtags.some(tag => this.selectedHashtags!.includes(tag)))
            : filterByCuisine;
        this.filteredRecipes = this.selectedIngredients?.length
            ? filterByHashtags.filter(r => this.selectedIngredients!.every(i => r.ingredients.includes(i)))
            : filterByHashtags;
    }

    removeTag(tag: string): void {
        this.selectedHashtags = this.selectedHashtags
            ? this.selectedHashtags.filter(t => t !== tag)
            : undefined;
        this.onFilterChange();
    }

    removeIngredient(ingredient: string): void {
        this.selectedIngredients = this.selectedIngredients
            ? this.selectedIngredients.filter(i => i !== ingredient)
            : undefined;
        this.onFilterChange();
    }
}

function capitalise(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}