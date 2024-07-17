import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestQueueNumberComponent } from '../request-queue-number/request-queue-number.component';
import { UsersService } from '../users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentData = {
    queueNumber: '',
    date: '',
  };

  @Input() title: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UsersService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestQueueNumberComponent, {
      data: {
        queueNumber: this.currentData.queueNumber,
        date: this.currentData.date,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  ngOnInit(): void {
    this.userService.getUserOnQueue().subscribe((item: any) => {
      this.currentData = {
        queueNumber: item.queueNumber,
        date: moment(item.date ? item.date : item.createdAt).format('LL'),
      };
    });
  }

  changePage(path: string) {
    this.router.navigate(['/', path]);
  }
}
