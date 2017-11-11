import {KleeneStar} from './kleene-star';

export interface GrammarRule<NonTerminal extends string, Terminal extends string> {
    nonTerminal: NonTerminal;
    production: KleeneStar<NonTerminal | Terminal>;
}
