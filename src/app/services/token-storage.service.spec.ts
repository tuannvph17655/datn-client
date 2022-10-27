/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {TokenStorageService} from './token-storage.service';

describe('Service: TokenStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService]
    });
  });

  it('should ...', inject([TokenStorageService], (service: TokenStorageService) => {
    expect(service).toBeTruthy();
  }));
});
