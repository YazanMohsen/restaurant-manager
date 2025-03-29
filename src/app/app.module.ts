import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MainModule} from "./Modules/MainModule/main.module";
import {RestaurantModule} from "./Modules/RestaurantModule/restaurant.module";
import {RouterOutlet} from "@angular/router";
import {AppRouterModule} from "./app-router.module";
import {AuthModule} from "./Modules/AuthModule/auth.module";
import {UserModule} from "./Modules/UserModule/user.module";
import {HttpClientModule} from "@angular/common/http";
import {AdminModule} from "./Modules/AdminModule/admin.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    MainModule,
    AdminModule,
    RestaurantModule,
    AppRouterModule,
    AuthModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
