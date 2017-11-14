import { Action } from '@ngrx/store';
export interface PollState {
    polls: string[];
}

export function reducer(state: string = 'Hello World', action: Action) {
    switch (action.type) {
        case 'SPANISH':
            return state = 'Hola Mundo'
        case 'FRENCH':
            return state = 'Bonjour le monde'
        default:
            return state;
    }
}