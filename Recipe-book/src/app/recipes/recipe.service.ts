import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  //  private recipes: Recipe[] = [
  //       new Recipe(
  //         'A test Recipe',
  //        'This is a test',
  //         'https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg',
  //         [
  //           new Ingridient('meat',1),
  //           new Ingridient('fries',20),
  //         ]),
  //       new Recipe(
  //         'A test Recipe 2',
  //        'This is a test 2',
  //         'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //         [
  //           new Ingridient('meat',2),
  //           new Ingridient('buns',2)
  //         ])
  //     ];
  private recipes: Recipe[] = [];

      constructor(private slServise : ShoppingListService){}

      // overwriteRecipes je bolji naziv za metodu
      setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
      }

      getRecipes(){
        return this.recipes.slice()
      }

      getRecipe(index: number) {
        return this.recipes[index]
      }

      addIngridientsToSHoppingList(ingridients : Ingridient[]){
        this.slServise.addIngredients(ingridients)
      }

      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
      }
}