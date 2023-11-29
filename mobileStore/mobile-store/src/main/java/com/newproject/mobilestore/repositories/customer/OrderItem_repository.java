package com.newproject.mobilestore.repositories.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import com.newproject.mobilestore.models.customer.OrderItem;

public interface OrderItem_repository extends JpaRepository <OrderItem, Long> {
    
}

