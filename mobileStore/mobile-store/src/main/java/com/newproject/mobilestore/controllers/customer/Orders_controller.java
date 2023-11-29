package com.newproject.mobilestore.controllers.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.customer.Orders;
import com.newproject.mobilestore.services.User_service;
import com.newproject.mobilestore.services.customer.Order_service;

@RestController
@RequestMapping("/api/orders")
public class Orders_controller {

    @Autowired
    private Order_service orderService;

    @Autowired
    private User_service user_service;


    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody Orders order) {
        try{
            Orders savedOrder = orderService.placeOrder(order);
            return ResponseEntity.ok("Order placed successfully with ID: " + savedOrder.getId());
        }
        catch(Exception e){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }
    @GetMapping("/get-orders")
    private ResponseEntity<?> getOrders(@RequestParam String email){
        try{
            Signup user=user_service.findByEmail(email);
            if (user==null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            else{
                List<Orders> orderHistory = orderService.getOrders(email);
                return ResponseEntity.ok(orderHistory);
            }

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }
    }


}
