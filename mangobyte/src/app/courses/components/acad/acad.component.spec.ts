import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadComponent } from './acad.component';

describe('AcadComponent', () => {
  let component: AcadComponent;
  let fixture: ComponentFixture<AcadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
