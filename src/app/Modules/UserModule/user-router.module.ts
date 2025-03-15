import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {CartComponent} from "./cart/cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {ProfileComponent} from "./profile/profile.component";
import {OrderListComponent} from "./orders/order-list/order-list.component";
import {OrderComponent} from "./orders/order/order.component";

let appRoutes: Route[] = [
  {path: 'cart', component: CartComponent},
  {
    path: 'orders', component: OrdersComponent, children: [
      {path: 'list', component: OrderListComponent},
      {path: ':id', component: OrderComponent},
    ]

  },
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRouterModule {
}
