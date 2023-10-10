import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    path: string = '/assets/recipes';
  
    constructor(
      private http: HttpClient
    ) {}

    getAllRecipes() {
        return this.http.get<Recipe[]>(`${this.path}/all-recipes.json`);
    }

    getRecipe(recipeId: string) {
        return this.http.get<RecipeDetail>(`${this.path}/${recipeId}.json`);
    }
}

export interface Recipe {
    id: string;
    title: string;
    hashtags: string[];
}

export interface RecipeDetail {
    title: string;
    hashtags: string[];
    ingredients: Ingredient[];
    steps: string[];
    originalRecipe: string | null;
    video: string | null;
}

export type Ingredient = UnquantifiedIngredient | QuantifiedIngredient;

export interface UnquantifiedIngredient {
    quantity: null;
    unit: null;
    ingredient: string;
    type?: string;
}

export interface QuantifiedIngredient {
    quantity: number;
    unit: "item" | "tbsp" | "tsp" | "g" | "kg" | "cup" | "oz" | "mL" | "L";
    ingredient: string;
    type?: string;
}

export enum UNIT {
    ITEM = 'item',
    TBSP = 'tbsp',
    TSP = 'tsp',
    GRAM = 'g',
    KG = 'kg',
    CUP = 'cup',
    OZ = 'oz',
    ML = 'mL',
    L = 'L'
}