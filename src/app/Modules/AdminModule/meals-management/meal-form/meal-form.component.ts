import { Component } from '@angular/core';
import {ManagerService} from "../../../Services/manager.service";

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent {

  constructor(private managerService: ManagerService) {
  }
  image:string;

  onSubmit(meal: any) {
    // const formData: FormData = new FormData();
    // formData.append('image', mealImage.files[0]);
    meal.restaurant_id=1;
    this.managerService.addMeal(meal);

  }
}
