import { TestBed } from '@angular/core/testing';

import { BrandsServices } from './brands.services';

describe('BrandsServices', () => {
  let service: BrandsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
