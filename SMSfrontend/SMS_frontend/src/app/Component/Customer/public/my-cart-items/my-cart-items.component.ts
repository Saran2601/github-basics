
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { CustomerApiService } from '../../services/customer-api.service';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { Cart } from '../../interfaces/Cart';
import { CartItem } from '../../interfaces/CartItem';

@Component({
  selector: 'app-my-cart-items',
  templateUrl: './my-cart-items.component.html',
  styleUrls: ['./my-cart-items.component.sass']
})
export class MyCartItemsComponent {
  cartitems: CartItem[] = [];
  selectedItems : CartItem[] = [];
  constructor(
    private customerapiService: CustomerApiService,
    private authService: AuthService
  ){

  }
  ngOnInit(){
    console.log("cart works");
    console.log(this.authService.getEmail());
    this.getcartitems();
  }
  getcartitems(){
    this.customerapiService.viewCartItems(this.authService.getEmail()).subscribe(
      (response:Cart)=>{
        console.log(response.cartItems);
        this.cartitems=response.cartItems
      }
    )
  }
  onItemRemoved(removedItem: Item) {
    console.log("Emmit")
    this.getcartitems();

  }
  toggleSelection(cartitem:CartItem): void {
    const index = this.selectedItems.findIndex(item => item === cartitem);

    if (index === -1) {
      this.selectedItems.push(cartitem);
    } else {

      this.selectedItems.splice(index, 1);
    }
  }

  isChecked(cartitem: CartItem): boolean {
    
    console.log(this.selectedItems)

    return this.selectedItems.includes(cartitem);
  }

  onQuantityChanged(cartitem: any, quantity: number) {
    console.log(`Quantity changed for ${cartitem.item.name}: ${quantity}`);
    const selectedCartItem = this.selectedItems.find(item => item === cartitem);

    if (selectedCartItem) {
    selectedCartItem.item.quantity = quantity;

  }
  }
}
