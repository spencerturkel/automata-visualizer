webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/actions/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NEW_GRAMMAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NewGrammar; });
var NEW_GRAMMAR = '[AV] New Grammar';
var NewGrammar = (function () {
    function NewGrammar(grammar) {
        this.grammar = grammar;
        this.type = NEW_GRAMMAR;
    }
    return NewGrammar;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Automata Visualizer</h1>\r\n<av-grammar-form-view *ngIf=\"grammar$ | async as grammar\" [grammar]=\"grammar\"\r\n                      (submit)=\"onSubmit($event)\"></av-grammar-form-view>\r\n<av-automata-view *ngIf=\"pda$ | async as pda; else noPDA\" [dot]=\"pda\"\r\n                  title=\"Nondeterministic Pushdown Automaton\"></av-automata-view>\r\n<ng-template #noPDA>\r\n    <h2>Could not display an NPDA - try putting the grammar in Greibach Normal Form.</h2>\r\n</ng-template>\r\n<av-automata-view *ngIf=\"nfa$ | async as nfa; else noNFA\" [dot]=\"nfa\"\r\n                  title=\"Nondeterministic Finite Automaton\"></av-automata-view>\r\n<ng-template #noNFA>\r\n    <h2>Could not display an NFA, since the grammar is not linear.</h2>\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_index__ = __webpack_require__("../../../../../src/app/actions/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_environment_service__ = __webpack_require__("../../../../../src/app/services/environment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__("../../../../../src/app/reducers/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    // readonly dfa$: Observable<DotSource>;
    function AppComponent(_a, store) {
        var production = _a.production;
        this.store = store;
        this.development = !production;
        this.grammar$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__reducers__["b" /* selectGrammar */]);
        this.pda$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__reducers__["d" /* selectGrammarPDADot */]);
        // this.dpda$ = this.store.select(selectGrammarDPDADot);
        this.nfa$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__reducers__["c" /* selectGrammarNFADot */]);
        // this.dfa$ = this.store.select(selectGrammarDFADot);
    }
    AppComponent.prototype.onSubmit = function (grammar) {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__actions_index__["b" /* NewGrammar */](grammar));
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'av-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_environment_service__["a" /* Environment */],
            __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_automata_view_automata_view_component__ = __webpack_require__("../../../../../src/app/components/automata-view/automata-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_grammar_form_view_grammar_form_view_component__ = __webpack_require__("../../../../../src/app/components/grammar-form-view/grammar-form-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_index__ = __webpack_require__("../../../../../src/app/reducers/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_environment_service__ = __webpack_require__("../../../../../src/app/services/environment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_visualizer_service__ = __webpack_require__("../../../../../src/app/services/visualizer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_viz_js_visualizer__ = __webpack_require__("../../../../../src/app/services/viz-js-visualizer.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_automata_view_automata_view_component__["a" /* AutomataViewComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_grammar_form_view_grammar_form_view_component__["a" /* GrammarFormViewComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["b" /* StoreModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__reducers_index__["a" /* reducers */]),
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__services_environment_service__["a" /* Environment */],
                { provide: __WEBPACK_IMPORTED_MODULE_9__services_visualizer_service__["a" /* Visualizer */], useClass: __WEBPACK_IMPORTED_MODULE_10__services_viz_js_visualizer__["a" /* VizJsVisualizer */] },
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/automata-view/automata-view.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>{{title}}</h2>\r\n<div [innerHTML]=\"visualization\">\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/automata-view/automata-view.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/automata-view/automata-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutomataViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_dot_source__ = __webpack_require__("../../../../../src/app/models/dot-source.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_visualizer_service__ = __webpack_require__("../../../../../src/app/services/visualizer.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AutomataViewComponent = (function () {
    function AutomataViewComponent(visualizer) {
        this.visualizer = visualizer;
    }
    Object.defineProperty(AutomataViewComponent.prototype, "visualization", {
        get: function () {
            return this.visualizer.visualize(this.dot);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_dot_source__["a" /* DotSource */])
    ], AutomataViewComponent.prototype, "dot", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", String)
    ], AutomataViewComponent.prototype, "title", void 0);
    AutomataViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'av-automata-view',
            template: __webpack_require__("../../../../../src/app/components/automata-view/automata-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/automata-view/automata-view.component.scss")],
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ChangeDetectionStrategy */].OnPush,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_visualizer_service__["a" /* Visualizer */]])
    ], AutomataViewComponent);
    return AutomataViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/grammar-form-view/grammar-form-view.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form\">\r\n    <table>\r\n        <thead>\r\n        <tr>\r\n            <th></th>\r\n            <th>Non-Terminal</th>\r\n            <th>Production</th>\r\n            <th></th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr\r\n            *ngFor=\"let control of form.controls; first as isFirst; last as isLast; index as ruleIndex\"\r\n            [formGroup]=\"control\">\r\n            <td>\r\n                <span *ngIf=\"isFirst\">\r\n                    Start\r\n                </span>\r\n            </td>\r\n            <td>\r\n                <input formControlName=\"nonTerminal\" (ngModelChange)=\"isLast && $event !== '' && onFocusLast()\">\r\n                &rarr;\r\n            </td>\r\n            <td>\r\n                <input formControlName=\"production\" (focus)=\"isLast && onFocusLast()\">\r\n            </td>\r\n            <td>\r\n                <button\r\n                    *ngIf=\"!(isFirst || isLast)\"\r\n                    (click)=\"onRemoveRule(ruleIndex)\"\r\n                    type=\"button\">\r\n                    Remove\r\n                </button>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n</form>\r\n<div *ngIf=\"form.invalid\">\r\n    Overall Errors: {{form.errors | json}}\r\n    Control Errors:\r\n    <ul>\r\n        <li *ngFor=\"let control of form.controls\">\r\n            Group Errors: {{control.errors | json}}\r\n            <ul>\r\n                <li>\r\n                    NonTerminal Errors: {{control.controls['nonTerminal'].errors | json}}\r\n                </li>\r\n                <li>\r\n                    Production Errors: {{control.controls['production'].errors | json}}\r\n                </li>\r\n            </ul>\r\n        </li>\r\n    </ul>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/grammar-form-view/grammar-form-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrammarFormViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var grammarToForm = function (grammar) {
    var controls = grammar
        .map(function (_a) {
        var nonTerminal = _a.nonTerminal, production = _a.production;
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            nonTerminal: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](nonTerminal, [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(1),
            ]),
            production: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](production.join('')),
        });
    });
    return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormArray */](controls);
};
var formToGrammar = function (formValue) {
    var rules = formValue.filter(function (value) { return value.nonTerminal !== ''; });
    return rules.reduce(function (prev, next) { return (prev.concat([
        {
            nonTerminal: next.nonTerminal,
            production: next.production.split(''),
        },
    ])); }, []);
};
var GrammarFormViewComponent = (function () {
    function GrammarFormViewComponent() {
        this.submit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    GrammarFormViewComponent.prototype.ngOnChanges = function () {
        var _this = this;
        var formArray = grammarToForm(this.grammar);
        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }
        if (this.form) {
            var i = void 0;
            for (i = 0; i < formArray.length; ++i) {
                this.form.at(i).setValue(formArray.at(i).value, { emitEvent: false });
            }
            if (i === this.form.length) {
                this.form.push(new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
                    nonTerminal: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
                    production: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
                }));
            }
        }
        else {
            this.form = formArray;
            this.form.push(new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
                nonTerminal: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
                production: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            }));
            this.valueChanges$ =
                this.form.valueChanges
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["a" /* filter */])(function () { return _this.form.valid; }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["b" /* map */])(function (value) { return formToGrammar(value.filter(function (_a) {
                    var nonTerminal = _a.nonTerminal;
                    return nonTerminal !== '';
                })); }));
        }
        this.valueChangesSubscription = this.valueChanges$.subscribe(this.submit);
    };
    GrammarFormViewComponent.prototype.ngOnInit = function () {
    };
    GrammarFormViewComponent.prototype.onFocusLast = function () {
        var row = this.form.controls[this.form.length - 1];
        if (row.get('nonTerminal').value === '') {
            return;
        }
        row.controls.nonTerminal.setValidators([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(1),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(1),
        ]);
        this.form.push(new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            nonTerminal: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            production: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
        }));
    };
    GrammarFormViewComponent.prototype.onRemoveRule = function (ruleIndex) {
        this.form.removeAt(ruleIndex);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Array)
    ], GrammarFormViewComponent.prototype, "grammar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], GrammarFormViewComponent.prototype, "submit", void 0);
    GrammarFormViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'av-grammar-form-view',
            template: __webpack_require__("../../../../../src/app/components/grammar-form-view/grammar-form-view.component.html"),
        })
    ], GrammarFormViewComponent);
    return GrammarFormViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/models/dot-source.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DotSource; });
