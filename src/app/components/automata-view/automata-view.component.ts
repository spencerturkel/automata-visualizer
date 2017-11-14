import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

import {DotSource} from '../../models/dot-source';
import {Environment} from '../../services/environment.service';
import {Visualizer} from '../../services/visualizer.service';

@Component({
    selector: 'av-automata-view',
    templateUrl: './automata-view.component.html',
    styleUrls: ['./automata-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomataViewComponent {
    @Input() readonly dot: DotSource;
    readonly showSource: boolean;

    constructor(
        {production}: Environment,
        private readonly visualizer: Visualizer,
        ) {
        this.showSource = !production;
    }

    get visualization(): SafeHtml {
        console.log(this.dot);
        return this.visualizer.visualize(this.dot);
    }
}
