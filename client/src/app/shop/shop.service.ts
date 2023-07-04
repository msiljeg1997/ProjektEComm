import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPagination } from '../shared/models/iPagination';
import { iProduct } from '../shared/models/iProduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:2346/api/';

  constructor(private http: HttpClient) { }


  getProducts(){
    return this.http.get<iPagination<iProduct[]>>(this.baseUrl + 'products?pageSize=50');
    }







}
