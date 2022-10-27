/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {ProductService} from './product.service';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
