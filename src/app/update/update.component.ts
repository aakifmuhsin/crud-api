import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CrudserviceService } from '../crudservice.service';

interface Gender {
  value: string;
  viewValue: string;
}
interface Status {
  value: string;
  viewvalue: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = '47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd';
  user: any = {};

  gender: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  status: Status[] = [
    { value: 'active', viewvalue: 'Active' },
    { value: 'inactive', viewvalue: 'InActive' }
  ]

  routeToUserdata() {
    this.route.navigate(['userdata'])
  }

  dataForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router, private crudservice: CrudserviceService) {
  }

  ngOnInit(): void {
    this.user = this.crudservice.getUpdate();
    //console.log(this.user.id)
    this.dataForm = this.fb.group({
      id: [this.user.id, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender, Validators.required],
      status: [this.user.status, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.dataForm.value;
    let id: number;
    const idFormControl = this.dataForm.get('id');
    if (idFormControl) {
      id = idFormControl.value;
    }
    // Remove the id control from the dataForm FormGroup
    this.dataForm.removeControl('id');
    this.http.put(`${this.apiUrl}/` + id! +`?access-token=${this.accessToken}`, formData).subscribe(
        (response) => {
          this.route.navigate(['userdata']);
          console.log(response);

          // Handle the response from the API
        },
        (error) => {
          console.log(error);
          // Handle errors if any
        }
      );
  }
}