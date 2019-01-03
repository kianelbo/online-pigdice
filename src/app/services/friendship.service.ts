import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  private _listURL = 'http://localhost:3000/friendships/list/';
  private _pendingURL = 'http://localhost:3000/friendships/pending/';
  private _checkURL = 'http://localhost:3000/friendships/check';
  private _unfriendURL = 'http://localhost:3000/friendships/unfriend';
  private _confirmURL = 'http://localhost:3000/friendships/confirm';
  private _requestURL = 'http://localhost:3000/friendships/request';

  constructor(private http: HttpClient) { }

  getFriendsList(username) {
    return this.http.get<any>(this._listURL + username);
  }

  getFriendsPending(username) {
    return this.http.get<any>(this._pendingURL + username);
  }

  getRelation(user1, user2) {
    return this.http.post<any>(this._checkURL, {user1: user1, user2: user2});
  }

  unfriend(user1, user2) {
    return this.http.post<any>(this._unfriendURL, {user1: user1, user2: user2}).subscribe();
  }

  confirmFriend(fromUser, toUser) {
    return this.http.post<any>(this._confirmURL, {fromUser: fromUser, toUser: toUser}).subscribe();
  }

  requestFriend(fromUser, toUser) {
    return this.http.post<any>(this._requestURL, {fromUser: fromUser, toUser: toUser}).subscribe();
  }
}
