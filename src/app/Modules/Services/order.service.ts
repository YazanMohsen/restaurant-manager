import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {OrderModel} from "../Models/order.model";
import {HttpService} from "./http.service";
import {OrderStatus} from "../Constants/order-status.enum";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class OrderService {
  orders: OrderModel[] = []
  cart: OrderModel;
  private cartPublisher: Subject<OrderModel> = new Subject<OrderModel>();
  private loaderPublisher: Subject<Boolean> = new Subject<Boolean>();

  constructor(private httpService: HttpService) {
    this.cart = OrderModel.initCart();

  }

  getRemoteCart() {
    return this.httpService.get('orders/status/' + OrderStatus.InCart);
  }

  getCart() {
    this.initCart();
    return this.cartPublisher;
  }

  getLoaderPublisher() {
    return this.loaderPublisher;
  }


  getOrders() {
    return this.httpService.get('orders');
  }

  getOrder(id: number) {
    return this.httpService.get('orders/' + id);
  }

  public initCart() {
    this.getRemoteCart().subscribe(
      (response: any) => {
        this.cart = OrderModel.buildCart(response.list)
        this.cartPublisher.next(this.cart);
      }
    );

  }

  addToCart(cartItem: MealModel) {
    let item = this.cart.order_items.filter((item) => cartItem.item_id == item.item_id)[0];
    if (item) {
      item.count++;
      this.updateOrder();
      return
    }
    this.cart.order_items.push(cartItem);
    this.cart.count += cartItem.count;
    this.cart.total_price += cartItem.price * cartItem.count;
    if (!this.cart.orderId)
      this.addOrder();
    else
      this.updateOrder()
  }

  addOrder() {
    this.httpService.post('orders', this.cart).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
    })
  }

  updateOrder() {
    this.httpService.put('orders/' + this.cart.orderId, this.cart).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
    })
  }

  saveOrder() {
    this.cart.status = OrderStatus.Pending;
    this.updateOrder();
  }

  removeItem(id: number) {
    this.httpService.delete('order-items/' + this.cart.order_items[id].id, this.cart.order_items[id].id).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
    });
  }


  increaseCount(id: number) {
    let cartItem: MealModel = this.cart.order_items[id];
    cartItem.count++;
    this.updateOrder();
  }

  decreaseCount(id: number) {
    let cartItem: MealModel = this.cart.order_items[id];
    if (cartItem.count == 1) return;
    cartItem.count--;
    this.updateOrder();
  }


}
