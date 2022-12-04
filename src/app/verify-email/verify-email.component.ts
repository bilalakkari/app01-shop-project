import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const user_id = this.route.snapshot.paramMap.get('user_id');
    console.log(user_id);

    this.api.verifyUser(user_id)
      .subscribe(res => {
        console.log(res)
      })
  }

}
