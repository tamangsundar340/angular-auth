import { Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  // declare variable
  email = 'a@gmail.com';
  password = '123';
  name = 'Sundar Tamang';

  // set token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // get token to login
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // check wheater login or not
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // logout funciton
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // login function
  login({ email, password }: any): Observable<any> {
    if (email === this.email && password === this.password) {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: this.name, email: this.email });
    }
    return throwError(new Error('Failed to login'));
  }
}
