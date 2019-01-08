import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchMakingService } from '../services/match-making.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-match-maker',
  templateUrl: './match-maker.component.html',
  styleUrls: ['./match-maker.component.css']
})
export class MatchMakerComponent implements OnInit {
  myUsername: String;
  upcomingMatch = {};

  constructor(private router: Router,
              private matchMakingService: MatchMakingService,
              private authService: AuthService) {
    this.matchMakingService.opponentFound().subscribe(data => {
      localStorage.setItem('state', 'decide');
      this.upcomingMatch = data;
    });
    if (this.authService.loggedIn()) {
      this.matchMakingService.challengedCheck().subscribe(data => {
        if (data.room.split(' ')[1] === this.myUsername) {
          localStorage.setItem('state', 'decide');
          this.upcomingMatch = data;
          matchMakingService.requestReceived(data);
        }
      });
    }
    this.matchMakingService.matchToBeStarted().subscribe(data => {
      localStorage.setItem('room', String(data.room));
      localStorage.setItem('state', 'none');
      this.router.navigate(['/play']);
    });
    this.matchMakingService.canceled().subscribe(data => {
      localStorage.setItem('state', 'canceled');
    });
    this.matchMakingService.notFound().subscribe(data => {
      localStorage.setItem('state', 'notFound');
    });
  }

  ngOnInit() {
    this.myUsername = this.authService.getSelfUsername();
  }

  accept() {
    this.matchMakingService.accept(this.upcomingMatch);
    localStorage.setItem('state', 'waiting');
  }

  decline() {
    this.matchMakingService.decline(this.upcomingMatch);
  }

  dismiss() {
    localStorage.setItem('state', 'none');
  }

  getMode() {
    return localStorage.getItem('state');
  }
}
