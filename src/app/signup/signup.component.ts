import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router, TitleStrategy } from '@angular/router';
import { SIGN_UP, USER, DATA_POST_USER, CHECK_USERS } from '../shared/classes.model';
import { Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';
import { CookiesService } from '../shared/cookies.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formValue: FormGroup = new FormGroup({});
  userObject: SIGN_UP = new SIGN_UP();

  user: USER = new USER();
  checkUsers: CHECK_USERS = new CHECK_USERS();
  dataObject: DATA_POST_USER = new DATA_POST_USER();

  usersList: any;
  check: any;
  checkUsersList: any;
  countriesList: any;
  bloodsList: any;

  checkList: boolean = false;

  PhotoFileName: string = "";
  PhotoFilePath: string = "";

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

  ngOnInit(): void {
    this.api.getAllUsers()
      .subscribe(res => {
        this.usersList = res;
        this.PhotoFilePath = this.api.PhotoUrl + this.PhotoFileName + "guest.png";
      })

    this.api.checkUsers()
      .subscribe(res => {
        this.checkUsersList = res;
        console.log(this.checkUsersList)
      })
  }

  signUp() {
    this.userObject.username = this.formValue.value.username;
    this.userObject.email = this.formValue.value.email;
    this.userObject.password = this.formValue.value.password;
    this.userObject.img = this.api.PhotoUrl + this.PhotoFileName;
    this.userObject.is_verified = false;
    console.log(this.checkUsersList)

    for (let index = 0; index < this.checkUsersList.length; index++) {
      if (this.checkUsersList[index].email == this.formValue.value.email) {
        this.user = this.checkUsersList[index];
        this.checkList = true;
      }
    }
    if (this.checkList && this.formValue.value.username == this.user.username) {
      this.toastr.warning("you cannot use this username cuz a person used them before you try another one:)")
      console.log(this.checkUsersList)
    }
    else if (this.checkList && this.formValue.value.email == this.user.email) {
      this.toastr.warning("you cannot use this email cuz a person used them before you try another one :)")
      console.log(this.checkUsersList)
    }
    else if (!this.checkList) {
      this.api.signUp(this.userObject)
        .subscribe((res: any) => {
          console.log("Hiiiii", res)
          this.toastr.success("Signed Up has been Successfuly")
          this.formValue.reset();
          this.router.navigate(['/login']);
        }),
        (err: any) => {
          this.toastr.warning(err)
          console.log(err);
        }
      console.log(this.checkUsersList)
      this.emailsent();
    }

    else {
      this.toastr.error('username or password is incorrect');
      this.formValue.reset();
    }
  }

  async emailsent() {
    await this.api.getUserEmail(this.userObject.email)
      .subscribe((res: any) => {
        console.log(res)
        this.userObject.username = this.formValue.value.username;
        this.userObject.id = res[0].ID;
        console.log(res[0].ID)
        this.api.emailsent(this.userObject)
          .subscribe((res: any) => {
            this.formValue.reset();
            console.log(res)
          })
      })
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
