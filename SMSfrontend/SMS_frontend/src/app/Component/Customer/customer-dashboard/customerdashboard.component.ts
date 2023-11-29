import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.sass']
})
export class CustomerdashboardComponent {
  constructor(private router: Router,private authservice:AuthService){

  }

  logout() {
    this.authservice.logout();

  }

  
}
