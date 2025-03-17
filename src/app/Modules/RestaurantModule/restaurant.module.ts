import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {RestaurantRouterModule} from "./restaurant-router.module";
import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantComponent,
    RestaurantMainComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    RestaurantRouterModule
  ],
})
export class RestaurantModule { }
