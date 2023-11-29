import { Item } from "../../Admin/interfaces/item";
import { Cart } from "./Cart";

export interface CartItem{
  id?:number;
  cart:Cart;
  item:Item;

}

