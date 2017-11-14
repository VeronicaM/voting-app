/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {PollsApi} from '../../../services/api/polls.api';

import * as pollsActions from '../actions/polls.actions';

@Injectable()
export class PollsEffects {
  constructor(
    private pollsApi: PollsApi,
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  getPolls$ = this.actions$
    .ofType(pollsActions.ActionTypes.GET_POLLS)
    .pipe(
    map((action: any) => action.payload),
    switchMap(() => this.pollsApi.all()
      .pipe(map(result => new pollsActions.GetPollsSuccess(result)))
    )
    );
}
