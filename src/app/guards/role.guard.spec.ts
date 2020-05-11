import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RoleGuard } from "./role.guard";

describe("RoleGuard", () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(RoleGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
