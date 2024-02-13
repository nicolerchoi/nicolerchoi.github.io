import { ChangeDetectionStrategy, OnChanges, Component, Input, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Recipe, RecipeDetail, RecipesService } from 'src/app/services/recipes.service';

@Component({
    selector: 'recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnChanges {

    @Input() recipes: Recipe[] = [];

    filteredRecipes: Recipe[] = [];

    activeIndex: number = 0;
    recipeTabs: Recipe[] = [];

    first = 0;
    selectedRecipeId?: string;
    selectedRecipe?: RecipeDetail;

    hashtags: string[] = [];

    constructor(private recipesService: RecipesService, private cd: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('recipes' in changes) {
            this.filteredRecipes = this.filteredDataByHashtags();
        }
    }

    onCloseTab(index: number): void {
        this.recipeTabs.splice(index - 1, 1);
    }

    onChangeTab(index: number): void {
        if (index > 0) {
            this.getRecipe(this.recipeTabs[index - 1].id);
        }
    }

    selectRecipe(recipe: Recipe): void {
        const recipeIndex = this.recipeTabs.findIndex(tab => tab.id === recipe.id);
        if (recipeIndex < 0) {
            this.recipeTabs.push(recipe);
            this.cd.detectChanges();
            this.activeIndex = this.recipeTabs.length;
        } else {
            this.activeIndex = recipeIndex + 1; // first index is table
        }
        this.getRecipe(recipe.id);
    }

    getRecipe(id: string): void {
        this.recipesService.getRecipe(id).subscribe(
            result => {
                this.selectedRecipeId = id;
                this.selectedRecipe = result;
                this.cd.markForCheck();
            },
            error => {
                console.log('Cannot get recipe list', error)
            }
        )
    }

    pickRandom(): void {
        const random = Math.floor(Math.random() * this.filteredRecipes.length);
        const pageNumber = Math.ceil((random + 1) / 10);
        this.first = (pageNumber - 1) * 10;

        this.selectRecipe(this.filteredRecipes[random]);
    }

    onClickHashtag(hashtag: string): void {
        if (!this.hashtags.includes(hashtag)) {
            this.hashtags.push(hashtag);
            this.filteredRecipes = this.filteredDataByHashtags();
        }
    }
    
    onRemoveHashtagFilter(hashtag: string): void {
        const index = this.hashtags.indexOf(hashtag);

        if (index >= 0) {
            this.hashtags.splice(index, 1);
            this.filteredRecipes = this.filteredDataByHashtags();
        }
    }

    selectedHashtag(tag: string): boolean {
        return this.hashtags.includes(tag);
    }

    filteredDataByHashtags(): Recipe[] {
        return this.hashtags.length
            ? this.recipes.filter(recipe => this.hashtags.every(h => recipe.hashtags.includes(h)))
            : this.recipes;
    }
}
