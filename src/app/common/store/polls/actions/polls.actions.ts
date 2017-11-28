import { Action } from '@ngrx/store';
import { IPoll, IVote} from '../../../models/polls.model';
import { type } from '../../util';

export const ActionTypes = {
  GET_POLLS: type('[Polls] Get'),
  GET_POLLS_SUCCESS: type('[Polls] Get Success'),
  CREATE_POLL : type('[Polls] Create'),
  CREATE_POLL_SUCCESS : type('[Polls] create poll success'),
  CREATE_POLL_FAILURE : type('[Polls] create poll failure'),
  GET_CURRENT_POLL : type('[Polls] get current poll'),
  GET_CURRENT_POLL_SUCCESS : type('[Polls] get current poll success'),
  GET_CURRENT_POLL_ERROR : type('[Polls] get current poll error'),
  VOTE_ON_POLL: type('[Polls] vote on poll' ),
  VOTE_ON_POLL_SUCCESS: type('[Polls] vote on poll succsess'),
  VOTE_ON_POLL_ERROR : type('[Polls] vote on poll error' ),
  GET_MY_POLLS: type('[Polls] get my polls'),
  GET_MY_POLLS_SUCCESS: type('[Polls] get my polls success'),
  GET_MY_POLLS_ERROR : type('[Polls] get my polls error')
};

export class GetPolls implements Action {
  type = ActionTypes.GET_POLLS;
  constructor(public payload?) { }
}
export class GetPollsSuccess implements Action {
    type = ActionTypes.GET_POLLS_SUCCESS;
    constructor(public payload?: IPoll []) { }
  }
  export class GetMyPolls implements Action {
    type = ActionTypes.GET_MY_POLLS;
    constructor(public payload?) { }
  }
  export class GetMyPollsSuccess implements Action {
      type = ActionTypes.GET_MY_POLLS_SUCCESS;
      constructor(public payload?: IPoll []) { }
    }
  export class GetMyPollsError implements Action {
      type = ActionTypes.GET_MY_POLLS_ERROR;
      constructor(public payload?) { }
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
    constructor (public payload?) { }
  }
  export class GetCurrentPoll implements Action {
     type = ActionTypes.GET_CURRENT_POLL;
     constructor(public payload: string) { }
  }
  export class GetCurrentPollSuccess implements Action {
    type = ActionTypes.GET_CURRENT_POLL_SUCCESS;
    constructor(public payload: IPoll) { }
 }

 export class GetCurrentPollError implements Action {
  type = ActionTypes.GET_CURRENT_POLL_ERROR;
  constructor(public payload: any) { }
}
export class VoteOnPoll implements Action {
   type = ActionTypes.VOTE_ON_POLL;
   constructor(public payload:{pollId: string, voteValue: string}) {}
}
export class VoteOnPollSuccess implements Action {
   type = ActionTypes.VOTE_ON_POLL_SUCCESS;
   constructor(public payload: IPoll) { }
}
export class VoteOnPollError implements Action {
  type = ActionTypes.VOTE_ON_POLL_ERROR;
  constructor(public payload?: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPolls
    | GetPollsSuccess
    | CreatePoll
    | CreatePollSuccess
    | CreatePollError
    | GetCurrentPoll
    | GetCurrentPollSuccess
    | GetCurrentPollError
    | VoteOnPoll
    | VoteOnPollSuccess
    | VoteOnPollError;
