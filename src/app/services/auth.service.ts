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
  private _personalURL = 'http://localhost:3000/users/personal-settings/';
  private _getAllURL = 'http://localhost:3000/users/all';
  private _getOnlinesURL = 'http://localhost:3000/users/online-only';
  private _checkOnlineURL = 'http://localhost:3000/users/check-online/';

  constructor(private http: HttpClient,
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

  isAdmin() {
    return localStorage.getItem('me')  === 'admin';
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
    window.location.reload();
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

  isOnline(username) {
    this.http.get<any>(this._checkOnlineURL + username).subscribe(
      res => res, err => console.error(err));
  }

  updatePersonal(newSettings) {
    const newData = {username: this.getSelfUsername(), newData: newSettings};
    return this.http.post<any>(this._personalURL, newData);
  }

  getPersonal(username: String = this.getSelfUsername()) {
    return this.http.get<any>(this._personalURL + username);
  }
}
