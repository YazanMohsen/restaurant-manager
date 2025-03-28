import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {RestaurantRouterModule} from "./restaurant-router.module";
import { RestaurantMainComponent } from './restaurant-main/restaurant-main.component';
import { MenuComponent } from './menu/menu.component';
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantComponent,
    RestaurantMainComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    RestaurantRouterModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginator,
    MatSort,
    MatTable,
    MatProgressSpinner
  ],
})
export class RestaurantModule { }
