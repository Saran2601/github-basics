package com.newproject.mobilestore.repositories.customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.newproject.mobilestore.models.customer.Orders;

public interface Orders_repository extends JpaRepository<Orders, Long> {
     List<Orders> findByUserEmail(String userEmail);
}
