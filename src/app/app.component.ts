import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myProfile: String;

  constructor(private authService: AuthService,
              public router: Router) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.myProfile = '/users/' + this.authService.getSelfUsername();
    } else {
      localStorage.setItem('me', 'guest' + Math.floor(Math.random() * 1000));
    }
  }
}
