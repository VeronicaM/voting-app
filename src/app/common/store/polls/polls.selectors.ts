import { State } from './polls.reducer';

export const getPolls = (state: State) => state.polls;
export const getCurrentPoll: any = (state: State) => state.currentPoll;
export const getMyPolls = (state: State) => state.myPolls;
