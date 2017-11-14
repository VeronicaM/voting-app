import { Action } from '@ngrx/store';
import { IPoll, IVote} from '../../../models/polls.model';
import { type } from '../../util';

export const ActionTypes = {
  GET_POLLS: type('[Polls] Get'),
  GET_POLLS_SUCCESS: type('[Polls] Get Success')
};

export class GetPolls implements Action {
  type = ActionTypes.GET_POLLS;
  constructor(public payload?) { }
}
export class GetPollsSuccess implements Action {
    type = ActionTypes.GET_POLLS_SUCCESS;
    constructor(public payload?: IPoll []) { }
  }
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPolls
    | GetPollsSuccess;
