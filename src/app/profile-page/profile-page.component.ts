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
    // obtains the profile's owner from url
    this.username = this.route.snapshot.paramMap.get('username');

    // checks if this users exists

    // get the relation of the client and the profile's owner
    if (this.username === this.authService.getSelfUsername()) {
      this.relation = 'myself';
    } else {
      this.friendshipService.getRelation(this.username, this.authService.getSelfUsername()).subscribe(res => this.relation = res,
        err => console.error(err));
    }

    // get personal information and reformat the date
    this.authService.getPersonal(this.username).subscribe(
      res => {
        res.birthDate = this.datePipe.transform(res.birthDate, 'yyyy-MM-dd');
        this.personal = res;
      }, err => this.router.navigate(['/not-found']));

    // list of friends and request
    if (this.relation === 'myself') {
      this.friendshipService.getFriendsPending(this.username).subscribe(
        res => res.forEach((f) => {
          this.authService.isOnline(f).subscribe(
            isOnline => this.friends.push({username: f, pending: true, isOnline: isOnline}), err => console.error(err));
        }), err => console.error(err));
    }

    this.friendshipService.getFriendsList(this.username).subscribe(
      res => res.forEach((f) => {
        this.authService.isOnline(f).subscribe(
          isOnline => this.friends.push({username: f, pending: false, isOnline: isOnline}), err => console.error(err));
      }), err => console.error(err));
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
