import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../shared/recipe.model';
import { DataStorageService } from '../shared/data-storage-service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolveService implements Resolve<Recipe[]>{
    
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0){
            return this.dataStorageService.fecthRecipes();
        } else {
            return recipes;
        }

    }
}