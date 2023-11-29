import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/CartItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private selectedItemsSource = new BehaviorSubject<CartItem[]>([]); // Initialize with an empty array
  selectedItems$ = this.selectedItemsSource.asObservable();

  selectItems(cartitems: CartItem[]) {
    this.selectedItemsSource.next(cartitems);
  }
}
