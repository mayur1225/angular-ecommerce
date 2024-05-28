import { Routes } from '@angular/router';
import { ProductListComponent } from './componets/product-list/components';

export const routes: Routes = [
    {path:'category/:id', component:ProductListComponent},
    {path:'category', component:ProductListComponent},
    {path:'products', component:ProductListComponent},
    {path:'**',redirectTo:'/products',pathMatch:'full'},
    {path:'', redirectTo:'/products',pathMatch:'full'}
];
