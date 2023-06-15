import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CrudserviceService } from '../crudservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-readuser',
  templateUrl: './readuser.component.html',
  styleUrls: ['./readuser.component.css']
})
export class ReaduserComponent implements AfterViewInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'actions'];
  // displayedColumnss: string[] = ['id', 'email', 'first_name', 'last_name', 'actions'];
  perPage: number = 100;
  page!: number;
  dataForm!: FormGroup;
  constructor(private http: HttpClient,private _liveAnnouncer: LiveAnnouncer, private router: Router,private crudService: CrudserviceService) { }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>([]);
    this.fetchUsers(this.page,this.perPage);
  }
  redirectToEdit(user: User) {
    // Navigate to the edit page with the user's ID as a route parameter
    this.router.navigate(['/edit', user.id]);
  }

  //Delete function
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.http.delete('https://gorest.co.in/public/v2/users/' +
        id +
        `?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd`).subscribe(
          (response) => {
            // Show an alert message with the deleted user ID
            alert(`The User ${id} is deleted successfully`);

            //Reload the page to see the updates
            window.location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  //Update function
  onUpdate(user: any) {
    this.crudService.setUpdate(user);
    this.router.navigate(['updatedata']);
  }

  fetchUsers(page: number, perPage: number) {
    // const apiUrl1 = `https://reqres.in/api/users?page=${page}`
    const apiUrl = `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}&access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd`;
    this.http.get<User[]>(apiUrl).subscribe(
      data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error => console.error(error)
    );
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

