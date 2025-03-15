import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";

let appRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  }
  , {
    path: "home",
    loadChildren: () => import('./Modules/MainModule/main.module').then(m => m.MainModule),
  },
  {
    path: "restaurants",
    loadChildren: () => import('./Modules/RestaurantModule/restaurant-router.module').then(m => m.RestaurantRouterModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
