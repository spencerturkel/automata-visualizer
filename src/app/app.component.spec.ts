import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {AppStore, reducer} from './reducers';
import {DotSource} from './models/dot-source';
import {DotConverter} from './services/dot-converter.service';

describe('AppComponent', () => {
    let converter: DotConverter;

    beforeEach(async(() => {
        converter = {convert: () => new DotSource('')};

        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [StoreModule.forRoot(reducer)],
            providers: [
                {provide: AppStore, useClass: Store},
                {provide: DotConverter, useValue: converter},
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
