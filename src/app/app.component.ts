import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {DotSource} from './models/dot-source';
import {createDotSelector, State} from './reducers';
import {DotConverter} from './services/dot-converter.service';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly dot$: Observable<DotSource>;

    constructor(
        private readonly converter: DotConverter,
        private readonly store: Store<State<any, any>>,
    ) {
        const selectDot = createDotSelector(grammar => converter.convert(grammar));
        this.dot$ = this.store.select(selectDot);
    }
}
