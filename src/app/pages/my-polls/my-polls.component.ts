import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {PollsStoreService} from '../../common/store';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyPollsComponent implements OnInit {
  createdPolls;
  votedPolls;
  constructor(private pollService: PollsStoreService) { }

  ngOnInit() {
    this.pollService.getMyPolls();
    this.pollService.myPolls$.subscribe(mypolls => {
        this.createdPolls = mypolls.createdPolls;
        this.votedPolls = mypolls.votedPolls;
    });
  }

}
