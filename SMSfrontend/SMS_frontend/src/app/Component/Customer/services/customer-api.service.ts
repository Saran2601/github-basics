import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/Cart';
import { Observable } from 'rxjs';
import { Item } from '../../Admin/interfaces/item';
import { Wishlist } from '../interfaces/Wishlist';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private readonly apiUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  viewCartItems(email: string): Observable<Cart> {
    const url = `${this.apiUrl}/api/cart/view?email=${email}`;
    return this.http.get<Cart>(url);
  }
  removeFromCart(email: string,id:number|undefined): Observable<any> {
    const url = `${this.apiUrl}/api/cart/remove/${id}?email=${email}`;
    return this.http.delete<any>(url);
  }
  addToCart(email: string,item:Item): Observable<any> {
    const url = `${this.apiUrl}/api/cart/add?email=${email}`;
    return this.http.post<Item>(url,item);
  }
  viewWishItems(email: string): Observable<Wishlist> {
    const url = `${this.apiUrl}/api/wish/view?email=${email}`;
    return this.http.get<any>(url);
  }
  removeFromWishList(email: string,id:number|undefined): Observable<any> {
    const url = `${this.apiUrl}/api/wish/remove/${id}?email=${email}`;
    return this.http.delete<any>(url);
  }
  addToWishList(email: string,item:Item): Observable<any> {
    const url = `${this.apiUrl}/api/wish/add?email=${email}`;
    return this.http.post<Item>(url,item);
  }
  placeOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/api/orders/place-order`;
    return this.http.post<Order>(url,order);
  }
  getOrders(email: string): Observable<any> {
    const url = `${this.apiUrl}/api/orders/get-orders?email=${email}`;
    return this.http.get<any>(url);
  }



}
