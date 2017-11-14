import {Actions, NEW_GRAMMAR} from '../actions';
import {Grammar} from '../models/grammar';
import {PushdownAutomata} from '../models/pushdown-automata';
import {DeterministicPushdownAutomata} from '../models/deterministic-pushdown-automata';
import {NonDeterministicFiniteAutomata} from '../models/nondeterministic-finite-automata';
import {DeterministicFiniteAutomata} from '../models/deterministic-finite-automata';
import {DotSource} from '../models/dot-source';
import {createSelector} from '@ngrx/store';

export type State<NonTerminal extends string, Terminal extends string> = Grammar<NonTerminal, Terminal>;

export const initialState: State<'S', ''> = [
    {
        nonTerminal: 'S',
        production: [''],
    },
];

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

export const selectPDA:
    <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
        PushdownAutomata<'start' | 'rules' | 'done', Terminal, NonTerminal | Terminal>
    = null as any; // TODO Section 7.2 Theorem 7.1

export const PDAToDot:
    <PDAState extends string, Input extends string, Stack extends string>
    (pda: PushdownAutomata<PDAState, Input, Stack>) =>
        DotSource
    = null as any; // TODO

export const selectPDADot = createSelector(selectPDA, PDAToDot);

export const selectDPDA:
    <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
        DeterministicPushdownAutomata<any, Terminal, NonTerminal | Terminal>
    = null as any; // TODO

export const DPDAToDot:
    <DPDAState extends string, Input extends string, Stack extends string>
    (dpda: DeterministicPushdownAutomata<DPDAState, Input, Stack>) =>
        DotSource
    = null as any; // TODO

export const selectDPDADot = createSelector(selectDPDA, DPDAToDot);

export const selectNFA:
    <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
        NonDeterministicFiniteAutomata<any, Terminal>
    = null as any; // TODO

export const NFAToDot:
    <NFAState extends string, Input extends string>
    (nfa: NonDeterministicFiniteAutomata<NFAState, Input>) =>
        DotSource
    = null as any; // TODO

export const selectNFADot = createSelector(selectNFA, NFAToDot);

export const selectDFA:
    <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
        DeterministicFiniteAutomata<any, Terminal>
    = null as any; // TODO

export const DFAToDot:
    <DFAState extends string, Input extends string>
    (dfa: NonDeterministicFiniteAutomata<DFAState, Input>) =>
        DotSource
    = null as any; // TODO

export const selectDFADot = createSelector(selectDFA, DFAToDot);
