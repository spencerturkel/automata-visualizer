import {Actions, NEW_GRAMMAR} from '../actions';
import {Grammar} from '../models/grammar';

export type State<NonTerminal extends string, Terminal extends string> = Grammar<NonTerminal, Terminal>;

export const initialState: State<'S', ''> = {
    nonTerminals: ['S'],
    start: 'S',
    rules: [
        {
            nonTerminal: 'S',
            production: '',
        },
    ],
};

export function reducer<NonTerminal extends string,
    Terminal extends string,
    NextNonTerminal extends string,
    NextTerminal extends string>
(
    state: State<NonTerminal, Terminal> | undefined = initialState as any,
    action: Actions<NextNonTerminal, NextTerminal>,
): State<NonTerminal, Terminal> | State<NextNonTerminal, NextTerminal> {
    switch (action.type) {
        case NEW_GRAMMAR:
            return action.grammar;
        default:
            return state;
    }
}
