import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { AccountComponent } from './account/account.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MyAccountComponent,
    AccountComponent,
    OrderDetailComponent,
    MyOrderComponent,
    MyAddressComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyAccountRoutingModule,
    NgxPaginationModule
  ]
})
export class MyAccountModule { }
