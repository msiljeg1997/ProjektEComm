import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { iBasketItem } from '../shared/models/iBasket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService : BasketService) {}


  incrementQuantity(item: iBasketItem){
    this.basketService.addItemToBasket(item);
  }

removeItem(id: number) {
  this.basketService.removeItemFromBasket(id);
}

}
