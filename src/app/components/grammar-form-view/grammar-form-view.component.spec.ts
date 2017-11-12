import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

import {Grammar} from '../../models/grammar';
import {GrammarFormViewComponent} from './grammar-form-view.component';

type TestNonTerminals = 'S' | 'A';
type TestTerminals = 'a' | 'b';
type TestGrammar = Grammar<TestNonTerminals, TestTerminals>;

@Component({
    template: `
        <av-grammar-form-view
            [grammar]="grammar"
            (submit)="submit$.next($event)"></av-grammar-form-view>
    `,
})
class TestHostComponent {
    grammar: TestGrammar = {
        start: 'S',
        nonTerminals: ['S', 'A'],
        rules: {
            S: [
                {
                    nonTerminal: 'S',
                    production: {
                        val: 'A',
                        rest: '',
                    },
                },
            ],
            A: [
                {
                    nonTerminal: 'A',
                    production: {
                        val: 'a',
                        rest: {
                            val: 'A',
                            rest: {
                                val: 'b',
                                rest: '',
                            },
                        },
                    },
                },
                {
                    nonTerminal: 'A',
                    production: '',
                },
            ],
        },
    };
    submit$ = new Subject<TestGrammar>();
}

describe('GrammarFormViewComponent', () => {
    let component: GrammarFormViewComponent<any, any>;
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GrammarFormViewComponent, TestHostComponent],
            imports: [ReactiveFormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.debugElement.query(By.directive(GrammarFormViewComponent)).componentInstance;
        hostComponent = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component instanceof GrammarFormViewComponent).toBeTruthy();
    });

    describe('after init', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should initialize form', () => {
            expect(component.form).toBeTruthy();
        });

        it('should have form element attached to form', () => {
            const formEl = fixture.debugElement.query(By.css('form'));
            expect(formEl).toBeTruthy();
            const formArray = formEl.injector.get(FormGroupDirective, {});
            expect(formArray.control).toBe(component.form);
        });

        it('should have inputs for the grammar and the new rule', () => {
            const inputs = fixture.debugElement.queryAll(By.css('input'));

            const rules = Object.values(hostComponent.grammar.rules);

            expect(inputs.length).toBe((rules.length + 1) * 2);
        });

        it('should have a button to remove any rule except the start rule and the new rule', () => {
            const buttons = fixture.debugElement.queryAll(By.css('button'));

            const rules = Object.values(hostComponent.grammar.rules);

            expect(buttons.length).toBe(rules.length - 1);
        });
    });
});
