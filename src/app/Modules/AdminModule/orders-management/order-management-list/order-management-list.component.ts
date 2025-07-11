import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../Services/order.service";
import {OrderModel} from "../../../Models/order.model";
import {ResponseModel} from "../../../Models/response.model";
import {PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../Services/auth.service";
import {themeMaterial} from "ag-grid-enterprise";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-order-management-list',
  templateUrl: './order-management-list.component.html',
  styleUrl: './order-management-list.component.css'
})
export class OrderManagementListComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private orderService: OrderService,) {
  }

  orders: OrderModel[] = []
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  pageSize: number = 5;
  searchValue: string = "";

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.orderService.searchOrders(this.searchValue, page, pageSize, this.authService.getUser().restaurant_id).subscribe(
      (response: ResponseModel<OrderModel>) => {
        this.isLoading = false;
        this.orders = response.list;
        this.orders.map(order => {
          order.created_at = this.datePipe.transform(order.created_at, 'yyyy-MM-dd');

        })

        this.totalCount = response.total_count;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.currentPage=event.pageIndex;
    this.search(event.pageIndex, event.pageSize);

  }
  updateStatus(event: any) {
    const order = event.data;
    this.orderService.updateOrder(order.id, order).subscribe(() => {
      this.search(this.currentPage, this.pageSize);
      this.toastr.success("", "Order Updated Successfully")
    }, (error) => {
      this.toastr.error(error.message, "Failed to Update Orded")
    })

  }

  protected readonly themeMaterial = themeMaterial;

  columnDefs = [
    {field: 'id', headerName: 'Order Number'},
    {field: 'created_at', headerName: 'Order Date'},
    {field: 'user.name', headerName: 'Customer Name'},
    {field: 'customer_phone_number', headerName: 'Customer Phone '},
    {field: 'customer_location', headerName: 'Customer Location'},
    {
      field: 'status',
      editable: true,
      cellEditor: 'agSelectCellEditor', // Built-in dropdown editor
      cellEditorParams: {values: ['Pending', 'InProcess', 'InDelivery']},
      onCellValueChanged: this.updateStatus.bind(this)
    },
    {field: 'total_price', headerName: 'Total Price'},
    {field: 'expand', cellRenderer: 'agGroupCellRenderer', headerName: 'Details'}
  ];

  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        {field: 'id', headerName: '#' },
        {field: 'item.name', headerName: 'Name'},
        {
          field: 'item.image',
          cellRenderer: (params) => `<img src="${params.value}" width="75" height="75" style="border-radius: 5px;"/>`,
          headerName: 'Image',

        },
        {field: 'count', headerName: 'Count'},
        {field: 'item.price', headerName: 'Unit Price'},
        {field: 'price', headerName: 'Total Price'},
      ],
      defaultColDef: {flex: 1},
      rowHeight: 75,
    },
    getDetailRowData: (params: any) => {
      this.orderService.getOrder(params.data.id).subscribe(
        (response: ResponseModel<OrderModel>) => {
          params.successCallback(response.model.order_items);
        }
      )
    }
  };
}
