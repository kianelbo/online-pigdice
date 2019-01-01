import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = 'http://localhost:3000/users/register';
  private _loginURL = 'http://localhost:3000/users/login';
  private _logoutURL = 'http://localhost:3000/users/logout';
  private _updatePersonalURL = 'http://localhost:3000/users/personal-settings/';
  private _getAllURL = 'http://localhost:3000/users/all';
  private _getOnlinesURL = 'http://localhost:3000/users/online-only';

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
    this.http.post<any>(this._logoutURL, {username: this.getSelfUsername()}).subscribe(
      res => console.log(res),
      err => console.error(err));
    localStorage.removeItem('token');
    localStorage.removeItem('me');
    this.router.navigate(['/index']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAllUsers() {
    return this.http.get<any>(this._getAllURL);
  }

  getOnlineUsers() {
    return this.http.get<any>(this._getOnlinesURL);
  }

  updatePersonal(newSettings) {
    const newData = {username: this.getSelfUsername(), newData: newSettings};
    return this.http.post<any>(this._updatePersonalURL, newData);
  }

  getPersonal() {
    return this.http.get<any>(this._updatePersonalURL + this.getSelfUsername());
  }
}
