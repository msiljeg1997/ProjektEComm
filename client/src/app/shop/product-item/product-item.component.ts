import { Component, Input } from '@angular/core';
import { iProduct } from '../../shared/models/iProduct';
import { CommonModule } from '@angular/common';
import { BasketService } from 'src/app/basket/basket.service';
import { iBasket, iBasketItem } from 'src/app/shared/models/iBasket';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
@Input() product?: iProduct;


constructor(private basketService : BasketService) {}

addItemToBasket(){
  this.product && this.basketService.addItemToBasket(this.product);

}


handleButtonClick(event: MouseEvent) {
  console.log(event);
}


}
