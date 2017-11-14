import {compose, createSelector} from '@ngrx/store';
import deepmerge from 'deepmerge';

import {Actions, NEW_GRAMMAR} from '../actions';
import {Grammar} from '../models/grammar';
import {PushdownAutomata} from '../models/pushdown-automata';
import {DeterministicPushdownAutomata} from '../models/deterministic-pushdown-automata';
import {NonDeterministicFiniteAutomata} from '../models/nondeterministic-finite-automata';
import {DeterministicFiniteAutomata} from '../models/deterministic-finite-automata';
import {DotSource} from '../models/dot-source';
import {PartialRecord} from '../models/partial-record';

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

const PDAToDot: <PDAState extends string, Input extends string, Stack extends string>
(pda: PushdownAutomata<PDAState, Input, Stack>) =>
    DotSource
    = pda => {
    const showStack = (stack: string) => stack === 'ZZ' ? 'Z' : stack;

    const nodes =
        pda.transition
            .sort((left, right) => left.state === pda.startState ? -1 : 1)
            .map(transition => ({
                from: transition.state,
                to: transition.result.state,
                labels: [
                    `${transition.input || '&lambda;'}, ${showStack(transition.stack)} | ${transition.result.stack.map(
                        showStack).join('')}`,
                ],
            }))
            .map(({from, to, labels}) => ({
                [from + ' -> ' + to]: labels,
            }))
            .reduce((all, next) => deepmerge(all, next), {});

    return new DotSource(`
    digraph {
        rankdir=LR;
        splines=true;
        overlap = false;
        node [shape = doublecircle]; ${pda.accepting.join(' ')}
        node [shape = circle];
        ${Object.entries(nodes).map(([key, labels]) => `
            ${key} [ label="${labels.join('\\n')}" ];
        `).join('\n')}
    }
    `);
};

export const selectPDADot = createSelector(selectGNF, createSelector(selectPDAFromGNF, PDAToDot));

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

export const selectLeftLinearNFATransitions: <NonTerminal extends string, Terminal extends string>(grammar: Grammar<NonTerminal, Terminal>) =>
    PartialRecord<Terminal | '', PartialRecord<string, string[]>>
    = createSelector(
    selectNonTerminals,
    id,
    <NonTerminal extends string, Terminal extends string>(
        nonTerminals: NonTerminal[],
        grammar: Grammar<NonTerminal, Terminal>,
    ) => grammar.reduce(
        (transitions, {nonTerminal: variable, production: rule}) => {
            const finalTransitionResult = !nonTerminals.includes(rule[0] as NonTerminal) ? 'accept' : rule[0];

            const production = [finalTransitionResult, ...rule.slice(rule.length - 1, 0)];

            const productionStateNames = production
                .slice(production.length - 1, 0)
                .map((_, index) => production.slice(index - 1, 0).join(''))
                .map(name => variable + name);

            const productionTransitionResults = [...productionStateNames.slice(1), finalTransitionResult];

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
        },
        {},
    ),
);

export const selectRightLinearNFATransitions: <NonTerminal extends string, Terminal extends string>(grammar: Grammar<NonTerminal, Terminal>) =>
    PartialRecord<Terminal | '', PartialRecord<string, string[]>>
    = createSelector(
    selectNonTerminals,
    id,
    <NonTerminal extends string, Terminal extends string>(
        nonTerminals: NonTerminal[],
        grammar: Grammar<NonTerminal, Terminal>,
    ) => grammar.reduce(
        (transitions, {nonTerminal: variable, production: rule}) => {
            const finalTransitionResult = !nonTerminals.includes(rule[rule.length - 1] as NonTerminal)
                ? 'accept'
                : rule[rule.length - 1];

            const production = [...rule.slice(0, rule.length - 1), finalTransitionResult];

            const productionStateNames = production
                .slice(0, production.length - 1)
                .map((_, index) => production.slice(0, index + 1).join(''))
                .map(name => variable + name);

            const productionTransitionResults = [...productionStateNames.slice(1), finalTransitionResult];

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
        },
        {},
    ),
);

export const selectNFA: <NonTerminal extends string, Terminal extends string>(state: State<NonTerminal, Terminal>) =>
    NonDeterministicFiniteAutomata<string, Terminal>
    = createSelector(isLeftLinear, id, (leftLinear, grammar) => ({
    startState: grammar[0].nonTerminal,
    accepting: ['accept'],
    transition: (leftLinear
        ? selectLeftLinearNFATransitions(grammar)
        : selectRightLinearNFATransitions(grammar)) as any,
}));

export const NFAToDot: <NFAState extends string, Input extends string>
(nfa: NonDeterministicFiniteAutomata<NFAState, Input>) =>
    DotSource
    = <NFAState extends string, Input extends string>
(nfa: NonDeterministicFiniteAutomata<NFAState, Input>) => {
    const labelsAndTransitions = [].concat(...[].concat(Object.entries(nfa.transition)
        .map(([input, stateTransition]) => ({
            label: input,
            stateTransitions: Object.entries(stateTransition),
        }))
        .map(({label, stateTransitions}) =>
            stateTransitions.map(([from, tos]) =>
                tos.map((to: string) =>
                    ({
                        from,
                        label,
                        to,
                    })))) as any)) as {from: string, to: string, label: string}[];

    return new DotSource(`
    digraph {
        rankdir=LR;
        splines=true;
        overlap = false;
        node [shape = doublecircle]; ${nfa.accepting.join(' ')}
        node [shape = circle];
        ${labelsAndTransitions.map(({from, label, to}) => `
        ${from} -> ${to} [ label="${label}" ];
        `)}
    }
    `);
};

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
