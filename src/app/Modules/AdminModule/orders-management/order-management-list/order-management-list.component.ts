import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../Services/order.service";
import {OrderModel} from "../../../Models/order.model";
import {ResponseModel} from "../../../Models/response.model";
import {PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-order-management-list',
  templateUrl: './order-management-list.component.html',
  styleUrl: './order-management-list.component.css'
})
export class OrderManagementListComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private orderService: OrderService,) {
  }

  orders: OrderModel[] = []
  isLoading: boolean;
  totalCount: number;
  pageSize: number = 5;
  searchValue: string = "";

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.orderService.searchOrders(this.searchValue, page, pageSize,this.authService.getUser().restaurant_id).subscribe(
      (response: ResponseModel<OrderModel>) => {
        this.isLoading = false;
        this.orders = response.list;
        this.totalCount = 20;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }

  updateStatus(order: OrderModel) {
    this.orderService.updateOrder(order.id,order).subscribe(() => {
      this.search(0, this.pageSize);
      this.toastr.success("","Order Updated Successfully")
    },(error)=>{
      this.toastr.error(error.message,"Failed to Update Orded")
    })
  }
}
