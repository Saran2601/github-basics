import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSource = new BehaviorSubject<Order[]>([]); // Initialize with an empty array
  orders$ = this.ordersSource.asObservable();

  constructor(private http: HttpClient) {}

  // Replace the URL with your actual backend API endpoint for fetching orders
  private apiUrl = 'your_backend_api_url/orders';

  getOrders(): Observable<Order[]> {
    this.http.get<Order[]>(this.apiUrl).subscribe(
      (orders: Order[]) => {
        this.ordersSource.next(orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );

    return this.orders$;
  }

  // Implement additional methods for downloading orders, updating orders, etc.
}
