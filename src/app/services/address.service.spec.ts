/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {AddressService} from './address.service';

describe('Service: Address', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressService]
    });
  });

  it('should ...', inject([AddressService], (service: AddressService) => {
    expect(service).toBeTruthy();
  }));
});
