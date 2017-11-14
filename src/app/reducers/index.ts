import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromGrammar from './grammar';

export interface State<NonTerminal extends string, Terminal extends string> {
    grammar: fromGrammar.State<NonTerminal, Terminal>;
}

export const reducers: ActionReducerMap<State<any, any>> = {
    grammar: fromGrammar.reducer,
};

export const selectGrammar = createFeatureSelector<fromGrammar.State<any, any>>('grammar');

export const selectGrammarPDADot = createSelector(selectGrammar, fromGrammar.selectPDADot);

export const selectGrammarDPDADot = createSelector(selectGrammar, fromGrammar.selectDPDADot);

export const selectGrammarNFADot = createSelector(selectGrammar, fromGrammar.selectNFADot);

export const selectGrammarDFADot = createSelector(selectGrammar, fromGrammar.selectDFADot);
