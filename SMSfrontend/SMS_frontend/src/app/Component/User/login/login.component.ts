import {
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Loginmodel } from 'src/app/Component/Models/Loginmodel';
import { ApiServiceService } from 'src/app/Component/Services/api-service.service';
import { AuthService } from '../../Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgetpassworddialogComponent } from '../forgetpassworddialog/forgetpassworddialog.component';
declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  hidePassword=true;
  email!: string;
  password!: string;
  showSpinner: any;
  loginForm: FormGroup;
  user: SocialUser | null = null;
  data: Loginmodel = new Loginmodel();
  loading = false;
  isLoggedin: boolean | undefined;
  authStateSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private apiservice: ApiServiceService,
    private router: Router,
    private authservice: AuthService,
    public dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    // Manually set the password control value without triggering validation
    this.loginForm.get('password')?.setValue(this.loginForm.get('password')?.value);
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;

      setTimeout(() => {
        if (
          this.loginForm.value.email.trim().toLowerCase() ==
            'admin@gmail.com' &&
          this.loginForm.value.password.trim() == 'Admin@123'
        ) {
          this.data.email = this.loginForm.value.email.trim().toLowerCase();
          this.data.password = this.loginForm.value.password.trim();
          this.apiservice.adminLogin(this.data).subscribe(
            (response: any) => {
              console.log(response.token);
              console.log('login successful');
              this.authservice.login(response.token);
              this.loginForm.reset();
              this.router.navigate(['/admin/items']);
              this.loading = false; // Hide loader after the response is received
            },
            (error: any) => {
              if (error.status == 401) {
                console.log('Email or Password incorrect');
                this.loginForm.reset();
                this.router.navigate(['/user/login']);
              } else {
                console.log('An error occurred during Login.');
                this.loginForm.reset();
                this.router.navigate(['/user/login']);
              }
              this.loading = false; // Hide loader after an error occurs
            }
          );
        } else {
          this.data.email = this.loginForm.value.email.trim().toLowerCase();
          this.data.password = this.loginForm.value.password.trim();
          this.apiservice.userLogin(this.data).subscribe(
            (response: any) => {
              console.log(response);
              console.log('login successful');
              this.authservice.login(response.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard/mobiles']);
              this.loading = false; // Hide loader after the response is received
            },
            (error: any) => {
              if (error.status == 401) {
                console.log('Email or Password incorrect');
                this.loginForm.reset();
                this.router.navigate(['/user/login']);
              } else {
                console.log('An error occurred during Login.');
                this.loginForm.reset();
                this.router.navigate(['/user/login']);
              }
              this.loading = false; // Hide loader after an error occurs
            }
          );
        }
      }, 3000); // Set a minimum delay of 3000 ms
    }
  }
  openForgetPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgetpassworddialogComponent , {
      width: '500px', // Set the width according to your design
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result here, if needed
      console.log('The dialog was closed', result);
    });
  }
}
