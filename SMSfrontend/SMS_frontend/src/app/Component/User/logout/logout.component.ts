import { AuthService } from './../../Services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent {
  constructor(private socialAuthService: SocialAuthService,private authservice: AuthService){

  }
  logout() {
    this.socialAuthService.signOut()
      .then(() => {
        console.log('User is signed out');
        this.authservice.logout();

      })
      .catch((error) => {
        console.log('Logout Error:', error);
        this.authservice.logout();
      });
  }


}
