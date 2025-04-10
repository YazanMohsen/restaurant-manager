import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../../Services/manager.service";
import {MealModel} from "../../../Models/meal.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ResponseModel} from "../../../Models/response.model";
import {ImageService} from "../../../Services/image.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.css'
})
export class MealFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
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
    this.meal.restaurant_id = this.authService.getUser().restaurant_id;
    this.managerService.saveMeal(this.meal);

  }

  uploadImage($event) {
    this.imageService.upload($event.target.files[0]).subscribe(
      (response:ResponseModel<string>) => {
        this.meal.image = response.model;
        this.toastr.success("","Image Uploaded Successfully");
      },(error)=>{
        this.toastr.error(error.message,"Failed to Upload Image");
      })
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
