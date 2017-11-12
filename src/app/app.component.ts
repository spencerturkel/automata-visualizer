import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {DotSource} from './models/dot-source';
import {createDotSelector, AppStore} from './reducers';
import {DotConverter} from './services/dot-converter.service';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly dot$: Observable<DotSource>;

    constructor(
        private readonly converter: DotConverter,
        private readonly store: AppStore,
    ) {
        const selectDot = createDotSelector(grammar => converter.convert(grammar));
        this.dot$ = this.store.select(selectDot);
    }
}
