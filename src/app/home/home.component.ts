import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from '../shared/cookies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookie: CookiesService, private router: Router) { }

  ngOnInit(): void {

  }

}
