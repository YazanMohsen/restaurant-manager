import {Component, Input} from '@angular/core';
import {RestaurantModel} from "../../restaurant.model";

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.css'
})
export class RestaurantItemComponent {
  @Input() restaurant: RestaurantModel;
  @Input() id:number;

}
