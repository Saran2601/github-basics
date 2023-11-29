package com.newproject.mobilestore.repositories.customer;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.mobilestore.models.customer.item;

public interface item_repository extends JpaRepository<item, Long> {
    List<item> findAllByQuantityGreaterThan(int quantity);
}