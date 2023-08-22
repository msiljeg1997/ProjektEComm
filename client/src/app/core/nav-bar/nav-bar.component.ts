import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { iBasket, iBasketItem } from 'src/app/shared/models/iBasket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(public basketService : BasketService, public accountService: AccountService) {}

  getCount(items: iBasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