var DotSource = (function () {
    function DotSource(payload) {
        this.payload = payload;
    }
    return DotSource;
}());



/***/ }),

/***/ "../../../../../src/app/reducers/grammar.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initialState */
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;
/* unused harmony export id */
/* unused harmony export selectNonTerminals */
/* unused harmony export selectIdGreibach */
/* unused harmony export selectGNF */
/* unused harmony export selectPDA */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return selectPDADot; });
/* unused harmony export selectDPDA */
/* unused harmony export DPDAToDot */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return selectDPDADot; });
/* unused harmony export isLeftLinear */
/* unused harmony export isRightLinear */
/* unused harmony export selectLeftLinearNFA */
/* unused harmony export selectRightLinearNFA */
/* unused harmony export selectNFA */
/* unused harmony export NFAToDot */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return selectNFADot; });
/* unused harmony export selectDFA */
/* unused harmony export DFAToDot */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectDFADot; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deepmerge__ = __webpack_require__("../../../../deepmerge/dist/es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__("../../../../../src/app/actions/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_dot_source__ = __webpack_require__("../../../../../src/app/models/dot-source.ts");




// export const initialState: State<'S', 'a' | 'b'> = [
//     {
//         nonTerminal: 'S',
//         production: ['a', 'S'],
//     },
//     {
//         nonTerminal: 'S',
//         production: ['b', 'S'],
//     },
//     {
//         nonTerminal: 'S',
//         production: [],
//     }
// ];
var initialState = [
    {
        nonTerminal: 'S',
        production: ['a', 'A'],
    },
    {
        nonTerminal: 'A',
        production: ['a', 'b', 'S'],
    },
    {
        nonTerminal: 'A',
        production: [],
    },
];
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_2__actions__["a" /* NEW_GRAMMAR */]:
            return action.grammar;
        default:
            return state;
    }
}
var id = function (x) { return x; };
var selectNonTerminals = function (grammar) { return grammar
    .map(function (rule) { return rule.nonTerminal; })
    .reduce(function (result, next) { return result.includes(next) ? result : result.concat([next]); }, []); };
