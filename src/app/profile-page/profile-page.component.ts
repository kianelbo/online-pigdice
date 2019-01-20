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
  id: String;
  selfUsername: String;
  selfID: String;
  relation: String;
  personal = {picture: '', isOnline: 'offline', name: '', gender: '', birthDate: '', email: ''};
  friends = [];

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private friendshipService: FriendshipService) { }

  ngOnInit() {
    // obtains the client's identity
    this.selfUsername = this.authService.getSelfUsername();
    this.selfID = this.authService.getSelfID();

    this.username = this.route.snapshot.paramMap.get('username');
    this.authService.getID(this.username).subscribe(id => {
      // obtains the profile's owner from url
      this.id = id;

      // get the relation of the client and the profile's owner
      if (this.username === this.selfUsername) {
        this.relation = 'myself';
      } else {
        this.friendshipService.getRelation(this.selfID, this.id).subscribe(res => this.relation = res, err => console.error(err));
      }

      // get personal information and reformat the date
      this.authService.getPersonal(this.username).subscribe(res => {
        res.birthDate = this.datePipe.transform(res.birthDate, 'yyyy-MM-dd');
        this.personal = res;
      }, () => this.router.navigate(['/not-found']));

      // list of friends and request
      if (this.relation === 'myself') {
        this.friendshipService.getFriendsPending(this.id).subscribe(
          res => res.forEach((f) => this.friends.push(f)), err => console.error(err));
      }
      this.friendshipService.getFriendsList(this.id).subscribe(
        res => res.forEach((f) => this.friends.push(f)), err => console.error(err));
    });
  }

  unfriend(userId) {
    this.friendshipService.unfriend(this.selfID, userId);
    if (this.relation === 'myself') {
      const removeIndex = this.friends.map(function(f) { return f._id; }).indexOf(userId);
      this.friends.splice(removeIndex, 1);
    } else if (this.relation === 'isFriend' || this.relation === 'pending') {
      this.relation = 'notFriend';
    }
  }

  confirmFriend(userId) {
    this.friendshipService.confirmFriend(userId, this.selfID);
    const confirmedIndex = this.friends.map(function(f) { return f._id; }).indexOf(userId);
    this.friends[confirmedIndex].pending = false;
  }

  requestFriend() {
    this.friendshipService.requestFriend(this.selfID, this.id);
    this.relation = 'pending';
  }
}
