import {RestaurantModel} from "../Models/restaurant.model";
import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {HttpService} from "./http.service";
import {ResponseModel} from "../Models/response.model";

@Injectable({providedIn: "root"})
export class RestaurantService {
  constructor(private httpService: HttpService) {
  }

  getRestaurants() {
    return this.httpService.get('restaurants');

  }

  getRestaurant(id: number) {
    return this.httpService.get('restaurants/' + id);
  }

  getMeals() {
    return this.httpService.get('items');
  }

  getRestaurantMeals(restaurantId: number) {
    return this.httpService.get('items/restaurant/' + restaurantId);
  }

  searchRestaurants(searchValue: string, page?: number, pageSize?: number) {
    return this.httpService.get('restaurants/search', {name: searchValue, page: page + 1, per_page: pageSize});

  }

  searchMeals(searchValue: string, page: number, pageSize: number) {
    return this.getMeals();
  }

  delete(id) {
    return this.httpService.delete("restaurants", id);
  }

  update(restaurant: RestaurantModel) {
    return this.httpService.put("restaurants/" + restaurant.id, restaurant);
  }
}
