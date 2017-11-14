import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../app.store';
import * as pollsActions from './actions/polls.actions';

import {
    getPolls
} from '../app.selectors';

@Injectable()
export class PollsStoreService {
    polls$ = this.store.select(getPolls);
    constructor(private store: Store<reducers.AppState>) { }

    getPolls() {
        this.store.dispatch(new pollsActions.GetPolls());
    }
}
