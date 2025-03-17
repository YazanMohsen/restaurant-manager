import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {OrderModel} from "../Models/order.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class OrderService {

  cartItems: MealModel[] = []
  orders: OrderModel[] = []
  cartItemPublisher: Subject<MealModel[]> = new Subject<MealModel[]>();

  addToCart(cartItem: MealModel) {
    const item: MealModel = this.cartItems.filter(f => f.name == cartItem.name).pop();
    if (item != null) item.count++;
    else this.cartItems.push(cartItem)
    this.cartItemPublisher.next(this.cartItems.slice());
  }

  getCartItems() {
    return this.cartItems.slice();
  }

  getCartItemsPublisher() {
    return this.cartItemPublisher;
  }

  remove(id: number) {
    this.cartItems.splice(id, 1);
    this.cartItemPublisher.next(this.cartItems.slice());

  }

  getOrders() {
    return this.orders;
  }

  getOrder(id: number) {
    return this.orders[id];
  }

  addOrder(order: OrderModel) {
    this.orders.push(order);
    this.cartItems = [];
    this.cartItemPublisher.next(this.cartItems.slice());
  }

}
