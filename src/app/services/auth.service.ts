import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = 'http://localhost:3000/api/register';
  private _loginURL = 'http://localhost:3000/api/login';

  constructor(private  http: HttpClient,
              private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerURL, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginURL, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
