import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      res => console.log(res),
      err => console.error(err));
  }
}
