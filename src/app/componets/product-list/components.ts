import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId?: number;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.ListProduct();
    });
  }

  ListProduct() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = categoryId !== null ? +categoryId : undefined;

    if (this.currentCategoryId !== undefined) {
      this.productService.getProductList(this.currentCategoryId).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    } else {
      this.productService.getAllProducts().subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching all products', error);
        }
      );
    }
  }
}
