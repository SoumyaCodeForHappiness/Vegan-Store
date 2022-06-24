import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart = [];
  sessionCart = [];
  totalSum = 0;
  constructor(private router: Router,
    private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.sessionCart = JSON.parse(sessionStorage.getItem('cart'));
    if (this.sessionCart === null) {
      this.cart = [];
    } else {
      this.cart = this.sessionCart;
      this.calculateSum(this.sessionCart);
    }

  }

  processCheckout() {
    if (this.cart.length > 0) {
      this.router.navigate(['/shippingForm']);
    } else {
      this._snackBar.open('Cart is empty', 'close');
    }
  }

  removeItem(product) {
    this.cart = this.sessionCart.filter(obj => obj.id !== product.id);
    this.calculateSum(this.cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  calculateSum(cart) {
    this.totalSum = cart.reduce((acc, curValue) => {
      return acc + curValue.price;
    }, 0)
  }

}
