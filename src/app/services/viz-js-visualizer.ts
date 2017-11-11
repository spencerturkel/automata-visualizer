import {Injectable} from '@angular/core';
import Viz from 'viz.js';

import {DotSource} from '../models/dot-source';
import {Visualizer} from './visualizer.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Injectable()
export class VizJsVisualizer implements Visualizer {
    constructor(private readonly sanitizer: DomSanitizer) {
    }

    visualize(source: DotSource): SafeHtml {
        const viz = Viz(source.payload);
        return this.sanitizer.bypassSecurityTrustHtml(viz);
    }
}
