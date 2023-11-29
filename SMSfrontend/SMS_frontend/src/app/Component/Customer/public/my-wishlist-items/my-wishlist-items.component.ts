import { Component } from '@angular/core';
import { CartItem } from '../../interfaces/CartItem';
import { CustomerApiService } from '../../services/customer-api.service';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { Cart } from '../../interfaces/Cart';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { Wishlist } from '../../interfaces/Wishlist';
import { WishItem } from '../../interfaces/WishItem';

@Component({
  selector: 'app-my-wishlist-items',
  templateUrl: './my-wishlist-items.component.html',
  styleUrls: ['./my-wishlist-items.component.sass'],
})
export class MyWishlistItemsComponent {
  wishitems: WishItem[] = [];
  constructor(
    private customerapiService: CustomerApiService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    console.log('Wish works');
    console.log(this.authService.getEmail());
    this.getwishitems();
  }
  getwishitems() {
    this.customerapiService
      .viewWishItems(this.authService.getEmail())
      .subscribe((response: Wishlist) => {
        console.log(response.wishItems);
        this.wishitems = response.wishItems;
      });
  }
  onItemRemoved(removedItem: Item) {
    console.log('Emmit');
    this.getwishitems();
  }
}
