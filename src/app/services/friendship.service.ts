import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  private _listURL = 'friendships/list/';
  private _pendingURL = 'friendships/pending/';
  private _checkURL = 'friendships/check';
  private _unfriendURL = 'friendships/unfriend';
  private _confirmURL = 'friendships/confirm';
  private _requestURL = 'friendships/request';

  constructor(private http: HttpClient) { }

  getFriendsList(userId) {
    return this.http.get<any>(this._listURL + userId);
  }

  getFriendsPending(userId) {
    return this.http.get<any>(this._pendingURL + userId);
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
