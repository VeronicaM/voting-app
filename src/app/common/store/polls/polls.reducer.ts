import { IPoll } from '../../models/polls.model';
import * as actions from './actions/polls.actions';


export interface State {
  polls: IPoll[];
}

export const initialState: State = {
  polls: []
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
    default: {
      return state;
    }
  }
}
