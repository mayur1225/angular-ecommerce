import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CommonModule,RouterLink,NgbPagination],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId?: number=1;
  previousCategoryId?: number=1;
  searchMode: boolean = false;
  thePage: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousKeyword: string ="";

  constructor(
    private productService: ProductService,
    private cartServices: CartService,
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

  updatePageSize(pageSize:string){
    this.thePage = 1;
    this.thePageSize = +pageSize;
    this.ListProduct();
  }

  handleSearchProduct(): void {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword!= theKeyword){
         this.thePage=1
    }
    this.previousKeyword = theKeyword;

    this.productService.searchProductListPaginate(theKeyword,this.thePageSize,this.thePage-1).subscribe({
      next: (data) => {
        this.products = data._embedded.products;
        this.thePage= data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements
      },
      error: (error) => {
        console.error('Error fetching  search products:', error);
      }
    });
  }

  handleListProduct(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = categoryId !== null ? +categoryId : undefined;

    if (this.currentCategoryId !== undefined) {
      this.thePage = 1;
      this.previousCategoryId = this.currentCategoryId;
      this.productService.getProductListPaginate(this.currentCategoryId,
        this.thePageSize,this.thePage-1).subscribe({
        next: (data) => {
          this.products = data._embedded.products;
          this.thePage= data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements
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

  addToCart(theProduct:Product) {
    const theCartItem = new CartItem(theProduct);
    this.cartServices.addToCart(theCartItem);
    this.cartServices.totalPrice.subscribe((data) => {

      
      

    });
    
  }
}
