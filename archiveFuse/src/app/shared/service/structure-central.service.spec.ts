import { TestBed } from '@angular/core/testing';

import { StructureCentralService } from './structure-central.service';

describe('StructureCentralService', () => {
  let service: StructureCentralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureCentralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
