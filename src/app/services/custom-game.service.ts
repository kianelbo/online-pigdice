import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomGameService {
  private _createURL = 'http://localhost:3000/customs/create';

  constructor(private  http: HttpClient) { }

  createCustom(customGame) {
    return this.http.post<any>(this._createURL, customGame);
  }
}
