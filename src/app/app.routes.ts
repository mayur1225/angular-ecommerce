import { Routes } from '@angular/router';
import { ProductListComponent } from './componets/product-list/components';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';

export const routes: Routes = [
    {path:'product-category/:id', component:ProductCategoryMenuComponent},
    {path:'category/:id', component:ProductListComponent},
    {path:'products', component:ProductListComponent},
    {path:'**',redirectTo:'/products',pathMatch:'full'},
    {path:'', redirectTo:'/products',pathMatch:'full'}
];
