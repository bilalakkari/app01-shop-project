import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';
import { ADD_CATEGORY } from 'src/app/shared/classes.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  formValue !: FormGroup;

  PhotoFileName: string = "";
  PhotoFilePath: string = "";

  categoryObject: ADD_CATEGORY = new ADD_CATEGORY();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      category_name: [''],
      imgUrl: ['']
    })
  }

  addCategory() {
    this.categoryObject.category_name = this.formValue.value.category_name;
    this.categoryObject.category_img = this.api.PhotoUrl + this.PhotoFileName;


    console.log(this.categoryObject)
    this.api.addCategories(this.categoryObject)
      .subscribe(res => { })

    this.toastr.success("Category has been added !");
    this.formValue.reset();
    this.router.navigate(['/dashboard']);
  }

  uploadImgCategory(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.api.PhotoUrl + this.PhotoFileName;
    })
  }

}
