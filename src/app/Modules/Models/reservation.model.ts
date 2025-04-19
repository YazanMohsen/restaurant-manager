import {RestaurantModel} from "./restaurant.model";
import {UserModel} from "./user.model";

export class ReservationModel {
  constructor(
    public date?: string,
    public start_time?: string,
    public duration?: number,
    public table_id?: number,
    public user_id?: number,
    public id?: number,
    public end_time?: string,
    public restaurant?: RestaurantModel,
    public user?:any,
    public table?:any,
    public status?:any,
    public restaurant_id?: number,
    public people_count?: number,

  ) {
  }
}
