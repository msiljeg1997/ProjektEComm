import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { iProduct } from '../shared/models/iProduct';
import { ShopService } from './shop.service';
import { iBrand } from '../shared/models/iBrand';
import { iType } from '../shared/models/iType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: iProduct[] = [];
  brands: iBrand[] = [];
  types: iType[] = [];
  ShopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: High to low', value: 'priceDesc' },
    { name: 'Price: Low to high', value: 'priceAsc' },
  ];
  totalCount = 0;




  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  

  getProducts() {
    this.shopService.getProducts(this.ShopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.ShopParams.pageNumber = response.pageIndex;
        this.ShopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }


  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }


  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }


  onBrandSelected(brandId: number) {
    this.ShopParams.brandId = brandId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }


  onTypeSelected(typeId: number) {
    this.ShopParams.typeId = typeId;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }


  onSortSelected(event: any) {
    this.ShopParams.sort = event.target.value;
    this.getProducts();
  }


  onPageChanged(event: any) {
    if (this.ShopParams.pageNumber !== event) {
      this.ShopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.ShopParams.search = this.searchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.ShopParams = new ShopParams();
    this.getProducts();
  }






}
