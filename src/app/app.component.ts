import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {NewGrammar} from './actions/index';
import {DotSource} from './models/dot-source';
import {Grammar} from './models/grammar';
import {AppStore, selectGrammar} from './reducers';
import {DotConverter} from './services/dot-converter.service';

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
        this.grammar$ = this.store.select(selectGrammar);
        this.dot$ = this.grammar$.pipe(map(grammar => converter.convert(grammar)));
    }

    onSubmit(grammar: Grammar<any, any>) {
        this.store.dispatch(new NewGrammar(grammar));
    }
}
