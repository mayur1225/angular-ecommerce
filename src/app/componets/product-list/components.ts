import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{

  products: Product[] =[];
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.ListProduct()
  }
   
  ListProduct(){
     this.productService.getProductList().subscribe(
       data => {
         this.products = data;
       },
       error => {
         console.log(error);
       }
     )
  }


}
