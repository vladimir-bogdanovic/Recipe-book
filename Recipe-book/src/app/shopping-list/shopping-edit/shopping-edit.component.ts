import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameImputRef: ElementRef;
  @ViewChild('amountInput') amountImputRef: ElementRef;
 

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameImputRef.nativeElement.value;
    const ingAmount = this.amountImputRef.nativeElement.value;
    const newIngridient = new Ingridient(ingName,ingAmount);
    this.shoppingListService.addIngridient(newIngridient);
  }

}
