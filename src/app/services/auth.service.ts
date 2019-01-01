import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = 'http://localhost:3000/users/register';
  private _loginURL = 'http://localhost:3000/users/login';

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

  getSelfUsername() {
    return localStorage.getItem('me');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('me');
    this.router.navigate(['/index']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
