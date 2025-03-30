import {Component, OnInit} from '@angular/core';
import {MealModel} from "../../../Models/meal.model";
import {ResponseModel} from "../../../Models/response.model";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../../Services/restaurant-service";
import {OrderService} from "../../../Services/order.service";
import {RestaurantModel} from "../../../Models/restaurant.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
  ) {
  }

  meals: MealModel[] = []
  isLoading: boolean;
  totalCount: number;
  pageSize: number = 5;
  searchValue: string = "";

  // ngOnInit() {
  //
  //   this.restaurantService.getMeals().subscribe(
  //     (response: ResponseModel<MealModel>) => {
  //       this.meals = response.list;
  //       this.isLoading = false;
  //     }
  //   )
  // }
  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchMeals(this.searchValue, page, pageSize).subscribe(
      (response: ResponseModel<MealModel>) => {
        this.isLoading = false;
        this.meals = response.list;
        this.totalCount = 20;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }
  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }
}
