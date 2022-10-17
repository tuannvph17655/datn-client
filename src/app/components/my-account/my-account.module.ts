import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountComponent } from './account/account.component';
import { MyAddressComponent } from './my-address/my-address.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    AccountComponent,
    MyAddressComponent,
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
