package com.newproject.mobilestore.repositories.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import com.newproject.mobilestore.models.admin.Item;
import com.newproject.mobilestore.models.admin.ItemAction;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;


public interface ItemActionRepository extends JpaRepository<ItemAction, Long> {

    List<ItemAction> findByItemId(Long itemId);

    Optional<ItemAction> findByIdAndItemId(Long id, Long itemId);

    List<ItemAction> findByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    void deleteAllByItem(Item item);
}

