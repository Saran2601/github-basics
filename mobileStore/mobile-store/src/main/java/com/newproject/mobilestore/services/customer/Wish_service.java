package com.newproject.mobilestore.services.customer;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.models.customer.Wishlist;

public interface Wish_service {
    public abstract Wishlist findByUser(Signup user);
    public abstract Boolean removeItemFromWishlist(Signup user, Item item);
    public abstract Boolean addtoWishlist (Signup user, Item item);
    public abstract Wishlist viewWishlistItems(String email);
    
}
