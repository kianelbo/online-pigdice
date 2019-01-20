import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PlayingService {
  private socket = io('');

  constructor() { }

  onStarted() {
    this.socket.emit('started', {room: localStorage.getItem('room')});
  }

  onFinished(isWinner, username, result) {
    const data = {room: localStorage.getItem('room'), matchId: localStorage.getItem('lastMatchId')};
    username = username.startsWith('guest') ? 'guest' : username;
    if (isWinner) {
      data['winnerName'] = username;
    } else {
      data['loserName'] = username;
    }
    data['result'] = result;
    this.socket.emit('finished', data);
  }

  roll(n) {
    this.socket.emit('roll', {room: localStorage.getItem('room'), n: n});
  }

  hold() {
    this.socket.emit('hold', {room: localStorage.getItem('room')});
  }

  receiveDices() {
    return new Observable<{ diceArray: Array<number> }>(observer => {
      this.socket.on('receiveDices', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  changeTurns() {
    return new Observable<any>(observer => {
      this.socket.on('changeTurns', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
