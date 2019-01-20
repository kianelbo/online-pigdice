import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';

declare var $: any;

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  myself: String;
  opponent: String;
  player1: String;
  player2: String;
  game: String;
  playerComment = {text: '', rating: 0};
  gameComment = {text: '', rating: 0};
  resultMessage: String;
  result: String;

  constructor(private router: Router,
              private authService: AuthService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.resultMessage = localStorage.getItem('resultMessage');
    this.result = localStorage.getItem('result');

    const settings = localStorage.getItem('room').split(' ');
    this.player1 = settings[0];
    this.player2 = settings[1];
    this.game = settings[2];
    this.myself = this.authService.getSelfUsername();
    this.opponent = (this.player1 === this.myself) ? this.player2 : this.player1;
    // prevent commenting on guests
    if (this.opponent.startsWith('guest') || this.opponent.startsWith('AI')) {
      $('#player-comment-div :input').attr('disabled', true);
    }
  }

  sendFeedback() {
    if (this.playerComment.rating) {
      this.commentService.rate('user', {username: this.opponent, rating: this.playerComment.rating});
      if (this.playerComment.text) {
        const playerCommentData = {
          category: 'user',
          commenter: this.myself,
          text: this.playerComment.text,
          rating: this.playerComment.rating,
          game: localStorage.getItem('lastGameId'),
          match: localStorage.getItem('lastMatchId')
        };
        this.commentService.newComment(playerCommentData);
      }
    }
    if (this.gameComment.rating) {
      this.commentService.rate('game', {name: this.game, rating: this.gameComment.rating});
      if (this.gameComment.text) {
        const gameCommentData = {
          category: 'game',
          commenter: this.myself,
          text: this.gameComment.text,
          rating: this.gameComment.rating,
          game: localStorage.getItem('lastGameId'),
          match: localStorage.getItem('lastMatchId')
        };
        this.commentService.newComment(gameCommentData);
      }
    }
  }

  toStartPage() {
    localStorage.removeItem('room');
    localStorage.removeItem('lastGameId');
    localStorage.removeItem('lastMatchId');
    localStorage.removeItem('resultMessage');
    localStorage.removeItem('result');
    this.router.navigate(['/start']);
  }

  disableButton() {
    const button = <HTMLInputElement> document.getElementById('feedback-btn');
    button.disabled = true;
    button.classList.remove('btn-secondary');
    button.classList.add('btn-outline-success');
  }

  onGameRated(value: number) {
    this.gameComment.rating = value;
  }

  onPlayerRated(value: number) {
    this.playerComment.rating = value;
  }
}
