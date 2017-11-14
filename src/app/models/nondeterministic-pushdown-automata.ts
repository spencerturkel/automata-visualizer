import {PartialRecord} from './partial-record';

export interface NonDeterministicFiniteAutomata<State extends string, Input extends string> {
    startState: State;
    accepting: State[];
    transition: PartialRecord<Input | '', PartialRecord<State, State[]>>;
}

type ExampleState = 'start' | 'evenZeroes' | 'evenOnes' | 'sawZero' | 'sawOne';
type ExampleInput = '0' | '1';

/**
 * An example NFA
 * which accepts the language over {0, 1} of strings with an even amounts of zeros or an even amount of ones
 * https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton#/media/File:NFAexample.svg
 */
export const exampleNonDeterministicFiniteAutomata: NonDeterministicFiniteAutomata<ExampleState, ExampleInput> = {
    startState: 'start',
    accepting: ['evenZeroes', 'evenOnes'],
    transition: {
        '': {
            start: ['evenZeroes', 'evenOnes'],
        },
        0: {
            evenZeroes: ['sawZero'],
            sawZero: ['evenZeroes'],
        },
        1: {
            evenOnes: ['sawOne'],
            sawOne: ['evenOnes'],
        },
    },
};