var selectIdGreibach = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNonTerminals, id, function (nonTerminals, grammar) {
    return grammar.every(function (_a) {
        var production = _a.production;
        return !nonTerminals.includes(production[0]) &&
            production.slice(1).every(function (val) { return nonTerminals.includes(val); });
    });
});
var selectGNF = id; // TODO
var selectPDAFromGNF = function (grammar) { return ({
    initialStack: 'ZZ',
    startState: 'start',
    accepting: ['done'],
    transition: [
        {
            state: 'start',
            input: '',
            stack: 'ZZ',
            result: {
                state: 'rules',
                stack: [grammar[0].nonTerminal, 'ZZ'],
            },
        }
    ].concat(grammar
        .map(function (_a) {
        var nonTerminal = _a.nonTerminal, production = _a.production;
        return ({
            state: 'rules',
            input: production[0],
            stack: nonTerminal,
            result: {
                state: 'rules',
                stack: production.length > 1 ? production.slice(1) : [],
            },
        });
    }), [
        {
            state: 'rules',
            input: '',
            stack: 'ZZ',
            result: {
                state: 'done',
                stack: ['ZZ'],
            },
        },
    ]),
}); };
var selectPDA = null; // TODO Section 7.2 Theorem 7.1
var PDAToDot = function (pda) {
    var showStack = function (stack) { return stack === 'ZZ' ? 'Z' : stack; };
    var nodes = pda.transition
        .sort(function (left, right) { return left.state === pda.startState ? -1 : 1; })
        .map(function (transition) { return ({
        from: transition.state,
        to: transition.result.state,
        labels: [
            (transition.input || '&lambda;') + ", " + showStack(transition.stack) + " | " + transition.result.stack.map(showStack).join(''),
        ],
    }); })
        .map(function (_a) {
        var from = _a.from, to = _a.to, labels = _a.labels;
        return (_b = {},
            _b[from + ' -> ' + to] = labels,
            _b);
        var _b;
    })
        .reduce(function (all, next) { return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(all, next); }, {});
    return new __WEBPACK_IMPORTED_MODULE_3__models_dot_source__["a" /* DotSource */]("\n    digraph {\n        rankdir=LR;\n        splines=true;\n        overlap = false;\n        node [shape = doublecircle]; " + pda.accepting.join(' ') + "\n        node [shape = circle];\n        " + Object.entries(nodes).map(function (_a) {
        var key = _a[0], labels = _a[1];
        return "\n            " + key + " [ label=\"" + labels.join('\\n') + "\" ];\n        ";
    }).join('\n') + "\n    }\n    ");
};
var selectGNFPDADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectGNF, Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectPDAFromGNF, PDAToDot));
var selectPDADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectIdGreibach, id, function (isGNF, grammar) { return isGNF ? selectGNFPDADot(grammar) : null; });
var selectDPDA = null; // TODO
var DPDAToDot = null; // TODO
// export const selectDPDADot = createSelector(selectDPDA, DPDAToDot); // TODO
var selectDPDADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["c" /* compose */])(selectDPDA, DPDAToDot); // TODO
var isLeftLinear = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNonTerminals, id, function (nonTerminals, grammar) {
    return grammar.every(function (_a) {
        var production = _a.production;
        var nonTerminalsInProduction = production.filter(function (value) { return nonTerminals.includes(value); });
        return nonTerminalsInProduction.length === 1
            && production[0] === nonTerminalsInProduction[0] ||
            nonTerminalsInProduction.length === 0;
    });
});
var isRightLinear = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNonTerminals, id, function (nonTerminals, grammar) {
    return grammar.every(function (_a) {
        var production = _a.production;
        var nonTerminalsInProduction = production.filter(function (value) { return nonTerminals.includes(value); });
        return nonTerminalsInProduction.length === 1
            && production[production.length - 1] === nonTerminalsInProduction[0] ||
            nonTerminalsInProduction.length === 0;
    });
});
var selectLeftLinearNFA = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNonTerminals, id, function (nonTerminals, grammar) {
    var reversedGrammar = grammar.map(function (_a) {
        var nonTerminal = _a.nonTerminal, production = _a.production;
        return ({
            nonTerminal: nonTerminal,
            production: production.slice().reverse(),
        });
    });
    var rightLinearNFA = selectNFA(reversedGrammar);
    if (rightLinearNFA == null) {
        throw new Error;
    }
    // TODO
    var startState = 'Left-Linear Start';
    var accepting = [rightLinearNFA.startState];
    var transitionFromStart = {
        '': {
            'Left-Linear Start': rightLinearNFA.accepting,
        },
    };
    var transition = Object.entries(rightLinearNFA.transition)
        .map(function (_a) {
        var input = _a[0], transitions = _a[1];
        return ({
            input: input,
            transitions: Object.entries(transitions)
                .map(function (_a) {
                var from = _a[0], tos = _a[1];
                return tos.map(function (to) {
                    return (_a = {}, _a[to] = [from], _a);
                    var _a;
                })
                    .reduce(function (all, next) { return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(all, next); }, {});
            })
                .reduce(function (all, next) { return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(all, next); }, {}),
        });
    })
        .reduce(function (all, _a) {
        var input = _a.input, transitions = _a.transitions;
        return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(all, (_b = {},
            _b[input] = transitions,
            _b));
        var _b;
    }, transitionFromStart);
    return {
        startState: startState,
        accepting: accepting,
        transition: transition,
    };
});
var selectRightLinearNFA = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNonTerminals, id, function (nonTerminals, grammar) { return ({
    startState: grammar[0].nonTerminal,
    accepting: ['accept'],
    transition: grammar
        .reduce(function (transitions, _a) {
        var variable = _a.nonTerminal, rule = _a.production;
        var production = nonTerminals.includes(rule[rule.length - 1])
            ? rule
            : rule.concat([
                'accept',
            ]);
        var productionStateNames = production
            .slice(0, production.length - 1)
            .map(function (_, index) { return production.slice(0, index).join(''); })
            .map(function (name) { return variable + name; });
        var productionTransitionResults = productionStateNames.slice(1).concat([
            production[production.length - 1],
        ]);
        var productionTransitions = productionStateNames.length > 0 ? productionStateNames.map(function (state, stateIndex) {
            var transitionResult = productionTransitionResults[stateIndex];
            var transitionInput = production[stateIndex];
            return _a = {},
                _a[transitionInput] = (_b = {},
                    _b[state] = [transitionResult],
                    _b),
                _a;
            var _a, _b;
        }) : [
            {
                '': (_b = {},
                    _b[variable] = [productionTransitionResults[0]],
                    _b),
            },
        ];
        return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(transitions, productionTransitions.reduce(function (all, next) { return Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(all, next); }, {}));
        var _b;
    }, {}),
}); });
var selectNFA = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(isLeftLinear, id, function (leftLinear, grammar) { return leftLinear
    ? selectLeftLinearNFA(grammar)
    : isRightLinear(grammar)
        ? selectRightLinearNFA(grammar)
        : null; });
