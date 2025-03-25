import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../Services/restaurant-service";
import {MealModel} from "../../Models/meal.model";
import {OrderService} from "../../Services/order.service";
import {ResponseModel} from "../../Models/response.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  restaurantName: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService
  ) {
  }

  meals: MealModel[] = []

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        const restaurantId = params['restaurantId'];
        const restaurantName = params['restaurantName'];
        if (!restaurantId) {

          this.restaurantService.getMeals().subscribe(
            (response: ResponseModel<MealModel>) => {
              this.meals = response.list;
            }
          )
        } else {
          this.restaurantService.getRestaurantMeals(restaurantId).subscribe(
            (response: ResponseModel<MealModel>) => {
              this.meals = response.list;
            }
          )
          this.restaurantName=restaurantName;
        }
      }
    )
  }

  addToCart(foodModel) {
    this.orderService.addToCart({...foodModel, count: 1,item_id:foodModel.id,id:null})
  }
}
