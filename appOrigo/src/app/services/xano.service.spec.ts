import { TestBed } from '@angular/core/testing';

import { XanoService } from './xano.service';

describe('XanoService', () => {
  let service: XanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
