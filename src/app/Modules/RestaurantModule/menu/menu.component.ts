import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "../../Services/restaurant-service";
import {MealModel} from "../../Models/meal.model";
import {OrderService} from "../../Services/order.service";
import {ResponseModel} from "../../Models/response.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../Services/auth.service";
import {RestaurantModel} from "../../Models/restaurant.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {


  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService
  ) {
  }

  restaurantName: string;
  restaurantId: number;
  meals: MealModel[] = []
  isLoading: boolean;
  actionLoader: Boolean;
  actionLoaderListener: Subscription;
  totalCount: number;
  pageSize: number = 6;

  searchValue: string = "";

  ngOnInit(): void {
    this.actionLoaderListener = this.orderService.getLoaderPublisher().subscribe(
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
          this.search(0, this.pageSize);
        } else {
          this.restaurantId = restaurantId
          this.search(0, this.pageSize);
          this.restaurantName = restaurantName;
        }
      }
    )
  }

  addToCart(foodModel) {
    if (this.authService.getUser() == null) {
      this.router.navigate(['auth/sign-in'])
      return;
    }
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.addToCart({...foodModel, count: 1, item_id: foodModel.id, id: null})
  }

  ngOnDestroy(): void {
    this.actionLoaderListener.unsubscribe();
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);
  }

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchMeals(this.searchValue, page, pageSize, this.restaurantId).subscribe(
      (response: ResponseModel<MealModel>) => {
        this.isLoading = false;
        this.meals = response.list;
        this.totalCount = response.total_count;
      }
    )
  }

  addRate(id, rate) {
    if (this.authService.getUser() == null) {
      this.router.navigate(['auth/sign-in'])
      return;
    }
    this.restaurantService.addMealRate(id, rate).subscribe(
      ()=>{
        this.toastr.success("Rated Successfully ","");
        this.search(0, this.pageSize);
      },
      (error)=>{
        this.toastr.error(error.message,'Failed To Rate');

      },
    )
  }
}
