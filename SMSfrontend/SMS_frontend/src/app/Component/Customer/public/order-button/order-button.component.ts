import { Component, Input } from '@angular/core';
import { Item } from '../../../Admin/interfaces/item';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { CartItem } from '../../interfaces/CartItem';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.sass']
})
export class OrderButtonComponent {
  @Input() items: CartItem[] = []
  constructor(
    private router: Router,
    private itemservice: ItemService
  ){
  }
  placeorder(){
    this.itemservice.selectItems(this.items);
    this.router.navigate(['/dashboard/checkout']);
  }

}
