import { Component, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { RecipeDetail, Ingredient } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnChanges {

    @Input() recipe!: RecipeDetail;

    @Output() close: EventEmitter<void> = new EventEmitter();

    multiplier: number = 1;

    ingredients: { section: string, ingredients: Ingredient[] }[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if ('recipe' in changes) {
            const ingredientGroups = this.recipe.ingredients.reduce((a, c) => {
                const section = c.type ? c.type : 'main';
                const sectionIngredients = a[section] ?? [];
                return {
                    ...a,
                    [section]: [...sectionIngredients, c]
                };
            }, {} as { [section: string]: Ingredient[]; });
            this.ingredients = Object.entries(ingredientGroups)
                .map(([section, ingredients]) => ({ section, ingredients }))
                .sort((a, b) => a.section === 'main' ? -1 : b.section === 'main' ? 1 : 0 );
        }
    }

    onClose(): void {
        this.close.emit();
    }

    onClickLink(link: string): void {
        window.open(link);
    }
}
