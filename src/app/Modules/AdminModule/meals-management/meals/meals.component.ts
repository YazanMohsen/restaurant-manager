import {Component} from '@angular/core';
import {MealModel} from "../../../Models/meal.model";
import {ResponseModel} from "../../../Models/response.model";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../../Services/restaurant-service";
import {OrderService} from "../../../Services/order.service";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {
  constructor(
    private restaurantService: RestaurantService,
  ) {
  }

  meals: MealModel[] = []
  isLoading: boolean;

  ngOnInit() {

    this.restaurantService.getMeals().subscribe(
      (response: ResponseModel<MealModel>) => {
        this.meals = response.list;
        this.isLoading = false;
      }
    )
  }
}
