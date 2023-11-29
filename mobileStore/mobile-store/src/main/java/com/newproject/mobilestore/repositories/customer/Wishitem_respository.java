package com.newproject.mobilestore.repositories.customer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.newproject.mobilestore.models.customer.WishItem;
import com.newproject.mobilestore.models.customer.Wishlist;

public interface Wishitem_respository extends JpaRepository<WishItem, Long> {
     List<WishItem> findByWishlist(Wishlist wishlist);
}
