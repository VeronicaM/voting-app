import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PollDetailsComponent implements OnInit {
  poll = {
    text: 'First try',
    options: 'new, poll, options'
  };
  constructor() { }

  ngOnInit() {
  }

}
