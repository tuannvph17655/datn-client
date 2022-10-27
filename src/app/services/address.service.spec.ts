/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {AddressService} from './address.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Address', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AddressService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, AddressService],
      (httpMock: HttpTestingController, apiService: AddressService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
