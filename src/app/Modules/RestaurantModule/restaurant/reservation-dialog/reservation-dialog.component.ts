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
  durations: number[] = [];

  constructor(
    private dialog: MatDialog,
    private tableService: TableService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    for (let number = 1; number <= 6; number++)
      this.durations.push(number);
  }

  ngOnInit(): void {
    this.getTables(0, this.pageSize);
  }

  tables: TableModel[] = [];
  totalCount: number;
  pageSize: number = 5;
  duration: number;
  table: number;

  private getTables(pageIndex, pageSize) {
    this.isLoading = true;
    this.tableService.searchTables(pageIndex, pageSize, this.data.restaurant.id, this.data.peopleCount).subscribe(
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
    const reservationModel = new ReservationModel(this.data.date,this.data.start_time,  Number(this.duration), this.table)
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
