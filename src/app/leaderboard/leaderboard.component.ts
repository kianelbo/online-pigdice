import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      res => this.users = res,
      err => console.error(err));
  }

}
