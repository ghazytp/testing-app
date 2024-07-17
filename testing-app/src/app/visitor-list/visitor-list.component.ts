import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit, AfterViewInit {
  userList: any = [];
  stringQuery = '';

  displayedColumns: string[] = [
    'index',
    'name',
    'date',
    'age',
    'email',
    'phoneNumber',
    'queueNumber',
    'address',
  ];
  dataSource = new MatTableDataSource(this.userList);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((resp) => {
      this.userList = resp;

      this.dataSource.data = this.userList.map((item, index) => ({
        ...item,
        index: index + 1,
        date: moment(item.date ? item.date : item.createdAt).format('LL'),
      }));
    });
  }

  onChangeSearch = (value: string) => {
    this.userService.getUsers(value).subscribe((resp) => {
      this.userList = resp;

      this.dataSource.data = this.userList.map((item, index) => ({
        ...item,
        index: index + 1,
        date: moment(item.date ? item.date : item.createdAt).format('LL'),
      }));
    });
  };

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
