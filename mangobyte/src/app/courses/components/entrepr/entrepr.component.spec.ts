import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprComponent } from './entrepr.component';

describe('EntreprComponent', () => {
  let component: EntreprComponent;
  let fixture: ComponentFixture<EntreprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
