import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-deatils',
  standalone: true,
  imports:[NgFor, CommonModule,RouterLink],
  templateUrl: './product-deatils.component.html',
  styleUrl: './product-deatils.component.css'
})
export class ProductDeatilsComponent implements OnInit {

  product!:Product;

  constructor(private route: ActivatedRoute,
    private productService: ProductService
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.HandleProductDetails();
    });
  }
  HandleProductDetails(): void {
    const theProductId = this.route.snapshot.paramMap.get('id');
    
    if (theProductId) {
      const productId: number = +theProductId;
      this.productService.getProduct(productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          console.error('Error fetching product', error);
        }
      });
    } else {
      console.error('Product ID is not available in the route');
    }
  }
}
