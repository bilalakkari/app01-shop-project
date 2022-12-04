import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { AddProductsComponent } from './dashboard/add-products/add-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { WishlishtComponent } from './wishlisht/wishlisht.component';

const routes: Routes = [
  { path: '', redirectTo: '/navbar/home', pathMatch: 'full' },
  {
    path: 'navbar', component: NavbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'wishlist', component: WishlishtComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'sendemail', component: SendEmailComponent },
      { path: 'home/products/:product_id', component: ProductsListComponent },
      { path: '', redirectTo: '/navbar/home', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-new-product', component: AddProductsComponent },
  { path: 'add-new-category', component: AddCategoryComponent },
  { path: 'home/products', component: ProductsComponent },
  { path: 'home/products/:product_id', component: ProductsListComponent },
  { path: 'verifyemail', component: VerifyEmailComponent },
  { path: 'verifyemail/:user_id', component: VerifyEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
