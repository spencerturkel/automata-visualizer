import {Injectable} from '@angular/core';

import {DotSource} from '../models/dot-source';
import {Grammar} from '../models/grammar';
import {DotConverter} from './dot-converter.service';

@Injectable()
export class ConstantDotConverter implements DotConverter {
    convert<NonTerminal extends string, Terminal extends string>(grammar: Grammar<NonTerminal, Terminal>): DotSource {
        return new DotSource(`
    digraph G {
        "Welcome" -> "To"
        "To" -> "Web"
        "To" -> "GraphViz!"
    }`);
    }
}
