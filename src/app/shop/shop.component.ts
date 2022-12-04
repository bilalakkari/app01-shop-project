import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { DATA_POST_USER, DATA_POST_USER_FAVOURITES, USER } from '../shared/classes.model';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  p: number = 1;

  user: USER = new USER();
  dataObject: DATA_POST_USER = new DATA_POST_USER();
  favouritesObject: DATA_POST_USER_FAVOURITES = new DATA_POST_USER_FAVOURITES();

  productsList: any;
  filterCategory: any;
  cart_list: any;

  public searchTerm !: string;

  constructor(private api: ApiService, private cookie: CookiesService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.user = Object(this.cookie.getCookie('userInfo'));
    this.api.getProducts()
      .subscribe((res: any) => {
        this.productsList = res;
        console.log(this.productsList);
      })

    this.api.search
      .subscribe((val: any) => {
        this.searchTerm = val;
      })
  }

  post(product: any) {
    if (!this.cookie.getCookie('userInfo')) {
      this.toastr.error("pls log in first")
      return
    }
    console.log(product);
    this.api.getProductCartId(product.product_id, JSON.parse(String(this.user)).ID)
      .subscribe((res: any) => {
        if (res.length) {
          this.api.editProductCart(res[0].id, res[0].quantity + 1)
            .subscribe((res: any) => {
            })
        }
        else {
          this.dataObject.user_id = JSON.parse(String(this.user)).ID;
          this.dataObject.product_id = product.product_id;
          this.dataObject.quantity = 1;
          console.log(this.dataObject);
          this.api.addUserProduct(this.dataObject)
            .subscribe(res => {
              console.log("User has been added successfuly")
            }),
            (err: any) => {
              this.toastr.warning(err)
              console.log(err);
            }
        }
      })
    this.toastr.success("Product has been added")
  }

  wishlish(product: any) {
    if (!this.cookie.getCookie('userInfo')) {
      this.toastr.error("pls log in first")
      return
    }
    this.favouritesObject.user_id = JSON.parse(String(this.user)).ID;
    this.favouritesObject.product_id = product.product_id;

    this.api.getFavouritesProductsUserId(this.favouritesObject.user_id, this.favouritesObject.product_id)
      .subscribe((res: any) => {
        if (res.length) {
          this.toastr.error("This product is already added to your Wishlist")
        }
        else {
          console.log(this.favouritesObject)
          this.toastr.success("Your favorite product has been added :)")
          this.api.favourites(this.favouritesObject)
            .subscribe(res => {
            })
        }
      })
  }

  changeGrid() {
    const x: any = document.getElementsByClassName('productCard')
    for (let index = 0; index < x.length; index++) {
      x[index].classList.toggle('col-lg-3');
      x[index].classList.toggle('col-lg-4');
    }
    console.log(x);
  }

}