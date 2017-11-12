import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map} from 'rxjs/operators';

import {Grammar} from '../../models/grammar';
import {fromKleeneStar, toKleeneStar} from '../../models/kleene-star';

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

const grammarToForm =
    <NonTerminal extends string, Terminal extends string>
    (grammar: Grammar<NonTerminal, Terminal>): FormArray => {
        const controls = grammar.nonTerminals
            .map(nonTerminal => grammar.rules[nonTerminal]
                .map(rule => new FormGroup({
                    nonTerminal: new FormControl(nonTerminal, Validators.required),
                    production: new FormControl(fromKleeneStar(rule.production)),
                })))
            .reduce((all, next) => all.concat(next), []);
        return new FormArray(controls);
    };

const formToGrammar =
    (formValue: FormValue): Grammar<any, any> => {
        return {
            start: formValue[0].nonTerminal,
            nonTerminals: formValue.map(x => x.nonTerminal),
            rules: formValue.reduce((prev, next) => next.nonTerminal ? ({
                ...prev,
                nonTerminal: next.nonTerminal,
                production: toKleeneStar(next.production),
            }) : prev, {}),
        };
    };

@Component({
    selector: 'av-grammar-form-view',
    templateUrl: './grammar-form-view.component.html',
})
export class GrammarFormViewComponent<NonTerminal extends string, Terminal extends string>
    implements OnChanges, OnInit {
    @Input() grammar: Grammar<NonTerminal, Terminal>;
    @Output() removeRule = new EventEmitter<number>();
    @Output() submit = new EventEmitter<Grammar<NonTerminal, Terminal>>();

    form: FormArray;

    ngOnChanges() {
        this.form = grammarToForm(this.grammar);
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                map(value => formToGrammar(value)),
            )
            .subscribe(grammar => this.submit.emit(grammar));
    }

    onRemoveRule(ruleIndex: number): void {
        this.removeRule.emit(ruleIndex);
    }
}
