import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from "../restaurant.model";
import {RestaurantService} from "../restaurant-service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit{
  restaurant:RestaurantModel;
  constructor(
    private restaurantService:RestaurantService,
    private route:ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.restaurant = this.restaurantService.getRestaurant(+params["id"])
      }
    )
  }
}
