import {Injectable} from '@angular/core';
import {Grammar} from '../models/grammar';
import {DotSource} from '../models/dot-source';

@Injectable()
export abstract class DotConverter {
    abstract convert
    <NonTerminal extends string, Terminal extends string>
    (grammar: Grammar<NonTerminal, Terminal>): DotSource;
}
