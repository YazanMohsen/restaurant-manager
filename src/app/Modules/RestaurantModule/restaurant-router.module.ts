import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantMainComponent} from "./restaurant-main/restaurant-main.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {MenuComponent} from "./menu/menu.component";

let appRoutes: Route[] = [
  {
    path: '', component: RestaurantMainComponent,
    children: [
      {path: 'all', component: RestaurantListComponent,},
      {path: 'menu', component: MenuComponent},
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
export class  RestaurantRouterModule {
}
