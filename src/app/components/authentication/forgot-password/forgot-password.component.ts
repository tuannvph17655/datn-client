import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './../sign-in/sign-in.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dialog: MatDialog,
    public dialogRefSignIn: MatDialogRef<SignInComponent>,
    public dialogRefSignUp: MatDialogRef<SignUpComponent>,
    public dialogRefForgot: MatDialogRef<ForgotPasswordComponent>


  ) { }

  ngOnInit() {
  }
  signUp() {
    this.dialog.open(SignUpComponent, {
    })
    this.dialogRefForgot.close()
  }
  signIn() {
    this.dialog.open(SignInComponent, {
    })
    this.dialogRefForgot.close()
  }
  submit() {
    this.dialog.open(ResetPasswordComponent, {
    })
    // this.dialogRefForgot.close()
  }

}
