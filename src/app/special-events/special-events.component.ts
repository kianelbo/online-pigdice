import { Component, OnInit } from '@angular/core';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => console.error(err));
  }

}
