import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomGameService } from '../services/custom-game.service';

@Component({
  selector: 'app-design-game',
  templateUrl: './design-game.component.html',
  styleUrls: ['./design-game.component.css']
})
export class DesignGameComponent implements OnInit {
  gameFormData = {};

  constructor(private router: Router,
              private customGameService: CustomGameService) { }

  ngOnInit() {
  }

  onSubmit() {
    const blackDices = this.gameFormData['blackDices'].split(' ').map(Number);
    const gameData = {
      name: this.gameFormData['name'],
      creator: localStorage.getItem('me'),
      rules: {
        winScore: this.gameFormData['winScore'],
        diceCount: this.gameFormData['diceCount'],
        blackDices: blackDices,
        limit: this.gameFormData['limit']
      }
    };
    console.log(gameData);
    this.customGameService.createCustom(gameData).subscribe(
      res => {
        console.log('custom game created');
        console.log(res);
        this.router.navigate(['/index']);
      },
      err => console.error(err));
  }

  onCancel() {
    this.router.navigate(['/index']);
  }
}
