import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagination } from '../shared/models/iPagination';
import { iProduct } from '../shared/models/iProduct';
import { iBrand } from '../shared/models/iBrand';
import { iType } from '../shared/models/iType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:2346/api/';

  constructor(private http: HttpClient) { }


  getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();
    if(brandId) params = params.append('brandId', brandId);
    if(typeId) params = params.append('typeId', typeId);

    return this.http.get<iPagination<iProduct[]>>(this.baseUrl + 'products', {params});
  }

  getBrands() {
    return this.http.get<iBrand[]>(this.baseUrl + 'products/brands');

  }

  getTypes() {
    return this.http.get<iType[]>(this.baseUrl + 'products/types');

  }




}
