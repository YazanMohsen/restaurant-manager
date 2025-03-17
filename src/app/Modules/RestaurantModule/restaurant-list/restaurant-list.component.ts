import {Component, OnInit} from '@angular/core';
import {RestaurantModel} from "../../Models/restaurant.model";
import {RestaurantService} from "../../Services/restaurant-service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {
  }

  restaurants: RestaurantModel[] = []

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getRestaurants()
  }


}
