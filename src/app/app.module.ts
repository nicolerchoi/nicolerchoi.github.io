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

import { AngularSplitModule } from 'angular-split';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { StepperComponent } from './components/stepper/stepper.component';

const primeng = [
    AutoCompleteModule,
    ButtonModule,
    CheckboxModule,
    ChipModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    MultiSelectModule,
    OverlayPanelModule,
    TableModule,
    TabViewModule,
    TagModule
];

@NgModule({
    declarations: [
        AppComponent,
        RecipesComponent,
        RecipesListComponent,
        RecipeComponent,
        RecipeFormComponent,
        StepperComponent
    ],
    imports: [
        AngularSplitModule,
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
