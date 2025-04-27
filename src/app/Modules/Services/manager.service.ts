import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {HttpService} from "./http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: "root"})
export class ManagerService {

  constructor(
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService) {

  }

  addMeal(meal: any) {
    this.httpService.post('items', meal).subscribe(() => {
        this.router.navigate(['/admin/restaurant-manager/meals/all']);
        this.toastr.success("", "Meal Added Successfully");
      }, (error) => {
        this.toastr.error(error.message, "Failed to Add Meal");
      }
    )
  }

  addRestaurant(restaurant: any) {
    this.httpService.post('restaurants', restaurant).subscribe(() => {
        this.toastr.success("Wait for Admin Approve", "Registered Successfully");
      }, (error) => {
        this.toastr.error(error, "Failed Register Restaurant");
      }
    );
  }


  updateMeal(meal: any) {
    this.httpService.put('items/' + meal.id, meal).subscribe(() => {
      this.router.navigate(['/admin/restaurant-manager/meals/all']);
        this.toastr.success("", "Meal Updated Successfully");
    }, (error) => {
      this.toastr.error(error.message, "Failed to Update Meal");
      }

    );
  }

  getMeal(mealId: number) {
    return this.httpService.get('items/' + mealId);
  }

  saveMeal(meal: MealModel) {
    if (meal.id)
      this.updateMeal(meal);
    else
      this.addMeal(meal)
  }
}
