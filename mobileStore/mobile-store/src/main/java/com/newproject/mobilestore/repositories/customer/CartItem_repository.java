package com.newproject.mobilestore.repositories.customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.mobilestore.models.customer.Cart;
import com.newproject.mobilestore.models.customer.CartItem;

public interface CartItem_repository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);
}
