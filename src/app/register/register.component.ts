import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('me', res.username);
        this.router.navigate(['/index']);
      },
      err => console.error(err));
  }
}
