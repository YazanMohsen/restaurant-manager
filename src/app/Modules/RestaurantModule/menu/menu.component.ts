import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../Services/restaurant-service";
import {MealModel} from "../../Models/meal.model";
import {OrderService} from "../../Services/order.service";
import {ResponseModel} from "../../Models/response.model";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit ,OnDestroy{


  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService
  ) {
  }

  restaurantName: string;
  meals: MealModel[] = []
  isLoading: boolean;
  actionLoader: Boolean;
  actionLoaderListener: Subscription;

  ngOnInit(): void {
    this.actionLoaderListener= this.orderService.getLoaderPublisher().subscribe(
      (loading) => {
        this.actionLoader = loading;
      }
    )
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        const restaurantId = params['restaurantId'];
        const restaurantName = params['restaurantName'];
        if (!restaurantId) {

          this.restaurantService.getMeals().subscribe(
            (response: ResponseModel<MealModel>) => {
              this.meals = response.list;
              this.isLoading = false;
            }
          )
        } else {
          this.restaurantService.getRestaurantMeals(restaurantId).subscribe(
            (response: ResponseModel<MealModel>) => {
              this.meals = response.list;
              this.isLoading = false;
            }
          )
          this.restaurantName = restaurantName;
        }
      }
    )
  }

  addToCart(foodModel) {
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.addToCart({...foodModel, count: 1, item_id: foodModel.id, id: null})
  }

  ngOnDestroy(): void {
    this.actionLoaderListener.unsubscribe();
  }
}
