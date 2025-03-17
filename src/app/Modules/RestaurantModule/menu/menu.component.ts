import {Component, OnInit} from '@angular/core';
import {RestaurantModel} from "../../Models/restaurant.model";
import {RestaurantService} from "../../Services/restaurant-service";
import {MealModel} from "../../Models/meal.model";
import {OrderService} from "../../Services/order.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{


  constructor(private restaurantService:RestaurantService
  ,private orderService:OrderService
  ) {
  }
  foodModels: MealModel[] = []

  ngOnInit(): void {
    this.foodModels = this.restaurantService.getRestaurantFood(1)
  }

  addToCart(foodModel) {
    this.orderService.addToCart({...foodModel,count:1})
  }
}
