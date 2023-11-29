import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-sidenav-menu-items',
  templateUrl: './sidenav-menu-items.component.html',
  styleUrls: ['./sidenav-menu-items.component.sass']
})
export class SidenavMenuItemsComponent {

  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    // Todo Fetch menu items from the configurations through HTTP Client
    this.menuItems = [
      {id: 1, name: 'Item List', routerLink: ['/admin/items'], matIcon: 'view_list'},
      {id: 2, name: 'Add Item', routerLink: ['/admin/items/add'], matIcon: 'playlist_add'},
      {id: 3, name: 'Items Summary', routerLink: ['/admin/items/summary'], matIcon: 'info'}
    ];
  }
}

