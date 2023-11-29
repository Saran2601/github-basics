import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from '../../Services/api-service.service';
import { SnackbarService } from '../../Admin/services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgetpassworddialog',
  templateUrl: './forgetpassworddialog.component.html',
  styleUrls: ['./forgetpassworddialog.component.sass']
})
export class ForgetpassworddialogComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;

  constructor(public dialogRef: MatDialogRef<ForgetpassworddialogComponent>,private apiservice: ApiServiceService,private snackbarservice:SnackbarService) {}

  sendOtp(): void {
    this.apiservice.sendOtp(this.email).subscribe(
      (response:boolean)=>{
        if (response){
        this.otpSent = response;
        }
        else{
          this.snackbarservice.openSnackBar("User does not Exist");
          this.email='';

        }
      }
    );

  }

  verifyOtp() {
    if (/^\d{6}$/.test(this.otp)) {
      this.apiservice.verifyOtp(this.email,this.otp).subscribe(
        (response:boolean)=>{
          if (response){
          this.otpVerified = response;
          }
          else{
            this.snackbarservice.openSnackBar("Invalid OTP");
            this.otp='';
          }
        }
      );

    } else {
      this.otpVerified=false;
    }
  }

  resetPassword(): void {
    this.apiservice.resetPassword(this.email,this.newPassword).subscribe(
      (response:boolean)=>{
        this.snackbarservice.openSnackBar("Password Reset Successfull");
      },
      (error:any)=>{
        console.log(error);
      }
    );
    this.dialogRef.close();

  }
}
