import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../Services/order.service";
import {OrderModel} from "../../Models/order.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit ,OnDestroy{
  constructor(
    private orderService: OrderService) {
  }

  cart: OrderModel;
  isLoading: Boolean = true;
  actionLoader: Boolean;
  actionLoaderListener: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.actionLoaderListener= this.orderService.getLoaderPublisher().subscribe(
      (loading) => {
        this.actionLoader = loading;
      }
    )
    this.orderService.getCart().subscribe(
      (cart: OrderModel) => {
        this.cart = cart
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.saveOrder();
  }


  onRemove(id: number) {
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.removeItem(id);
  }


  increaseCount(id: number) {
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.increaseCount(id);

  }

  decreaseCount(id: number) {
    this.orderService.getLoaderPublisher().next(true);
    this.orderService.decreaseCount(id);

  }  ngOnDestroy(): void {
    this.actionLoaderListener.unsubscribe();
  }

}
