import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  private itemEventDeleteInputSource = new Subject<Cart>();


  private itemEventDeleteEmitSource = new Subject<any>();

  private itemEventFailureEmitSource = new Subject<any>();


  itemEventDeleteInput$ = this.itemEventDeleteInputSource.asObservable();
  itemEventDeleteEmit$ = this.itemEventDeleteEmitSource.asObservable();


  itemEventFailureEmit$ = this.itemEventFailureEmitSource.asObservable();

  constructor() { }

  onDelete(cart: Cart): void {
    this.itemEventDeleteInputSource.next(cart); // Provide a placeholder argument
  }

  onDeleted(): void {
    this.itemEventDeleteEmitSource.next(undefined); // Provide a placeholder argument
  }
  onFailure(error: any): void {
    this.itemEventFailureEmitSource.next(error);
  }
}
