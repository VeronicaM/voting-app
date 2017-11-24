import { Action } from '@ngrx/store';
import { IPoll, IVote} from '../../../models/polls.model';
import { type } from '../../util';

export const ActionTypes = {
  GET_POLLS: type('[Polls] Get'),
  GET_POLLS_SUCCESS: type('[Polls] Get Success'),
  CREATE_POLL : type('[Polls] Create'),
  CREATE_POLL_SUCCESS : type('[Polls] create poll success'),
  CREATE_POLL_FAILURE : type('[Polls] create poll failure')
};

export class GetPolls implements Action {
  type = ActionTypes.GET_POLLS;
  constructor(public payload?) { }
}
export class GetPollsSuccess implements Action {
    type = ActionTypes.GET_POLLS_SUCCESS;
    constructor(public payload?: IPoll []) { }
  }
  export class CreatePoll implements Action {
    type = ActionTypes.CREATE_POLL;
    constructor(public payload?) { }
  }
  export class CreatePollSuccess implements Action {
    type = ActionTypes.CREATE_POLL_SUCCESS;
    constructor(public payload: IPoll) { }
  }
  export class CreatePollError implements Action {
    type = ActionTypes.CREATE_POLL_FAILURE;
    constructor (public payload?){}
  }

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPolls
    | GetPollsSuccess
    | CreatePoll
    | CreatePollSuccess;
