import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../Services/order.service";
import {MealModel} from "../../Models/meal.model";
import {OrderModel} from "../../Models/order.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private orderService: OrderService) {
  }

  cartItems: MealModel[] = [];
  totalPrice: number = 0;
  cartItemsListener: Subscription;

  ngOnInit(): void {
    this.cartItems = this.orderService.getCartItems();
    this.cartItems.forEach(item => this.totalPrice += item.price* item.count);
    this.cartItemsListener = this.orderService.getCartItemsPublisher().subscribe(
      (cartItems: MealModel[]) => {
        this.cartItems = cartItems
        this.cartItems.forEach(item => this.totalPrice += item.price * item.count)
      }
    );

  }

  onRemove(id: number) {
    this.orderService.remove(id);

  }

  onSubmit() {
    const order: OrderModel = new OrderModel(
      0,
      new Date(),
      "Submitted",
      this.totalPrice
      ,
      this.cartItems
    )
    this.orderService.addOrder(order);

  }

  ngOnDestroy(): void {
    // this.cartItemsListener.unsubscribe();
  }
}
