import {Component} from '@angular/core';
import {ManagerService} from "../../../Services/manager.service";
import {ResponseModel} from "../../../Models/response.model";
import {ImageService} from "../../../Services/image.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFormComponent {
  profileImage: string;
  coverImage: string;

  constructor(
    private toastr: ToastrService,
    private imageService: ImageService,
    private managerService: ManagerService) {
  }

  onSubmit(restaurant: any) {
    restaurant.profile_image = this.profileImage;
    restaurant.cover_image = this.coverImage;
    restaurant.status = 'Pending';
    this.managerService.addRestaurant(restaurant);

  }

  uploadProfileImage($event) {
    this.imageService.upload($event.target.files[0]).subscribe(
      (response: ResponseModel<string>) => {
        this.profileImage = response.model;
        this.toastr.success("","Image Uploaded Successfully");
      },(error)=>{
        this.toastr.error(error.message,"Failed to Upload Image");
      })
  }

  uploadCoverImage($event) {
    this.imageService.upload($event.target.files[0]).subscribe(
      (response: ResponseModel<string>) => {
        this.coverImage = response.model;
        this.toastr.success("","Image Uploaded Successfully");
      },(error)=>{
        this.toastr.error(error.message,"Failed to Upload Image");
      })
  }
}
