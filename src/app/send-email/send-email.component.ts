import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { SEND_EMAIL } from '../shared/classes.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  formValue!: FormGroup;
  userObject: SEND_EMAIL = new SEND_EMAIL();

  countriesList: any;
  bloodsList: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private apiCaller: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      FullName: [''],
      Email: [''],
      Test: [''],
      Text: [''],
    })
  }

  sendEmail() {
    this.userObject.FullName = this.formValue.value.FullName;
    this.userObject.Email = this.formValue.value.Email;
    this.userObject.Test = this.formValue.value.Test;
    this.userObject.Text = this.formValue.value.Text;
    this.api.contactEmail(this.userObject)
      .subscribe(res => {
      }),
      (err: any) => {
        this.toastr.warning(err)
        console.log(err);
      }
    this.formValue.reset();
  }
}