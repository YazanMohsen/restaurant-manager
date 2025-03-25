import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../Services/order.service";
import {OrderModel} from "../../Models/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private orderService: OrderService) {
  }

  cart: OrderModel;
  isLoading: Boolean = true;


  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getCart().subscribe(
      (cart: OrderModel) => {
        this.cart = cart
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    this.orderService.saveOrder();
  }


  onRemove(id: number) {
    this.orderService.removeItem(id);
  }


  increaseCount(id: number) {
    this.orderService.increaseCount(id);

  }

  decreaseCount(id: number) {
    this.orderService.decreaseCount(id);

  }

}