var NFAToDot = function (nfa) {
    console.log('nfa', nfa);
    var labelsAndTransitions = [];
    for (var _i = 0, _a = Object.entries(nfa.transition); _i < _a.length; _i++) {
        var _b = _a[_i], label = _b[0], stateTransition = _b[1];
        for (var _c = 0, _d = Object.entries(stateTransition); _c < _d.length; _c++) {
            var _e = _d[_c], from = _e[0], tos = _e[1];
            for (var _f = 0, tos_1 = tos; _f < tos_1.length; _f++) {
                var to = tos_1[_f];
                labelsAndTransitions.push({ from: from, to: to, label: label || '&lambda;' });
            }
        }
    }
    return new __WEBPACK_IMPORTED_MODULE_3__models_dot_source__["a" /* DotSource */]("\n    digraph {\n        rankdir=LR;\n        splines=true;\n        overlap = false;\n        node [shape = doublecircle]; " + nfa.accepting.join(' ') + "\n        node [shape = circle];\n        " + labelsAndTransitions.map(function (_a) {
        var from = _a.from, label = _a.label, to = _a.to;
        return "\n        \"" + from + "\" -> \"" + to + "\" [ label=\"" + label + "\" ];\n        ";
    }).join('\n') + "\n    }\n    ");
};
var selectNFADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectNFA, function (nfa) { return nfa ? NFAToDot(nfa) : null; });
var selectDFA = null; // TODO
var DFAToDot = null; // TODO
// export const selectDFADot = createSelector(selectDFA, DFAToDot); // TODO
var selectDFADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["c" /* compose */])(selectDFA, DFAToDot); // TODO


