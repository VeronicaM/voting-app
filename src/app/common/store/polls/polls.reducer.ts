import { IPoll } from '../../models/polls.model';
import * as actions from './actions/polls.actions';

export interface State {
  polls: IPoll[];
  currentPoll: IPoll;
  myPolls: any;
}

export const initialState: State = {
  polls: [],
  currentPoll: null,
  myPolls: [],
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case actions.ActionTypes.GET_POLLS_SUCCESS:
      return { ...state, polls: action.payload };
    case actions.ActionTypes.GET_MY_POLLS_SUCCESS:
      return { ...state, myPolls: action.payload };
    case actions.ActionTypes.CREATE_POLL_SUCCESS:
      return { ...state, polls: [...state.polls, action.payload] };
    case actions.ActionTypes.GET_CURRENT_POLL:
      return { ...state, currentPoll: null };
    case actions.ActionTypes.GET_CURRENT_POLL_SUCCESS:
      return { ...state, currentPoll: action.payload };
    case actions.ActionTypes.VOTE_ON_POLL_SUCCESS:
      return { ...state, currentPoll: action.payload };
    default: {
      return state;
    }
  }
}
