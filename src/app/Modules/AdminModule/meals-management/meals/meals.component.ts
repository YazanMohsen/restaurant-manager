import {Component, OnInit} from '@angular/core';
import {MealModel} from "../../../Models/meal.model";
import {ResponseModel} from "../../../Models/response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantService} from "../../../Services/restaurant-service";
import {OrderService} from "../../../Services/order.service";
import {RestaurantModel} from "../../../Models/restaurant.model";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../../Services/auth.service";
import {themeMaterial} from "ag-grid-enterprise";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private restaurantService: RestaurantService,
  ) {
  }

  meals: MealModel[] = []
  isLoading: boolean;
  totalCount: number;
  pageSize: number = 5;
  searchValue: string = "";

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.restaurantService.searchMeals(this.searchValue, page, pageSize, this.authService.getUser().restaurant_id).subscribe(
      (response: ResponseModel<MealModel>) => {
        this.isLoading = false;
        this.meals = response.list;
        this.totalCount = response.total_count;
      }
    )
  }

  ngOnInit(): void {
    this.search(0, this.pageSize);
  }

  paginate(event: PageEvent) {
    this.search(event.pageIndex, event.pageSize);

  }

  columnDefs = [
    {field: 'id', headerName: '#'},
    {field: 'name', headerName: 'Name'},
    {field: 'description', headerName: 'Description'},
    {
      field: 'image',
      cellRenderer: (params) => `<img src="${params.value}" width="100" height="75" style="border-radius: 5px;"/>`,
      headerName: 'Image',
    },
    {field: 'price', headerName: 'Price'},


  ];
  update (meal)  {
    this.router.navigate(['../add'], {relativeTo: this.activatedRoute, queryParams: {id: meal.data.id}})
  }
  protected readonly themeMaterial = themeMaterial;
}
