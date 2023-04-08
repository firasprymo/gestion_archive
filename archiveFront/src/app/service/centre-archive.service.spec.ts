import { TestBed } from '@angular/core/testing';

import { CentreArchiveService } from './centre-archive.service';

describe('CentreArchiveService', () => {
  let service: CentreArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
