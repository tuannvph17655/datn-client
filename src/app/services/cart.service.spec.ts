/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {CartService} from './cart.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CartService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, CartService],
      (httpMock: HttpTestingController, apiService: CartService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
