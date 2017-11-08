import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {GrammarFormViewComponent} from './components/grammar-form-view/grammar-form-view.component';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        GrammarFormViewComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
