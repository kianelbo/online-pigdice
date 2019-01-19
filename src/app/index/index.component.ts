import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FriendshipService } from '../services/friendship.service';
import { CustomGameService } from '../services/custom-game.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  onlineUsers = [];
  isGuest: Boolean;
  selfUsername: String;
  playStats = {};
  gamesPopular = [];
  gamesNew = [];
  gamesOnline = [];

  constructor(private authService: AuthService,
              private friendshipService: FriendshipService,
              private customGameService: CustomGameService) { }

  ngOnInit() {
    // online users and check if they're friend or not
    this.isGuest = !this.authService.loggedIn();
    this.selfUsername = (this.isGuest ? 'guest' : this.authService.getSelfUsername());
    this.updateList();
    setInterval(() => this.updateList(), 5000);

    // custom games data for the top slider
    this.customGameService.getAllGames().subscribe(res => {
      this.gamesPopular = res.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : 0)).slice(0, 3);
      this.gamesNew = res.sort((a, b) => (a.createDate < b.createDate) ? 1 : ((b.createDate < a.createDate) ? -1 : 0)).slice(0, 3);
      this.gamesOnline = res.sort((a, b) => (a.nowPlaying < b.nowPlaying) ? 1 : ((b.nowPlaying < a.nowPlaying) ? -1 : 0)).slice(0, 3);
    }, err => console.log(err));

    // match summary for logged in users
    if (!this.isGuest) {
      this.authService.getPlayStats().subscribe(res => this.playStats = res, err => console.error(err));
    }
  }

  updateList() {
    this.authService.getOnlineUsers().subscribe(res => {
      this.onlineUsers = res;
      if (!this.isGuest) {
        this.onlineUsers.forEach((u) => this.friendshipService.getRelation(this.selfUsername, u.username).subscribe(
          rel => u['isFriend'] = (rel === 'isFriend'),
          err => console.error(err)));
      }
    }, err => console.error(err));
  }
}
