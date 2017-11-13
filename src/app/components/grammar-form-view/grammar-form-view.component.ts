import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';

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
        const controls = grammar.rules
            .map(({nonTerminal, production}, index) => new FormGroup({
                nonTerminal: new FormControl(
                    nonTerminal,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(1),
                    ],
                ),
                production: new FormControl(fromKleeneStar(production)),
            }));
        return new FormArray(controls);
    };

const formToGrammar =
    (formValue: FormValue): Grammar<any, any> => {
        return {
            start: formValue[0].nonTerminal,
            nonTerminals: Array.from(new Set(formValue.map(x => x.nonTerminal))),
            rules: formValue.reduce((prev, next) => next.nonTerminal !== '' ? ([
                ...prev,
                {
                    nonTerminal: next.nonTerminal,
                    production: toKleeneStar(next.production),
                },
            ]) : prev, []),
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

    addBlankRule(): void {
        this.form.push(new FormGroup({
            nonTerminal: new FormControl(
                '',
                [Validators.minLength(1), Validators.maxLength(1)],
            ),
            production: new FormControl(''),
        }));
    }

    ngOnChanges() {
        const formArray = grammarToForm(this.grammar);

        if (this.form) {
            this.form.setValue(formArray.controls);
        } else {
            this.form = formArray;
        }
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
        this.form.removeAt(ruleIndex);
    }
}
