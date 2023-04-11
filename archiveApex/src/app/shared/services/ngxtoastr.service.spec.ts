import { TestBed } from '@angular/core/testing';

import { NGXToastrService } from './ngxtoastr.service';

describe('NGXToastrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NGXToastrService = TestBed.get(NGXToastrService);
    expect(service).toBeTruthy();
  });
});
