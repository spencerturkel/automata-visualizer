import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomataViewComponent } from './automata-view.component';

describe('AutomataViewComponent', () => {
  let component: AutomataViewComponent;
  let fixture: ComponentFixture<AutomataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomataViewComponent ]
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
