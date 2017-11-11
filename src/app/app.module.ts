import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {AutomataViewComponent} from './components/automata-view/automata-view.component';
import {GrammarFormViewComponent} from './components/grammar-form-view/grammar-form-view.component';
import {reducer} from './reducers/index';
import {ConstantDotConverter} from './services/constant-dot-converter.service';
import {DotConverter} from './services/dot-converter.service';
import {Visualizer} from './services/visualizer.service';
import {VizJsVisualizer} from './services/viz-js-visualizer';

@NgModule({
    declarations: [
        AppComponent,
        GrammarFormViewComponent,
        AutomataViewComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
    ],
    providers: [
        {provide: DotConverter, useClass: ConstantDotConverter},
        {provide: Visualizer, useClass: VizJsVisualizer},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
