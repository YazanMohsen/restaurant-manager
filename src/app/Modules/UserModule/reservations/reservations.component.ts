import {Component} from '@angular/core';
import {OrderService} from "../../Services/order.service";
import {OrderModel} from "../../Models/order.model";
import {ResponseModel} from "../../Models/response.model";
import {ReservationService} from "../../Services/reservation.service";
import {ReservationModel} from "../../Models/reservation.model";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../Services/auth.service";
import {themeMaterial} from "ag-grid-enterprise";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  constructor(
    private authService: AuthService,
    private reservationService: ReservationService) {
  }

  reservations: ReservationModel[] = []
  isLoading: boolean;
  totalCount: number;
  pageSize: number = 6;

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.reservationService.searchReservation(page, pageSize, {user_id: this.authService.getUser().id}).subscribe(
      (response: ResponseModel<ReservationModel>) => {
        this.isLoading = false;
        this.reservations = response.list;
        this.totalCount = response.total_count;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }

  protected readonly themeMaterial = themeMaterial;
}
