import {RestaurantModel} from "../Models/restaurant.model";
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";

@Injectable({providedIn: "root"})
export class RestaurantService {
  constructor(private httpService: HttpService) {
  }

  getRestaurant(id: number) {
    return this.httpService.get('restaurants/' + id);
  }

  getRestaurants() {
    return this.httpService.get('restaurants/');
  }

  getRestaurantMeals(restaurantId: number) {
    return this.httpService.get('items/restaurant/' + restaurantId);
  }
  getItemsOrders(restaurantId: number) {
    return this.httpService.get('items/items-orders/'+restaurantId);
  }

  searchRestaurants(searchValue: string, page?: number, pageSize?: number) {
    return this.httpService.get('restaurants/search', {name: searchValue, page: page + 1, per_page: pageSize});

  }

  searchMeals(searchValue: string, page: number, pageSize: number, restaurantId?: number) {
    let searchBody = {name: searchValue, page: page + 1, per_page: pageSize}
    if (restaurantId)
      searchBody['restaurant_id'] = restaurantId;
    return this.httpService.get('items/search', searchBody);
    // return this.getMeals();
  }

  delete(id) {
    return this.httpService.delete("restaurants", id);
  }

  update(restaurant: RestaurantModel) {
    return this.httpService.put("restaurants/" + restaurant.id, restaurant);
  }

  addRestaurantRate(restaurantId, ratingValue) {
    let rating = {
      // user_id:1,
      // rateable_type:"restaurant",
      rateable_id: restaurantId,
      rating: ratingValue
    }
    return this.httpService.post("ratings/restaurant", rating);
  }

  addMealRate(mealId, ratingValue) {
    let rating = {
      // user_id:1,
      // rateable_type:"App\\Models\\Item",
      rateable_id: mealId,
      rating: ratingValue
    }
    return this.httpService.post("ratings/item", rating);
  }

}
