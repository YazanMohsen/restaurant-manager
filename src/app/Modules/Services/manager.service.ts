import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {OrderModel} from "../Models/order.model";
import {HttpService} from "./http.service";
import {OrderStatus} from "../Constants/order-status.enum";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class ManagerService {

  constructor(private httpService: HttpService) {

  }

  addMeal(meal: any) {
    this.httpService.post('items', meal).subscribe(() => {
      }
    )
  }

  addRestaurant(restaurant: any) {
    this.httpService.post('restaurants', restaurant).subscribe(() => {
    });
  }
  updateRestaurant(restaurant: any) {
    this.httpService.put('restaurants', restaurant).subscribe(() => {
    });
  }

}
