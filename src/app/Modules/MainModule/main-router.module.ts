import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {FAQsComponent} from "./faqs/faqs.component";

let appRoutes:Route[]=[
  {path: '', component:HomeComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'contact-us', component:ContactUsComponent},
  {path: 'FAQs', component:FAQsComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class MainRouterModule { }
