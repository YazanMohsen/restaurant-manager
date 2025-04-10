import {Injectable} from "@angular/core";
import {MealModel} from "../Models/meal.model";
import {OrderModel} from "../Models/order.model";
import {HttpService} from "./http.service";
import {OrderStatus} from "../Constants/order-status.enum";
import {Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: "root"})
export class OrderService {
  orders: OrderModel[] = []
  cart: OrderModel;
  private cartPublisher: Subject<OrderModel> = new Subject<OrderModel>();
  private loaderPublisher: Subject<Boolean> = new Subject<Boolean>();

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private httpService: HttpService) {
    if (AuthService.getCurrentUser())
      this.initCart();
      // this.cart = OrderModel.initCart();

  }

  // getRemoteCart() {
  //   return this.httpService.get('orders/status/' + OrderStatus.InCart);
  // }

  getRemoteCart() {
    return this.httpService.get('orders/cart')
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

  getUserOrders() {
    return this.httpService.get('orders/by-user');
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
      this.updateOrder(this.cart.orderId, this.cart).subscribe(() => {
        this.toastr.success("Check Your Cart","Added Successfully");
        this.initCart()
        this.loaderPublisher.next(false);
      })
      return
    }
    this.cart.order_items.push(cartItem);
    this.cart.count += cartItem.count;
    this.cart.total_price += cartItem.price * cartItem.count;
    if (!this.cart.orderId)
      this.addOrder();
    else
      this.updateOrder(this.cart.orderId, this.cart).subscribe(() => {
        this.initCart()
        this.loaderPublisher.next(false);
        this.toastr.success("","You Cart Updated Successfully");
      })
  }

  addOrder() {
    this.httpService.post('orders', this.cart).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
      this.toastr.success("Check Your Cart","Added Successfully");
    },(error)=>{
      this.toastr.error(error.message,"Failed to Add to Cart");
      this.loaderPublisher.next(false);
    })
  }

  updateOrder(id: number, order: OrderModel) {
    return this.httpService.put('orders/' + id, order);
  }

  saveOrder() {
    this.cart.status = OrderStatus.Pending;
    this.updateOrder(this.cart.orderId, this.cart).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
      this.toastr.success("Check your Orders","You Order Saved Successfully");
    },(error)=>{
      this.toastr.error(error.message,"Failed to Save Order");
      this.loaderPublisher.next(false);
    })
  }

  removeItem(id: number) {
    this.httpService.delete('order-items', this.cart.order_items[id].id).subscribe(() => {
      this.initCart()
      this.loaderPublisher.next(false);
      this.toastr.success("","You Cart Updated Successfully");
    },(error)=>{
      this.toastr.error(error.message,"Failed to Remove Item");
      this.loaderPublisher.next(false);
    });
  }


  increaseCount(id: number) {
    let cartItem: MealModel = this.cart.order_items[id];
    cartItem.count++;
    this.updateOrder(this.cart.orderId, this.cart).subscribe(() => {
      this.initCart()
      this.toastr.success("","You Cart Updated Successfully");
      this.loaderPublisher.next(false);
    },(error)=>{
      this.toastr.error(error.message,"Failed to Update Cart");
      this.loaderPublisher.next(false);
    })
  }

  decreaseCount(id: number) {
    let cartItem: MealModel = this.cart.order_items[id];
    if (cartItem.count == 1) return;
    cartItem.count--;
    this.updateOrder(this.cart.orderId, this.cart).subscribe(() => {
      this.initCart()
      this.toastr.success("","You Cart Updated Successfully");
      this.loaderPublisher.next(false);
    },(error)=>{
      this.toastr.error(error.message,"Failed to Update Cart");
      this.loaderPublisher.next(false);
    })
  }


  searchOrders(searchValue: string, page: number, pageSize: number,restaurantId:number) {
    return this.httpService.get('orders/search', {name: searchValue, restaurant_id:restaurantId,page: page + 1, per_page: pageSize});
  }
}
