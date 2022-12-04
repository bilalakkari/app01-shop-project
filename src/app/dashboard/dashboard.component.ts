import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER } from '../shared/classes.model';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: USER = new USER();
  constructor(private cookie: CookiesService, private router: Router) { }

  ngOnInit(): void {
    this.user = Object(this.cookie.getCookie('userInfo'));
    console.log(this.user);
    if (this.cookie.getCookie('userInfo')) {
      if (!(JSON.parse(String(this.user)).username == 'admin' && JSON.parse(String(this.user)).password == 'admin'))
        this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/navbar/']);
    }
  }

  logout() {
    console.log('Hiiii: ', this.cookie.getCookie('userInfo'));
    this.cookie.eraseCookie('userInfo');
    console.log('Hiiii: ', this.cookie.getCookie('userInfo'));
    this.router.navigate(['/navbar/']);
  }
}
