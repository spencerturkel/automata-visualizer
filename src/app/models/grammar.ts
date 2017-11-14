export type Grammar<NonTerminal extends string, Terminal extends string> = Array<{
    nonTerminal: NonTerminal;
    production: Array<NonTerminal | Terminal>;
}>;

