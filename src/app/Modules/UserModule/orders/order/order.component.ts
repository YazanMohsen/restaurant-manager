import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../../Models/order.model";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../../Services/order.service";

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
        this.order = this.orderService.getOrder(+params["id"])
      }
    )
  }

}
