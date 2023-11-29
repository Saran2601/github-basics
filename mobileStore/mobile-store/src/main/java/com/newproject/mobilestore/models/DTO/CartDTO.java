package com.newproject.mobilestore.models.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.customer.CartItem;

public class CartDTO {
    private Long id;
    private Signup user;

    @JsonProperty("cartItems")
    private List<CartItem> cartItems;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Signup getUser() {
        return user;
    }
    public void setUser(Signup user) {
        this.user = user;
    }
    public List<CartItem> getCartItems() {
        return cartItems;
    }
    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

}