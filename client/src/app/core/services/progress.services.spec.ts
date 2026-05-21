import { TestBed } from '@angular/core/testing';

import { ProgressServices } from './progress.services';

describe('ProgressServices', () => {
  let service: ProgressServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
