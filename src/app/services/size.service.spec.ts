/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {SizeService} from './size.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Size', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SizeService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, SizeService],
      (httpMock: HttpTestingController, apiService: SizeService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
