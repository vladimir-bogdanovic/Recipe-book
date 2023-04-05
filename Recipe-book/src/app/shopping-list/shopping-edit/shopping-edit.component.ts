import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm ;
  subscription : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingridient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(){
  this.subscription = this.shoppingListService.startedEditing.subscribe(
    (index: number) => {
      this.editedItemIndex = index
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngridient(index);
      this.slForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount
      })
    }
  )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmitItem(form : NgForm){
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount);
    if (this.editMode === true){
      this.shoppingListService.updateIngridient(this.editedItemIndex, newIngridient);
      this.editMode = false;
      this.slForm.reset()
    } else {
      this.shoppingListService.addIngridient(newIngridient);
    }
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }

}
