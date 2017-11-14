import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {AppStore, reducers} from './reducers';
import {Environment} from './services/environment.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [StoreModule.forRoot(reducers)],
            providers: [
                {provide: AppStore, useClass: Store},
                {provide: Environment, useValue: {production: true}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
