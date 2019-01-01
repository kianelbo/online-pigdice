import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: String;
  selfProfile: Boolean;
  personal = {};
  friends = [
    {name: 'Abbass', online: true},
    {name: 'Javat', online: false}
  ];

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.selfProfile = (this.username === this.authService.getSelfUsername());
    this.authService.getPersonal().subscribe(
      res => {
        res.birthdate = this.datePipe.transform(res.birthdate, 'yyyy-MM-dd');
        return this.personal = res;
      },
      err => console.error(err));
  }
}
