package com.newproject.mobilestore.controllers.customer;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.models.customer.Wishlist;
import com.newproject.mobilestore.repositories.admin.ItemRepository;
import com.newproject.mobilestore.services.User_service;

import com.newproject.mobilestore.services.customer.Wish_service;

@RestController
@RequestMapping("/api/wish")
public class Wish_controller {
    private final Wish_service wishService;
    private final User_service user_service;
    private final ItemRepository itemRepository;

    public Wish_controller(Wish_service wishService, User_service user_service,ItemRepository itemRepository) {
        this.wishService = wishService;
        this.user_service = user_service;
        this.itemRepository = itemRepository;
    }

      @PostMapping("/add")
    public ResponseEntity<String> addToWish(@RequestBody Item item1, @RequestParam String email) {
        try {
            Signup user = user_service.findByEmail(email);
            Item item =item1;
            if (user == null || item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or item not found");
            }

            if (wishService.addtoWishlist(user, item) == true) {

                return ResponseEntity.ok("Item added to the wish successfully");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Item Already Added");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }
     @GetMapping("/view")
    public ResponseEntity<?> viewWishList(@RequestParam String email) {
        try {
            Wishlist wishlistDTO = wishService.viewWishlistItems(email);

            if (wishlistDTO == null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Wishlist null");
            }

            return ResponseEntity.ok(wishlistDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }
     @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> removeFromWishList(@PathVariable Long itemId, @RequestParam String email) {
        try {
            Signup user = user_service.findByEmail(email);
            Optional<Item> item1 = itemRepository.findById(itemId);
            Item item=item1.get();
            if (user == null || item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or item not found");
            }

            if (wishService.removeItemFromWishlist(user, item)) {
                return ResponseEntity.ok("Item removed from the wishlist successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found in the wishlist");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }

    }
}
