import { ChangeDetectionStrategy, OnChanges, Component, Input, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Recipe, RecipeDetail, RecipesService } from 'src/app/services/recipes.service';

@Component({
    selector: 'recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnChanges {

    @ViewChild('recipeFieldSet') recipeFieldSet!: ElementRef;
    @Input() recipes: Recipe[] = [];

    filteredRecipes: Recipe[] = [];

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

    selectRecipe(recipeId: string): void {
        this.recipesService.getRecipe(recipeId).subscribe(
            result => {
                this.selectedRecipeId = recipeId;
                this.selectedRecipe = result;
                this.recipeFieldSet.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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

        this.selectRecipe(this.filteredRecipes[random].id);
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
