package com.newproject.mobilestore.repositories.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.customer.WishItem;
import com.newproject.mobilestore.models.customer.Wishlist;

public interface WishList_repository extends JpaRepository<Wishlist, Long> {
    Wishlist findByUser(Signup user);
    WishItem save(WishItem wishItem);
}