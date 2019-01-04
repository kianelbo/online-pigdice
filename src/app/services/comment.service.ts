import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _newURL = 'http://localhost:3000/comments/new/';
  private _listURL = 'http://localhost:3000/comments/all/';
  private _rateURL = 'http://localhost:3000/comments/rate/';
  private _confirmURL = 'http://localhost:3000/comments/confirm/';
  private _deleteURL = 'http://localhost:3000/comments/delete/';

  constructor(private  http: HttpClient) { }

  newComment(category, commentData) {
    this.http.post<any>(this._newURL + category, commentData).subscribe();
  }

  rate(category, ratingData) {
    this.http.post<any>(this._rateURL + category, ratingData).subscribe();
  }

  getAllComments(category) {
    return this.http.get<any>(this._listURL + category);
  }

  confirm(id) {
    return this.http.post<any>(this._confirmURL, {_id: id}).subscribe();
  }

  delete(id) {
    return this.http.post<any>(this._deleteURL, {_id: id}).subscribe();
  }
}
