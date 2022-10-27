/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {ColorService} from './color.service';

describe('Service: Color', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorService]
    });
  });

  it('should ...', inject([ColorService], (service: ColorService) => {
    expect(service).toBeTruthy();
  }));
});
