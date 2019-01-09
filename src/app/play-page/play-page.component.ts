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
  rules: {
    winScore: number,
    diceCount: number,
    blackDices: Array<number>,
    limit: number
  };
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
      if (this.dicesValue.some(r => this.rules.blackDices.includes(r))) {
        this.currentScore[this.turn] = 0;
        console.log('hold called');
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
        console.log('beginning of hold event');
        this.globalScore[this.turn] += this.currentScore[this.turn];
        this.currentScore[this.turn] = 0;
        if (this.globalScore[this.turn] >= this.rules.winScore) {
          $('#endModal').modal('show'); // pop up the modal dialog
        } else {
          this.turn = (this.turn === 0) ? 1 : 0;
        }
        console.log('end of hold event');
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
      this.rules = res;
      this.rules.limit = (res.limit === 0) ? Number.MAX_VALUE : res.limit;
      for (let i = 0; i < this.rules.diceCount; i++) {
        this.dicesValue.push(Math.floor(Math.random() * 6) + 1);
      }
    }, err => console.error(err));
  }

  roll() {
    this.playingService.roll(this.rules.diceCount);
    this.rolledTimes++;
  }

  hold() {
    this.playingService.hold();
    this.rolledTimes = 0;
  }

  reachedLimit() {
    return this.rolledTimes === this.rules.limit;
  }

  finish() {
    this.customGameService.finish(this.game);
    this.playingService.onFinished();
    this.router.navigate(['gameover']);
  }
}
