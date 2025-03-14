import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";

let appRoutes: Route[] = [
  {path: '', component:RestaurantListComponent}


];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
})
export class RestaurantRouterModule {
}
