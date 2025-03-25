import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../Models/order.model";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../../Services/order.service";
import {ResponseModel} from "../../../Models/response.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  order: OrderModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.orderService.getOrder(+params["id"]).subscribe((
          (response: ResponseModel<OrderModel>) => {
            this.order = response.model;
          }
        ))
      }
    )
  }

}
