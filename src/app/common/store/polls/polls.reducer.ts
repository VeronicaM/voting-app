import { IPoll } from '../../models/polls.model';
import * as actions from './actions/polls.actions';


export interface State {
  polls: IPoll[];
  currentPoll: IPoll;
  voted: boolean;
}

export const initialState: State = {
  polls: [],
  currentPoll: null,
  voted: false
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.GET_POLLS_SUCCESS:
      return Object.assign({}, state, {
        polls: action.payload
      });
    case actions.ActionTypes.CREATE_POLL_SUCCESS:
      return Object.assign({}, state, {
      polls: [...state.polls, action.payload]
      });
    case actions.ActionTypes.GET_CURRENT_POLL_SUCCESS:
      return Object.assign({}, state, {
        currentPoll: action.payload
    });
    case actions.ActionTypes.VOTE_ON_POLL_SUCCESS:
    return Object.assign({}, state, {
        voted: true,
        currentPoll: action.payload
    });
    case actions.ActionTypes.VOTE_ON_POLL_ERROR:
    return Object.assign({}, state, {
        voted: true
    });
    default: {
      return state;
    }
  }
}
