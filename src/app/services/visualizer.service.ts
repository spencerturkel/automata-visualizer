import {SafeHtml} from '@angular/platform-browser';

import {DotSource} from '../models/dot-source';

export abstract class Visualizer {
    abstract visualize(source: DotSource): SafeHtml;
}
