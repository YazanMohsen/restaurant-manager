import {Component, OnInit} from '@angular/core';
import {ResponseModel} from "../../../Models/response.model";
import {RestaurantModel} from "../../../Models/restaurant.model";
import {RestaurantService} from "../../../Services/restaurant-service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrl: './restaurant-management.component.css'
})
export class RestaurantManagementComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {
  }

  restaurants: RestaurantModel[] = []
  searchValue: string = "";
  totalCount: number;
  pageSize: number = 5;
  isLoading: boolean;

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchRestaurants(this.searchValue, page, pageSize).subscribe(
      (response: ResponseModel<RestaurantModel>) => {
        this.isLoading = false;
        this.restaurants = response.list;
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

  reject(restaurant: RestaurantModel) {
    this.restaurantService.delete(restaurant.id).subscribe(
      () => {
        this.search(0, this.pageSize);
      }
    )
  }

  approve(restaurant: RestaurantModel) {
    restaurant.status='Approved';
    this.restaurantService.update(restaurant).subscribe(
      () => {
        this.search(0, this.pageSize);
      }
    )
  }
}
