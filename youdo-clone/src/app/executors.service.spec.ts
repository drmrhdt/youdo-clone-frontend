import { TestBed } from '@angular/core/testing';

import { ExecutorsService } from './executors.service';

describe('ExecutorsService', () => {
  let service: ExecutorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
