import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";

let appRoutes:Route[]=[
  // {path:"restaurants", loadChildren:import('').then()}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRouterModule { }
