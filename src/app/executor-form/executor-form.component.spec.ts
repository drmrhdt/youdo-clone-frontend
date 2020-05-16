import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorFormComponent } from './executor-form.component';

describe('ExecutorFormComponent', () => {
  let component: ExecutorFormComponent;
  let fixture: ComponentFixture<ExecutorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
