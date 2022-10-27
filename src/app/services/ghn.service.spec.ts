/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {GhnService} from './ghn.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Ghn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        GhnService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, GhnService],
      (httpMock: HttpTestingController, apiService: GhnService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
