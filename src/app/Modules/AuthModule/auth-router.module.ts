import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

let appRoutes:Route[]=[
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRouterModule { }
