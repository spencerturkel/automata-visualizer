export interface DeterministicFiniteAutomata<State extends string, Input extends string> {
    startState: State;
    accepting: State[];
    transition: Record<Input, Record<State, State>>;
}

/**
 * An example DFA which accepts the language over {0, 1} of strings with an even amounts of zeros
 * https://en.wikipedia.org/wiki/Deterministic_finite_automaton#/media/File:DFAexample.svg
 */
export const exampleDeterministicFiniteAutomata: DeterministicFiniteAutomata<'start' | 'sawZero', '0' | '1'> = {
    startState: 'start',
    accepting: ['start'],
    transition: {
        0: {
            start: 'sawZero',
            sawZero: 'start',
        },
        1: {
            start: 'start',
            sawZero: 'sawZero',
        },
    },
};
