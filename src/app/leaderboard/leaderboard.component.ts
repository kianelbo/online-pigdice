import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users = [];
  sortMethod = 1;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      res => {
        this.users = res;
        this.users.forEach(u => {
          u.designedGames = u.createdGames.length;
          u.gamesRatings = 0;
          u.gamesTotalPlayed = 0;
          u.createdGames.forEach(g => {
            u.gamesRatings += g.avgRating;
            u.gamesTotalPlayed += g.totalPlayed;
          });
          u.gamesRatings /= u.designedGames;
        });
      },
      err => console.error(err));
    this.sortByGames();
  }

  sortByGames() {
    this.users.sort((a, b) => (a.totalGames < b.totalGames) ? 1 : ((b.totalGames < a.totalGames) ? -1 : 0));
    this.sortMethod = 1;
  }

  sortByWins() {
    this.users.sort((a, b) => (a.totalWins < b.totalWins) ? 1 : ((b.totalWins < a.totalWins) ? -1 : 0));
    this.sortMethod = 2;
  }

  sortByRating() {
    this.users.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : 0));
    this.sortMethod = 3;
  }

  sortByDesignedGames() {
    this.users.sort((a, b) => (a.designedGames < b.designedGames) ? 1 : ((b.designedGames < a.designedGames) ? -1 : 0));
    this.sortMethod = 4;
  }

  sortByGamesRatings() {
    this.users.sort((a, b) => (a.gamesRatings < b.gamesRatings) ? 1 : ((b.gamesRatings < a.gamesRatings) ? -1 : 0));
    this.sortMethod = 5;
  }

  sortByGamesTotalPlayed() {
    this.users.sort((a, b) => (a.gamesTotalPlayed < b.gamesTotalPlayed) ? 1 : ((b.gamesTotalPlayed < a.gamesTotalPlayed) ? -1 : 0));
    this.sortMethod = 6;
  }

  rowIndex(i) {
    switch (i) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return ('0' + parseInt(i + 1, 10)).slice(-2);
    }
  }
}
