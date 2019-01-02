import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  onlineUsers = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getOnlineUsers().subscribe(
      res => this.onlineUsers = res,
      err => console.error(err));
  }

}
