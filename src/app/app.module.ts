import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductsComponent } from './dashboard/add-products/add-products.component';
import { FormComponent } from './dashboard/form/form.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CheckoutComponent } from './checkout/checkout.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ShopComponent } from './shop/shop.component';
import { WishlishtComponent } from './wishlisht/wishlisht.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './shared/filter.pipe';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { StarRatingModule } from 'angular-star-rating';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    AddProductsComponent,
    FormComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    ProductsListComponent,
    CheckoutComponent,
    SendEmailComponent,
    ShopComponent,
    WishlishtComponent,
    FilterPipe,
    AddCategoryComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
