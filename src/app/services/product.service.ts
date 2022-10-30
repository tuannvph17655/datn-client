import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getListProduct(req: any): Observable<any> {
    return this.http.post<any>(API + 'product/search/v2', { ...req });
  }
  getProductDetails(id:string){
    return this.http.get(API + 'product/' + id);
  }

  getProductRelated(productId: string): Observable<any> {
    return this.http.post<any>(API + 'product/relatedProduct',{ productId }, httpOptions);
  }

}
