import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: String;
  selfProfile: Boolean;
  friends = [
    {name: 'Abbass', online: true},
    {name: 'Javat', online: false}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.selfProfile = (this.username === this.authService.getSelfUsername());
  }
}
