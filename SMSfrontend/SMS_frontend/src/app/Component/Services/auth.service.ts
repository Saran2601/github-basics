import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private token: string | null = null;
  email!: string ;
  userName!: string;

  constructor(private router: Router){
    this.checkAuthentication();
  }

  login(token: string) {
    this.authenticated = true;
    this.token = token;
    const decodedToken: any = jwtDecode(token);
    this.email=decodedToken.sub;
    this.userName=decodedToken.userName;
    localStorage.setItem('token', token);
    localStorage.setItem('email', decodedToken.sub||"");
    localStorage.setItem('userName', decodedToken.userName||"");
  }

  logout() {
    this.authenticated = false;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.router.navigate(['/user/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getEmail(): string  {
    return this.email;
  }
  getuserName(): string  {
    return this.userName;
  }

  getToken(): any {
    return this.token;
  }

  validateToken(): boolean {
    return true;
  }

  checkAuthentication() {
    if (this.isAuthenticated() && !this.validateToken()) {
      this.logout();
    }
  }
}
