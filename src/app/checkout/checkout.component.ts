import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { CHECKOUT, SEND_EMAIL } from '../shared/classes.model';
import { DATA_POST_USER, USER } from '../shared/classes.model';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formValue!: FormGroup;
  userObject: CHECKOUT = new CHECKOUT();

  countriesList: any;
  bloodsList: any;
  checkout: any;

  user: USER = new USER()

  dataObject: DATA_POST_USER = new DATA_POST_USER();

  grandTotal: any;
  addquantity: any;
  removequantity: any;
  productList_card: any

  constructor(private formBuilder: FormBuilder, private api: ApiService, private apiCaller: HttpClient, private cookie: CookiesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.cookie.getCookie('userInfo')) {
      this.user = Object(this.cookie.getCookie('userInfo'));
      this.dataObject.user_id = JSON.parse(String(this.user)).ID
      console.log(this.dataObject.user_id)
    }

    this.formValue = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Street: [''],
      Phone: [''],
      EmailAddress: [''],
      Notes: [''],
    })
  }

  checkoutSendEmail() {
    this.api.getProductCart(this.dataObject.user_id)
      .subscribe((res: any) => {
        this.productList_card = res;

        console.log(this.productList_card)
        this.userObject.FirstName = this.formValue.value.FirstName;
        this.userObject.LastName = this.formValue.value.LastName;
        this.userObject.Street = this.formValue.value.Street;
        this.userObject.Phone = this.formValue.value.Phone;
        this.userObject.EmailAddress = this.formValue.value.EmailAddress;
        this.userObject.Products_Checkout = this.productList_card;
        this.userObject.Notes = this.formValue.value.Notes;
      })

    console.log(this.userObject);

    this.api.checkoutEmail(this.userObject)
      .subscribe(res => {
        this.checkout = res;
      }),
      (err: any) => {
        this.toastr.warning(err)
        console.log(err);
      }
    this.formValue.reset();
  }
}