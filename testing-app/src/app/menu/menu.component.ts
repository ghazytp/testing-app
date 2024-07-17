import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestQueueNumberComponent } from '../request-queue-number/request-queue-number.component';
import { UsersService } from '../users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UsersService
  ) {}

  currentData = {
    queueNumber: '',
    date: '',
  };

  ngOnInit(): void {
    this.userService.getUserOnQueue().subscribe((item: any) => {
      this.currentData = {
        queueNumber: item.queueNumber,
        date: moment(item.date ? item.date : item.createdAt).format('LL'),
      };
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestQueueNumberComponent, {
      data: {
        queueNumber: this.currentData.queueNumber,
        date: this.currentData.date,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }
}
