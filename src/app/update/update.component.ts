import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) {
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: ["", Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.dataForm.value;
    let id: number;
    const idFormControl = this.dataForm.get('id');
    if (idFormControl) {
      id = idFormControl.value;
    }
    // console.log(formData);
    // console.log(id!);

    // Remove the id control from the dataForm FormGroup
    this.dataForm.removeControl('id');
    this.http.put('https://gorest.co.in/public/v2/users/' +
      id! +
      '?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd', formData).subscribe(
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