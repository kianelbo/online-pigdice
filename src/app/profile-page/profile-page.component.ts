import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FriendshipService } from '../services/friendship.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: String;
  relation: String;
  personal = {};
  friends = [];

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private friendshipService: FriendshipService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username === this.authService.getSelfUsername()) {
      this.relation = 'myself';
    } else {
      this.friendshipService.getRelation(this.username, this.authService.getSelfUsername()).subscribe(res => this.relation = res,
        err => console.error(err));
    }

    this.authService.getPersonal(this.username).subscribe(
      res => {
        res.birthdate = this.datePipe.transform(res.birthdate, 'yyyy-MM-dd');
        this.personal = res;
      }, err => console.error(err));

    if (this.relation) {
      this.friendshipService.getFriendsPending(this.username).subscribe(
        res => res.forEach((f) => this.friends.push({username: f, pending: true, isOnline: this.authService.isOnline(f)})),
        err => console.error(err));
    }
    this.friendshipService.getFriendsList(this.username).subscribe(
      res => res.forEach((f) => this.friends.push({username: f, pending: false, isOnline: this.authService.isOnline(f)})),
      err => console.error(err));
  }

  unfriend(user) {
    this.friendshipService.unfriend(this.authService.getSelfUsername(), user);
    if (this.relation === 'myself') {
      const removeIndex = this.friends.map(function(f) { return f.username; }).indexOf(user);
      this.friends.splice(removeIndex, 1);
    } else if (this.relation === 'isFriend' || this.relation === 'pending') {
      this.relation = 'notFriend';
    }
  }

  confirmFriend(user) {
    this.friendshipService.confirmFriend(user, this.authService.getSelfUsername());
    const confirmedIndex = this.friends.map(function(f) { return f.username; }).indexOf(user);
    this.friends[confirmedIndex].pending = false;
  }

  requestFriend() {
    this.friendshipService.requestFriend(this.authService.getSelfUsername(), this.username);
    this.relation = 'pending';
  }
}
