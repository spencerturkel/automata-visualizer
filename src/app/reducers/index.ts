import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Actions, NEW_GRAMMAR} from '../actions/index';
import {Grammar} from '../models/grammar';
import {GrammarRule} from '../models/grammar-rule';

export type State<NonTerminal extends string, Terminal extends string>
    = EntityState<GrammarRule<NonTerminal, Terminal>>;

export const grammarAsState =
    <NonTerminal extends string, Terminal extends string>
    (grammar: Grammar<NonTerminal, Terminal>): State<NonTerminal, Terminal> => ({
        entities: grammar.rules as any as Record<string, GrammarRule<NonTerminal, Terminal>>,
        ids: grammar.nonTerminals,
    });

const adapter = createEntityAdapter<GrammarRule<any, any>>({
    selectId: rule => rule.nonTerminal,
});

export const initialState = adapter.getInitialState();

export function reducer<NonTerminal extends string,
    Terminal extends string,
    NextNonTerminal extends string,
    NextTerminal extends string>
(
    state: State<NonTerminal, Terminal> | undefined = initialState,
    action: Actions<NextNonTerminal, NextTerminal>,
): State<NonTerminal, Terminal> | State<NextNonTerminal, NextTerminal> {
    switch (action.type) {
        case NEW_GRAMMAR:
            return grammarAsState(action.grammar);
        default:
            return state;
    }
}

export const selectGrammar =
    <NonTerminal extends string, Terminal extends string>
    ({entities, ids}: State<NonTerminal, Terminal>): Grammar<NonTerminal, Terminal> => ({
        nonTerminals: entities as any,
        rules: ids as any,
    });
