export interface GrammarRule<NonTerminal extends string, Terminal extends string> {
    nonTerminal: NonTerminal;
    production: Array<NonTerminal | Terminal>;
}
