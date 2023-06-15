import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];
  filterGender: string = ''; // Add the filterGender property

  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit(): void {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>([]);
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl =
      'https://gorest.co.in/public/v2/users?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd';
    this.http.get<User[]>(apiUrl).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.error(error)
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter() {
    // Convert the filterGender value to lowercase
    const filterValue = this.filterGender.toLowerCase().trim();
    this.dataSource.filter = filterValue;
  }
}
