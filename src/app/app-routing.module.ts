import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        component: RecipesComponent
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
