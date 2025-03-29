import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../Models/order.model";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../../Services/order.service";
import {ResponseModel} from "../../../Models/response.model";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {
  order: OrderModel;
  isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.orderService.getOrder(+params["id"]).subscribe((
          (response: ResponseModel<OrderModel>) => {
            this.order = response.model;
            this.isLoading=false;
          }
        ))
      }
    )
  }

}
