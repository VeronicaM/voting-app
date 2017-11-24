import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as pollsActions from './actions/polls.actions';

import {
    getPolls,
    getCurrentPoll
} from '../app.selectors';

@Injectable()
export class PollsStoreService {
    polls$ = this.store.select(getPolls);
    currentPoll$ = this.store.select(getCurrentPoll);
    constructor(private store: Store<reducers.AppState>) { }

    getPolls() {
        this.store.dispatch(new pollsActions.GetPolls());
    }

    createPoll(poll) {
        this.store.dispatch(new pollsActions.CreatePoll(poll));
    }
    get(id) {
        this.store.dispatch(new pollsActions.GetCurrentPoll(id));
    }
}
