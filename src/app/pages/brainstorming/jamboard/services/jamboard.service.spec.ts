import { TestBed } from '@angular/core/testing';

import { JamboardService } from './jamboard.service';

describe('JamboardService', () => {
  let service: JamboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JamboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
