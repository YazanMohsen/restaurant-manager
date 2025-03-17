import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import {OrderListComponent} from "./orders/order-list/order-list.component";
import {OrderComponent} from "./orders/order/order.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
      OrdersComponent,
       CartComponent,
       ProfileComponent,
       OrderListComponent,
       OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
  ],
  exports:[
  ]
})
export class UserModule { }
