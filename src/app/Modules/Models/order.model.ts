import {MealModel} from "./meal.model";

export class OrderModel {
  constructor(public id: number, public date: Date, public status: string, public totalPrice: number, public orderItems: MealModel[]) {
  }
}
