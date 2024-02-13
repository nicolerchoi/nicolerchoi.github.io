import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesComponent } from './components/recipes/recipes.component';

import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';

const primeng = [
    ButtonModule,
    ChipModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    TabViewModule
];

@NgModule({
    declarations: [
        AppComponent,
        RecipesComponent,
        RecipesListComponent,
        RecipeComponent,
        RecipeFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ...primeng
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
