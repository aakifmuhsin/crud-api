import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient,  private route: Router) {
  }
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: ["", Validators.required],
    });
  }

  dataForm!: FormGroup;

  onSubmit() {
    const id = this.dataForm.value.id;
    console.log(id);
    this.http.delete('https://gorest.co.in/public/v2/users/' +
      id +
      '?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd').subscribe(
        (response) => {
          this.route.navigate(['userdata']);
          console.log(response);

          // Handle the response from the API
        },
        (error) => {
          console.error(error);
          // Handle errors if any
        }
      );
  }
}

