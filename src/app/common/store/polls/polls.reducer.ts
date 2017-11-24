import { IPoll } from '../../models/polls.model';
import * as actions from './actions/polls.actions';


export interface State {
  polls: IPoll[];
  currentPoll: IPoll;
}

export const initialState: State = {
  polls: [],
  currentPoll: null
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
    default: {
      return state;
    }
  }
}
