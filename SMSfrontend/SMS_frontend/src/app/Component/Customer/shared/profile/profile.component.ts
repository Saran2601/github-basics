import { Component } from '@angular/core';
import { AuthService } from 'src/app/Component/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
  username!: String;
  constructor(
    private authservice: AuthService
  ){
    this.username=this.authservice.getuserName();
    console.log(this.username);
  }

  logout() {
    // Implement your logout logic here
    console.log('Logging out...');
    // You may want to navigate to the logout page or perform other actions
  }

}
