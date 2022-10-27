import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Province} from '../models/province';
import {environment} from '../../environments/environment';
import {District} from '../models/district';
import {Ward} from '../models/ward';

const GHN_API = environment.ghnApi;
const token_GHN = 'd740eabe-369a-11ed-8636-7617f3863de9';
const shopId_GHN = '3266977';
const fromDistrictId = 3440;
const serviceId = 53320 ; //phương thức vận chuyển bằng đường bộ
const options = {
  headers: {
    'token': token_GHN
  }
}


@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(GHN_API + '/master-data/province', options);
  }

  getDistricts(provinceId:number): Observable<District[]> {
    return this.http.get<District[]>(GHN_API + '/master-data/district?province_id='+provinceId, options);
  }

  getWards(districtId: number): Observable<Ward[]>{
    return this.http.get<Ward[]>(GHN_API + '/master-data/ward?district_id='+districtId, options);
  }

  getService(toDistrict: number): Observable<any>{
    const params = {
      shop_id : Number(shopId_GHN),
      from_district: 3440,
      to_district: Number(toDistrict),
    }

    return this.http.post<any>(GHN_API + '/v2/shipping-order/available-services', params, options);

  }

  getShipping(toDistrict: number, toWardCode: string, height : number, length : number, weight : number, width: number ): Observable<any> {
    const optionss = {
      headers: {
        token: token_GHN,
        shop_id: shopId_GHN,
      },
    };

    const params = {
      service_id:Number(serviceId),
      insurance_value:500000,
      coupon: null,
      from_district_id:3440,
      to_district_id:Number(toDistrict),
      to_ward_code:toWardCode,
      height:height,
      length:length,
      weight:weight,
      width:width
    };
    return this.http.post<any>(GHN_API + '/v2/shipping-order/fee',params,optionss);
  }

}
