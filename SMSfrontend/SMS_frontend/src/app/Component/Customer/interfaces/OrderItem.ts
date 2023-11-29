import { Item } from "./Item";
import { Order } from "./Order";

export class OrderItem {
  id!: number;
  order!: Order;
  item!: Item;
  quantity?: number;
  subtotal!: number;
}
