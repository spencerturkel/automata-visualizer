import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'av-grammar-form-view',
    templateUrl: './grammar-form-view.component.html',
})
export class GrammarFormViewComponent implements OnInit {
    @Output() submit = new EventEmitter();

    form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({});
    }

    onSubmit() {
    }
}
