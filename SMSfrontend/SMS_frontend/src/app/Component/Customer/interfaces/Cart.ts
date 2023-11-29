import { Signupmodel } from "../../Models/Signupmodel";
import { CartItem } from "./CartItem";

export interface Cart{
  id?: number;
  user?: Signupmodel;
  cartItems:CartItem[];

}
