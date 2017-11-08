import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {GrammarFormViewComponent} from './grammar-form-view.component';

@Component({
    template: `
        <av-grammar-form-view></av-grammar-form-view>
    `,
})
class TestHostComponent {
}

describe('GrammarFormViewComponent', () => {
    let component: GrammarFormViewComponent;
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
            const formGroupDirective = formEl.injector.get(FormGroupDirective);
            expect(formGroupDirective.form).toBe(component.form);
        });
    });
});
