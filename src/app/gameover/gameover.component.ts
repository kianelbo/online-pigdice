import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  myself: String;
  opponent = '2ndu';
  game = 'Default';
  playerComment = {};
  gameComment = {};

  constructor(private authService: AuthService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.myself = this.authService.getSelfUsername();
  }

  sendFeedback() {
    if (this.playerComment['rating']) {
      this.commentService.rate('user', {username: this.opponent, rating: this.playerComment['rating']});
      if (this.playerComment['text']) {
        const playerCommentData = {
          subject: this.opponent,
          commenter: this.myself,
          text: this.playerComment['text'],
          rating: this.playerComment['rating']
        };
        this.commentService.newComment('user', playerCommentData);
      }
    }
    if (this.gameComment['rating']) {
      this.commentService.rate('game', {name: this.game, rating: this.gameComment['rating']});
      if (this.gameComment['text']) {
        const gameCommentData = {
          subject: this.game,
          commenter: this.myself,
          text: this.gameComment['text'],
          rating: this.gameComment['rating']
        };
        this.commentService.newComment('game', gameCommentData);
      }
    }
  }

  disableButton() {
    const button = <HTMLInputElement> document.getElementById('feedback-btn');
    button.disabled = true;
    button.classList.remove('btn-secondary');
    button.classList.add('btn-outline-success');
  }
}
