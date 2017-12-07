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
    // .pipe(map(polls => polls.createdPolls.map(poll => {
    //     return {
    //         _id: poll._id,
    //         text: poll.text,
    //         options: poll.options,
    //         votes: poll.votes.map(vote => {
    //             return {
    //                 option: vote.option,
    //                 value: vote.value
    //             };
    //         })
    //     };
    // })));
  }
  createPoll(newPoll) {
    return this.http.post<IPoll>('/api/polls', newPoll);
  }
  getCurrentPoll(id): Observable<ICurrentPoll> {
    return this.http.get<IPoll>('/api/polls/' + id).pipe(
      map(currentPoll => {
        const values = [];
        currentPoll.votes.forEach(v => {
          if (!values[v.value]) {
            values[v.value] = 0;
          }
          ++values[v.value];
        });
        console.log('poll values ', Object.values(values));
        console.log('poll options ', Object.keys(values));
        return {
          ...currentPoll,
          votesValues: Object.values(values),
          optionsValues: Object.keys(values),
        };
      })
    );
  }
  voteOnPoll({ pollId, voteValue, user }) {
    return this.http.put('api/polls/' + pollId, { voteValue, user });
  }
}
