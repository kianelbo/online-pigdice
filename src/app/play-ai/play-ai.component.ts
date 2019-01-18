import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomGameService } from '../services/custom-game.service';

declare var $: any;

@Component({
  selector: 'app-play-ai',
  templateUrl: './play-ai.component.html',
  styleUrls: ['./play-ai.component.css']
})
export class PlayAiComponent implements OnInit {
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
  turn = 0;
  canRoll = true;
  dicesValue = [];
  currentScore = [0, 0];
  globalScore = [0, 0];
  rolledTimes = 0;

  constructor(private router: Router,
              private customGameService: CustomGameService) { }

  ngOnInit() {
    const settings = localStorage.getItem('room').split(' ');
    this.player1 = settings[0];
    this.player2 = settings[1];
    this.game = settings[2];

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

  rollPlayer() {
    this.dicesValue = Array.from({length: this.diceCount}, () => Math.floor(Math.random() * 6) + 1);
    if (this.dicesValue.some(r => this.blackDices.includes(r))) {
      this.currentScore[0] = 0;
      this.rolledTimes = 0;
      this.canRoll = false;
    } else {
      this.dicesValue.forEach(d => this.currentScore[0] += d);
    }
    this.rolledTimes++;
  }

  holdPlayer() {
    this.rolledTimes = 0;
    this.globalScore[0] += this.currentScore[0];
    this.currentScore[0] = 0;
    if (this.globalScore[0] >= this.winScore) {
      $('#endModal').modal('show'); // pop up the modal dialog
    } else {
      this.turn = 1;
      this.aiMove();
    }
  }

  aiMove() {
    const rollCounts = Math.min(Math.floor(Math.random() * 2) + 1, this.limit);
    for (let i = 0; i < rollCounts; i++) {
      this.dicesValue = Array.from({length: this.diceCount}, () => Math.floor(Math.random() * 6) + 1);
      if (this.dicesValue.some(r => this.blackDices.includes(r))) {
        this.currentScore[1] = 0;
        break;
      } else {
        this.dicesValue.forEach(d => this.currentScore[1] += d);
      }
    }
    this.globalScore[1] += this.currentScore[1];
    this.currentScore[1] = 0;
    if (this.globalScore[1] >= this.winScore) {
      $('#endModal').modal('show'); // pop up the modal dialog
    } else {
      this.turn = 0;
      this.canRoll = true;
    }
  }

  finish() {
    this.customGameService.finish(this.game);
    setTimeout(() => this.customGameService.finish(this.game), 500);
    localStorage.setItem('result', this.globalScore[0] + ' : ' + this.globalScore[1]);
    localStorage.setItem('resultMessage', this.globalScore[0] > this.globalScore[1] ? 'You won!' : 'You lost!');
    this.router.navigate(['gameover']);
  }
}
