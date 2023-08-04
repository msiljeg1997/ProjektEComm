import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iBasket, iBasketItem, iBasketTotals } from '../shared/models/iBasket';
import { HttpClient } from '@angular/common/http';
import { iProduct } from '../shared/models/iProduct';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<iBasket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<iBasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();


  constructor(private http: HttpClient) { }


  getBasket(id: string) {
    return this.http.get<iBasket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: iBasket) {
    return this.http.post<iBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: iProduct | iBasketItem, quantity = 1) {
    if (this.isProduct(item)) item = this.mapProductitemToBasketItem(item);
    console.log(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1){
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id != id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: iBasket) {
return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
  next: () => {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
}
)

  }


  private createBasket(): iBasket {
    const basket = new iBasket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductitemToBasketItem(item: iProduct): iBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureURL,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private addOrUpdateItem(items: iBasketItem[], itemToAdd: iBasketItem, quantity: number): iBasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }





  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });

  }


  private isProduct(item: iProduct | iBasketItem): item is iProduct {
    return (item as iProduct).productBrand != undefined;
  }

}
