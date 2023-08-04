
  export interface iProduct {
    id: number
    name: string
    description: string
    price: number
    pictureURL: string
    productType: string
    productBrand: string
  }
  
  export class iProduct implements iProduct{}