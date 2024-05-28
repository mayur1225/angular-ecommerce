import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './componets/product-list/components';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ProductListComponent,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    ProductCategoryMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
