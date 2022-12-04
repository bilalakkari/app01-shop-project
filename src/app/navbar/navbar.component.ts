import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { CookiesService } from '../shared/cookies.service';
import { SIGN_UP } from '../shared/classes.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private cookie: CookiesService, private api: ApiService) { }

  userData: any;
  user: any;

  searchTerm: string = "";
  dataObject: SIGN_UP = new SIGN_UP();


  ngOnInit(): void {
    window.scroll(0, 0)

    if (this.cookie.getCookie('userInfo')) {
      this.user = Object(this.cookie.getCookie('userInfo'));
      console.log(this.user);
      this.api.getUserData(JSON.parse(String(this.user)).ID)
        .subscribe(res => {
          this.userData = res;
        })
    }
  }

  logout() {
    this.cookie.eraseCookie('userInfo');
    window.location.reload();
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.api.search.next(this.searchTerm);
  }

  goToShop() {
    this.router.navigate(['/navbar/shop']);
  }
}