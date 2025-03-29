import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../Services/order.service";
import {OrderModel} from "../../../Models/order.model";
import {ResponseModel} from "../../../Models/response.model";

@Component({
  selector: 'app-order-management-list',
  templateUrl: './order-management-list.component.html',
  styleUrl: './order-management-list.component.css'
})
export class OrderManagementListComponent implements OnInit {
  constructor(private orderService: OrderService) {
  }

  orders: OrderModel[] = []
  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe((
      (response: ResponseModel<OrderModel>) => {
        this.orders = response.list;
        this.isLoading = false;
      }
    ))
  }

}
