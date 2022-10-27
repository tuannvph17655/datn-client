/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, ProductService],
      (httpMock: HttpTestingController, apiService: ProductService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
