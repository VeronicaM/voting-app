/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {PollsApi} from '../../../services/api/polls.api';
import {NotificationService} from '../../../services/notification.service';
import appConstants from '../../../app-constants';
import * as pollsActions from '../actions/polls.actions';

@Injectable()
export class PollsEffects {
  constructor(
    private pollsApi: PollsApi,
    private actions$: Actions,
    private router: Router,
    private notificationService: NotificationService
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
  @Effect()
  createPoll$ = this.actions$
      .ofType(pollsActions.ActionTypes.CREATE_POLL)
      .pipe(
        map((action: any) => action.payload),
        switchMap((poll) => this.pollsApi.createPoll(poll)
            .pipe(map(result => {
                this.notificationService.notifySuccess('Poll successfully created'); 
                return  new pollsActions.CreatePollSuccess(result);
            }),
            catchError(error => {
                this.notificationService.notifyError('Poll could not be created');
                  return of( new pollsActions.CreatePollError(error));
              })
          )
        ));
  @Effect()
  createPollSuccess$ = this.actions$
        .ofType(pollsActions.ActionTypes.CREATE_POLL_SUCCESS)
        .pipe(
          map( (action: any) => action.payload),
          map( poll => {
             this.router.navigate([
               appConstants.routes.POLL_DETAILS,
               poll._id
             ]);
             return of(poll);
          }));
}
