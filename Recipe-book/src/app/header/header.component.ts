import { Component } from '@angular/core';
import { DataStoragService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService : DataStoragService){}

  onSaveData(){
    this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

}

