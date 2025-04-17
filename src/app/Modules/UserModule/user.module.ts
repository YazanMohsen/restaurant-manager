import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ReservationsComponent } from './reservations/reservations.component';
import {OrderListComponent} from "./orders/order-list/order-list.component";
import {OrderComponent} from "./orders/order/order.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {TimeFormatPipe} from "../Utils/time-format.pipe";
import {UtilsModule} from "../Utils/utils.module";

@NgModule({
  declarations: [
      OrdersComponent,
       CartComponent,
       ReservationsComponent,
       OrderListComponent,
       OrderComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        MatProgressSpinner,
        MatPaginator,
      UtilsModule
    ],
  exports:[
  ]
})
export class UserModule { }
