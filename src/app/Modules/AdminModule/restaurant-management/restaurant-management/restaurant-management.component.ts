import {Component, OnInit} from '@angular/core';
import {ResponseModel} from "../../../Models/response.model";
import {RestaurantModel} from "../../../Models/restaurant.model";
import {RestaurantService} from "../../../Services/restaurant-service";
import {PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {RestaurantDialogComponent} from "./restaurant-dialog/restaurant-dialog.component";

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrl: './restaurant-management.component.css'
})
export class RestaurantManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private restaurantService: RestaurantService) {
  }

  restaurants: RestaurantModel[] = []
  searchValue: string = "";
  totalCount: number;
  pageSize: number = 5;
  currentPage: number ;
  isLoading: boolean;

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchRestaurants(this.searchValue, page, pageSize).subscribe(
      (response: ResponseModel<RestaurantModel>) => {
        this.isLoading = false;
        this.restaurants = response.list;
        this.totalCount = response.total_count;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.currentPage=event.pageIndex;
    this.search(event.pageIndex, event.pageSize);

  }

  reject(restaurant: RestaurantModel) {
    this.restaurantService.delete(restaurant.id).subscribe(
      () => {
        this.search(this.currentPage, this.pageSize);
        this.toastr.success(restaurant.name + " is Rejected", "Rejected Successfully")
      }, (error) => {
        this.toastr.error(error.message, "Failed to Reject")

      }
    )
  }

  openDialog(restaurant:RestaurantModel): void {
    const dialogRef = this.dialog.open(RestaurantDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        restaurant.email=result.email;
        restaurant.password=result.password;
        this.approve(restaurant);
      }
    });
  }

  approve(restaurant: RestaurantModel) {
    restaurant.status = 'Approved';
    this.restaurantService.update(restaurant).subscribe(
      () => {
        this.search(this.currentPage, this.pageSize);
        this.toastr.success(restaurant.name + " is Approved", "Approved Successfully")
      }, (error) => {
        this.toastr.error(error.message, "Failed to Approve")
      }
    )
  }
}
