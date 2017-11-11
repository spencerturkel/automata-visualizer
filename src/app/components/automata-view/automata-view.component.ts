import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

import {Visualizer} from '../../services/visualizer.service';
import {DotSource} from '../../models/dot-source';

@Component({
    selector: 'av-automata-view',
    templateUrl: './automata-view.component.html',
    styleUrls: ['./automata-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomataViewComponent {
    @Input() dot: DotSource;

    constructor(private readonly visualizer: Visualizer) {
    }

    get visualization(): SafeHtml {
        return this.visualizer.visualize(this.dot);
    }
}
