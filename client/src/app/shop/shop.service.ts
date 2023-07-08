import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagination } from '../shared/models/iPagination';
import { iProduct } from '../shared/models/iProduct';
import { iBrand } from '../shared/models/iBrand';
import { iType } from '../shared/models/iType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:2346/api/';

  constructor(private http: HttpClient) { }




  getProduct(id: number) {
    return this.http.get<iProduct>(this.baseUrl + 'products/' + id);
  }

  getProducts(ShopParams: ShopParams) {
    let params = new HttpParams();
    if (ShopParams.brandId > 0) params = params.append('brandId', ShopParams.brandId);
    if (ShopParams.typeId > 0) params = params.append('typeId', ShopParams.typeId);
    params = params.append('sort', ShopParams.sort);
    params = params.append('pageIndex', ShopParams.pageNumber);
    params = params.append('pageSize', ShopParams.pageSize);
    if (ShopParams.search) params = params.append('search', ShopParams.search);

    return this.http.get<iPagination<iProduct[]>>(this.baseUrl + 'products', { params });
  }

  getBrands() {
    return this.http.get<iBrand[]>(this.baseUrl + 'products/brands');

  }

  getTypes() {
    return this.http.get<iType[]>(this.baseUrl + 'products/types');

  }




}
