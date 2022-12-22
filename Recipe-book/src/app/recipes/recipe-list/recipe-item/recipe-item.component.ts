import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent{
  @Input() recipe : Recipe;
  @Output() recipeSelected = new EventEmitter<void>()

  onSelected(){
    this.recipeSelected.emit()
}

}
