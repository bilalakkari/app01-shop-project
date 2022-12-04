import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { ADD_COMMENT, DATA_POST_USER, USER } from '../shared/classes.model';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  pageTitle = 'Product Detail';
  errorMessage = '';
  product: any;
  allComments: any;

  user: USER = new USER();
  dataObject: DATA_POST_USER = new DATA_POST_USER();
  commentObject: ADD_COMMENT = new ADD_COMMENT();

  productsList: any;
  filterCategory: any;
  cart_list: any;
  commentsList: any;

  formComment !: FormGroup
  ratio: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService, private toastr: ToastrService, private cookie: CookiesService) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.user = Object(this.cookie.getCookie('userInfo'));
    const product_id = this.route.snapshot.paramMap.get('product_id');
    if (product_id) {
      this.getProduct(product_id);
      this.api.getComments(product_id)
        .subscribe((res: any) => {
          this.allComments = res;
          console.log("dsdsa", res);
        });
    }

    this.formComment = this.formBuilder.group({
      comment_text: [''],
      stars: [''],
    })


  }

  addComment(product: any) {
    if (!this.cookie.getCookie('userInfo')) {
      this.toastr.error("pls log in first")
      return
    }
    this.commentObject.comment_text = this.formComment.value.comment_text;
    this.commentObject.product_id = product.product_id;
    this.commentObject.stars = this.formComment.value.stars;
    this.commentObject.user_id = JSON.parse(String(this.user)).ID;

    console.log(this.commentObject);
    this.api.addComments(this.commentObject)
      .subscribe(res => {
        this.toastr.success("Your Comment has been Added");
        window.location.reload();
      })

  }

  getProduct(product_id: any) {
    console.log(product_id)
    this.api.getProduct(product_id)
      .subscribe((res: any) => {
        this.product = res[0];
        // console.log(res);
        console.log("Product: ", this.product);
      });
  }

  addToCart(product: any) {
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

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
