import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchMakingService {
  private _enqueueURL = 'http://localhost:3000/match-making/enqueue';

  constructor(private http: HttpClient) { }

  enqueue(username, game) {
    return this.http.post<any>(this._enqueueURL, {username: username, game: game});
  }
}
