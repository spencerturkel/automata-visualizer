import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AutomataViewComponent} from './components/automata-view/automata-view.component';
import {GrammarFormViewComponent} from './components/grammar-form-view/grammar-form-view.component';
import {Visualizer} from './services/visualizer.service';
import {VizJsVisualizer} from './services/viz-js-visualizer';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        GrammarFormViewComponent,
        AutomataViewComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
    ],
    providers: [
        {provide: Visualizer, useClass: VizJsVisualizer},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
