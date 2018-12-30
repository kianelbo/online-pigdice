import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  games = [
    {
      '_id': '1',
      'name': 'default',
      'rating': 3.4,
      'totalPlayed': 32,
      'nowPlaying': 2,
      'creator': 'Gholi',
      'createDate': '2012-04-23T18:25:43.511Z',
      'comments': [{'username': 'Sughra', 'text': 'awful', 'rating': 2.4}, {'username': 'Kubra', 'text': 'awsum', 'rating': 4.2}],
      'rules': {'winScore': 100, 'blackDices': [1], 'diceCount': 1, 'limit': 0}
    },
    {
      '_id': '2',
      'name': 'custom1',
      'rating': 3.4,
      'totalPlayed': 32,
      'nowPlaying': 2,
      'creator': 'Abbass',
      'createDate': '2012-04-23T18:25:43.511Z',
      'comments': [{'username': 'lili', 'text': 'ah ah', 'rating': 1.0}, {'username': 'gigi', 'text': 'bah bah', 'rating': 5.0}],
      'rules': {'winScore': 120, 'blackDices': [1, 6], 'diceCount': 2, 'limit': 0}
    }
  ];
  users = ['Gholam', 'Javat'];
  comments = [];
  selectedGame = {};

  constructor() { }

  ngOnInit() {
    this.selectedGame = this.games[0];
  }

  updateComments(comments) {
    this.comments = comments;
  }

  selectGame(game) {
    this.selectedGame = game;
  }
}
