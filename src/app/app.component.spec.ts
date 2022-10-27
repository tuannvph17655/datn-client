import {inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AppComponent,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, AppComponent],
      (httpMock: HttpTestingController, apiService: AppComponent) => {
        expect(apiService).toBeTruthy();
      }
    )
  );
});
