/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {ColorService} from './color.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: Color', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ColorService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, ColorService],
      (httpMock: HttpTestingController, apiService: ColorService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
