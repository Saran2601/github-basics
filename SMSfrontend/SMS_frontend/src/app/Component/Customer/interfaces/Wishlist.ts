import { Signupmodel } from "../../Models/Signupmodel";
import { WishItem } from "./WishItem";
export interface Wishlist{
  id?: number;
  user?: Signupmodel;
  wishItems:WishItem[];

}
