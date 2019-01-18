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
  genders = ['male', 'female'];
  newPersonalData = {};
  newAccountData = {};
  curPersonalData = {};
  currentUsername: String;

  constructor(private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService) { }

  ngOnInit() {
    this.currentUsername = this.authService.getSelfUsername();
    this.authService.getPersonal().subscribe(
      res => {
        res.birthDate = this.datePipe.transform(res.birthDate, 'yyyy-MM-dd');
        return this.curPersonalData = res;
      },
      err => console.error(err));
  }

  onCancel() {
    this.router.navigate(['/users/' + this.authService.getSelfUsername()]);
  }

  updatePersonal() {
    this.authService.updatePersonal(this.newPersonalData).subscribe(
      res => this.router.navigate(['/users/' + this.authService.getSelfUsername()]),
      err => console.error(err));
  }

  updateAccount() {
    this.authService.updateAccount(this.newAccountData).subscribe(
      res => {
        window.location.reload();
        this.router.navigate(['/index']);
      },
      err => console.error(err));
  }

  genderHandler(event: any) {
    this.newPersonalData['gender'] = event.target.value;
  }
}
