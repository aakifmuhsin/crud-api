import { Component } from '@angular/core';
import { Router } from '@angular/router';


export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-api';
  [x: string]: any;
  constructor(private route:Router){

  }
  routeToUserdata(){
    this.route.navigate(['userdata']);
  }
}
