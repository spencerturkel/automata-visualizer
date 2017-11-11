import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

import {Visualizer} from '../../services/visualizer.service';
import {DotSource} from '../../models/dot-source';

@Component({
    selector: 'av-automata-view',
    templateUrl: './automata-view.component.html',
    styleUrls: ['./automata-view.component.scss'],
})
export class AutomataViewComponent implements OnChanges {
    visualization: SafeHtml;

    @Input() dot: DotSource;

    ngOnChanges() {
        this.visualization = this.visualizer.visualize(this.dot);
    }

    constructor(private readonly visualizer: Visualizer) {
    }
}
