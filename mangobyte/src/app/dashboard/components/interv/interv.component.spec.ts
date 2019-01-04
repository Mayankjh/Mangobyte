import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervComponent } from './interv.component';

describe('IntervComponent', () => {
  let component: IntervComponent;
  let fixture: ComponentFixture<IntervComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
