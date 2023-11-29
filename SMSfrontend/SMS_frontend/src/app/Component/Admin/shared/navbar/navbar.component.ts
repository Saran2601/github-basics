import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
// Todo Fetch title and icon from the configurations through HTTP Client
navbarMatIcon = 'phonelink';
navbarTitle = 'Admin';

constructor() { }

ngOnInit(): void {
}

}
