import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _newURL = 'comments/new';
  private _unconfirmedListURL = 'comments/unconfirmed-list/';
  private _rateURL = 'comments/rate/';
  private _confirmURL = 'comments/confirm/';
  private _deleteURL = 'comments/delete/';

  constructor(private  http: HttpClient) { }

  newComment(commentData) {
    this.http.post<any>(this._newURL, commentData).subscribe();
  }

  rate(category, ratingData) {
    this.http.post<any>(this._rateURL + category, ratingData).subscribe();
  }

  getUnconfirmedList(category) {
    return this.http.get<any>(this._unconfirmedListURL + category);
  }

  confirm(id) {
    return this.http.post<any>(this._confirmURL, {_id: id}).subscribe();
  }

  delete(id) {
    return this.http.post<any>(this._deleteURL, {_id: id}).subscribe();
  }
}
