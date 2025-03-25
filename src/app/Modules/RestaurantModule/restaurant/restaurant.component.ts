import {Component, OnInit} from '@angular/core';
import {RestaurantModel} from "../../Models/restaurant.model";
import {RestaurantService} from "../../Services/restaurant-service";
import {ActivatedRoute, Params} from "@angular/router";
import {ResponseModel} from "../../Models/response.model";
import {MealModel} from "../../Models/meal.model";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {
  restaurant: RestaurantModel ;
  meals: MealModel[] = []

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.restaurantService.getRestaurant(+params["id"]).subscribe(
          (response: ResponseModel<RestaurantModel>) => {
            this.restaurant = response.model;
            this.restaurantService.getRestaurantMeals(this.restaurant.id).subscribe(
              (response: ResponseModel<MealModel>) => {
                this.meals = response.list;
              }
            )
          }
        )
      }
    )
  }
}
