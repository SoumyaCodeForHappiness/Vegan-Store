import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  cart = [];
  productList: any;
  panelOpenState = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  selectedSortByPrice: any;
  selectedSortByAlphabet: any;
  totalProducts = [];
  filterBox = [];
  searchProduct = '';
  routeParamsObj = {};
  priceArr: any = [
    { value: 'LH', viewValue: 'Low - High' },
    { value: 'HL', viewValue: 'High - Low' }
  ];
  alphabetArr: any = [
    { value: 'AZ', viewValue: 'Ascending (A-Z)' },
    { value: 'ZA', viewValue: 'Descending (Z-A)' }
  ];
  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get('../../assets/data/product.json').subscribe(data => {
      const response: any = data;
      this.totalProducts = response.products;
      this.productList = this.totalProducts;
      this.route.queryParams.subscribe(params => {
        this.routeParamsObj['category'] = params.category;
        this.routeParamsObj['value'] = params.value === 'true' ? true : false;
        this.changeInCategory(this.routeParamsObj['category'], this.routeParamsObj['value']);
      })
    });
    this.sessionCart();
    
  }

  sessionCart() {
    let sessionCart = JSON.parse(sessionStorage.getItem('cart'));
    if (sessionCart === null) {
      this.cart = [];
    } else {
      this.cart = sessionCart;
    }
  }

  addToCart(product) {
    if (product.quantity === 0) {
      this._snackBar.open('Please increment the quantity', 'close');
    } else {
      if (this.cart.length === 0) {
        this.mapProduct(product);
      } else {
        const mapIndex = this.cart.findIndex(obj => obj.id === product.id);
        if (mapIndex !== -1) {
          this.cart[mapIndex].quantity = product.quantity;
          this.cart[mapIndex].price = product.selling_price * product.quantity;
        } else {
          this.mapProduct(product);
        }
      }
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  mapProduct(product) {
    this.cart.push({
      name: product.name,
      id: product.id,
      image: product.image,
      price: product.selling_price * product.quantity,
      quantity: product.quantity,
      selling_price: product.selling_price,
      category: product.category
    });
  }

  changeinSortBy(sortBy) {
    switch (sortBy) {
      case 'LH':
        this.productList = this.totalProducts.sort((a, b) => a.selling_price - b.selling_price);
        break;
      case 'HL':
        this.productList = this.totalProducts.sort((a, b) => b.selling_price - a.selling_price);
        break;
      case 'AZ':
        this.productList = this.totalProducts.sort(this.sortByName('name', 'asc'));
        break;
      case 'ZA':
        this.productList = this.totalProducts.sort(this.sortByName('name', 'desc'));
        break;
    }

  }

  sortByName(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  changeInCategory(category, value) {
    if (value === true) {
      this.filterBox.push(category);
    } else {
      this.removeItem(this.filterBox, category);
    }
    this.updateProducts(this.filterBox);
  }

  updateProducts(arr) {
    if (arr.length === 0) {
      this.productList = this.totalProducts;
    } else {
      this.productList = this.totalProducts.filter(item => arr.includes(item.category));
    }
  }

  removeItem(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  findProduct() {
    console.log(this.searchProduct);
    this.productList = this.totalProducts.filter(item => {
      const check = item.name.toLowerCase();
      return check.includes(this.searchProduct.toLowerCase());
    });
  }
  routeToHome() {
    this.router.navigate(['/home']);
  }

  goToCheckout() {
    const dialogRef = this.dialog.open(CheckoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.sessionCart();
      // let filterproductList = this.totalProducts.filter(product => this.cart.includes(product.name));
      // console.log(filterproductList);
    });
  }

  decrementQuantity(product) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  incrementQuantity(product) {
    if (product.quantity < 4) {
      product.quantity++;
    }
  }

}
