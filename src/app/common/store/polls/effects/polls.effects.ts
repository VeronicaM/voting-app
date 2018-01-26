/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PollsApi } from '../../../services/api/polls.api';
import { NotificationService } from '../../../services/notification.service';
import appConstants from '../../../app-constants';
import * as pollsActions from '../actions/polls.actions';
import { IPoll, ICurrentPoll } from '../../../models';
@Injectable()
export class PollsEffects {
  constructor(
    private pollsApi: PollsApi,
    private actions$: Actions,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  @Effect()
  getPolls$ = this.actions$.ofType(pollsActions.ActionTypes.GET_POLLS).pipe(
    map((action: any) => action.payload),
    switchMap(() =>
      this.pollsApi.all().pipe(
        map(result => {
          return new pollsActions.GetPollsSuccess(result);
        })
      )
    )
  );
  @Effect()
  getMyPolls$ = this.actions$
    .ofType(pollsActions.ActionTypes.GET_MY_POLLS)
    .pipe(
      map((action: any) => action.payload),
      switchMap(() =>
        this.pollsApi.getMyPolls().pipe(
          map(result => new pollsActions.GetMyPollsSuccess(result)),
          catchError(error => {
            this.notificationService.notifyError('Something went wrong');
            return of(new pollsActions.GetMyPollsError(error));
          })
        )
      )
    );
  @Effect()
  createPoll$ = this.actions$.ofType(pollsActions.ActionTypes.CREATE_POLL).pipe(
    map((action: any) => action.payload),
    switchMap(poll => {
      if (poll.options.split(',').length >= 2) {
        return this.pollsApi.createPoll(poll).pipe(
          map(result => {
            this.notificationService.notifySuccess('Poll successfully created');
            return new pollsActions.CreatePollSuccess(result);
          }),
          catchError(error => {
            this.notificationService.notifyError('Poll could not be created');
            return of(new pollsActions.CreatePollError(error));
          })
        );
      } else {
        this.notificationService.notifyError(
          'Please input at least two comma separated values'
        );
        return of(
          new pollsActions.CreatePollError(
            'Please input at least two comma separated values'
          )
        );
      }
    })
  );
  @Effect({ dispatch: false })
  createPollSuccess$ = this.actions$
    .ofType(pollsActions.ActionTypes.CREATE_POLL_SUCCESS)
    .pipe(
      map((action: any) => action.payload),
      map(poll => {
        this.router.navigate([appConstants.routes.POLL_DETAILS, poll._id]);
        return of(poll);
      })
    );
  @Effect()
  getCurrentPoll$ = this.actions$
    .ofType(pollsActions.ActionTypes.GET_CURRENT_POLL)
    .pipe(
      map((action: any) => action.payload),
      switchMap(currentPollId =>
        this.pollsApi
          .getCurrentPoll(currentPollId)
          .pipe(
            map(result => new pollsActions.GetCurrentPollSuccess(result)),
            catchError(error => of(new pollsActions.GetCurrentPollError(error)))
          )
      )
    );

  @Effect()
  voteOnPoll$ = this.actions$
    .ofType(pollsActions.ActionTypes.VOTE_ON_POLL)
    .pipe(
      map((action: any) => action.payload),
      switchMap(options =>
        this.pollsApi.voteOnPoll(options).pipe(
          map((result: ICurrentPoll) => {
            this.notificationService.notifySuccess(
              'You have successfully voted!'
            );
            return new pollsActions.VoteOnPollSuccess(result);
          }),
          catchError((error: any) => {
            this.notificationService.notifyError(error.error);
            return of(new pollsActions.VoteOnPollError(error));
          })
        )
      )
    );

  @Effect()
  deletePoll$ = this.actions$.ofType(pollsActions.ActionTypes.DELETE_POLL).pipe(
    map((action: any) => action.payload),
    switchMap(id =>
      this.pollsApi.deletePoll(id).pipe(
        map(() => {
          this.notificationService.notifySuccess('This poll has been deleted!');
          return new pollsActions.DeletePollSuccess(id);
        }),
        catchError((error: any) => {
          this.notificationService.notifyError(error.error);
          return of(new pollsActions.DeletePollError(error));
        })
      )
    )
  );
  @Effect({ dispatch: false })
  httpErrors$ = this.actions$
    .ofType(pollsActions.ActionTypes.GET_CURRENT_POLL_ERROR)
    .pipe(
      map((action: any) => action.payload),
      map(error => {
        this.notificationService.notifyError('Poll not found');
        this.router.navigate([appConstants.routes.POLLS]);
        return of(error);
      })
    );
}
