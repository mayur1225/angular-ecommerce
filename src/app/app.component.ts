import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './componets/product-list/components';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryMenuComponent } from './componets/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componets/search/search.component';
import { ProductDeatilsComponent } from './componets/product-deatils/product-deatils.component';
import { NgbPaginationModule,NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ProductListComponent,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDeatilsComponent,
    NgbModule,
    NgbPaginationModule,
    NgbPagination,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
