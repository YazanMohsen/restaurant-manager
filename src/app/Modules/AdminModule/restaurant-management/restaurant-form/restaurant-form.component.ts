import { Component } from '@angular/core';
import {ManagerService} from "../../../Services/manager.service";

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.css'
})
export class RestaurantFormComponent {

  constructor(private managerService: ManagerService) {
  }

  onSubmit(restaurant: any) {
    this.managerService.addRestaurant(restaurant);

  }
}
