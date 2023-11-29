package com.newproject.mobilestore.services.customer;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.DTO.CartDTO;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.models.customer.Cart;



public interface Cart_service {
    public abstract Cart findByUser(Signup user);
    public abstract Boolean removeItemFromCart(Signup user, Item item);
    public abstract Boolean addToCart(Signup user, Item item);
    public abstract CartDTO viewCartItems(String email);
   
}
