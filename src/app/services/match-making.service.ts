import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MatchMakingService {
  private socket = io('http://localhost:3000');

  constructor() { }

  enqueue(game, username) {
    this.socket.emit('enqueue', {game: game, username: username});
    localStorage.setItem('state', 'enqueued');
    localStorage.setItem('dequeueTimer', '0');
    const dequeueTimer = setInterval(() => {
        let curTime = parseInt(localStorage.getItem('dequeueTimer'), 10);
        curTime++;
        localStorage.setItem('dequeueTimer', String(curTime));
        if (localStorage.getItem('state') === 'decide') {
          return clearInterval(dequeueTimer);
        }
        if (curTime === 10) {
          this.socket.emit('dequeue', {game: game, username: username});
          clearInterval(dequeueTimer);
        }
      }
    , 1000);
  }

  requestPlayer(player1, player2, game) {
    localStorage.setItem('state', 'waiting');
    const room = player1 + ' ' + player2 + ' ' + game;
    this.socket.emit('requestSent', {room: room});
  }

  accept(data) {
    this.socket.emit('accept', data);
  }

  decline(data) {
    this.socket.emit('decline', data);
  }

  challengedCheck() {
    return new Observable<{ room: String }>(observer => {
      this.socket.on('challenged', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  requestReceived(data) {
    this.socket.emit('requestReceived', data);
  }

  opponentFound() {
    return new Observable<{ player1: String, player2: String, game: String, room: String }>(observer => {
      this.socket.on('foundOpponent', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  matchToBeStarted() {
    return new Observable<{ player1: String, player2: String, game: String, room: String }>(observer => {
      this.socket.on('starting', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  canceled() {
    return new Observable<{ player1: String, player2: String, game: String, room: String }>(observer => {
      this.socket.on('canceled', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  notFound() {
    return new Observable<{ username: String, game: String }>(observer => {
      this.socket.on('notFound', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
