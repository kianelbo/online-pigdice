import { Component, OnInit } from '@angular/core';
import { CustomGameService } from '../services/custom-game.service';
import { AuthService } from '../services/auth.service';
import { FriendshipService } from '../services/friendship.service';
import { AppComponent } from '../app.component';

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

  constructor(private customGameService: CustomGameService,
              private authService: AuthService,
              private friendshipService: FriendshipService,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.customGameService.getAllGames().subscribe(res => {
      this.games = res;
      this.selectedGame = this.games[0];
    }, err => console.error(err));

    if (this.authService.loggedIn()) {
      const selfUsername = this.authService.getSelfUsername();
      this.authService.getOnlineUsers().subscribe(
        res => {
          const removeIndex = res.map(function(p) { return p.username; }).indexOf(selfUsername);
          res.splice(removeIndex, 1);
          this.onlineUsers = res;
          this.onlineUsers.forEach((u) =>
            this.friendshipService.getRelation(selfUsername, u.username).subscribe(
              rel => u['isFriend'] = (rel === 'isFriend'),
              err => console.error(err)));
        },
        err => console.error(err));
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

  findRandom() {
    this.appComponent.createMatchMakerModal('enqueue', this.selectedGame['name']);
  }
}
