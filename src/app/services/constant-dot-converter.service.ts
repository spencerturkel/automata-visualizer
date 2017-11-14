import {Injectable} from '@angular/core';

import {DotSource} from '../models/dot-source';
import {DotConverter} from './dot-converter.service';

@Injectable()
export class ConstantDotConverter implements DotConverter {
    convert(): DotSource {
        return new DotSource(`
                digraph G {
                    "Welcome" -> "To"
                    "To" -> "Web"
                    "To" -> "GraphViz!"
                }`);
    }
}
