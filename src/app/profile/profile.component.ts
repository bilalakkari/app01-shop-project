import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from 'src/app/shared/cookies.service';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { SIGN_UP, USER } from '../shared/classes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private cookie: CookiesService, private api: ApiService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.formValue = fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      img: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  formValue: FormGroup = new FormGroup({});

  usersList: any;
  usersData: any;
  userData: any;

  user: any;

  changeProfileData: any;

  PhotoFileName: string = "";
  PhotoFilePath: string = "";

  dataObject: SIGN_UP = new SIGN_UP();
  userObject: SIGN_UP = new SIGN_UP();


  ngOnInit(): void {
    if (!this.cookie.getCookie('userInfo')) {
      this.router.navigate(['/navbar/home']);
    }

    this.user = Object(this.cookie.getCookie('userInfo'));
    this.dataObject.id = JSON.parse(String(this.user)).ID

    this.api.getUserData(this.dataObject.id)
      .subscribe(res => {
        this.userData = res
      })
  }

  logout() {
    this.cookie.eraseCookie('userInfo');
    this.router.navigate(['/navbar/home']);
  }

  changeProfile() {
    this.dataObject.username = this.formValue.value.username;
    this.dataObject.email = this.formValue.value.email;
    this.dataObject.password = this.formValue.value.password;
    this.dataObject.img = this.api.PhotoUrl + this.PhotoFileName;

    console.log(this.dataObject)

    this.api.changeProfile(this.dataObject.id, this.dataObject)
      .subscribe((res: any) => {
        this.changeProfileData = res;
      })
    this.toastr.success("Your profile has been changed");
    window.location.reload();
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

  get f() {
    return this.formValue.controls;
  }
}
