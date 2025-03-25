import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../Services/order.service";
import {OrderModel} from "../../../Models/order.model";
import {ResponseModel} from "../../../Models/response.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  constructor(private orderService: OrderService) {
  }

  orders: OrderModel[] = []

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((
      (response: ResponseModel<OrderModel>) => {
        this.orders = response.list;
      }
    ))
  }

}
