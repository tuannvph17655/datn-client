import {inject, TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        LocationService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, LocationService],
      (httpMock: HttpTestingController, apiService: LocationService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
