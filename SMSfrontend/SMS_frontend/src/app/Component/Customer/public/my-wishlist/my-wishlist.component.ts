import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { WishItem } from '../../interfaces/WishItem';
import { CustomerApiService } from '../../services/customer-api.service';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { Wishlist } from '../../interfaces/Wishlist';
import { SnackbarService } from 'src/app/Component/Admin/services/snackbar/snackbar.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.sass']
})
export class MyWishlistComponent {
  @Input() item!: Item;
  @Output() itemAdded = new EventEmitter<Item>();
  icontype= "favorite_border";
  iconcolor: string = ''; // Initialize button text
  wishitems: WishItem[]=[];

  constructor(
    private customerapiservice: CustomerApiService,
    private authservice: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.checkIfItemInWish();
  }
  checkIfItemInWish() {
    const itemId = this.item.id; // Assuming your item has an ID property
    this.customerapiservice.viewWishItems(this.authservice.getEmail()).subscribe(
      (response:Wishlist)=>{
        console.log(response.wishItems);
        this.wishitems=response.wishItems
        console.log(itemId)
        for (let i = 0; i < this.wishitems.length; i++) {
          if (this.wishitems[i].item.id === itemId) {
            this.icontype= "favorite";
            this.iconcolor = '#DE3163';

            console.log("Forloop") // Item is already in the cart
            break; // Exit the loop since we found a match
          }
        }
      }
    )
      }


  addtowishlist() {
    if (this.iconcolor === ''&& this.icontype==="favorite_border") {
      this.customerapiservice.addToWishList(this.authservice.getEmail(), this.item).subscribe(
        (response: any) => {
          console.log(response);
          this.icontype= "favorite";
          this.iconcolor = '#DE3163'; // Item is now in the cart
          this.itemAdded.emit(this.item);
          this.snackbarService.openSnackBar("Item Added to favourites");
        },
        (error) => {
          console.log(error);
          this.icontype= "favorite";
          this.iconcolor = '#DE3163';
          this.itemAdded.emit(this.item);
          this.snackbarService.openSnackBar("Item Added to favourites");
        }
      );
    }
    else{
      this.customerapiservice.removeFromWishList(this.authservice.getEmail(), this.item.id).subscribe(
        (response: any) => {
          console.log(response);
          this.icontype='favorite_border'
          this.iconcolor = '';
          this.itemAdded.emit(this.item);
          this.snackbarService.openSnackBar("Item removed from favourites");
        },
        (error) => {
          console.log(error);
          this.icontype='favorite_border'
          this.iconcolor = '';
          this.itemAdded.emit(this.item);
          this.snackbarService.openSnackBar("Item removed from favourites");
        }
      );

    }
  }
}

