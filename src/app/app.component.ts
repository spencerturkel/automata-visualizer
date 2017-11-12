import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {DotSource} from './models/dot-source';
import {Grammar} from './models/grammar';
import {createDotSelector, AppStore, selectGrammar} from './reducers';
import {DotConverter} from './services/dot-converter.service';
import {NewGrammar} from './actions/index';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly dot$: Observable<DotSource>;
    readonly grammar$: Observable<Grammar<any, any>>;

    constructor(
        private readonly converter: DotConverter,
        private readonly store: AppStore,
    ) {
        const selectDot = createDotSelector(grammar => converter.convert(grammar));
        this.dot$ = this.store.select(selectDot);
        this.grammar$ = this.store.select(selectGrammar);
    }

    onSubmit(grammar: Grammar<any, any>) {
        this.store.dispatch(new NewGrammar(grammar));
    }
}
