import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrder } from '../models/create-order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let auth_token = window.localStorage.getItem('auth-token');

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${auth_token}`
});

const requestOptions = { headers: headers };

const AUTH_API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getListOrder(): Observable<any>{
    return this.http.get<any>(AUTH_API + 'order/myOrders', requestOptions);
  }

  getOrderDetail(id:string): Observable<any>{
    return this.http.get<any>(AUTH_API + 'order/' + id, requestOptions);
  }

  checkout(order:any): Observable<any>{
    return this.http.post<any>(AUTH_API + 'order/checkout', order, requestOptions);
  }

  //cancelOrder with post method and body with id and note
  cancelOrder(order:any): Observable<any>{
    return this.http.post<any>(AUTH_API + 'order/cancelOrder', order, requestOptions);
  }

  //checkReview post method with id
  checkReview(id:any): Observable<any>{
    return this.http.post<any>(AUTH_API + 'order/checkReview', id, requestOptions);
  }

  listOrder(req: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'order/search', { ...req },requestOptions);
  }

}
