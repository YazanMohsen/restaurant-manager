import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {RestaurantManagementComponent} from "./restaurant-management/restaurant-management/restaurant-management.component";
import {OrdersManagementComponent} from "./orders-management/orders-management.component";
import {ReservationManagementComponent} from "./reservation-management/reservation-management.component";
import {MealsManagementComponent} from "./meals-management/meals-management.component";
import {FormsModule} from "@angular/forms";
import {OrderManagementListComponent} from "./orders-management/order-management-list/order-management-list.component";
import {OrderManagementComponent} from "./orders-management/order-management/order-management.component";
import {MealFormComponent} from "./meals-management/meal-form/meal-form.component";
import {MealsComponent} from "./meals-management/meals/meals.component";
import {RestaurantsManagementComponent} from "./restaurant-management/restaurants-management.component";
import {RestaurantFormComponent} from "./restaurant-management/restaurant-form/restaurant-form.component";
import {MatPaginator} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AdminHomeComponent,
    RestaurantManagementComponent,
    OrdersManagementComponent,
    ReservationManagementComponent,
    MealsManagementComponent,
    OrderManagementListComponent,
    OrderManagementComponent,
    MealFormComponent,
    MealsComponent,
    RestaurantsManagementComponent,
    RestaurantFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatProgressSpinner,
    FormsModule,
    MatPaginator,
  ],
  exports:[
  ]
})
export class AdminModule { }
