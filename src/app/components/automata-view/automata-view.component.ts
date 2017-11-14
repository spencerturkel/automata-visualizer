import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

import {DotSource} from '../../models/dot-source';
import {Visualizer} from '../../services/visualizer.service';

@Component({
    selector: 'av-automata-view',
    templateUrl: './automata-view.component.html',
    styleUrls: ['./automata-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomataViewComponent {
    @Input() readonly dot: DotSource;
    @Input() readonly title: string;

    constructor(
        private readonly visualizer: Visualizer,
        ) {
    }

    get visualization(): SafeHtml {
        return this.visualizer.visualize(this.dot);
    }
}
