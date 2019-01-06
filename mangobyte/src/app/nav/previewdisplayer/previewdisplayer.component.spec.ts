import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdisplayerComponent } from './previewdisplayer.component';

describe('PreviewdisplayerComponent', () => {
  let component: PreviewdisplayerComponent;
  let fixture: ComponentFixture<PreviewdisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewdisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewdisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
