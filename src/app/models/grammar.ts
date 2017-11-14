import {GrammarRule} from './grammar-rule';

export type Grammar<NonTerminal extends string, Terminal extends string> = GrammarRule<NonTerminal, Terminal>[];

