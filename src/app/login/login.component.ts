import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {username: '', password: ''};
  loginFailed = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('me', res.username);
        localStorage.setItem('myID', res._id);
        console.log(res.username);
        this.router.navigate(['/index']);
        window.location.reload();
      },
      err => {
        this.loginFailed = true;
        console.error(err);
      });
  }
}
