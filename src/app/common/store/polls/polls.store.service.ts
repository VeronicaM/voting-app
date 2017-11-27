import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as pollsActions from './actions/polls.actions';
import {LoginApi} from '../../services/api/login.api';
import {
    getPolls,
    getCurrentPoll,
    getVoted
} from '../app.selectors';

@Injectable()
export class PollsStoreService {
    polls$ = this.store.select(getPolls);
    currentPoll$ = this.store.select(getCurrentPoll);
    voted$ = this.store.select(getVoted);
    constructor(private store: Store<reducers.AppState>, private loginApi: LoginApi) { }

    getPolls() {
        this.store.dispatch(new pollsActions.GetPolls());
    }

    createPoll(poll) {
        this.store.dispatch(new pollsActions.CreatePoll(poll));
    }
    get(id) {
        this.store.dispatch(new pollsActions.GetCurrentPoll(id));
    }
    vote(options) {
        options = {...options, user: this.loginApi.getCurrentUser()};
        this.store.dispatch(new pollsActions.VoteOnPoll(options));
    }
}
