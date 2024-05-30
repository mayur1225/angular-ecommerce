import { Routes } from '@angular/router';
import { ProductListComponent } from './componets/product-list/components';
import { ProductCategoryMenuComponent } from './componets/product-category-menu/product-category-menu.component';
import { ProductDeatilsComponent } from './componets/product-deatils/product-deatils.component';

export const routes: Routes = [
    { path: 'products/:id', component: ProductDeatilsComponent },
    { path: 'product-category/:id', component: ProductCategoryMenuComponent },
    { path: 'category/:id', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    {path:'**',redirectTo:'/products',pathMatch:'full'},
    {path:'', redirectTo:'/products',pathMatch:'full'},
];
