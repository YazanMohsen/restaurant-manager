import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import {NgForOf} from "@angular/common";
import {OrderListComponent} from "./orders/order-list/order-list.component";
import {OrderComponent} from "./orders/order/order.component";
import {OrderItemComponent} from "./orders/order-item/order-item.component";

@NgModule({
  declarations: [

        OrdersComponent,
       CartComponent,
       ProfileComponent,
       OrderListComponent,
       OrderItemComponent,
       OrderComponent
  ],
  imports: [
    RouterModule,
    NgForOf,
  ],
  exports:[
  ]
})
export class UserModule { }
