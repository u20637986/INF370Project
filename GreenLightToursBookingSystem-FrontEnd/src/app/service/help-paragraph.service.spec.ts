import { TestBed } from '@angular/core/testing';

import { HelpParagraphService } from './help-paragraph.service';

describe('HelpParagraphService', () => {
  let service: HelpParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
