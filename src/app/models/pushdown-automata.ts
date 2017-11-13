export interface TransitionResult<State extends string, Stack extends string> {
    state: State;
    stack: Stack[];
}

export interface Transition<State extends string, Input extends string, Stack extends string> {
    state: State;
    input: Input | '';
    stack: Stack;
    result: TransitionResult<State, Stack> | null;
}

export interface PushdownAutomata<State extends string, Input extends string, Stack extends string> {
    initialStack: Stack;
    startState: State;
    accepting: State[];
    transition: Transition<State, Input, Stack>[];
}

/**
 * This is an example PDA which recognizes {(0^n)(1^n) | n > 0}
 * https://en.wikipedia.org/wiki/File:Pda-example.svg
 */
export const ExamplePushdown: PushdownAutomata<'zeros' | 'ones' | 'done', '0' | '1', 'A' | 'Z'> = {
    initialStack: 'Z',
    startState: 'zeros',
    accepting: ['done'],
    transition: [
        {
            state: 'zeros',
            input: '0',
            stack: 'Z',
            result: {
                state: 'zeros',
                stack: ['A', 'Z']
            },
        },
        {
            state: 'zeros',
            input: '0',
            stack: 'A',
            result: {
                state: 'zeros',
                stack: ['A', 'A']
            },
        },
        {
            state: 'zeros',
            input: '',
            stack: 'Z',
            result: {
                state: 'ones',
                stack: ['Z']
            },
        },
        {
            state: 'zeros',
            input: '',
            stack: 'A',
            result: {
                state: 'ones',
                stack: ['A']
            },
        },
        {
            state: 'ones',
            input: '1',
            stack: 'A',
            result: {
                state: 'ones',
                stack: []
            },
        },
        {
            state: 'ones',
            input: '',
            stack: 'Z',
            result: {
                state: 'done',
                stack: ['Z']
            },
        },
    ],
};
