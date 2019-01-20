import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomGameService } from '../services/custom-game.service';

@Component({
  selector: 'app-design-game',
  templateUrl: './design-game.component.html',
  styleUrls: ['./design-game.component.css']
})
export class DesignGameComponent implements OnInit {
  gameFormData = {name: '', winScore: '', blackDices: [], diceCount: '', limit: ''};
  blackDices = ['1'];

  constructor(private router: Router,
              private customGameService: CustomGameService) { }

  ngOnInit() {
  }

  onSubmit() {
    const gameData = {
      name: this.gameFormData['name'],
      creator: localStorage.getItem('myID'),
      winScore: this.gameFormData['winScore'],
      diceCount: this.gameFormData['diceCount'],
      blackDices: this.blackDices,
      limit: this.gameFormData['limit']
    };
    this.customGameService.createCustom(gameData).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/index']);
      },
      err => console.error(err));
  }

  onCancel() {
    this.router.navigate(['/index']);
  }

  blackDicesHandler(event) {
    if (event.target.checked) {
      this.blackDices.push(event.target.value);
    } else {
      this.blackDices.splice(this.blackDices.indexOf(event.target.value, 0), 1);
    }
  }
}
