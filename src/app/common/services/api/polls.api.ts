import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import { IPoll, IVote, ICurrentPoll } from '../../models';

@Injectable()
export class PollsApi {
  constructor(private http: HttpClient) {}
  all(): Observable<IPoll[]> {
    return this.http.get<IPoll[]>('/api/polls/').pipe(
      map(polls =>
        polls.map(poll => {
          return {
            _id: poll._id,
            text: poll.text,
            options: poll.options,
            updatedAt: poll.updatedAt,
            votes: poll.votes.map(vote => {
              return {
                option: vote.option,
                value: vote.value,
              };
            }),
          };
        })
      )
    );
  }
  getMyPolls() {
    return this.http.get('/api/users/polls');
  }
  createPoll(newPoll) {
    return this.http.post<IPoll>('/api/polls', newPoll);
  }
  deletePoll(id) {
    return this.http.delete(`/api/polls/${id}`);
  }
  getCurrentPoll(id): Observable<ICurrentPoll> {
    return this.http.get<IPoll>('/api/polls/' + id).pipe(
      map(currentPoll => {
        return this.parseToCurrentPoll(currentPoll);
      })
    );
  }
  voteOnPoll({ pollId, voteValue, user }) {
    return this.http.put('api/polls/' + pollId, { voteValue, user }).pipe(
      map(currentPoll => {
        return this.parseToCurrentPoll(currentPoll);
      })
    );
  }
  parseToCurrentPoll(currentPoll) {
    const values = [];
    currentPoll.votes.forEach(v => {
      if (!values[v.value]) {
        values[v.value] = 0;
      }
      ++values[v.value];
    });
    return {
      ...currentPoll,
      votesValues: Object.values(values),
      optionsValues: Object.keys(values),
    };
  }
}
