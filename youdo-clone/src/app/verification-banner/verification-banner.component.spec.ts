import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationBannerComponent } from './verification-banner.component';

describe('VerificationBannerComponent', () => {
  let component: VerificationBannerComponent;
  let fixture: ComponentFixture<VerificationBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
