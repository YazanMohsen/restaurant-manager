import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MainModule} from "./Modules/MainModule/main.module";
import {RestaurantModule} from "./Modules/RestaurantModule/restaurant.module";
import {RouterOutlet} from "@angular/router";
import {AppRouterModule} from "./app-router.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    MainModule,
    RestaurantModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
