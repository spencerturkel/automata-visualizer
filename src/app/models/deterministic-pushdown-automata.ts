import {PartialRecord} from './partial-record';

export interface TransitionResult<State extends string, Stack extends string> {
    state: State;
    stack: Stack[];
}

export interface DeterministicPushdownAutomata<State extends string, Input extends string, Stack extends string> {
    initialStack: Stack;
    startState: State;
    accepting: State[];
    transition: PartialRecord<
        State,
        PartialRecord<
            Stack,
            { '': TransitionResult<State, Stack> } |
            PartialRecord<
                Input, TransitionResult<State, Stack>>>>;
}

/**
 * This is an example DPDA which recognizes {(0^n)(1^n) | n > 0}
 */
export const ExampleDeterministicPushdown: DeterministicPushdownAutomata<'zeros' | 'ones' | 'done', '0' | '1', 'A' | 'Z'> = {
    initialStack: 'Z',
    startState: 'zeros',
    accepting: ['done'],
    transition: {
        zeros: {
            Z: {
                0: {
                    state: 'zeros',
                    stack: ['A', 'Z']
                },
            },
            A: {
                0: {
                    state: 'zeros',
                    stack: ['A', 'A']
                },
                1: {
                    state: 'ones',
                    stack: [],
                }
            },
        },
        ones: {
            Z: {
                '': {
                    state: 'done',
                    stack: ['Z'],
                },
            },
            A: {
                1: {
                    state: 'ones',
                    stack: [],
                }
            },
        },
    },
};
