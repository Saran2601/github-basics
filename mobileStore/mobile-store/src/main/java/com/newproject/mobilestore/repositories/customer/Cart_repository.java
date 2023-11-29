package com.newproject.mobilestore.repositories.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.customer.Cart;
import com.newproject.mobilestore.models.customer.CartItem;

public interface Cart_repository extends JpaRepository<Cart, Long> {
    Cart findByUser(Signup user);
    CartItem save(CartItem cartItem);
}