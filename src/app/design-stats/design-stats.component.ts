import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-design-stats',
  templateUrl: './design-stats.component.html',
  styleUrls: ['./design-stats.component.css']
})
export class DesignStatsComponent implements OnInit {
  designStats = [];
  myself: string;
  selectedGameComments = [];
  totalGamesDesigned: number;
  gTotalPlayed = 0;
  gAvgRating = 0;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.myself = this.authService.getSelfUsername();
    this.authService.getDesignStats().subscribe(res => {
      this.designStats = res;
      this.totalGamesDesigned = this.designStats.length;
      this.designStats.forEach(g => {
        this.gTotalPlayed += g.totalPlayed;
        this.gAvgRating += g.avgRating;
      });
      this.gAvgRating /= this.totalGamesDesigned;
      this.selectedGameComments = this.designStats[0].comments;
    }, err => console.error(err));
  }

  selectGame(i) {
    this.selectedGameComments = this.designStats[i].comments;
  }
}
