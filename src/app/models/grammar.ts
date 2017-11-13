import {GrammarRule} from './grammar-rule';

export interface Grammar<NonTerminal extends string, Terminal extends string> {
    nonTerminals: NonTerminal[];
    rules: GrammarRule<NonTerminal, Terminal>[];
    start: NonTerminal;
}

