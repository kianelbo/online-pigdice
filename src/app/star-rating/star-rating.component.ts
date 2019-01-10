import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() subject: String;
  @Output() playerRated = new EventEmitter<Number>();
  @Output() gameRated = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  rate(value: Number) {
    if (this.subject === 'player') {
      this.playerRated.emit(value);
    } else {
      this.gameRated.emit(value);
    }
  }
}
