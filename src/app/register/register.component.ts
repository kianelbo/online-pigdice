import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.registerUserData).subscribe(
      res => console.log(res),
      err => console.error(err));
  }
}
