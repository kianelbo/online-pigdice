import { Component, OnInit } from '@angular/core';
import { CustomGameService } from '../services/custom-game.service';
import { AuthService } from '../services/auth.service';
import { FriendshipService } from '../services/friendship.service';
import { MatchMakingService } from '../services/match-making.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  games = [];
  onlineUsers = [];
  comments = [];
  selectedGame = {};
  sortMethod = 3;

  constructor(private customGameService: CustomGameService,
              private authService: AuthService,
              private friendshipService: FriendshipService,
              private matchMakingService: MatchMakingService) { }

  ngOnInit() {
    this.customGameService.getAllGames().subscribe(res => {
      this.games = res;
      this.sortByRating();
      this.selectedGame = this.games[0];
    }, err => console.error(err));

    if (this.authService.loggedIn()) {
      const selfUsername = this.authService.getSelfUsername();
      this.authService.getOnlineUsers().subscribe(
        res => {
          const removeIndex = res.map(function(p) { return p.username; }).indexOf(selfUsername);
          if (removeIndex > -1) {
            res.splice(removeIndex, 1);
          }
          this.onlineUsers = res;
          this.onlineUsers.forEach((u) => this.friendshipService.getRelation(selfUsername, u.username).subscribe(
              rel => u['isFriend'] = (rel === 'isFriend'),
              err => console.error(err)));
        }, err => console.error(err));
    }
  }

  updateComments(comments) {
    this.comments = comments;
  }

  selectGame(game) {
    this.selectedGame = game;
  }

  diceSymbol(i) {
    switch (i) {
      case 1: return '\u2680';
      case 2: return '\u2681';
      case 3: return '\u2682';
      case 4: return '\u2683';
      case 5: return '\u2684';
      case 6: return '\u2685';
    }
  }

  sortByTotalPlayed() {
    this.games.sort((a, b) => (a.totalPlayed < b.totalPlayed) ? 1 : ((b.totalPlayed < a.totalPlayed) ? -1 : 0));
    this.sortMethod = 1;
  }

  sortByNowPlaying() {
    this.games.sort((a, b) => (a.nowPlaying < b.nowPlaying) ? 1 : ((b.nowPlaying < a.nowPlaying) ? -1 : 0));
    this.sortMethod = 2;
  }

  sortByRating() {
    this.games.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : 0));
    this.sortMethod = 3;
  }

  isEnqueued() {
    return localStorage.getItem('state') === 'enqueued';
  }

  findRandom() {
    this.matchMakingService.enqueue(this.selectedGame['name'], this.authService.getSelfUsername());
  }

  requestPlayer(opponent) {
    this.matchMakingService.requestPlayer(this.authService.getSelfUsername(), opponent, this.selectedGame['name']);
  }
}
