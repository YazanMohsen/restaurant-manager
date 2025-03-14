import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";

let appRoutes:Route[]=[];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
})
export class MainRouterModule { }
