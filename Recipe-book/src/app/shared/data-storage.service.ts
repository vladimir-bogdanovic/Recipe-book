import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStoragService {

    constructor(private http : HttpClient, private recipeService : RecipeService, private authService : AuthService) {}

///////////////
    storeRecipes(){
      const recipes = this.recipeService.getRecipes();
       this.http
       .put('https://max-ang-section19-default-rtdb.firebaseio.com/recipes.json', recipes)
       .subscribe( response => {
            console.log(response);
       } )
    }
    
///////////////
    fetchRecipes(){
        return this.http
            .get<Recipe[]>('https://max-ang-section19-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingridients: recipe.ingridients ? recipe.ingridients : []};
                    });
                })
            ,tap( recipes => {
                this.recipeService.setRecipes(recipes)
                })
            )
    }

}