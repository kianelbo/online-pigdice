import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selfData = {name: 'Gholi', email: 'gh@gh.com', username: 'Gholi'};

  constructor() { }

  ngOnInit() {
  }

}
