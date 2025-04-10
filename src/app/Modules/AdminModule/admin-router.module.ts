import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {
  RestaurantManagementComponent
} from "./restaurant-management/restaurant-management/restaurant-management.component";
import {MealsManagementComponent} from "./meals-management/meals-management.component";
import {OrdersManagementComponent} from "./orders-management/orders-management.component";
import {ReservationManagementComponent} from "./reservation-management/reservation-management.component";
import {OrderManagementListComponent} from "./orders-management/order-management-list/order-management-list.component";
import {OrderManagementComponent} from "./orders-management/order-management/order-management.component";
import {MealsComponent} from "./meals-management/meals/meals.component";
import {MealFormComponent} from "./meals-management/meal-form/meal-form.component";
import {RestaurantFormComponent} from "./restaurant-management/restaurant-form/restaurant-form.component";
import {RestaurantsManagementComponent} from "./restaurant-management/restaurants-management.component";
import {RestaurantAdminGuard} from "../AuthModule/restaurant-admin.guard";
import {SystemAdminGuard} from "../AuthModule/system-admin.guard";

let appRoutes: Route[] = [

  {
    path: 'restaurant-manager', component: AdminHomeComponent, canActivate: [RestaurantAdminGuard],
    children: [
      // {
      //   path: 'restaurants', component: RestaurantsManagementComponent,
      //   children: [
      //     {path: 'all', component: RestaurantManagementComponent, canActivate: [SystemAdminGuard],},
      //     {path: 'add', component: RestaurantFormComponent,},
      //
      //   ]
      // },
      {
        path: 'meals', component: MealsManagementComponent, canActivate: [RestaurantAdminGuard],
        children: [
          {path: 'all', component: MealsComponent,},
          {path: 'add', component: MealFormComponent,},

        ]
      },
      {
        path: 'orders', component: OrdersManagementComponent, canActivate: [RestaurantAdminGuard],
        children: [
          {path: 'all', component: OrderManagementListComponent,},
          {path: ':id', component: OrderManagementComponent,},

        ]
      },
      {path: 'reservations', component: ReservationManagementComponent, canActivate: [RestaurantAdminGuard],},
    ]

  },
  {
    path: 'system', component: AdminHomeComponent, canActivate: [SystemAdminGuard],
    children: [
      {
        path: 'restaurants', component: RestaurantsManagementComponent,
        children: [
          {path: 'all', component: RestaurantManagementComponent, canActivate: [SystemAdminGuard],},
        ]
      },
    ]

  }
  ,
  {path: 'register', component: RestaurantFormComponent,},

];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRouterModule {
}
