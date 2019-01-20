import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import configs from '../../../config/cloudinary';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = 'users/register';
  private _loginURL = 'users/login';
  private _logoutURL = 'users/logout';
  private _personalURL = 'users/personal-settings/';
  private _accountURL = 'users/account-settings/';
  private _uploadPictureURL = 'users/upload-picture';
  private _getAllURL = 'users/all';
  private _getOnlinesURL = 'users/online-only';
  private _checkOnlineURL = 'users/check-online/';
  private _playStatsURL = 'users/play-stats/';
  private _designStatsURL = 'users/design-stats/';
  private _idURL = 'users/id/';

  constructor(private http: HttpClient,
              private router: Router) {}

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

  getSelfID() {
    return localStorage.getItem('myID');
  }

  logoutUser() {
    this.http.post<any>(this._logoutURL, {username: this.getSelfUsername()}).subscribe(
      res => console.log(res),
      err => console.error(err));
    localStorage.removeItem('token');
    localStorage.removeItem('me');
    localStorage.removeItem('myID');
    this.router.navigate(['/index']);
    window.location.reload();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getID(username) {
    return this.http.get<any>(this._idURL + username);
  }

  getAllUsers() {
    return this.http.get<any>(this._getAllURL);
  }

  getOnlineUsers() {
    return this.http.get<any>(this._getOnlinesURL);
  }

  isOnline(username) {
    return this.http.get<any>(this._checkOnlineURL + username);
  }

  updatePersonal(newSettings) {
    const newData = {username: this.getSelfUsername(), newData: newSettings};
    return this.http.post<any>(this._personalURL, newData);
  }

  updateAccount(newSettings) {
    const newData = {username: this.getSelfUsername(), newData: newSettings};
    return this.http.post<any>(this._accountURL, newData);
  }

  getPersonal(username: String = this.getSelfUsername()) {
    return this.http.get<any>(this._personalURL + username);
  }

  getPlayStats(username: String = this.getSelfUsername()) {
    return this.http.get<any>(this._playStatsURL + username);
  }

  getDesignStats(username: String = this.getSelfUsername()) {
    return this.http.get<any>(this._designStatsURL + username);
  }

  uploadPicture(username, file) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', configs.upload_preset);
    this.http.post<any>(configs.uploadURL, fd).subscribe(res =>
      this.http.post<any>(this._uploadPictureURL, {username: username, url: res['secure_url']}).subscribe(() =>
        this.router.navigate(['/users/' + this.getSelfUsername()])
      ));
  }
}
