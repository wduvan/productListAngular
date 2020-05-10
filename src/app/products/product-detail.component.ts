import {Component, OnInit} from '@angular/core';
import {IProducts} from './products';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProducts | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    let param = +this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
