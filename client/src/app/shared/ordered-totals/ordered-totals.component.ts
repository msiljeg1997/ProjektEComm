import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-ordered-totals',
  templateUrl: './ordered-totals.component.html',
  styleUrls: ['./ordered-totals.component.scss']
})
export class OrderedTotalsComponent {

   constructor (public basketService: BasketService){}
}
