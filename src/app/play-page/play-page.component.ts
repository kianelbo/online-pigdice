import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlayingService } from '../services/playing.service';
import { CustomGameService } from '../services/custom-game.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.css']
})
export class PlayPageComponent implements OnInit {
  // parsing the room's name
  player1: String;
  player2: String;
  game: String;
  // rules
  winScore: number;
  diceCount: number;
  blackDices: Array<number>;
  limit: number;
  // in game variables
  I: number;
  turn = 0;
  dicesValue = [];
  currentScore = [0, 0];
  globalScore = [0, 0];
  rolledTimes = 0;

  constructor(private router: Router,
              private authService: AuthService,
              private customGameService: CustomGameService,
              private playingService: PlayingService) {
    // roll event
    this.playingService.receiveDices().subscribe(data => {
      this.dicesValue = data.diceArray;
      if (this.dicesValue.some(r => this.blackDices.includes(r))) {
        this.currentScore[this.turn] = 0;
        this.rolledTimes = 0;
        this.currentScore[this.turn] = 0;
        this.turn = (this.turn === 0) ? 1 : 0;
      } else {
        this.dicesValue.forEach(d => this.currentScore[this.turn] += d);
      }
    }, err => console.error(err));
    // hold event
    this.playingService.changeTurns().subscribe(
      () => {
        this.globalScore[this.turn] += this.currentScore[this.turn];
        this.currentScore[this.turn] = 0;
        if (this.globalScore[this.turn] >= this.winScore) {
          $('#endModal').modal('show'); // pop up the modal dialog
        } else {
          this.turn = (this.turn === 0) ? 1 : 0;
        }
      }, err => console.error(err));
  }

  ngOnInit() {
    this.playingService.onStarted();
    const settings = localStorage.getItem('room').split(' ');
    this.player1 = settings[0];
    this.player2 = settings[1];
    this.game = settings[2];

    this.I = (this.authService.getSelfUsername() === this.player1) ? 0 : 1;
    this.customGameService.start(this.game).subscribe(res => {
      this.limit = (res.limit === 0) ? Number.MAX_VALUE : res.limit;
      this.winScore = res.winScore;
      this.blackDices = res.blackDices;
      this.diceCount = res.diceCount;
      for (let i = 0; i < this.diceCount; i++) {
        this.dicesValue.push(Math.floor(Math.random() * 6) + 1);
      }
      localStorage.setItem('lastGameId', res._id);
    }, err => console.error(err));
  }

  roll() {
    this.playingService.roll(this.diceCount);
    this.rolledTimes++;
  }

  hold() {
    this.playingService.hold();
    this.rolledTimes = 0;
  }

  reachedLimit() {
    return this.rolledTimes === this.limit;
  }

  finish() {
    this.customGameService.finish(this.game);

    const result = this.globalScore[0] + ' ' + this.globalScore[1];
    const isWinner = this.globalScore[this.I] > this.globalScore[(this.I + 1) % 2];
    console.log(this.globalScore[this.I]);
    console.log(this.globalScore[(this.I + 1) % 2]);
    console.log(isWinner);
    this.playingService.onFinished(isWinner, this.authService.getSelfUsername(), result);

    localStorage.setItem('result', this.globalScore[0] + ' : ' + this.globalScore[1]);
    localStorage.setItem('resultMessage', isWinner ? 'You won!' : 'You lost!');
    this.router.navigate(['gameover']);
  }
}
