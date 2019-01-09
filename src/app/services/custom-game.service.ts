import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomGameService {
  private _createURL = 'http://localhost:3000/customs/create';
  private _listURL = 'http://localhost:3000/customs/all';
  private _startURL = 'http://localhost:3000/customs/start';
  private _finishURL = 'http://localhost:3000/customs/finish';

  constructor(private  http: HttpClient) { }

  createCustom(customGame) {
    return this.http.post<any>(this._createURL, customGame);
  }

  getAllGames() {
    return this.http.get<any>(this._listURL);
  }

  start(name) {
    return this.http.post<any>(this._startURL, {name: name});
  }

  finish(name) {
    return this.http.post<any>(this._finishURL, {name: name}).subscribe();
  }
}
