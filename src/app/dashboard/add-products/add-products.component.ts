import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DATA_POST_PRODUCT } from 'src/app/shared/classes.model';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  formValue!: FormGroup;
  productObject: DATA_POST_PRODUCT = new DATA_POST_PRODUCT();

  categoriesList: any;

  PhotoFileName: string = "";
  PhotoFileName2: string = "";
  PhotoFileName3: string = "";

  PhotoFilePath: string = "";
  PhotoFilePath2: string = "";
  PhotoFilePath3: string = "";

  constructor(private formBuilder: FormBuilder, private api: ApiService, private apiCaller: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      price: [''],
      imgUrl: [''],
      imgUrl2: [''],
      imgUrl3: [''],
      category: ['']
    })

    this.getCategories();
  }

  getCategories() {
    this.api.getCategories()
      .subscribe(res => {
        this.categoriesList = res;
        console.log(res);
      })
  }

  addProduct() {
    this.productObject.title = this.formValue.value.title;
    this.productObject.description = this.formValue.value.description;
    this.productObject.price = this.formValue.value.price;
    this.productObject.imgUrl = this.api.PhotoUrl + this.PhotoFileName;
    this.productObject.imgUrl2 = this.api.PhotoUrl + this.PhotoFileName2;
    this.productObject.imgUrl3 = this.api.PhotoUrl + this.PhotoFileName3;
    this.productObject.category_id = this.formValue.value.category;

    console.log(this.productObject)


    this.api.addProducts(this.productObject)
      .subscribe(res => {
        console.log(this.productObject)
        this.toastr.success("Product has been added successfuly")
        this.formValue.reset();
        this.router.navigate(['/dashboard']);
      }),
      (err: any) => {
        this.toastr.warning(err)
        console.log(err);
      }
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.api.PhotoUrl + this.PhotoFileName;
    })
  }

  uploadPhoto2(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName2 = data.toString();
      this.PhotoFilePath2 = this.api.PhotoUrl + this.PhotoFileName2;
    })
  }

  uploadPhoto3(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName3 = data.toString();
      this.PhotoFilePath3 = this.api.PhotoUrl + this.PhotoFileName3;
    })
  }

}
