import {DotSource} from '../models/dot-source';
import {SvgString} from '../models/svg-string';

export abstract class Visualizer {
    abstract visualize(source: DotSource): SvgString;
}
