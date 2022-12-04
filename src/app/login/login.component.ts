import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formValue !: FormGroup;
  loginList: any;
  user: any;
  isLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router, private cookie: CookiesService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: [''],
      password: [''],
    })

    this.api.getLogin()
      .subscribe((res: any) => {
        this.loginList = res;
        console.log(res)
      })
  }


  login() {
    // console.log(JSON.parse(document.cookie.slice(85, document.cookie.length)));
    for (let index = 0; index < this.loginList.length; index++) {
      if (this.loginList[index].username == this.formValue.value.username && this.loginList[index].password == this.formValue.value.password) {
        this.user = this.loginList[index];
        this.isLogin = true;
      }
    }
    if (this.isLogin && this.formValue.value.username == "admin" && this.formValue.value.password == "admin") {
      this.toastr.success('signed in successfully');
      this.cookie.setCookie('userInfo', JSON.stringify(this.user), 7);
      console.log('Hiiii: ', this.cookie.getCookie('userInfo'));
      this.router.navigate(['/dashboard']);
      console.log(this.loginList)
    }
    else if (this.isLogin) {
      this.toastr.success('signed in successfully');
      this.cookie.setCookie('userInfo', JSON.stringify(this.user), 7);
      console.log('Hiiii: ', this.cookie.getCookie('userInfo'));
      this.router.navigate(['/navbar']);
      console.log(this.loginList)
    }

    else {
      this.toastr.error('username or password is incorrect');
      this.formValue.reset();
    }
  }

}
