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
        const rules = formValue.filter(value => value.nonTerminal !== '');

        return {
            start: formValue[0].nonTerminal,
            nonTerminals: Array.from(new Set(formValue.map(x => x.nonTerminal))),
            rules: rules.reduce((prev, next) => ([
                ...prev,
                {
                    nonTerminal: next.nonTerminal,
                    production: toKleeneStar(next.production),
                },
            ]), []),
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

    form: FormArray;

    ngOnChanges() {
        const formArray = grammarToForm(this.grammar);

        if (this.form) {
            for (let i = 0; i < formArray.value.length; ++i) {
                this.form.at(i).setValue(formArray.at(i).value);
            }
        } else {
            this.form = formArray;
        }
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                map((value: FormValue) => value.filter(({nonTerminal}) => nonTerminal !== '')),
                map(value => formToGrammar(value)),
            )
            .subscribe(grammar => this.submit.emit(grammar));
    }

    onFocusLast(): void {
        const row = this.form.controls[this.form.length - 1] as FormGroup;

        if (row.get('nonTerminal')!.value === '') {
            return;
        }

        row.controls.nonTerminal.setValidators([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(1),
        ]);

        this.form.push(new FormGroup({
            nonTerminal: new FormControl(''),
            production: new FormControl(''),
        }));
    }

    onRemoveRule(ruleIndex: number): void {
        this.form.removeAt(ruleIndex);
    }
}
