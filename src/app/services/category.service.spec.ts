import {inject, TestBed} from '@angular/core/testing';

import {CategoryService} from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CategoryService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, CategoryService],
      (httpMock: HttpTestingController, apiService: CategoryService) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
