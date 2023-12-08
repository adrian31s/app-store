import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user-panel', component: UserPanelComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
