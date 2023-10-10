import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipesService, Recipe } from '../../services/recipes.service';

@Component({
    selector: 'recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {

    recipes: Recipe[] = [];

    constructor(
        private recipesService: RecipesService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.recipesService.getAllRecipes().subscribe(
            result => {
                this.recipes = result;
                this.cd.markForCheck();
            },
            error => {
                console.log('Cannot get recipe list', error)
            }
        )
    }
}
