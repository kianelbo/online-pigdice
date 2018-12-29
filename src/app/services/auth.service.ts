import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = 'http://localhost:3000/api/register';

  constructor(private  http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registerURL, user);
  }
}
