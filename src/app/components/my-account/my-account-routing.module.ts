import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAddressComponent } from './my-address/my-address.component';

const routes: Routes = [
  { path: 'profile', component: AccountComponent },
  { path: 'change-password',component: ChangePasswordComponent},
  { path: 'address', component: MyAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
