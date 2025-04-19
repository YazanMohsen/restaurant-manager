import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {RestaurantModel} from "../../../Models/restaurant.model";
import {ReservationModel} from "../../../Models/reservation.model";
import {ToastrService} from "ngx-toastr";
import {ReservationService} from "../../../Services/reservation.service";
import {Subject} from "rxjs";
import {OrderModel} from "../../../Models/order.model";

@Component({
  selector: 'app-status',
  templateUrl:'status.component.html'
})
export class StatusComponent implements ICellRendererAngularComp {
  params: any;
  constructor(
    private toastr: ToastrService,
    private reservationService: ReservationService) {
  }
  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return true;
  }

  updateStatus(reservation: ReservationModel, status) {
    this.reservationService.update(reservation.id,{status:status}).subscribe(
      () => {
        this.toastr.success("", "Approved Successfully")
      }, (error) => {
        this.toastr.error(error.message, "Failed to Approve")
      }
    )
  }
}
