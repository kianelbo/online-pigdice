import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.css']
})
export class PlayPageComponent implements OnInit {
  goal = 130;
  diceCountArray: number[];
  diceCount: number;
  blackDices = [1, 6, 2];
  limit = 10;

  constructor() { }

  ngOnInit() {
    this.diceCount = 3;
    this.diceCountArray = new Array(this.diceCount);
  }

}
