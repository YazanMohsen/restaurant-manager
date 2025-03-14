import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";

@NgModule({
  declarations: [

    RestaurantListComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports:[
    RestaurantListComponent,
    RestaurantComponent
  ]
})
export class RestaurantModule { }
