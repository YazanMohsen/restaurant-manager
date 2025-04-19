import {Component, OnInit} from '@angular/core';
import {RestaurantModel} from "../../Models/restaurant.model";
import {RestaurantService} from "../../Services/restaurant-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ResponseModel} from "../../Models/response.model";
import {MealModel} from "../../Models/meal.model";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "./reservation-dialog/reservation-dialog.component";
import {AuthService} from "../../Services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {
  restaurant: RestaurantModel;
  meals: MealModel[] = []
  isLoading: boolean;
  people: number[] = [];
  durations: number[] = [];

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {
    for (let number = 1; number <= 20; number++)
      this.people.push(number);

    for (let number = 1; number <= 6; number++)
      this.durations.push(number);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
       this.getRestaurant(+params["id"]);
      }
    )
  }
  getRestaurant(id:number){
    this.restaurantService.getRestaurant(id).subscribe(
      (response: ResponseModel<RestaurantModel>) => {
        this.restaurant = response.model;
        this.restaurantService.getRestaurantMeals(this.restaurant.id).subscribe(
          (response: ResponseModel<MealModel>) => {
            this.meals = response.list;
            this.isLoading = false;

          }
        )
      }
    )
  }
  addRate(rate: number) {
    if (this.authService.getUser() == null) {
      this.router.navigate(['auth/sign-in'])
      return
    }
    this.restaurantService.addRestaurantRate(this.restaurant.id, rate).subscribe(
      ()=>{
      this.toastr.success("Rated Successfully ","");
      this.getRestaurant(this.restaurant.id);
    },
    (error)=>{
      this.toastr.error(error.message,'Failed To Rate');

    })
  }

  peopleCount: number;
  date: string;
  time: string;
  duration: number;

  setTime(time) {
    this.time = time
  }

  findReservation() {
    if (this.authService.getUser() == null) {
      this.router.navigate(['auth/sign-in'])
      return
    }
    const date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    const timeString = this.time.replace(/(\b\d{1}:\d{2}\b)/, match => '0' + match)+':00';
    // const dateTime = new Date(dateTimeString);
    // const dateValue = this.datepipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss');
    // console.log(dateValue)
    this.dialog.open(ReservationDialogComponent, {
      width: '600px',
      height: '350px',
      data: {
        restaurant: this.restaurant,
        date: date,
        start_time: timeString,
        duration: this.duration,
        peopleCount: this.peopleCount}
    });
  }

}
