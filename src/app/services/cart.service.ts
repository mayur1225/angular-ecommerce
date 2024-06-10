import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}
  addToCart(cartItem: CartItem) {
    // Ensure the cartItem has the necessary properties
    if (!cartItem || !cartItem.id) {
      console.error("Invalid cart item:", cartItem);
      return;
    }

    let existingCartItem = this.cartItem.find(
      (item) => item.id === cartItem.id
    );

    if (existingCartItem) {
      // Increment the quantity
      existingCartItem.quantity += cartItem.quantity;
    } else {
      // Add the item to the array
      this.cartItem.push({ ...cartItem, quantity: cartItem.quantity || 1 });
    }

    // Compute cart total price and total quantity
    this.computeCartTotals();
  }

  private computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItem) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
      
    }
    // Publish the new values, all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
