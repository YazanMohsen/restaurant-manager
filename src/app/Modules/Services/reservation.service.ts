import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {ReservationModel} from "../Models/reservation.model";
import {Subject, tap} from "rxjs";
import {OrderModel} from "../Models/order.model";

@Injectable({providedIn: "root"})
export class ReservationService {
  private reservationPublisher: Subject<boolean> = new Subject<boolean>();

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private httpService: HttpService) {
  }

  getReservationPublisher() {
    return this.reservationPublisher;
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

  update(id: number, reservation: any) {
    return this.httpService.put('reservations/' + id, reservation).pipe(
      tap(
        () => this.reservationPublisher.next(true)
      ));

  }

}
