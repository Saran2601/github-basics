package com.newproject.mobilestore.services.customer.Impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.models.customer.WishItem;
import com.newproject.mobilestore.models.customer.Wishlist;
import com.newproject.mobilestore.repositories.customer.WishList_repository;
import com.newproject.mobilestore.repositories.customer.Wishitem_respository;
import com.newproject.mobilestore.services.User_service;
import com.newproject.mobilestore.services.customer.Wish_service;

@Service
public class WishServiceImpl implements Wish_service {
    private final WishList_repository wishlistRepository;
    private final Wishitem_respository wishItemRepository;
    private final User_service userservice;

    public WishServiceImpl(WishList_repository wishlistRepository,Wishitem_respository wishItemRepository,User_service userservice){
        this.wishlistRepository=wishlistRepository;
        this.wishItemRepository=wishItemRepository;
        this.userservice=userservice;
    }

    @Override
    public Wishlist findByUser(Signup user) {
        return wishlistRepository.findByUser(user);
    }

    @Override
    public Boolean removeItemFromWishlist(Signup user, Item item) {
        Wishlist wishlist = wishlistRepository.findByUser(user);
        if (wishlist != null) {
            List<WishItem> wishItems = wishlist.getWishItems();
            WishItem itemToRemove = null;

            for (WishItem wishItem : wishItems) {
                if (wishItem.getItem().equals(item)) {
                    itemToRemove = wishItem;
                    break;
                }
            }

            if (itemToRemove != null) {
                wishItems.remove(itemToRemove);
                wishlist.setWishItems(wishItems);
                wishlistRepository.save(wishlist);
                wishItemRepository.delete(itemToRemove);
                return true; // Item removed successfully
            }
        }

        return false;
    }

    @Override
    public Boolean addtoWishlist(Signup user, Item item) {
      Wishlist wishlist=wishlistRepository.findByUser(user);
        if (wishlist==null){
            wishlist=new Wishlist();
            wishlist.setUser(user);
        }
             List<WishItem> wishItems = wishlist.getWishItems();

        for (WishItem wishItem : wishItems) {
            if (wishItem.getItem().equals(item)) {
                return false;
            }
        }

        WishItem newWishItem = new WishItem();
        wishItems.add(newWishItem);
        wishlist.setWishItems(wishItems);
        wishlistRepository.save(wishlist);
        newWishItem.setWishlist(wishlist);
        newWishItem.setItem(item);
        wishItemRepository.save(newWishItem);

        return true;

                

    }

    @Override
    public Wishlist viewWishlistItems(String email) {
        Signup user = userservice.findByEmail(email);
        if (user == null) {
            return null;
        }
         Wishlist wishlist = wishlistRepository.findByUser(user);
         List<WishItem> wishItems = wishItemRepository.findByWishlist(wishlist);
         
        if (wishlist == null) {
            wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist = wishlistRepository.save(wishlist);
        }
        Wishlist wishlistDTO=new Wishlist();
        wishlistDTO.setId(wishlist.getId());
        wishlistDTO.setUser(wishlist.getUser());
        wishlistDTO.setWishItems(wishItems);
        return wishlistDTO;
    }
    
}
