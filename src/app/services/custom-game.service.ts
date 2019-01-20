import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomGameService {
  private _createURL = 'customs/create';
  private _listURL = 'customs/all';
  private _startURL = 'customs/start';
  private _finishURL = 'customs/finish';

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

  diceSymbol(i) {
    switch (i) {
      case 1: return 'fas fa-dice-one';
      case 2: return 'fas fa-dice-two';
      case 3: return 'fas fa-dice-three';
      case 4: return 'fas fa-dice-four';
      case 5: return 'fas fa-dice-five';
      case 6: return 'fas fa-dice-six';
    }
  }
}
