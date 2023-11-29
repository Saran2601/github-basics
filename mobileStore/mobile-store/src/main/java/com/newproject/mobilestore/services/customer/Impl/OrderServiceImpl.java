package com.newproject.mobilestore.services.customer.Impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
//import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newproject.mobilestore.models.customer.OrderItem;
import com.newproject.mobilestore.models.customer.Orders;
import com.newproject.mobilestore.models.customer.item;
import com.newproject.mobilestore.repositories.customer.OrderItem_repository;
import com.newproject.mobilestore.repositories.customer.Orders_repository;
import com.newproject.mobilestore.repositories.customer.item_repository;
import com.newproject.mobilestore.services.customer.Order_service;

@Service
public class OrderServiceImpl implements Order_service {

    @Autowired
    private Orders_repository orderRepository;

    @Autowired
    private OrderItem_repository orderItemRepository;

    @Autowired
    private item_repository itemRepository;

    @Override
    @Transactional
    public Orders placeOrder(Orders order) {
        order.setCreatedDate(LocalDateTime.now());
        orderRepository.save(order);
        for (OrderItem orderItem : order.getItems()) {
            item item1 = orderItem.getItem();
            orderItem.setOrder(order);
            orderItem.setItem(item1);

            // Update the subtotal of the order item
            orderItem.setSubtotal(item1.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())).doubleValue());

            // Save the updated item
            itemRepository.save(item1);

            // Save the order item
            orderItemRepository.save(orderItem);
        }

        // Calculate and update order subtotal
        double orderSubtotal = order.getItems().stream().mapToDouble(OrderItem::getSubtotal).sum();
        order.setSubtotal(orderSubtotal);

        // Calculate and update estimated amount (subtotal + delivery charge + estimated tax)
        double estimatedAmount = orderSubtotal + order.getDeliveryCharge() + order.getEstimatedTax();
        order.setEstimatedAmount(estimatedAmount);

        // Save the updated order
        orderRepository.save(order);

        return order;
    }

    @Override
public List<Orders> getOrders(String email) {
    try {
        List<Orders> orderHistory = orderRepository.findByUserEmail(email);

        // Sort orders by orderId in descending order
        orderHistory.sort(Comparator.comparing(Orders::getId).reversed());

        // Log the sorted order history for debugging
        orderHistory.forEach(order -> System.out.println("Order ID: " + order.getId() + ", Created Date: " + order.getCreatedDate()));

        return orderHistory;
    } catch (Exception e) {
        e.printStackTrace(); // Log the exception for debugging
        throw e; // Re-throw the exception to be handled by the controller
    }
}
}
