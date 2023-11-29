package com.newproject.mobilestore.services.customer.Impl;

import com.newproject.mobilestore.models.customer.Cart;
import com.newproject.mobilestore.models.customer.CartItem;
import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.DTO.CartDTO;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.repositories.customer.CartItem_repository;
import com.newproject.mobilestore.repositories.customer.Cart_repository;
import com.newproject.mobilestore.services.User_service;
import com.newproject.mobilestore.services.customer.Cart_service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements Cart_service {

    private final Cart_repository cartRepository;
    private final CartItem_repository cartItemRepository;
    private final User_service userservice;

    public CartServiceImpl(Cart_repository cartRepository, CartItem_repository carItemRepository,
            User_service userservice) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = carItemRepository;
        this.userservice = userservice;
    }

    @Override
    public Cart findByUser(Signup user) {
        return cartRepository.findByUser(user);
    }

    @Override
    public Boolean addToCart(Signup user, Item item) {

        Cart cart = cartRepository.findByUser(user);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
        }

        List<CartItem> cartItems = cart.getCartItems();

        for (CartItem cartItem : cartItems) {
            if (cartItem.getItem().equals(item)) {
                return false;
            }
        }

        CartItem newCartItem = new CartItem();
        cartItems.add(newCartItem);
        cart.setCartItems(cartItems);
        cartRepository.save(cart);
        newCartItem.setCart(cart);
        newCartItem.setItem(item);
        cartItemRepository.save(newCartItem);

        return true;

    }

    @Override
    public CartDTO viewCartItems(String email) {
        Signup user = userservice.findByEmail(email);

        if (user == null) {
            return null;
        }

        Cart cart = cartRepository.findByUser(user);
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }

        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUser(cart.getUser());
        cartDTO.setCartItems(cartItems);

        return cartDTO;
    }

    @Override
    public Boolean removeItemFromCart(Signup user, Item item) {
        Cart cart = cartRepository.findByUser(user);

        if (cart != null) {
            List<CartItem> cartItems = cart.getCartItems();
            CartItem itemToRemove = null;

            for (CartItem cartItem : cartItems) {
                if (cartItem.getItem().equals(item)) {
                    itemToRemove = cartItem;
                    break;
                }
            }

            if (itemToRemove != null) {
                cartItems.remove(itemToRemove);
                cart.setCartItems(cartItems);
                cartRepository.save(cart);
                cartItemRepository.delete(itemToRemove);
                return true; // Item removed successfully
            }
        }

        return false; // Item not found in the cart or cart is null
    }

}
