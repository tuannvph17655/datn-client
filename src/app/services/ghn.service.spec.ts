/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {GhnService} from './ghn.service';

describe('Service: Ghn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhnService]
    });
  });

  it('should ...', inject([GhnService], (service: GhnService) => {
    expect(service).toBeTruthy();
  }));
});
