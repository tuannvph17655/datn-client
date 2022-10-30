import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopComponent } from './components/shop/shop.component';
import { SizeComponent } from './components/shop/size/size.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PriceComponent } from './components/shop/price/price.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { JwtModule } from '@auth0/angular-jwt';
import { CurrencyPipe } from './pipes/currency.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyAccountModule } from './components/my-account/my-account.module';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AccountComponent } from './components/my-account/account/account.component';
@NgModule({
  declarations: [
    AppComponent,
    CurrencyPipe,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ShopComponent,
    SizeComponent,
    PriceComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MyAccountModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth-token');
        },
        allowedDomains: ['localhost:8888'],
      }
    }),
    //NgxSliderModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgbModule,
    CarouselModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
