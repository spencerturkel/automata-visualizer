import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Store, StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {AutomataViewComponent} from './components/automata-view/automata-view.component';
import {GrammarFormViewComponent} from './components/grammar-form-view/grammar-form-view.component';
import {AppStore, reducers} from './reducers/index';
import {Environment} from './services/environment.service';
import {Visualizer} from './services/visualizer.service';
import {VizJsVisualizer} from './services/viz-js-visualizer';

@NgModule({
    declarations: [
        AppComponent,
        AutomataViewComponent,
        GrammarFormViewComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
    ],
    providers: [
        Environment,
        {provide: AppStore, useExisting: Store},
        {provide: Visualizer, useClass: VizJsVisualizer},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
