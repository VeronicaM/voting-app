import { State } from './polls.reducer';

export const getPolls = (state: State) => state.polls;
export const getCurrentPoll = (state: State) => state.currentPoll;
export const voted = (state: State) => state.voted;
