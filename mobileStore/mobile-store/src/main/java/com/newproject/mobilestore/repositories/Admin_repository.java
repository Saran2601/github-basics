package com.newproject.mobilestore.repositories;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.newproject.mobilestore.models.Admin;


public interface Admin_repository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByAdminName(String adminName);
    Optional<Admin> findByEmail(String email);
}
