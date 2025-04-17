import { Component } from '@angular/core';
import {themeMaterial} from "ag-grid-enterprise";
import {ResponseModel} from "../../Models/response.model";
import {ReservationModel} from "../../Models/reservation.model";
import {TableModel} from "../../Models/table.model";
import {PageEvent} from "@angular/material/paginator";
import {TablesFormDialog} from "../tables-management/tables-form-dialog/tables-form-dialog";
import {ReservationService} from "../../Services/reservation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrl: './reservation-management.component.css'
})
export class ReservationManagementComponent {

  protected readonly themeMaterial = themeMaterial;

constructor(
  private toastr: ToastrService,
  private reservationService:ReservationService) {
}
  reservations: ReservationModel[] = [];
  isLoading: boolean = false;
  totalCount: number;
  pageSize: number = 5;
  ngOnInit(): void {
    this.search(0, this.pageSize)
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.reservationService.searchReservation(page, pageSize).subscribe(
      (response: ResponseModel<ReservationModel>) => {
        this.isLoading = false;
        this.reservations = response.list;
        // this.reservations.map(reservation=>{
        //   reservation.user=reservation.user.name;
        //   reservation.table=reservation.table.number;
        // })
        this.totalCount = response.total_count;
        // this.rowData=this.tables;
      }
      , (error) => {
        this.toastr.error(error.message, "Failed to Fetch Reservations");
        this.isLoading = false;
      }
    )
  }




  columnDefs = [
    {field: 'user.name',headerName: 'Client'},
    {field: 'start_time',headerName: 'Start Time'},
    {field: 'end_time',headerName: 'End Time'},
    {field: 'table.number',headerName: 'Table Number'},
  ];

}
