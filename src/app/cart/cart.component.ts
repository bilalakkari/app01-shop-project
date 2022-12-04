import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { DATA_POST_USER, USER } from '../shared/classes.model';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: USER = new USER()

  dataObject: DATA_POST_USER = new DATA_POST_USER();

  grandTotal: any;
  addquantity: any;
  removequantity: any;
  productList_card: any;

  constructor(public api: ApiService, public cookie: CookiesService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.cookie.getCookie('userInfo')) {
      this.user = Object(this.cookie.getCookie('userInfo'));
      this.dataObject.user_id = JSON.parse(String(this.user)).ID
      this.getProducts();
      console.log(this.dataObject.user_id)
    }
  }

  getProducts() {
    this.api.getProductCart(this.dataObject.user_id)
      .subscribe(res => {
        this.productList_card = res;
      })
  }

  removeItem(item: any) {
    this.api.removeproduct_cart(item.id)
      .subscribe((res: any) => {
        this.getProducts();
        this.toastr.warning("Deleted Successfuly")
      })
  }

  addQuantity(item: any) {
    item.quantity += 1;
    this.api.addQuantity(item.id, item.quantity)
      .subscribe((res: any) => {
        this.addquantity = res;
      })
  }

  removeQuantity(item: any) {
    item.quantity -= 1;
    this.api.removeQuantity(item.id, item.quantity)
      .subscribe((res: any) => {
        this.addquantity = res;
      })

    if (item.quantity == 0) {
      this.api.removeproduct_cart(item.id)
        .subscribe((res: any) => {
          this.getProducts();
          this.toastr.warning("Deleted Successfuly")
        })
    }
  }

  deleteAll() {
    this.api.deleteAllItemsCart(this.dataObject.user_id)
      .subscribe(res => {
        this.getProducts();
      })
  }

}