import {MealModel} from "./meal.model";

export class RestaurantModel {
  constructor(public id,
              public name,
              public profile_image,
              public cover_image,
              public location,
              public mobile_number,
              public time,
              public avg_rate,
              public description?,
              public status?,
              public email?,
              public password?,
              public user_rating?
  ) {
  }
}
