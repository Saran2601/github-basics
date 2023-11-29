package com.newproject.mobilestore.services.customer;

import java.util.List;

import com.newproject.mobilestore.models.customer.Orders;

public interface Order_service {
    public abstract Orders placeOrder(Orders order);
    public abstract List<Orders> getOrders (String email);

    
}
