import { Component, OnInit } from '@angular/core';
import { PollsStoreService } from '../../common/store';

@Component({
  selector: 'app-voting-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  polls = null;
  constructor(private pollService: PollsStoreService) {}

  ngOnInit() {
    this.pollService.getPolls();
    this.pollService.polls$.subscribe(polls => {
      if (polls.length !== 0) {
        this.polls = polls;
      }
    });
  }
}
