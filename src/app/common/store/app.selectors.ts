import { createSelector } from 'reselect';
import { AppState } from './app.store';

import * as pollSelectors from './polls/polls.selectors';

export const getPollState = (state: AppState) => state.polls;

// Polls selectors

export const getPolls = createSelector(getPollState, pollSelectors.getPolls);
export const getCurrentPoll = createSelector(getPollState, pollSelectors.getCurrentPoll);
export const getVoted = createSelector(getPollState, pollSelectors.voted);
