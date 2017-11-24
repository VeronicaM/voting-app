import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import {
  IPoll,
  IVote
} from '../../models';


@Injectable()
export class PollsApi {
  constructor(private http: HttpClient) { }
  all(): Observable<IPoll[]> {
    return this.http.get<IPoll[]>('/api/polls/')
    .pipe(map(polls => polls.map(poll => {
        return {
            _id: poll._id,
            text: poll.text,
            options: poll.options,
            votes: poll.votes.map(vote => {
                return {
                    option: vote.option,
                    value: vote.value
                };
            })
        };
    })));
  }
  createPoll(newPoll) {
      return this.http.post<IPoll>('/api/polls', newPoll);
  }
  getCurrentPoll(id) {
    return this.http.get<IPoll>('/api/polls/' + id);
  }
}
