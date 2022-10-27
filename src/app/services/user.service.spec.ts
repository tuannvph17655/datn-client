/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, apiService: UserService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
