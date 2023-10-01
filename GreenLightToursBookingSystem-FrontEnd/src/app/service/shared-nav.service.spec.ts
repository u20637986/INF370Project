import { TestBed } from '@angular/core/testing';

import { SharedNavService } from './shared-nav.service';

describe('SharedNavService', () => {
  let service: SharedNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
