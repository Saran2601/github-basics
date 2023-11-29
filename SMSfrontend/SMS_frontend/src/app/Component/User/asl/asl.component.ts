import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from './../../Services/auth.service';
import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router } from '@angular/router';
import { Loginmodel } from '../../Models/Loginmodel';
import { Signupmodel } from '../../Models/Signupmodel';

@Component({
  selector: 'app-asl',
  templateUrl: './asl.component.html',
  styleUrls: ['./asl.component.sass']
})
export class AslComponent {
  user: SocialUser | null = null;
  authStateSubscription: any;
  data: Signupmodel = new Signupmodel();
  loading=false;

  constructor(  private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private apiservice: ApiServiceService,
    private router: Router,
    private authservice: AuthService,
    private ngZone: NgZone
    ){

    }
  ngOnInit(): void {
    this.authStateSubscription = this.socialAuthService.authState.subscribe(
      (user) => {
        this.user = user;
        this.continueWithGoogle();
      },
    (error)=>{
      console.log(error);
    }
    );
  }
  continueWithGoogle(): void {
    if (this.user != undefined) {
      this.ngZone.run(() => {
        this.loading = true;
      });

      console.log(this.user);
      this.data.email = this.user!.email.trim().toLowerCase();
      this.data.password = 'Google';
      this.data.userName = this.user!.firstName.trim();

      // Simulate a delay of at least 3000 ms using setTimeout
      setTimeout(() => {
        this.apiservice.continueWithGoogle(this.data).subscribe(
          (response: any) => {
            console.log(response);
            console.log('login successful');
            this.authservice.login(response.token);
            this.router.navigate(['/dashboard/mobiles']);
            this.hideLoader();
          },
          (error: any) => {
            if (error.status == 401) {
              console.log('Email or Password incorrect');
              this.router.navigate(['/user/login']);
            } else {
              console.log('An error occurred during Login.');
              this.router.navigate(['/user/login']);
            }

            this.hideLoader();
          }
        );
      }, 3000);
    }
  }

  private hideLoader(): void {
    this.ngZone.run(() => {
      this.loading = false;
    });
  }

}

