import { Component, OnInit } from '@angular/core';
import { iProduct } from '../shared/models/iProduct';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: iProduct[] = [];


  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
          next: response => this.products = response.data,
          error: error => console.log(error)
      })
    }

}
