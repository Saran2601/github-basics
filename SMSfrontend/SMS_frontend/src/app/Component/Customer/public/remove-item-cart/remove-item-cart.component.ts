import { Router } from '@angular/router';
import { CustomerApiService } from './../../services/customer-api.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { AuthService } from 'src/app/Component/Services/auth.service';



@Component({
  selector: 'app-remove-item-cart',
  templateUrl: './remove-item-cart.component.html',
  styleUrls: ['./remove-item-cart.component.sass'],
})
export class RemoveItemCartComponent {
  @Input() item!: Item;
  @Output() itemRemoved = new EventEmitter<Item>();
  constructor(private customerapiservice: CustomerApiService,
    private authservice:AuthService,
    private router:Router,
    private cdr: ChangeDetectorRef){


  }
  removeitemfromcart(item:Item) {
    console.log(item);
    this.customerapiservice.removeFromCart(this.authservice.getEmail(),item.id).subscribe(
      (response:any)=>{
        console.log(response);
        this.itemRemoved.emit(item);
      },
      (error:any)=>{
        console.log("REMOBE")
        console.log(error);
        this.itemRemoved.emit(item);

      }
    )
  }
 
}
