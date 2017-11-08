import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'av-grammar-form-view',
    templateUrl: './grammar-form-view.component.html',
})
export class GrammarFormViewComponent implements OnInit {
    form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({});
    }
}
