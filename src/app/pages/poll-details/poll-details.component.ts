import { Component, OnInit } from '@angular/core';
import { IPoll } from '../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { PollsStoreService } from '../../common';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
})
export class PollDetailsComponent implements OnInit {
  currentPoll$: any;
  id: string;
  vote = { selected: '', custom: '' };
  private paramsSubscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollService: PollsStoreService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.pollService.get(this.id);
    this.currentPoll$ = this.pollService.currentPoll$;
  }
  makeChoice(value) {
    this.vote.selected = value;
    this.pollService.vote({ pollId: this.id, voteValue: value });
  }
  sharePoll(question) {
    let textToTweet = question + '  ' + window.location.href;
    if (textToTweet.length >= 140) {
      textToTweet = question.substring(0, 70) + '  ' + window.location.href;
    }
    const twtLink =
      'http://twitter.com/home?status=' + encodeURIComponent(textToTweet);
    window.open(twtLink, '_blank');
  }
}
