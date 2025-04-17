import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  stars = [1, 2, 3, 4, 5];
  @Input() rating = 0; // Final rating selected by the user
  @Input() type = "";
  hoverRating = 0; // Current hover state
  rate(value: number) {
    this.rating = value;
    this.emitRating()
  }

  hover(value: number) {
    this.hoverRating = value;
  }

  @Output() restaurantRating= new EventEmitter<number>();
  @Output() mealRating= new EventEmitter<number>();

  emitRating() {
    if (this.type == "restaurant")
      this.restaurantRating.emit(this.rating);
    if (this.type == "meal")
      this.mealRating.emit(this.rating );
  }
}
