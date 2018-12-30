import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users = [
    {username: 'Abbass', games: 17, wins: 10, playerRating: 4.2, online: true},
    {username: 'Javat', games: 17, wins: 10, playerRating: 4.2, online: true},
    {username: 'Gholi', games: 17, wins: 10, playerRating: 4.2, online: false},
    ];

  constructor() { }

  ngOnInit() {
  }

}
