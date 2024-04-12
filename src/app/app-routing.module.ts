import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'recipes',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        component: RecipesComponent
    },
    {
        path: 'recipe/:recipeId',
        component: RecipeComponent
    }
    // {
    //     path: 'new-recipe',
    //     component: RecipeFormComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
