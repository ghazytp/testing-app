import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  name: string;
  email: string;
  queueNumber?: string;
  age?: string;
  date?: string;
  address?: string;
  phoneNumber?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers = (query?: string) => {
    return this.http.get(`${this.baseUrl}/?name=${query ?? ''}`);
  };

  addNewUser = (value: User) => {
    return this.http.post(this.baseUrl, value);
  };

  getUserOnQueue = () => {
    return this.http.get(this.baseUrl + '/last-queue');
  };
}
