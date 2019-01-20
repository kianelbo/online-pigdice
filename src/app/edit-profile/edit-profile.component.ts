import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  genders = ['male', 'female'];
  curPersonalData = {username: '', name: '', birthDate: '', gender: '', email: '', picture: ''};
  newPersonalData = {name: '', birthDate: '', email: ''};
  newAccountData = {username: '', password: ''};
  currentUsername: String;
  picture: File;

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
      res => this.router.navigate(['/users/' + this.currentUsername]),
      err => console.error(err));
  }

  updateAccount() {
    this.authService.updateAccount(this.newAccountData).subscribe(
      res => {
        localStorage.setItem('me', res.username);
        localStorage.setItem('myID', res._id);
        this.router.navigate(['/index']);
        window.location.reload();
      },
      err => console.error(err));
  }

  genderHandler(event: any) {
    this.newPersonalData['gender'] = event.target.value;
  }

  selectPicture(event) {
    this.picture = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#preview').attr('src', e.target['result']);
    };
    reader.readAsDataURL(this.picture);
  }

  uploadPicture() {
    this.authService.uploadPicture(this.currentUsername, this.picture);
  }
}
