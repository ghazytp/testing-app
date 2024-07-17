import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css'],
})
export class InputVisitorDetailsComponent implements OnInit {
  createdUser = {};

  constructor(private router: Router, private userService: UsersService) {}

  registerUser(visitorForm) {
    const value = visitorForm.value;

    this.userService.addNewUser(value).subscribe((resp: any) => {
      this.createdUser = {
        queueNumber: resp.queueNumber,
        date: resp.date,
      };
      
      this.router.navigate(['/', 'visitor-list']);
      visitorForm.reset();
    });
  }

  ngOnInit(): void {}
}
