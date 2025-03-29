import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";

let appRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  }
  , {
    path: "admin",
    loadChildren: () => import('./Modules/AdminModule/admin-router.module').then(m => m.AdminRouterModule)
  }
  , {
    path: "home",
    loadChildren: () => import('./Modules/MainModule/main.module').then(m => m.MainModule),
  },
  {
    path: "restaurants",
    loadChildren: () => import('./Modules/RestaurantModule/restaurant-router.module').then(m => m.RestaurantRouterModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./Modules/AuthModule/auth-router.module').then(m => m.AuthRouterModule)
  },
  {
    path: "user",
    loadChildren: () => import('./Modules/UserModule/user-router.module').then(m => m.UserRouterModule)
  },
  {
    path: "**",
    redirectTo: "home"
  },


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
