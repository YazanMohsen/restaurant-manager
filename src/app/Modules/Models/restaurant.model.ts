import {MealModel} from "./meal.model";

export class RestaurantModel {
  constructor(public id, public name, public image, public location, public time, public description?,public specialDishes?: MealModel[]) {
  }
}
