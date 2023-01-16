
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipeDetail: Recipe;
   id : number;

  constructor(private recipeService : RecipeService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id) 
      }
    )
  }

  onAddToShoppingList() {
this.recipeService.addIngridientsToSHoppingList(this.recipeDetail.ingridients)
  }

  onRecipeEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo : this.route})
  }


}
