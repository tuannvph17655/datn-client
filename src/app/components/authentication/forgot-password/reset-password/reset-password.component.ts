import {AbstractControl, UntypedFormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm = this.fb.group({
    otp: ['', Validators.required],
    newPassword: ['', Validators.required, Validators.minLength(6)],
    dupPassword: ['', Validators.required, Validators.minLength(6)],
  })

  get f(): { [key: string]: AbstractControl; } {
    return this.resetForm.controls;
  }

  constructor(public dialog: MatDialog, public dialogRefReset: MatDialogRef<ResetPasswordComponent>, private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  back() {
    this.dialogRefReset.close()
  }
}
