import { Component, Input } from '@angular/core';
import { iProduct } from '../../shared/models/iProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
@Input() product?: iProduct;

}
