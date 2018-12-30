import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: String;
  selfProfile = true;
  friends = [
    {name: 'Abbass', online: true},
    {name: 'Javat', online: false}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  gotoEdit() {
    this.router.navigate(['/editprofile']);
  }
}
