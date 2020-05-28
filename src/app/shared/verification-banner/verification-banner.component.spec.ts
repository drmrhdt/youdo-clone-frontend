import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { RouterModule, Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { VerificationBannerComponent } from "./verification-banner.component";

describe("VerificationBannerComponent", () => {
  let component: VerificationBannerComponent;
  let fixture: ComponentFixture<VerificationBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationBannerComponent],
      imports: [RouterModule.forRoot([]), ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to executor's form", inject(
    [Router],
    (router: Router) => {
      const spy = spyOn(router, "navigateByUrl");

      component.onClick();

      const url = spy.calls.first().args[0];

      expect(url).toBe("youdo-clone/verification/personalinfo");
    }
  ));
});
