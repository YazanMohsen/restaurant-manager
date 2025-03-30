import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {HttpService} from "./http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class ManagerService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService) {

  }

  addMeal(meal: any) {
    this.httpService.post('items', meal).subscribe(() => {
      this.router.navigate(['/admin/restaurant-manager/meals/all']);
      }
    )
  }

  addRestaurant(restaurant: any) {
    this.httpService.post('restaurants', restaurant).subscribe(() => {
    });
  }

  updateRestaurant(restaurant: any) {
    this.httpService.put('restaurants', restaurant).subscribe(() => {
    });
  }

  updateMeal(meal: any) {
    this.httpService.put('items/' + meal.id, meal).subscribe(() => {
      this.router.navigate(['/admin/restaurant-manager/meals/all']);
    });
  }

  getMeal(mealId: number) {
    return this.httpService.get('items/' + mealId);
  }

  saveMeal(meal: MealModel) {
    if (meal.id)
      this.updateMeal(meal);
    else
      this.addMeal(meal)
    // this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
