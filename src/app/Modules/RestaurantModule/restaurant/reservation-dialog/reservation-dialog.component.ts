import {Component, Inject, OnInit} from '@angular/core';
import {ResponseModel} from "../../../Models/response.model";
import {TableModel} from "../../../Models/table.model";
import {TableService} from "../../../Services/table.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {ReservationService} from "../../../Services/reservation.service";
import {ReservationModel} from "../../../Models/reservation.model";
import {ReservationResponseDialogComponent} from "../reservation-response-dialog/reservation-response-dialog.component";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent implements OnInit {
  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private tableService: TableService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.getTables(0, this.pageSize);
  }

  tables: TableModel[] = [];
  totalCount: number;
  pageSize: number = 5;
  table: number;

  private getTables(pageIndex, pageSize) {
    this.isLoading = true;
    this.tableService.availableTables(pageIndex, pageSize,
      {
        restaurant_id:this.data.restaurant.id,
        start_time:this.data.start_time,
        duration: Number(this.data.duration),
        date:this.data.date,
        people_count:this.data.peopleCount
      }
    ).subscribe(
      (response: ResponseModel<TableModel>) => {
        this.isLoading = false;
        this.tables = response.list;
        this.totalCount = response.total_count;
      }
      , (error) => {
        this.isLoading = false;
      }
    )
  }

  paginate(event: PageEvent) {
    this.getTables(event.pageIndex, event.pageSize);

  }

  reserve() {
    const reservationModel = new ReservationModel(this.data.date,this.data.start_time,
      Number(this.data.duration), this.table)
    this.reservationService.reserve(reservationModel).subscribe(
      () => this.handleResponse(true),
      () => this.handleResponse(false)
    )

  }

  private handleResponse(status) {
    this.dialog.closeAll();
    this.dialog.open(ReservationResponseDialogComponent, {
      width: '600px',
      height: '400px',
      data: {...this.data, status: status}
    });
  }
}
