import {Component, Input, OnInit} from '@angular/core';
import { MatchMakingService } from '../services/match-making.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-match-maker',
  templateUrl: './match-maker.component.html',
  styleUrls: ['./match-maker.component.css']
})
export class MatchMakerComponent implements OnInit {
  @Input() selfRef: any;
  @Input() mode: string;
  @Input() gameName: string;
  myUsername: String;

  constructor(private matchMakingService: MatchMakingService,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.myUsername = this.authService.getSelfUsername();
    } else {
      this.myUsername = 'guest' + Math.floor(Math.random() * 1000);
    }
    this.matchMakingService.enqueue(this.myUsername, this.gameName).subscribe(
      res => {
        console.log(res);
        if (res === 'oops') {
          this.mode = 'not-found';
          setTimeout(() => this.selfRef.destroy(), 2500);
        } else {
          this.mode = 'accept';
          console.log(res);
        }
      }, err => console.error(err));
  }

}
