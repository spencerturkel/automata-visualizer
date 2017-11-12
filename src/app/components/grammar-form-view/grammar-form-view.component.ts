import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray} from '@angular/forms';
import {filter, map} from 'rxjs/operators';

import {Grammar} from '../../models/grammar';

const formToGrammar =
    <NonTerminal extends string, Terminal extends string>(formValue: any): Grammar<NonTerminal, Terminal> => {
        return formValue; // TODO
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
                map(value => formToGrammar<NonTerminal, Terminal>(value)),
            )
            .subscribe(grammar => this.submit.emit(grammar));
    }

    removeRule(ruleIndex: number): void {
        // TODO
    }
}
