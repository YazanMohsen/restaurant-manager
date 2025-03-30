import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../../Services/manager.service";
import {MealModel} from "../../../Models/meal.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ResponseModel} from "../../../Models/response.model";
import {ImageService} from "../../../Services/image.service";

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService,
    private imageService: ImageService,
  ) {
  }

  isLoading: boolean;
  image: string;
  meal: MealModel = new MealModel(null, null, null, null, null);

  onSubmit() {
    this.meal.restaurant_id = 1;
    this.managerService.saveMeal(this.meal);

  }

  uploadImage($event) {
    this.imageService.upload($event.target.files[0]).subscribe(
      (response:ResponseModel<string>) => {
        this.meal.image = response.model;
      }
    )
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (!params["id"]) {
          this.isLoading = false;
          return;
        }
        this.managerService.getMeal(+params["id"]).subscribe(
          (response: ResponseModel<MealModel>) => {
            this.meal = response.model
            this.isLoading = false;
          }
        );
      }
    )
  }
}
