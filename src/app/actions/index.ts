import {Grammar} from '../models/grammar';

export const NEW_GRAMMAR = '[AV] New Grammar';

export class NewGrammarAction<NonTerminal extends string, Terminal extends string> {
    readonly type = NEW_GRAMMAR;

    constructor(public readonly grammar: Grammar<NonTerminal, Terminal>) {
    }
}

export type Actions<NonTerminal extends string, Terminal extends string> = NewGrammarAction<NonTerminal, Terminal>;
