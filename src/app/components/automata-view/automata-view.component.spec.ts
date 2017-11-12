import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutomataViewComponent} from './automata-view.component';
import {Environment} from '../../services/environment.service';
import {Visualizer} from '../../services/visualizer.service';

describe('AutomataViewComponent', () => {
    let component: AutomataViewComponent;
    let environment: Environment;
    let visualizer: Visualizer;
    let fixture: ComponentFixture<AutomataViewComponent>;

    beforeEach(async(() => {
        environment = {production: true};
        visualizer = {visualize: () => ''};

        TestBed.configureTestingModule({
            declarations: [AutomataViewComponent],
            providers: [
                {provide: Environment, useValue: environment},
                {provide: Visualizer, useValue: visualizer},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutomataViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
