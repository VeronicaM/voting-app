import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PollsStoreService } from '../../common/store';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyPollsComponent implements OnInit {
  createdPolls = null;
  votedPolls = null;
  constructor(private pollService: PollsStoreService) {}

  ngOnInit() {
    this.pollService.getMyPolls();
    this.pollService.myPolls$.subscribe(mypolls => {
      if (mypolls.length !== 0) {
        if (mypolls.createdPolls.length !== 0) {
          this.createdPolls = mypolls.createdPolls;
        }
        if (mypolls.votedPolls.length !== 0) {
          this.votedPolls = mypolls.votedPolls;
        }
      }
    });
  }
  deletePoll(id) {
    const deletePoll = confirm('Are you sure you want to delete this poll ?');
    if (deletePoll) {
      this.pollService.deletePoll(id);
    }
  }
}
