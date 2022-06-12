import { TestBed } from '@angular/core/testing';

import { RegistoServiceService } from './registo-service.service';

describe('RegistoServiceService', () => {
  let service: RegistoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
