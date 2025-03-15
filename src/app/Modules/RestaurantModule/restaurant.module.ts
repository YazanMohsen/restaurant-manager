import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {RestaurantRouterModule} from "./restaurant-router.module";
import { RestaurantItemComponent } from './restaurant-list/restaurant-item/restaurant-item.component';
import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';

@NgModule({
  declarations: [

    RestaurantListComponent,
    RestaurantComponent,
    RestaurantItemComponent,
    RestaurantMainComponent
  ],
  imports: [
    BrowserModule,
    RestaurantRouterModule
  ],
})
export class RestaurantModule { }
