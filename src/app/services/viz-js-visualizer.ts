import Viz from 'viz.js';

import {SvgString} from '../models/svg-string';
import {DotSource} from '../models/dot-source';
import {Visualizer} from './visualizer.service';

export class VizJsVisualizer implements Visualizer {
    visualize(source: DotSource): SvgString {
        return new SvgString(Viz(source.payload));
    }
}
