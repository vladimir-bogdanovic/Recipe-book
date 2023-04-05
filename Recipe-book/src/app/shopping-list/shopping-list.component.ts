import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingridients: Ingridient[] ;
  private ingChangedSub: Subscription

  constructor( private shoppingListService : ShoppingListService ) { }

  ngOnInit(): void {
    this.ingridients = this.shoppingListService.getIngridients()
   this.ingChangedSub = this.shoppingListService.ingridientsChanged.subscribe(
      (ingridients : Ingridient[]) => {
        this.ingridients = ingridients
      }
    )
  }
  ngOnDestroy(): void {
    this.ingChangedSub.unsubscribe()
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index)
  } 

}
