import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {TableModel} from "../Models/table.model";
import {ReservationModel} from "../Models/reservation.model";

@Injectable({providedIn: "root"})
export class ReservationService {

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private httpService: HttpService) {
  }


  searchReservation(page: number, pageSize: number, reservationModel?: any) {
    const params = {
      page: (page + 1).toString(),
      per_page: pageSize.toString(),
      ...reservationModel // Spread the model directly into the params
    };
    return this.httpService.get('reservations/search', params);
  }

  reservationsByTableId(page: number, pageSize: number, $tableId: number) {
    const params = {
      // page: (page + 1).toString(),
      // per_page: pageSize.toString(),
    };
    return this.httpService.get('reservations/table/' + $tableId);
  }

  reserve(reservation: ReservationModel) {
    return this.httpService.post('reservations', reservation);

  }

}
