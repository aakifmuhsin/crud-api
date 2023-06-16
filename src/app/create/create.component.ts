import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Interface for defining gender options
interface Gender {
  value: string;
  viewValue: string;
}

// Interface for defining status options
interface Status {
  value: string;
  viewvalue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = '47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd';
  // Array of gender options
  gender: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  // Array of status options
  status: Status[] = [
    { value: 'active', viewvalue: 'Active' },
    { value: 'inactive', viewvalue: 'InActive' }
  ];

  // FormGroup to handle the form data
  dataForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) {
  }

  ngOnInit(): void {
    // Initialize the form with validators
    this.dataForm = this.fb.group({
      id: ["123124", Validators.required], // Default value and required validator for id
      name: ['', Validators.required], // Required validator for name
      email: ['', [Validators.required, Validators.email]], // Required and email validators for email
      gender: ['', Validators.required], // Required validator for gender
      status: ['', Validators.required], // Required validator for status
    });
  }

  onSubmit() {
    // Get the form data
    const formData = this.dataForm.value;
    // Send a POST request to the API with the form data
    this.http.post(`${this.apiUrl}?access-token=${this.accessToken}`, formData).subscribe(
      (response) => {
        // On success, navigate to the 'userdata' route
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
