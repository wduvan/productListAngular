import {Component, OnInit} from '@angular/core';
import {IProducts} from './products';
import {ProductService} from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List!';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;
  products: IProducts[];

  get objListFilter(): string {
    return this.listFilter;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }

  set objListFilter(value: string) {
    this.listFilter = value;
    this.filteredProducts = this.objListFilter ? this.performFilter(this.objListFilter) : this.products;
  }

  filteredProducts: IProducts[];

  constructor(private productService: ProductService) {
  }

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProducts) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProdcuts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }
}
