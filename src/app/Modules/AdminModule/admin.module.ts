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
import {
  RestaurantDialogComponent
} from "./restaurant-management/restaurant-management/restaurant-dialog/restaurant-dialog.component";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatFabButton} from "@angular/material/button";
import {TablesManagementComponent} from "./tables-management/tables-management.component";
import {TablesFormDialog} from "./tables-management/tables-form-dialog/tables-form-dialog";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {AgGridModule} from "ag-grid-angular";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard} from "@angular/material/card";
import {AllEnterpriseModule, ModuleRegistry} from "ag-grid-enterprise";
import {StatusComponent} from "./reservation-management/status/status.component";
ModuleRegistry.registerModules([AllEnterpriseModule]);
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
    RestaurantDialogComponent,
    TablesManagementComponent,
    TablesFormDialog,
    StatusComponent ],
  imports: [
    BrowserModule,
    RouterModule,
    MatProgressSpinner,
    FormsModule,
    MatPaginator,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatFabButton,
    MatGridList,
    MatGridTile,
    MatToolbar,
    MatCard,
    AgGridModule
  ],
  exports:[
  ]
})
export class AdminModule { }
