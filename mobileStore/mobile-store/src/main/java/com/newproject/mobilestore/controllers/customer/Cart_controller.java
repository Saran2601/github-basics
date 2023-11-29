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
import com.newproject.mobilestore.models.DTO.CartDTO;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.repositories.admin.ItemRepository;
import com.newproject.mobilestore.services.User_service;
import com.newproject.mobilestore.services.admin.ItemService;
import com.newproject.mobilestore.services.customer.Cart_service;

@RestController
@RequestMapping("/api/cart")
public class Cart_controller {

    private final Cart_service cartService;
    private final User_service user_service;
    private final ItemRepository itemRepository;

    public Cart_controller(Cart_service cartService, ItemService itemService, User_service user_service,ItemRepository itemRepository) {
        this.cartService = cartService;
        this.user_service = user_service;
        this.itemRepository = itemRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Item item1, @RequestParam String email) {
        try {
            Signup user = user_service.findByEmail(email);
            Item item =item1;
            if (user == null || item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or item not found");
            }

            if (cartService.addToCart(user, item) == true) {

                return ResponseEntity.ok("Item added to the cart successfully");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Item Already Added");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }

    @GetMapping("/view")
    public ResponseEntity<?> viewCart(@RequestParam String email) {
        try {
            CartDTO cartDTO = cartService.viewCartItems(email);

            if (cartDTO == null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Cart null");
            }

            return ResponseEntity.ok(cartDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long itemId, @RequestParam String email) {
        try {
            Signup user = user_service.findByEmail(email);
            // Item item = itemService.findById(itemId);
            Optional<Item> item1 = itemRepository.findById(itemId);
            Item item=item1.get();
            if (user == null || item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or item not found");
            }

            if (cartService.removeItemFromCart(user, item)) {
                return ResponseEntity.ok("Item removed from the cart successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found in the cart");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }

}
