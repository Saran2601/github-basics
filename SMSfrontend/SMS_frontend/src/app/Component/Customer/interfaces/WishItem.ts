import { Item } from "../../Admin/interfaces/item";
import { Wishlist } from "./Wishlist";

export interface WishItem{
  id?:number;
  wishList:Wishlist;
  item:Item;
}
