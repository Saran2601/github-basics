import { Component, HostListener, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MyCartItemsComponent } from '../../public/my-cart-items/my-cart-items.component';
import { MyWishlistItemsComponent } from '../../public/my-wishlist-items/my-wishlist-items.component';
import { CanComponentDeactivate } from '../../services/can-deactivate.guard';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements CanComponentDeactivate {
  @ViewChild('sideNav', { static: true }) sideNav!: MatSidenav;
  profile=false
  isDropdownOpen = false;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.returnValue = true;
  }
  constructor(private searchService: SearchService){

  }
  ngOnInit(){
    this.disableBackButton();

  }
  disableBackButton() {
    history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }


  canDeactivate(): boolean {
    return true;
  }

  onActivate(event: any): void {
    if (event instanceof MyWishlistItemsComponent || event instanceof MyCartItemsComponent){
      this.closeSideNav();
    }
    else{
      this.openSideNav();
    }

  }

  closeSideNav(): void {
    this.sideNav.close();
}
openSideNav(): void{
  this.sideNav.open()
}

  toggleDropdown() {

    this.isDropdownOpen = !this.isDropdownOpen;
  }
  wishList(){}
  myCart(){

  }
  performselect(term:string){
    this.searchService.setSearchTerm(term);
    console.log(term)
  }
}
