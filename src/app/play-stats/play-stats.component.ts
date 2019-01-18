import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-play-stats',
  templateUrl: './play-stats.component.html',
  styleUrls: ['./play-stats.component.css']
})
export class PlayStatsComponent implements OnInit {
  playStats = {};
  myself: string;
  selectedMatchComments = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.myself = this.authService.getSelfUsername();
    this.authService.getPlayStats().subscribe(res => {
      this.playStats = res;
      this.playStats['matches'].forEach(m => {
        const scores = m.result.split(' ');
        if (parseInt(scores[0], 10) > parseInt(scores[1], 10)) {
          m.playersStr = m.winnerName + ' - ' + m.loserName;
        } else {
          m.playersStr = m.loserName + ' - ' + m.winnerName;
        }
        m.result = m.result.replace(' ', ' : ');
        m.isWinner = m.winnerName === this.myself;
      });
      this.selectedMatchComments = this.playStats['matches'][0].comments;
    }, err => console.error(err));
  }

  selectMatch(i) {
    this.selectedMatchComments = this.playStats['matches'][i].comments;
  }
}
