import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorPreviewComponent } from './executor-preview.component';

describe('ExecutorPreviewComponent', () => {
  let component: ExecutorPreviewComponent;
  let fixture: ComponentFixture<ExecutorPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutorPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
