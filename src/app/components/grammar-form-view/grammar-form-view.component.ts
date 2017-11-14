import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';

import {Grammar} from '../../models/grammar';
import {Observable} from 'rxjs/Observable';

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
        const controls = grammar
            .map(({nonTerminal, production}) => new FormGroup({
                nonTerminal: new FormControl(
                    nonTerminal,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(1),
                    ],
                ),
                production: new FormControl(production.join('')),
            }));

        return new FormArray(controls);
    };

const formToGrammar =
    (formValue: FormValue): Grammar<any, any> => {
        const rules = formValue.filter(value => value.nonTerminal !== '');

        return rules.reduce((prev, next) => ([
            ...prev,
            {
                nonTerminal: next.nonTerminal,
                production: next.production.split(''),
            },
        ]), []);
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
    valueChangesSubscription: Subscription;
    valueChanges$: Observable<Grammar<NonTerminal, Terminal>>;

    ngOnChanges() {
        const formArray = grammarToForm(this.grammar);

        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }

        if (this.form) {
            let i;
            for (i = 0; i < formArray.length; ++i) {
                console.log(`updating index ${i}`);
                this.form.at(i).setValue(formArray.at(i).value, {emitEvent: false});
            }
            console.log('done updating array');

            if (i === this.form.length) {
                this.form.push(new FormGroup({
                    nonTerminal: new FormControl(''),
                    production: new FormControl(''),
                }));
            }
        } else {
            this.form = formArray;

            this.form.push(new FormGroup({
                nonTerminal: new FormControl(''),
                production: new FormControl(''),
            }));

            this.valueChanges$ =
                this.form.valueChanges
                    .pipe(
                        filter(() => this.form.valid),
                        map((value: FormValue) => formToGrammar(value.filter(({nonTerminal}) => nonTerminal !== ''))),
                    );
        }

        this.valueChangesSubscription = this.valueChanges$.subscribe(this.submit);
    }

    ngOnInit() {
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
