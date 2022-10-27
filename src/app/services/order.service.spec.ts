/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {OrderService} from './order.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Order', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        OrderService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, OrderService],
      (httpMock: HttpTestingController, apiService: OrderService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
