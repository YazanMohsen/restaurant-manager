import {Component, OnInit} from '@angular/core';
import {RestaurantModel} from "../../Models/restaurant.model";
import {RestaurantService} from "../../Services/restaurant-service";
import {ResponseModel} from "../../Models/response.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {
  }

  restaurants: RestaurantModel[] = []
  searchValue: string = "";
  totalCount: number;
  pageSize: number = 5;
  isLoading: boolean;

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchRestaurants(this.searchValue, page, pageSize).subscribe(
      (response: ResponseModel<RestaurantModel>) => {
        this.isLoading = false;
        this.restaurants = response.list;
        this.totalCount = 10;
      }
    )
  }


}
