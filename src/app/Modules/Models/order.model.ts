import {MealModel} from "./meal.model";
import {OrderStatus} from "../Constants/order-status.enum";

export class OrderModel {
  constructor(public user_id: number,
              public status: string,
              public count: number,
              public total_price: number,
              public order_items: MealModel[],
              public orderId?: string,
              public created_at?: string,
  ) {
  }

  static initCart() {
    return new OrderModel(
      1,
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
