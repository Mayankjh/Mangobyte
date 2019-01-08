import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbcComponent } from './editbc.component';

describe('EditbcComponent', () => {
  let component: EditbcComponent;
  let fixture: ComponentFixture<EditbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
