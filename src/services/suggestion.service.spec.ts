import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SuggestionService } from "./suggestion.service";

describe("SuggestionService", () => {
  let service: SuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SuggestionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
