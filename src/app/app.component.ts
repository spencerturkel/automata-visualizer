import {Component} from '@angular/core';
import {DotSource} from './models/dot-source';

@Component({
    selector: 'av-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    dot = new DotSource(`
    digraph G {
        "Welcome" -> "To"
        "To" -> "Web"
        "To" -> "GraphViz!"
    }`);
}
