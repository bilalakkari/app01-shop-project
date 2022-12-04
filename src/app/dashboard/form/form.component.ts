import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADD_CATEGORY, DATA_POST_PRODUCT } from 'src/app/shared/classes.model';
import { ApiService } from 'src/app/shared/api.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  filterTerm!: string;

  formProduct!: FormGroup;
  formCategory!: FormGroup;

  userObject: DATA_POST_PRODUCT = new DATA_POST_PRODUCT();
  categoryObject: ADD_CATEGORY = new ADD_CATEGORY();

  productsList: any
  categoriesList: any;
  bloodsList: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private apiCaller: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      title: [''],
      description: [''],
      price: [''],
      product_id: [''],
      imgUrl: [''],
      imgUrl2: [''],
      imgUrl3: [''],
      category_id: [''],
    })

    this.formCategory = this.formBuilder.group({
      category_name: [''],
      category_id: [''],
      category_img: [''],
    })

    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.api.getProducts()
      .subscribe((res: any) => {
        this.productsList = res;
        console.log(this.productsList);
      })
  }

  getCategories() {
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categoriesList = res;
        console.log(this.categoriesList);
      })
  }

  onEditProduct(row: any) {
    this.formProduct.controls['product_id'].setValue(row.product_id);
    this.formProduct.controls['title'].setValue(row.title);
    this.formProduct.controls['description'].setValue(row.description);
    this.formProduct.controls['price'].setValue(row.price);
    this.formProduct.controls['imgUrl'].setValue(row.imgUrl);
    this.formProduct.controls['imgUrl2'].setValue(row.imgUrl2);
    this.formProduct.controls['imgUrl3'].setValue(row.imgUrl3);
    this.formProduct.controls['category_id'].setValue(row.category_id);
  }

  deleteProduct(row: any) {
    this.api.deleteProduct(row.product_id)
      .subscribe((res: any) => {
        this.toastr.info("Product has been Deleted")
        this.getProducts();
      })
  }

  editProduct() {
    this.apiCaller.put('http://localhost:3000/edit-product', {
      product_id: this.formProduct.controls['product_id'].getRawValue(),
      title: this.formProduct.controls['title'].getRawValue(),
      description: this.formProduct.controls['description'].getRawValue(),
      price: this.formProduct.controls['price'].getRawValue(),
      imgUrl: this.formProduct.controls['imgUrl'].getRawValue(),
      imgUrl2: this.formProduct.controls['imgUrl2'].getRawValue(),
      imgUrl3: this.formProduct.controls['imgUrl3'].getRawValue(),
      category_id: this.formProduct.controls['category_id'].getRawValue(),
    })
      .subscribe();
    this.toastr.success("Product Updated Successfully")
    window.location.reload();
  }

  editCategory() {
    this.apiCaller.put('http://localhost:3000/edit-category', {
      category_id: this.formCategory.controls['category_id'].getRawValue(),
      category_name: this.formCategory.controls['category_name'].getRawValue(),
      category_img: this.formCategory.controls['category_img'].getRawValue(),
    }).subscribe();
    this.toastr.success("Category Updated Successfully")
    window.location.reload();
  }

  onEditCategory(row: any) {
    this.formCategory.controls['category_id'].setValue(row.category_id);
    this.formCategory.controls['category_name'].setValue(row.category_name);
    this.formCategory.controls['category_img'].setValue(row.category_img);
  }

  deleteCategory(row: any) {
    this.api.deleteCategory(row.category_id)
      .subscribe(res => {
        this.toastr.info("Category has been Deleted")
        this.getCategories();
      })
  }

  search(event: any) {
    this.filterTerm = (event.target as HTMLInputElement).value;
    console.log(this.filterTerm);
  }

}
