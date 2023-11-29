import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../interfaces/Item';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.sass']
})
export class AddQuantityComponent {
  quantity=1;
  @Input() item!: Item;
  @Output() quantityChanged: EventEmitter<number> = new EventEmitter<number>();
  incrementQuantity(item: any): void {
    if (item.quantity > this.quantity) {
      this.quantity+=1;
      this.quantityChanged.emit(this.quantity);
    }
  }

  decrementQuantity(item: any): void {
    if (item.quantity >= this.quantity&& this.quantity >1) {
      this.quantity-=1;
      this.quantityChanged.emit(this.quantity);
    }
  }


}
