import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  _genders = ['male', 'female'];
  newPersonalData = {};
  curPersonalData = {};
  currentUsername: String;

  constructor(private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService) { }

  ngOnInit() {
    this.currentUsername = this.authService.getSelfUsername();
    this.authService.getPersonal().subscribe(
      res => {
        res.birthdate = this.datePipe.transform(res.birthdate, 'yyyy-MM-dd');
        return this.curPersonalData = res;
      },
      err => console.error(err));
  }

  onCancel() {
    this.router.navigate(['/index']);
  }

  updatePersonal() {
    this.authService.updatePersonal(this.newPersonalData).subscribe(
      res => this.router.navigate(['/users/' + this.authService.getSelfUsername()]),
      err => console.error(err));
  }

  genderHandler(event: any) {
    this.newPersonalData['gender'] = event.target.value;
  }
}
