import {Component} from '@angular/core';
import {themeMaterial} from "ag-grid-enterprise";
import {ResponseModel} from "../../Models/response.model";
import {ReservationModel} from "../../Models/reservation.model";
import {PageEvent} from "@angular/material/paginator";
import {ReservationService} from "../../Services/reservation.service";
import {ToastrService} from "ngx-toastr";
import {StatusComponent} from "./status/status.component";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrl: './reservation-management.component.css'
})
export class ReservationManagementComponent {

  protected readonly themeMaterial = themeMaterial;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private reservationService: ReservationService) {
  }

  reservations: ReservationModel[] = [];
  isLoading: boolean = false;
  totalCount: number;
  pageSize: number = 5;
  currentPage: number ;

  ngOnInit(): void {
    this.reservationService.getReservationPublisher().subscribe(
      () => this.search(this.currentPage, this.pageSize)
    )
    this.search(0, this.pageSize)
  }

  paginate(event: PageEvent) {
    this.currentPage=event.pageIndex;
    this.search(event.pageIndex, event.pageSize);

  }

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.reservationService.searchReservation(page, pageSize, {restaurant_id: this.authService.getUser().restaurant_id}).subscribe(
      (response: ResponseModel<ReservationModel>) => {
        this.isLoading = false;
        this.reservations = response.list;
        this.totalCount = response.total_count;
        console.log(this.reservations);
      }
      , (error) => {
        this.toastr.error(error.message, "Failed to Fetch Reservations");
        this.isLoading = false;
      }
    )
  }


  columnDefs = [
    {field: 'user.name', headerName: 'Client'},
    {field: 'date', headerName: 'Date'},
    {field: 'start_time', headerName: 'Start Time'},
    {field: 'end_time', headerName: 'End Time'},
    {field: 'table.number', headerName: 'Table Number'},
    {
      field: '',
      cellRendererSelector: params => {
        return {
          component: StatusComponent,
        };
      },
      headerName: 'Status'
    },
  ];
}
