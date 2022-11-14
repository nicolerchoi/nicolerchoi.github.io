import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesListComponent
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent
    },
    {
        path: 'new-recipe',
        component: RecipeFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
