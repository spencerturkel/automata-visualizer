import {compose, createSelector} from '@ngrx/store';
import * as deepmerge from 'deepmerge';

import {Actions, NEW_GRAMMAR} from '../actions';
import {Grammar} from '../models/grammar';
import {PushdownAutomata} from '../models/pushdown-automata';
import {DeterministicPushdownAutomata} from '../models/deterministic-pushdown-automata';
import {NonDeterministicFiniteAutomata} from '../models/nondeterministic-finite-automata';
import {DeterministicFiniteAutomata} from '../models/deterministic-finite-automata';
import {DotSource} from '../models/dot-source';

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

export const id: <T>(t: T) => T = x => x;

export const selectGNF = id; // TODO

const selectPDAFromGNF: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    PushdownAutomata<'start' | 'rules' | 'done', Terminal, NonTerminal | Terminal | 'ZZ'>
    = grammar => ({
    initialStack: 'ZZ',
    startState: 'start',
    accepting: ['done'],
    transition: [
        {
            state: 'start',
            input: '',
            stack: 'ZZ',
            result: {
                state: 'rules',
                stack: [grammar[0].nonTerminal, 'ZZ'],
            },
        },
        ...grammar
            .map(({nonTerminal, production}) => ({
                state: 'rules' as 'rules',
                input: production[0] as any,
                stack: nonTerminal,
                result: {
                    state: 'rules' as 'rules',
                    stack: production.length > 1 ? production.slice(1) : [] as any[],
                },
            })),
        {
            state: 'rules',
            input: '',
            stack: 'ZZ',
            result: {
                state: 'done',
                stack: ['ZZ'],
            },
        },
    ],
});

export const selectPDA: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    PushdownAutomata<'start' | 'rules' | 'done', Terminal, NonTerminal | Terminal>
    = null as any; // TODO Section 7.2 Theorem 7.1

export const PDAToDot: <PDAState extends string, Input extends string, Stack extends string>
(pda: PushdownAutomata<PDAState, Input, Stack>) =>
    DotSource
    = pda => {

    const nodes =
        pda.transition
            .sort((left, right) => left.state === pda.startState ? -1 : 1)
            .map(transition => ({
                from: transition.state,
                to: transition.result.state,
                label: `${transition.input}, ${transition.stack} | ${transition.result.stack.join('')}`,
            }));

    return new DotSource(`
    digraph {
        node [shape = doublecircle]; ${pda.accepting.join(' ')}
        node [shape = circle];
        ${nodes.map(({from, to, label}) => `
            ${from} -> ${to} [ label = "${label}" ];
        `).join('\n')}
    }
    `);
};

// export const selectPDADot = createSelector(selectPDA, PDAToDot); // TODO
export const selectPDADot = compose(selectPDA, PDAToDot); // TODO

export const selectDPDA: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    DeterministicPushdownAutomata<any, Terminal, NonTerminal | Terminal>
    = null as any; // TODO

export const DPDAToDot: <DPDAState extends string, Input extends string, Stack extends string>
(dpda: DeterministicPushdownAutomata<DPDAState, Input, Stack>) =>
    DotSource
    = null as any; // TODO

// export const selectDPDADot = createSelector(selectDPDA, DPDAToDot); // TODO
export const selectDPDADot = compose(selectDPDA, DPDAToDot); // TODO

export const selectNonTerminals: <NonTerminal extends string>(grammar: Grammar<NonTerminal, string>)
    => NonTerminal[]
    = grammar => grammar.map(rule => rule.nonTerminal);

export const isLeftLinear: (grammar: Grammar<string, string>) => boolean =
    createSelector(selectNonTerminals, id,
        (nonTerminals, grammar) =>
            grammar.every(({production}) => {
                const nonTerminalsInProduction = production.filter(value => nonTerminals.includes(value));
                return nonTerminalsInProduction.length === 1
                    && production[production.length - 1] === nonTerminalsInProduction[0] ||
                    nonTerminalsInProduction.length === 0 && production.length === 1;
            }),
    );

export const selectNFA: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    NonDeterministicFiniteAutomata<string, Terminal>
    = grammar => ({
    startState: grammar[0].nonTerminal,
    accepting: ['accept'],
    transition: isLeftLinear(grammar) ? ({}) : (grammar.reduce(
        (transitions, {nonTerminal, production}) => {
            if (production.length > 0) {
                const productionStateNames = production
                    .slice(0, production.length - 1)
                    .map((_, index) => production.slice(0, index).join(''));

                const productionTransitionResults = production
                    .slice(1, production.length);

                const productionTransitions = productionStateNames.map((name, index) => {
                    const transitionResult = productionTransitionResults[index];
                    const transitionInput = transitionResult[transitionResult.length - 1];

                    return {
                        [transitionInput]: {
                            [name]: [transitionResult],
                        },
                    };
                });

                return deepmerge(transitions, productionTransitions.reduce(
                    (all, next) => deepmerge(all, next),
                    {},
                ));
            } else {
                const newTransitions = {
                    [production[0] as string]: {
                        [nonTerminal as string]: ['accept'],
                    },
                };

                return deepmerge(transitions, newTransitions);
            }
        },
        {},
    )),
}); // TODO

export const NFAToDot: <NFAState extends string, Input extends string>
(nfa: NonDeterministicFiniteAutomata<NFAState, Input>) =>
    DotSource
    = null as any; // TODO

// export const selectNFADot = createSelector(selectNFA, NFAToDot); // TODO
export const selectNFADot = compose(selectNFA, NFAToDot); // TODO

export const selectDFA: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    DeterministicFiniteAutomata<any, Terminal>
    = null as any; // TODO

export const DFAToDot: <DFAState extends string, Input extends string>
(dfa: NonDeterministicFiniteAutomata<DFAState, Input>) =>
    DotSource
    = null as any; // TODO

// export const selectDFADot = createSelector(selectDFA, DFAToDot); // TODO
export const selectDFADot = compose(selectDFA, DFAToDot); // TODO
