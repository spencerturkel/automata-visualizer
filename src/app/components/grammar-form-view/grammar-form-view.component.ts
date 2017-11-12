import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {filter, map} from 'rxjs/operators';

import {Grammar} from '../../models/grammar';
import {KleeneStar} from '../../models/kleene-star';

/*
const exampleFormValue = new FormArray([
    new FormGroup({
        nonTerminal: new FormControl('S'),
        production: new FormControl('A'),
    }),
    new FormGroup({
        nonTerminal: new FormControl('A'),
        production: new FormControl('aAb'),
    }),
    new FormGroup({
        nonTerminal: new FormControl('A'),
        production: new FormControl(''),
    }),
    new FormGroup({
        nonTerminal: new FormControl(''),
        production: new FormControl(''),
    }),
]);
*/

type FormValue = { nonTerminal: string, production: string }[];

const formProductionToGrammarProduction = <T extends string>(production: string): KleeneStar<T> => {
    if (production === '') {
        return '';
    }

    return {
        val: production[0] as T,
        rest: formProductionToGrammarProduction(production.slice(1)),
    };
};

const formToGrammar =
    (formValue: FormValue): Grammar<any, any> => {
        return {
            start: formValue[0].nonTerminal,
            nonTerminals: formValue.map(x => x.nonTerminal),
            rules: formValue.reduce((prev, next) => ({
                ...prev,
                nonTerminal: next.nonTerminal,
                production: formProductionToGrammarProduction(next.production),
            }), {}) // TODO
        };
    };

@Component({
    selector: 'av-grammar-form-view',
    templateUrl: './grammar-form-view.component.html',
})
export class GrammarFormViewComponent<NonTerminal extends string, Terminal extends string>
    implements OnChanges, OnInit {
    @Input() grammar: Grammar<NonTerminal, Terminal>;
    @Output() submit = new EventEmitter<Grammar<NonTerminal, Terminal>>();

    readonly form: FormArray = new FormArray([]);

    constructor() {
    }

    ngOnChanges() {
        // TODO set form value
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                map(value => formToGrammar(value)),
            )
            .subscribe(grammar => this.submit.emit(grammar));
    }

    removeRule(ruleIndex: number): void {
        // TODO
    }
}
