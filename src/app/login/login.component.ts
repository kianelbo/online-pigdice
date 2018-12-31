import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/index']);
      },
      err => console.error(err));
  }
}
