import { TestBed } from '@angular/core/testing';

import { documentsService } from './documents.service';

describe('documentsService', () => {
  let service: documentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(documentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
