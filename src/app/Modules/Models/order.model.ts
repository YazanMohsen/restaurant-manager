import {MealModel} from "./meal.model";
import {OrderStatus} from "../Constants/order-status.enum";
import {AuthService} from "../Services/auth.service";
import {UserModel} from "./user.model";

export class OrderModel {
  constructor(public user_id: number,
              public status: string,
              public count: number,
              public total_price: number,
              public order_items: MealModel[],
              public orderId?: number,
              public created_at?: string,
              public id?: number,
              public user?: UserModel,
              public customer_phone_number?: string,
              public customer_location?: string,
  ) {
  }

  static initCart() {
    return new OrderModel(
      AuthService.getCurrentUser().id,
      OrderStatus.InCart,
      0,
      0,
      [],
      null,
      null,

    )
  }

  static buildCart(remoteCarts: any) {
    let cart: OrderModel;


    if (remoteCarts.length == 0)
      return this.initCart();
    else {
      let remoteCart = remoteCarts[0];
      cart = new OrderModel(
        remoteCart.user_id,
        remoteCart.status,
        remoteCart.count,
        remoteCart.total_price,
        remoteCart.order_items,
        remoteCart.id,
        remoteCart.created_at,
      );

    }
    return cart;
  }
}
