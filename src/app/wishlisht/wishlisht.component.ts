import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DATA_POST_USER_FAVOURITES, USER } from '../shared/classes.model';
import { CookiesService } from '../shared/cookies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlisht',
  templateUrl: './wishlisht.component.html',
  styleUrls: ['./wishlisht.component.css']
})
export class WishlishtComponent implements OnInit {

  user: USER = new USER();

  dataObject: DATA_POST_USER_FAVOURITES = new DATA_POST_USER_FAVOURITES();

  favouriteData: any;

  constructor(public api: ApiService, public cookie: CookiesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    if (this.cookie.getCookie('userInfo')) {
      this.user = Object(this.cookie.getCookie('userInfo'));
      this.dataObject.user_id = JSON.parse(String(this.user)).ID

      this.getFavouritesProducts();
    }
  }

  getFavouritesProducts() {
    this.api.getFavouritesProducts(this.dataObject.user_id)
      .subscribe(res => {
        this.favouriteData = res;
        console.log(this.favouriteData)
      })
  }

  delete(data: any) {
    this.api.removeFavouriteProduct(data.product_id)
      .subscribe(res => {
        this.getFavouritesProducts();
      })
    this.toastr.info("This Product has been deleted")
  }

}
