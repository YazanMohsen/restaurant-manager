import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {TableModel} from "../Models/table.model";

@Injectable({providedIn: "root"})
export class TableService {

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private httpService: HttpService) {
  }

  private loaderPublisher: Subject<Boolean> = new Subject<Boolean>();


  searchTables(page: number, pageSize: number, restaurantId: number, capacity?) {
    let request = {restaurant_id: restaurantId, page: page + 1, per_page: pageSize}
    if (capacity)
      request['capacity'] = capacity
    return this.httpService.get('tables/search', request);
  }
  availableTables(page: number, pageSize: number,reservationModel?: any) {
    const request = {
      page: (page + 1).toString(),
      per_page: pageSize.toString(),
      ...reservationModel // Spread the model directly into the params
    };
    return this.httpService.get('tables/available', request);
  }

  saveTable(table: TableModel) {
    return this.httpService.post('tables', table);

  }

  updateTable(table: TableModel) {
    return this.httpService.put('tables/' + table.id, table).subscribe(() => {
      this.toastr.success("", "Table Updated Successfully");
      this.loaderPublisher.next(false);
    }, (error) => {
      this.toastr.error(error.message, "Failed to Update Table");
      this.loaderPublisher.next(false);
    })

  }
}
