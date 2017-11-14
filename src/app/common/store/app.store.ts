import * as login from './login/login.reducer';
import * as polls from './polls/polls.reducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

export interface AppState {
    polls: polls.PollState;
}


export const reducers = {
    login: login.reducer,
    polls: polls.reducer
};
