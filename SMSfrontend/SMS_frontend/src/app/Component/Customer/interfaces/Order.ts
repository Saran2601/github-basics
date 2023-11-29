import { OrderItem } from "./OrderItem";

export class Order {
  id!: number;
  orderStatus!: string;
  userName: string | undefined;
  userEmail!: string;
  createdDate!: Date;
  address!: string;
  mobileNumber!: string;
  paymentType!: string;
  items!: OrderItem[];
  subtotal!: number;
  deliveryCharge!: number;
  estimatedTax!: number;
  estimatedAmount!: number;
}
