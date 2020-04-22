export interface IProducts {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export class Product implements IProducts {
  constructor(public productId: number,
              public productName: string,
              public productCode: string,
              public releaseDate: string,
              public price: number,
              public description: string,
              public starRating: number,
              public imageUrl: string) {
  }

  calculateDiscount(percent: number): number {
    return this.price - (this.price * percent / 100);
  }
}