/***/ }),

/***/ "../../../../../src/app/reducers/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return selectGrammar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return selectGrammarPDADot; });
/* unused harmony export selectGrammarDPDADot */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return selectGrammarNFADot; });
/* unused harmony export selectGrammarDFADot */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grammar__ = __webpack_require__("../../../../../src/app/reducers/grammar.ts");


var reducers = {
    grammar: __WEBPACK_IMPORTED_MODULE_1__grammar__["a" /* reducer */],
};
var selectGrammar = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["d" /* createFeatureSelector */])('grammar');
var selectGrammarPDADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectGrammar, __WEBPACK_IMPORTED_MODULE_1__grammar__["e" /* selectPDADot */]);
var selectGrammarDPDADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectGrammar, __WEBPACK_IMPORTED_MODULE_1__grammar__["c" /* selectDPDADot */]);
var selectGrammarNFADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectGrammar, __WEBPACK_IMPORTED_MODULE_1__grammar__["d" /* selectNFADot */]);
var selectGrammarDFADot = Object(__WEBPACK_IMPORTED_MODULE_0__ngrx_store__["e" /* createSelector */])(selectGrammar, __WEBPACK_IMPORTED_MODULE_1__grammar__["b" /* selectDFADot */]);


/***/ }),

/***/ "../../../../../src/app/services/environment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Environment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");

var Environment = (function () {
    function Environment() {
        this.production = __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].production;
    }
    return Environment;
}());



/***/ }),

/***/ "../../../../../src/app/services/visualizer.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Visualizer; });
var Visualizer = (function () {
    function Visualizer() {
    }
    return Visualizer;
}());



/***/ }),

/***/ "../../../../../src/app/services/viz-js-visualizer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VizJsVisualizer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_viz_js__ = __webpack_require__("../../../../viz.js/viz.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_viz_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_viz_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VizJsVisualizer = (function () {
    function VizJsVisualizer(sanitizer) {
        this.sanitizer = sanitizer;
    }
    VizJsVisualizer.prototype.visualize = function (source) {
        try {
            var viz = __WEBPACK_IMPORTED_MODULE_1_viz_js___default()(source.payload);
            return this.sanitizer.bypassSecurityTrustHtml(viz);
        }
        catch (e) {
            console.error(source.payload);
            throw e;
        }
    };
    VizJsVisualizer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* DomSanitizer */]])
    ], VizJsVisualizer);
    return VizJsVisualizer;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[2]);
//# sourceMappingURL=main.bundle.js.map