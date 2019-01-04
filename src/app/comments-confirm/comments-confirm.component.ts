import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments-confirm',
  templateUrl: './comments-confirm.component.html',
  styleUrls: ['./comments-confirm.component.css']
})
export class CommentsConfirmComponent implements OnInit {
  gameComments = [];
  userComments = [];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getAllComments('game').subscribe(res => this.gameComments = res, err => console.error(err));
    this.commentService.getAllComments('user').subscribe(res => this.userComments = res, err => console.error(err));
  }

  confirmComment(id, category) {
    this.commentService.confirm(id);
    const tab = (category === 'game') ? this.gameComments : this.userComments;
    this.removeFromView(tab, id);
  }

  deleteComment(id, category) {
    this.commentService.delete(id);
    const tab = (category === 'game') ? this.gameComments : this.userComments;
    this.removeFromView(tab, id);
  }

  removeFromView(tab, id) {
    const removeIndex = tab.map(function(i) { return i._id; }).indexOf(id);
    tab.splice(removeIndex, 1);
  }
}
