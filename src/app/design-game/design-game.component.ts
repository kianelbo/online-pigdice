import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-game',
  templateUrl: './design-game.component.html',
  styleUrls: ['./design-game.component.css']
})
export class DesignGameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.router.navigate(['/index']);
  }
}
