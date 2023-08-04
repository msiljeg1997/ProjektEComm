import * as cuid from "cuid";

export interface iBasket {
  subtotal: string | number;
  id: string;
  items: iBasketItem[];
}

export class iBasket implements iBasket {
  id = cuid();
  items: iBasketItem[] = [];

}

export interface iBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;

}

export interface iBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}





