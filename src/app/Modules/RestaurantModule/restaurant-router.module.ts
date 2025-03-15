import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantMainComponent} from "./restaurant-main/restaurant-main.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";

let appRoutes: Route[] = [
  {
    path: '', component: RestaurantMainComponent,
    children: [
      {path: 'all', component: RestaurantListComponent,},
      {path: ':id', component: RestaurantComponent,},
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],

  exports: [
    RouterModule
  ]
})
export class RestaurantRouterModule {
}
