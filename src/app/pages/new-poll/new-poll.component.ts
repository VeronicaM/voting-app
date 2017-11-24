import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PollsStoreService, IPoll } from '../../common';
import appConstants from '../../common/app-constants';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss']
})
export class NewPollComponent implements OnInit {
  @HostBinding('class') classes = `newPoll ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  poll: IPoll = {
    text: '',
    options: ''
  };
  constructor(
    private pollStoreService: PollsStoreService) { }

  ngOnInit() {
  }

  createPoll() {
    this.pollStoreService.createPoll(this.poll);
  }
}
