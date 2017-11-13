import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormGroup, FormGroupDirective, NgControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

import {Grammar} from '../../models/grammar';
import {Environment} from '../../services/environment.service';
import {GrammarFormViewComponent} from './grammar-form-view.component';
import {GrammarRule} from '../../models/grammar-rule';

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
        rules: [
            {
                nonTerminal: 'S',
                production: {
                    val: 'A',
                    rest: '',
                },
            },
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

        describe('inputs', () => {
            let inputs: DebugElement[];
            let rules: GrammarRule<string, string>[];

            beforeEach(() => {
                inputs = fixture.debugElement.queryAll(By.css('input'));
                rules = hostComponent.grammar.rules;
            });

            it('should be enough for the grammar and the new rule', () => {
                expect(inputs.length).toBe((rules.length + 1) * 2);
            });

            it('should connect to form', () => {
                for (let i = 0; i < inputs.length; ++i) {
                    const row = component.form.controls[Math.floor(i / 2)] as FormGroup;
                    const control = inputs[i].injector.get(NgControl, null);
                    expect(control).toBeTruthy();

                    if (i % 2 === 0) {
                        expect(control.control).toBe(row.controls.nonTerminal);
                    } else {
                        expect(control.control).toBe(row.controls.production);
                    }
                }
            });

            describe('last', () => {
                it('should call addBlankRule() once when focused', () => {
                    const last = inputs[inputs.length - 1];

                    spyOn(component, 'addBlankRule');

                    last.triggerEventHandler('focus', null);

                    expect(component.addBlankRule).toHaveBeenCalledTimes(1);
                });
            });
        });

        it('should have text for first input row', () => {
            const firstCell = fixture.debugElement.query(By.css('td:first-child'));
            expect(firstCell).toBeTruthy();
            expect(firstCell.nativeElement.textContent).not.toBe('');
        });

        it(
            'should have a button calling onRemoveRule(ruleIndex) once on all rules except the start rule and the new rule',
            () => {
                const buttons = fixture.debugElement.queryAll(By.css('button'));

                const rules = Object.values(hostComponent.grammar.rules);

                expect(buttons.length).toBe(rules.length - 1);

                const spy = spyOn(component, 'onRemoveRule');

                for (const [removeButton, index] of buttons.map((btn, ix) => [btn, ix + 1] as [DebugElement, number])) {
                    removeButton.triggerEventHandler('click', null);
                    expect(spy.calls.argsFor(index - 1)).toEqual([index]);
                    expect(spy.calls.count()).toEqual(index);
                }
            },
        );
    });
});
