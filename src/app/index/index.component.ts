import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FriendshipService } from '../services/friendship.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  onlineUsers = [];
  isGuest: Boolean;
  selfUsername: String;

  constructor(private authService: AuthService,
              private friendshipService: FriendshipService) { }

  ngOnInit() {
    this.isGuest = !this.authService.loggedIn();
    this.selfUsername = (this.isGuest ? 'guest' : this.authService.getSelfUsername());
    this.authService.getOnlineUsers().subscribe(
      res => {
        this.onlineUsers = res;
        if (!this.isGuest) {
          this.onlineUsers.forEach((u) =>
            this.friendshipService.getRelation(this.selfUsername, u.username).subscribe(
              rel => u['isFriend'] = (rel === 'isFriend'),
              err => console.error(err)));
        }
      },
      err => console.error(err));
  }

}
