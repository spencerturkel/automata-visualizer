import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {NewGrammar} from './actions/index';
import {DotSource} from './models/dot-source';
import {Environment} from './services/environment.service';
import {Grammar} from './models/grammar';
import {
    selectGrammar,
    selectGrammarDPDADot,
    selectGrammarDFADot,
    selectGrammarNFADot,
    selectGrammarPDADot,
    State,
} from './reducers';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly development: boolean;

    readonly grammar$: Observable<Grammar<any, any>>;

    readonly pda$: Observable<DotSource | null>;
    // readonly dpda$: Observable<DotSource>;
    readonly nfa$: Observable<DotSource | null>;
    // readonly dfa$: Observable<DotSource>;

    constructor(
        {production}: Environment,
        private readonly store: Store<State<any, any>>,
    ) {
        this.development = !production;

        this.grammar$ = this.store.select(selectGrammar);
        this.pda$ = this.store.select(selectGrammarPDADot);
        // this.dpda$ = this.store.select(selectGrammarDPDADot);
        this.nfa$ = this.store.select(selectGrammarNFADot);
        // this.dfa$ = this.store.select(selectGrammarDFADot);
    }

    onSubmit(grammar: Grammar<any, any>) {
        this.store.dispatch(new NewGrammar(grammar));
    }
}
