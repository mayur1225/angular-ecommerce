import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId?: number;
  searchMode: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.ListProduct();
    });
  }

  ListProduct(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }

  handleSearchProduct(): void {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  handleListProduct(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = categoryId !== null ? +categoryId : undefined;

    if (this.currentCategoryId !== undefined) {
      this.productService.getProductList(this.currentCategoryId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching categorywise products', error);
        }
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching all products', error);
        }
      });
    }
  }
}
