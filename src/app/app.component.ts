import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {NewGrammar} from './actions/index';
import {DotSource} from './models/dot-source';
import {Environment} from './services/environment.service';
import {Grammar} from './models/grammar';
import {selectGrammar, State} from './reducers';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly development: boolean;
    readonly dot$: Observable<DotSource>;
    readonly grammar$: Observable<Grammar<any, any>>;

    constructor(
        {production}: Environment,
        private readonly store: Store<State<any, any>>,
    ) {
        this.development = !production;
        this.grammar$ = this.store.select(selectGrammar);
        this.dot$ = of(new DotSource(`
                digraph G {
                    "Welcome" -> "To"
                    "To" -> "Web"
                    "To" -> "GraphViz!"
                }`));
    }

    onSubmit(grammar: Grammar<any, any>) {
        this.store.dispatch(new NewGrammar(grammar));
    }
}
