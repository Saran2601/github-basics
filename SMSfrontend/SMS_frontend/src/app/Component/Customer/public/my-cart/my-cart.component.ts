import { CartItem } from './../../interfaces/CartItem';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { CustomerApiService } from '../../services/customer-api.service';
import { Cart } from '../../interfaces/Cart';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.sass']
})
export class MyCartComponent implements OnInit {
  @Input() item!: Item;
  @Output() itemAdded = new EventEmitter<Item>();
  buttonText: string = 'Add to Cart'; // Initialize button text
  cartitems: CartItem[]=[];

  constructor(
    private customerapiservice: CustomerApiService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.checkIfItemInCart();
    console.log("Gello")
  }
  checkIfItemInCart() {
    const itemId = this.item.id; // Assuming your item has an ID property
    this.customerapiservice.viewCartItems(this.authservice.getEmail()).subscribe(
      (response:Cart)=>{
        console.log(response.cartItems);
        this.cartitems=response.cartItems
        console.log(itemId)
        for (let i = 0; i < this.cartitems.length; i++) {
          if (this.cartitems[i].item.id === itemId) {
            this.buttonText = 'Added to Cart';
            console.log("Forloop") // Item is already in the cart
            break; // Exit the loop since we found a match
          }
        }
      }
    )
      }


  addtocart() {
    if (this.buttonText === 'Add to Cart') {
      this.customerapiservice.addToCart(this.authservice.getEmail(), this.item).subscribe(
        (response: any) => {
          console.log(response);
          this.buttonText = 'Added to Cart'; // Item is now in the cart
          this.itemAdded.emit(this.item);
        },
        (error) => {
          console.log(error);
          this.buttonText = 'Added to Cart';
          this.itemAdded.emit(this.item);
        }
      );
    }
  }
}
